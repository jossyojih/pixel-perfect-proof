import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StudentsTable } from "@/components/StudentsTable";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ReportCard } from "@/components/ReportCard";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
import * as XLSX from 'xlsx';
import { ELCReportCard } from "@/components/ELCReporCard";
import { ELCStudentsTable } from "@/components/ELCStudentsTable";

interface ExcelRow {
    [key: string]: any; // More flexible structure to handle different Excel formats
}

interface ParsedStudent {
    name: string;
    rawData?: ExcelRow;
    // ELC specific fields from Excel
    term_name?: string;
    year_name?: string;
    school_year?: string;
    teacher_name?: string;
    no_of_school_days?: number;
    days_present?: number;
    days_absent?: number;
    teacher_comments?: string;
    
    // Development assessments - Personal, Social and Emotional Development
    relationships_term3?: string;
    self_awareness_term3?: string;
    managing_feelings_term3?: string;
    
    // Communication and Language
    listening_term3?: string;
    understanding_term3?: string;
    speaking_term3?: string;
    
    // Physical Development
    moving_handling_term3?: string;
    health_selfcare_term3?: string;
    
    // Literacy
    reading_term3?: string;
    writing_term3?: string;
    
    // Mathematics
    numbers_term3?: string;
    shape_term3?: string;
    
    // Understanding the World
    communities_term3?: string;
    world_term3?: string;
    technology_term3?: string;
    
    // Expressive Arts and Design
    exploring_term3?: string;
    imaginative_term3?: string;
}


export default function ELCUploadReport() {
    const [file, setFile] = useState<File | null>(null);
    const [students, setStudents] = useState<ParsedStudent[]>([]);
    const [isGeneratingReports, setIsGeneratingReports] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string>("");
    const { toast } = useToast();

    const classOptions = [
        "Busy Bees 1", "Eager Explorers 1", "Eager Explorers 2", "Lively Learners 1", "Lively Learners 2"
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            parseExcel(uploadedFile);
        }
    };

    const parseExcel = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet);

                console.log('Raw JSON data from Excel:', jsonData);
                console.log('First row keys:', jsonData.length > 0 ? Object.keys(jsonData[0]) : 'No data');

                // Group data by student
                const studentMap = new Map<string, ParsedStudent>();

                jsonData.forEach((row, index) => {
                    console.log(`Processing row ${index}:`, row);
                    // The student name can be in either __EMPTY_2 or _2 depending on Excel format
                    const studentName = row['__EMPTY_2'] || row['_2'] || row['child_name'];
                    console.log(`Student name found: "${studentName}"`);

                    if (!studentName || typeof studentName !== 'string') return;

                    if (!studentMap.has(studentName)) {
                        studentMap.set(studentName, {
                            name: studentName,
                            rawData: row,
                            // Extract ELC specific data from Excel
                            term_name: row['term_name'],
                            year_name: row['year_name'],
                            school_year: row['school_year'],
                            teacher_name: row['teacher_name'],
                            no_of_school_days: parseInt(row['no_of_school_days']) || 53,
                            days_present: parseInt(row['days_present']) || 48,
                            days_absent: parseInt(row['days_absent']) || 5,
                            teacher_comments: row['teacher_comments'],
                            
                            // Development assessments - Personal, Social and Emotional Development
                            relationships_term3: row['relationships_term3'],
                            self_awareness_term3: row['self_awareness_term3'],
                            managing_feelings_term3: row['managing_feelings_term3'],
                            
                            // Communication and Language
                            listening_term3: row['listening_term3'],
                            understanding_term3: row['understanding_term3'],
                            speaking_term3: row['speaking_term3'],
                            
                            // Physical Development
                            moving_handling_term3: row['moving_handling_term3'],
                            health_selfcare_term3: row['health_selfcare_term3'],
                            
                            // Literacy
                            reading_term3: row['reading_term3'],
                            writing_term3: row['writing_term3'],
                            
                            // Mathematics
                            numbers_term3: row['numbers_term3'],
                            shape_term3: row['shape_term3'],
                            
                            // Understanding the World
                            communities_term3: row['communities_term3'],
                            world_term3: row['world_term3'],
                            technology_term3: row['technology_term3'],
                            
                            // Expressive Arts and Design
                            exploring_term3: row['exploring_term3'],
                            imaginative_term3: row['imaginative_term3'],
                        });
                    }

                    console.log(`Student ${studentName} ELC data:`, studentMap.get(studentName));
                });

                const parsedStudents = Array.from(studentMap.values());
                setStudents(parsedStudents);

                // Store the students data and selected class in localStorage for access in StudentReport
                localStorage.setItem('studentsData', JSON.stringify(parsedStudents));
                localStorage.setItem('selectedClass', selectedClass);

                toast({
                    title: "Excel file parsed successfully!",
                    description: `Found ${parsedStudents.length} students with their subjects.`
                });
            } catch (error) {
                toast({
                    title: "Error parsing Excel file",
                    description: "Please make sure the file format is correct.",
                    variant: "destructive"
                });
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // Generate ELC specific report data
    const generateReportData = (student: any) => {
        return {
            studentName: student.name,
            grade: selectedClass || student.rawData?.class || "Grade 1-A",
            term: student.term_name || "Term 3",
            academicYear: student.school_year || "2024 - 2025",
            teacherName: student.teacher_name || "Class Teacher",
            attendance: {
                totalDays: student.no_of_school_days || 53,
                daysPresent: student.days_present || 48,
                daysAbsent: student.days_absent || 5
            },
            generalComment: student.teacher_comments || "",
            
            // Development assessments
            developmentAssessments: {
                // Personal, Social and Emotional Development
                relationships: student.relationships_term3 || "",
                selfAwareness: student.self_awareness_term3 || "",
                managingFeelings: student.managing_feelings_term3 || "",
                
                // Communication and Language
                listening: student.listening_term3 || "",
                understanding: student.understanding_term3 || "",
                speaking: student.speaking_term3 || "",
                
                // Physical Development
                movingHandling: student.moving_handling_term3 || "",
                healthSelfcare: student.health_selfcare_term3 || "",
                
                // Literacy
                reading: student.reading_term3 || "",
                writing: student.writing_term3 || "",
                
                // Mathematics
                numbers: student.numbers_term3 || "",
                shape: student.shape_term3 || "",
                
                // Understanding the World
                communities: student.communities_term3 || "",
                world: student.world_term3 || "",
                technology: student.technology_term3 || "",
                
                // Expressive Arts and Design
                exploring: student.exploring_term3 || "",
                imaginative: student.imaginative_term3 || ""
            }
        };
    };

    // Use the exact same PDF generation logic as StudentReport.tsx
    const generateBulkReports = async () => {
        console.log('Starting bulk upload for', students.length, 'students');

        if (students.length === 0) {
            console.log('No students found');
            return;
        }

        // Filter out students with no valid data
        const studentsWithData = students.filter(student => student.name && student.name.trim() !== '');
        console.log(`Filtered to ${studentsWithData.length} students with valid data`);

        if (studentsWithData.length === 0) {
            toast({
                title: "No students with valid data found",
                description: "Please check your Excel file format and data.",
                variant: "destructive"
            });
            return;
        }

        setIsGeneratingReports(true);

        try {
            let successCount = 0;
            let errorCount = 0;

            for (let index = 0; index < studentsWithData.length; index++) {
                const student = studentsWithData[index];
                console.log(`Processing student ${index + 1}/${studentsWithData.length}: ${student.name}`);

                try {
                    // Generate report data using the same logic as StudentReport
                    console.log('Generating report data for', student.name);
                    const reportData = generateReportData(student);
                    console.log('Report data generated:', reportData);

                    // ELC reports don't require subjects, so no need to skip
                    console.log(`Processing ELC report for ${student.name}`);

                    // Create temporary DOM elements for PDF generation (same as StudentReport)
                    console.log('Creating temporary DOM container');
                    const tempContainer = document.createElement('div');
                    tempContainer.style.position = 'absolute';
                    tempContainer.style.left = '-9999px';
                    tempContainer.style.top = '-9999px';
                    tempContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
                    document.body.appendChild(tempContainer);

                    // Create refs for each section (same as StudentReport)
                    const coverRef = { current: null };
                    const subjectsRef = { current: null };
                    const specialsRef = { current: null };
                    const shapeRef = { current: null };
                    const finalRef = { current: null };

                    // Render ReportCard component using same approach as StudentReport
                    console.log('Importing react-dom/client');
                    const { createRoot } = await import('react-dom/client');
                    const root = createRoot(tempContainer);

                    console.log('Rendering ReportCard component');
                    await new Promise<void>((resolve) => {
                        root.render(
                            <ELCReportCard
                                {...reportData}
                                pageRefs={{
                                    coverRef,
                                    subjectsRef,
                                    specialsRef,
                                    shapeRef,
                                    finalRef
                                }}
                            />
                        );
                        setTimeout(resolve, 1500); // Increased wait time for render
                    });

                    console.log('Starting PDF generation');
                    // Generate PDF using the same optimized settings as StudentReport
                    const pdf = new jsPDF({
                        orientation: 'landscape',
                        unit: 'mm',
                        format: 'a4',
                        compress: true
                    });
                    const sections = [
                        { ref: coverRef, name: 'cover' },
                        { ref: subjectsRef, name: 'subjects' },
                        { ref: specialsRef, name: 'specials' },
                        { ref: shapeRef, name: 'shape' },
                        { ref: finalRef, name: 'final' }
                    ];

                    for (let i = 0; i < sections.length; i++) {
                        const section = sections[i];
                        console.log(`Processing section ${i + 1}/${sections.length}: ${section.name}`);

                        if (section.ref.current) {
                            console.log('Generating canvas for section', section.name);
                            const canvas = await html2canvas(section.ref.current, {
                                scale: 1,
                                useCORS: true,
                                allowTaint: true,
                                backgroundColor: '#ffffff',
                                width: section.ref.current.scrollWidth,
                                height: section.ref.current.scrollHeight,
                                scrollX: 0,
                                scrollY: 0
                            });

                            // Convert to JPEG with compression
                            const imgData = canvas.toDataURL('image/jpeg', 0.8);
                            const imgWidth = 297; // A4 landscape width in mm
                            const pageHeight = 210; // A4 landscape height in mm
                            const imgHeight = (canvas.height * imgWidth) / canvas.width;

                            if (i > 0) {
                                pdf.addPage();
                            }

                            // Center the image on the page if it's smaller than A4
                            const yPosition = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;

                            pdf.addImage(imgData, 'JPEG', 0, yPosition, imgWidth, Math.min(imgHeight, pageHeight));
                            console.log(`Added section ${section.name} to PDF`);
                        } else {
                            console.warn(`Section ${section.name} ref is null`);
                        }
                    }

                    console.log('Cleaning up DOM');
                    // Clean up
                    root.unmount();
                    document.body.removeChild(tempContainer);

                    console.log('Starting upload to Supabase');

                    try {
                        // Upload to Supabase with timeout and better error handling
                        const pdfBlob = pdf.output('blob');
                        const fileName = `${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_report.pdf`;

                        console.log(`Uploading PDF blob of size: ${pdfBlob.size} bytes for ${student.name}`);

                        // Add timeout wrapper for upload
                        const uploadPromise = supabase.storage
                            .from('reports')
                            .upload(fileName, pdfBlob, {
                                cacheControl: '3600',
                                upsert: true
                            });

                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Upload timeout after 30 seconds')), 30000)
                        );

                        const { data: uploadData, error: uploadError } = await Promise.race([
                            uploadPromise,
                            timeoutPromise
                        ]) as any;

                        if (uploadError) {
                            console.error('Upload error for', student.name, uploadError);
                            errorCount++;
                            continue;
                        }

                        console.log('Upload successful, getting public URL for', student.name);
                        // Get public URL
                        const { data: { publicUrl } } = supabase.storage
                            .from('reports')
                            .getPublicUrl(fileName);

                        console.log('Public URL obtained, inserting database record for', student.name);
                        // Insert record into database with timeout
                        const dbPromise = supabase
                            .from('student_reports')
                            .insert({
                                student_name: student.name,
                                file_path: uploadData.path,
                                public_url: publicUrl,
                                class_tag: selectedClass || "Grade 3A",
                                grade_tag: "A"
                            });

                        const dbTimeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('Database timeout after 10 seconds')), 10000)
                        );

                        const { error: dbError } = await Promise.race([
                            dbPromise,
                            dbTimeoutPromise
                        ]) as any;

                        if (dbError) {
                            console.error('Database error for', student.name, dbError);
                            errorCount++;
                        } else {
                            successCount++;
                            console.log(`Successfully processed ${student.name} - Complete!`);
                        }

                    } catch (timeoutError) {
                        console.error('Timeout or network error for', student.name, timeoutError);
                        errorCount++;
                        continue;
                    }

                } catch (error) {
                    console.error('Error processing', student.name, error);
                    errorCount++;
                }
            }

            console.log(`Bulk upload completed. Success: ${successCount}, Errors: ${errorCount}`);
            toast({
                title: "Bulk upload completed!",
                description: `Successfully uploaded ${successCount} reports. ${errorCount > 0 ? `${errorCount} failed.` : ''}`
            });

        } catch (error) {
            console.error('Fatal error during bulk upload:', error);
            toast({
                title: "Error during bulk upload",
                description: "Please try again or upload reports individually.",
                variant: "destructive"
            });
        } finally {
            setIsGeneratingReports(false);
        }
    };



    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-6">Generate Report from Excel</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Select Class
                        </label>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                                {classOptions.map((classOption) => (
                                    <SelectItem key={classOption} value={classOption}>
                                        {classOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Upload Excel File
                        </label>
                        <Input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileUpload}
                            className="w-full"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                            Upload an Excel file with columns: Student Name, Subject, Subject Teacher's Name, Term Report
                        </p>
                    </div>

                    {students.length > 0 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Students from Excel File
                                </label>
                                <ELCStudentsTable students={students} />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                                <div>
                                    <h3 className="text-lg font-medium">Reports Generation</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Generate all reports using the exact /report/:studentName format, or click on individual students
                                    </p>
                                </div>
                                <Button
                                    onClick={generateBulkReports}
                                    disabled={isGeneratingReports || !selectedClass}
                                    size="lg"
                                >
                                    {isGeneratingReports ? "Generating..." : "Generate All Reports"}
                                </Button>
                                {!selectedClass && (
                                    <p className="text-sm text-muted-foreground">
                                        Please select a class to enable report generation
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Card>

        </div>
    );
}