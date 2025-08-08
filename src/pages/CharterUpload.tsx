import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CharterStudentsTable } from "@/components/CharterStudentsTable";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { CharterReportCard } from "@/components/CharterReportCard";
import { useSubjectConfig } from "@/hooks/useSubjectConfig";
import { SubjectConfigManager } from "@/components/SubjectConfigManager";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
import * as XLSX from 'xlsx';

interface ExcelRow {
    [key: string]: any;
}

interface ParsedStudent {
    name: string;
    subjects: Array<{
        name: string;
        teacher: string;
        grade: number | "N/A";
        comment: string;
        ca1?: number;
        ca2?: number;
        ca3?: number;
        ca4?: number;
        exam?: number;
        totalScore?: number;
        gradeValue?: string;
        position?: number;
        cssAverage?: number;
    }>;
    rawData?: ExcelRow;
    Comments?: string;
    showsEffort?: string;
    worksWellWithOthers?: string;
    producesLegibleHandwriting?: string;
    demonstratesGreatCharacterTrait?: string;
    totalDays?: number;
    daysPresent?: number;
    daysAbsent?: number;
}

export default function CharterUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [students, setStudents] = useState<ParsedStudent[]>([]);
    const [isGeneratingReports, setIsGeneratingReports] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [detectedSubjects, setDetectedSubjects] = useState<string[]>([]);
    const { toast } = useToast();
    const { subjects, loading: subjectsLoading, fetchSubjects, detectSubjectsFromExcel, addDynamicSubject } = useSubjectConfig(selectedClass);

    // Helper function to extract base grade level from class names
    const getBaseGradeLevel = (className: string): string => {
        if (className.startsWith('JSS 2')) return 'JSS 2';
        if (className.startsWith('JSS 3')) return 'JSS 3';
        if (className.startsWith('SSS 1')) return 'SSS 1';
        if (className.startsWith('SSS 2')) return 'SSS 2';
        return className; // For Year 7 and other base classes
    };

    // Charter-specific class options with A/B divisions
    const charterClassOptions = [
        "Grade 7 A", "Grade 7 B", "Grade 8 A", "Grade 8 B", "Grade 9 B", "Grade 9 B", "Grade 10 A",  "Grade 10 B", "Grade 11 A", "Grade 11 B", "Grade 12 A",  "Grade 12 B"
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

                console.log('\n=== EXCEL PARSING DEBUG ===');
                console.log('Raw JSON data from Excel:', jsonData);
                console.log('Total rows:', jsonData.length);
                console.log('First row keys:', jsonData.length > 0 ? Object.keys(jsonData[0]) : 'No data');

                // Get all Excel headers for comprehensive analysis
                const excelHeaders = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
                console.log('All Excel headers:', excelHeaders);
                console.log('Total headers:', excelHeaders.length);

                // Enhanced subject detection - find all potential subject headers
                const subjectPatterns = [
                    'total_score', 'grade', 'exam', '_ca', 'mathematics', 'english',
                    'global_perspectives', 'basic_science', 'digital_literacy', 'french',
                    'arabic', 'religion', 'human_geo', 'human_hstry', 'music', 'phe',
                    'arts_design', 'hausa'
                ];

                const detectedSubjectHeaders = excelHeaders.filter(header => {
                    const lowerHeader = header.toLowerCase();
                    return subjectPatterns.some(pattern => lowerHeader.includes(pattern));
                });
                console.log('Headers matching subject patterns:', detectedSubjectHeaders);

                // Use the hook's detection method as well with base grade level
                const baseGradeLevel = getBaseGradeLevel(selectedClass);
                const detected = detectSubjectsFromExcel(excelHeaders, baseGradeLevel);
                console.log('Hook detected subjects:', detected);

                // Combine both detection methods
                const allDetectedSubjects = [...new Set([...detectedSubjectHeaders, ...detected])];
                console.log('Final combined detected subjects:', allDetectedSubjects);
                setDetectedSubjects(allDetectedSubjects);

                // Group data by student
                const studentMap = new Map<string, ParsedStudent>();

                jsonData.forEach((row, index) => {
                    console.log(`Processing row ${index}:`, row);
                    console.log('Available Excel fields:', Object.keys(row));

                    const studentName = row['__EMPTY_2'] || row['_2'];
                    console.log(`Student name found: "${studentName}"`);

                    if (!studentName || typeof studentName !== 'string') return;

                    if (!studentMap.has(studentName)) {
                        // Log potential student ID fields
                        console.log('Potential student ID fields:', {
                            roll_id: row['__EMPTY'] || row['_1'],
                            student_id: row['student_id'],
                            roll_no: row['roll_no'],
                            id: row['id'],
                            empty_1: row['__EMPTY_1'],
                            registration_no: row['registration_no']
                        });

                        // Log potential class/term fields
                        console.log('Potential class/term fields:', {
                            term: row['term'],
                            class: row['class'],
                            grade: row['grade'],
                            position: row['position'],
                            position_in_class: row['position_in_class'],
                            no_in_class: row['no_in_class'],
                            class_size: row['class_size'],
                            total_students: row['total_students']
                        });

                        studentMap.set(studentName, {
                            name: studentName,
                            subjects: [],
                            rawData: row,
                            Comments: row['teacher_comments'],
                            showsEffort: row['shows_effort_remarks'],
                            worksWellWithOthers: row['works_with_remarks'],
                            producesLegibleHandwriting: row['produces_legible_remarks'],
                            demonstratesGreatCharacterTrait: row['demonstrates_great_remarks'],
                            totalDays: parseInt(row['no_of_school_days']) || 53,
                            daysPresent: parseInt(row['days_present']) || 48,
                            daysAbsent: parseInt(row['days_absent']) || 5
                        });
                    }

                    const student = studentMap.get(studentName)!;

                    // Dynamic subject mapping based on class level
                    const getSubjectMappings = (classLevel: string) => {
                        const baseGrade = getBaseGradeLevel(classLevel);
                        if (baseGrade === 'JSS 2') {
                            return {
                                'mathematics': ['Mathematics'],
                                'english': ['English'],
                                'basic_science': ['Basic Science'],
                                'basic_technology': ['Basic Technology'],
                                'agricultural_science': ['Agricultural Science'],
                                'home_economics': ['Home Economics'],
                                'history': ['History'],
                                'music': ['Music'],
                                'civic_education': ['Civic Education'],
                                'social_studies': ['Social Studies'],
                                'french': ['French'],
                                'hausa': ['Hausa'],
                                'business_students': ['Business Studies'], // Fixed: raw data uses "business_students"
                                'cultural_creative': ['Cultural And Creative Art (CCA)'], // Fixed: raw data uses "cultural_creative"
                                'religion': ['Religion (IRS)'],
                                'religion_crs': ['Religion (CRS)'],
                                'physical_health': ['Physical And Health Education (PHE)'], // Fixed: raw data uses "physical_health"
                                'computer_studies': ['Computer Studies'],
                                'arabic_studies': ['Arabic Studies'],
                                'arabic': ['Arabic'],
                                'igbo': ['Igbo'],
                                'yoruba': ['Yoruba']
                            };
                        }

                        if (baseGrade === 'JSS 3') {
                            return {
                                'mathematics': ['Mathematics'],
                                'english': ['English'],
                                'basic_science': ['Basic Science'],
                                'basic_technology': ['Basic Technology'],
                                'agricultural_science': ['Agricultural Science'],
                                'home_economics': ['Home Economics'],
                                'history': ['History'],
                                'music': ['Music'],
                                'civic_education': ['Civic Education'],
                                'social_studies': ['Social Studies'],
                                'french': ['French'],
                                'hausa': ['Hausa'],
                                'business_students': ['Business Studies'],
                                'cultural_creative': ['Cultural And Creative Art (CCA)'],
                                'religion': ['Religion (IRS)'],
                                'religion_crs': ['Religion (CRS)'],
                                'physical_health': ['Physical And Health Education (PHE)'],
                                'computer_studies': ['Computer Studies'],
                                'arabic_studies': ['Arabic Studies'],
                                'arabic': ['Arabic'],
                                'igbo': ['Igbo'],
                                'yoruba': ['Yoruba']
                            };
                        }

                        if (baseGrade === 'SSS 1' || baseGrade === 'SSS 2') {
                            return {
                                'english_lan': ['English Language'],
                                'mathematics': ['Mathematics'],
                                'civic_education': ['Civic Education'],
                                'marketing': ['Marketing'],
                                'physics': ['Physics'],
                                'computer_stud': ['Computer Studies'],
                                'chemistry': ['Chemistry'],
                                'biology': ['Biology'],
                                'agriculture': ['Agriculture'],
                                'further_mathematics': ['Further Mathematics'],
                                'government': ['Government'],
                                'economics': ['Economics'],
                                'religion_crs': ['Religion (CRS)'],
                                'religion_irs': ['Religion (IRS)'],
                                'geography': ['Geography'],
                                'commerce': ['Commerce'],
                                'financial_accounting': ['Financial Accounting'],
                                'fin_acco': ['Financial Accounting'],
                                'literature_in_english': ['Literature in English'],
                                'literature_english': ['Literature in English'],
                                'hausa': ['Hausa'],
                                'french': ['French'],
                                'food_and_nutrition': ['Food and Nutrition'],
                                'food_nutrition': ['Food and Nutrition'],
                                'food_nut': ['Food and Nutrition'],
                                'technical_drawing': ['Technical Drawing'],
                                'tech_drawing': ['Technical Drawing'],
                                'visual_art': ['Visual Art'],
                                'history': ['History'],
                                'data_processing': ['Data Processing'],
                                'Arabic_Studies': ['Arabic Studies'], // Capital format as in Excel
                                'arabic_studies': ['Arabic Studies']
                            };
                        }

                        // Default for Year 7 and other classes
                        return {
                            'mathematics': ['Mathematics'],
                            'english': ['English'],
                            'global_perspectives': ['Global Perspectives'],
                            'basic_science': ['Basic Science'],
                            'digital_literacy': ['Digital Literacy'],
                            'french': ['French'],
                            'arabic': ['Arabic'],
                            'religion': ['Religion (IRS)'],
                            'religion_crs': ['Religion (CRS)'],
                            'human_geo': ['Humanities-Geography'],
                            'human_hstry': ['Humanities-History'],
                            'music': ['Music'],
                            'physical_health': ['Physical And Health Education (PHE)'],
                            'visual_arts': ['Arts and Design'],
                            'hausa': ['Hausa']
                        };
                    };

                    const subjectMappings = getSubjectMappings(selectedClass);

                    // Define which subjects are optional (need visibility check) based on class
                    const getOptionalSubjects = (classLevel: string) => {
                        const baseGrade = getBaseGradeLevel(classLevel);
                        if (baseGrade === 'JSS 2') {
                            return ['french', 'religion_crs', 'hausa', 'arabic_studies', 'arabic', 'igbo', 'yoruba'];
                        }
                        if (baseGrade === 'JSS 3') {
                            return ['french', 'religion_crs', 'hausa', 'arabic_studies', 'arabic', 'igbo', 'yoruba'];
                        }
                        if (baseGrade === 'SSS 1' || baseGrade === 'SSS 2') {
                            return [
                                'hausa', 'french', 'food_nutrition', 'food_nut', 'tech_drawing', 'technical_drawing',
                                'visual_art', 'history', 'data_processing', 'arabic_studies', 'Arabic_Studies',
                                'geography', 'government', 'literature_in_english', 'literature_english',
                                'commerce', 'fin_acco', 'financial_accounting', 'agriculture', 'religion_crs', 'religion_irs'
                            ];
                        }
                        return ['french', 'religion_crs', 'hausa'];
                    };

                    const optionalSubjects = getOptionalSubjects(selectedClass);

                    console.log('Processing student:', studentName, 'with subject mappings:', Object.keys(subjectMappings));

                    // Process subjects dynamically
                    Object.entries(subjectMappings).forEach(([key, possibleNames]) => {
                        const totalScoreKey = `${key}_total_score`;
                        const remarkKey = `${key}_remark`;
                        const ca1Key = `${key}_ca_one`;
                        const ca2Key = `${key}_ca_two`;
                        const ca3Key = `${key}_ca_three`;
                        const ca4Key = `${key}_ca_four`;
                        const examKey = `${key}_exam`;
                        const gradeKey = `${key}_grade`;
                        const positionKey = `${key}_position`;
                        const averageKey = `${key}_css_average`;
                        const visibleKey = `${key}_visible`;

                        const totalScore = row[totalScoreKey];
                        const hasValidScore = totalScore && totalScore !== "N/A" && totalScore !== null && totalScore !== undefined && totalScore !== "";

                        // Check if this is an optional subject that needs visibility check
                        const isOptionalSubject = optionalSubjects.includes(key);
                        const isVisible = row[visibleKey] === "Y";

                        // For core subjects: include if has valid score
                        // For optional subjects: include if visible="Y" AND has valid score, OR if no visibility field exists but has valid score
                        const hasVisibilityField = row[visibleKey] !== undefined;
                        const shouldInclude = isOptionalSubject ?
                            (hasVisibilityField ? (isVisible && hasValidScore) : hasValidScore) :
                            hasValidScore;

                        console.log(`Subject ${key} processing:`, {
                            totalScoreKey,
                            totalScore,
                            visibleKey,
                            isVisible: row[visibleKey],
                            hasValidScore,
                            isOptionalSubject,
                            shouldInclude
                        });

                        if (shouldInclude) {
                            // Find the best matching subject name from configuration
                            const configuredSubject = subjects.find(s =>
                                possibleNames.some(name =>
                                    s.subject_name.toLowerCase().includes(name.toLowerCase()) ||
                                    name.toLowerCase().includes(s.subject_name.toLowerCase())
                                )
                            );

                            const subjectName = configuredSubject?.subject_name || possibleNames[0];

                            student.subjects.push({
                                name: subjectName,
                                teacher: '',
                                grade: totalScore || "N/A",
                                comment: row[remarkKey] || '',
                                ca1: row[ca1Key],
                                ca2: row[ca2Key],
                                ca3: row[ca3Key],
                                ca4: row[ca4Key],
                                exam: row[examKey],
                                totalScore: totalScore,
                                gradeValue: row[gradeKey],
                                position: row[positionKey],
                                cssAverage: row[averageKey]
                            });
                        }
                    });

                    console.log(`Student ${studentName} has ${student.subjects.length} subjects:`, student.subjects.map(s => s.name));

                    // Detailed subject debugging for JSS 2 students
                    if (selectedClass === 'JSS 2') {
                        const expectedSubjects = Object.keys(subjectMappings);
                        const missingSubjects = expectedSubjects.filter(key =>
                            !student.subjects.some(s => {
                                const mappedNames = subjectMappings[key as keyof typeof subjectMappings];
                                return mappedNames.some(name =>
                                    s.name.toLowerCase().includes(name.toLowerCase()) ||
                                    name.toLowerCase().includes(s.name.toLowerCase())
                                );
                            })
                        );
                        console.log(`JSS 2 Student ${studentName} missing subjects:`, missingSubjects);

                        // Check what scores are available in raw data for missing subjects
                        missingSubjects.forEach(subjectKey => {
                            const totalScoreKey = `${subjectKey}_total_score`;
                            const visibleKey = `${subjectKey}_visible`;
                            console.log(`Missing subject ${subjectKey}: score=${row[totalScoreKey]}, visible=${row[visibleKey]}`);
                        });
                    }
                });

                const parsedStudents = Array.from(studentMap.values());

                console.log('\n=== PARSING RESULTS ===');
                console.log('Total students parsed:', parsedStudents.length);

                // Debug specific student if found
                const abdallah = parsedStudents.find(s => s.name.toLowerCase().includes('abdallah'));
                if (abdallah) {
                    console.log('\n=== ABDALLAH MOHAMMED DEBUG ===');
                    console.log('Name:', abdallah.name);
                    console.log('Total subjects:', abdallah.subjects.length);
                    console.log('Subject names:', abdallah.subjects.map(s => s.name));
                    console.log('Raw data keys:', Object.keys(abdallah.rawData || {}));

                    // Check for any missed subjects in raw data
                    const rawData = abdallah.rawData || {};
                    const potentialMissedSubjects: string[] = [];
                    Object.keys(rawData).forEach(key => {
                        if (key.includes('_total_score') && !abdallah.subjects.some(s => key.startsWith(s.name.toLowerCase().replace(/\s+/g, '_')))) {
                            potentialMissedSubjects.push(key);
                        }
                    });
                    console.log('Potentially missed subjects for Abdallah:', potentialMissedSubjects);
                }

                setStudents(parsedStudents);

                // Store the Charter students data and selected class in localStorage for access in CharterReport
                localStorage.setItem('charterStudentsData', JSON.stringify(parsedStudents));
                localStorage.setItem('selectedCharterClass', selectedClass);
                localStorage.setItem('detectedCharterSubjects', JSON.stringify(allDetectedSubjects));

                toast({
                    title: "Excel file parsed successfully!",
                    description: `Found ${parsedStudents.length} Charter students with ${allDetectedSubjects.length} detected subjects.`
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

    const generateReportData = (student: any) => {
        // Convert subjects to Charter format using actual Excel data
        const charterSubjects = student.subjects.map((subject: any) => {
            return {
                name: subject.name,
                ca1: subject.ca1 || 0,
                ca2: subject.ca2 || 0,
                ca3: subject.ca3 || 0,
                ca4: subject.ca4 || 0,
                exam: subject.exam || 0,
                total: subject.totalScore || 0,
                grade: subject.gradeValue || 'F9',
                position: subject.position || 0,
                remark: subject.comment || 'No remark',
                teachersAverage: subject.cssAverage || 0
            };
        });

        // Get basic student info from raw data
        const rawData = student.rawData || {};



        return {
            studentId: rawData['__EMPTY_1'] || `STU${Math.floor(Math.random() * 10000)}`,
            studentName: student.name,
            class: selectedClass || "Year 7",
            academicYear: rawData['academic_year'] || "2024/2025",
            positionInClass: rawData['position_class'] || 1,
            noInClass: rawData['no_in_class'] || 15,
            term: rawData['term_name'] || "Term 3",
            totalSubjects: rawData['total_subject'] || charterSubjects.length,
            subjects: charterSubjects,
            cumulativeScore: rawData["cumulative_score"],
            cutOffAverage: rawData["cut_of_average"],
            studentsAverage: rawData["student_average"],
            personalTutorComment: rawData["teacher_comment"] || "The student demonstrates good academic progress."
        };
    };

    const generateBulkReports = async () => {
        console.log('Starting Charter bulk upload for', students.length, 'students');

        if (students.length === 0) {
            console.log('No students found');
            return;
        }

        const studentsWithSubjects = students.filter(student => student.subjects.length > 0);
        console.log(`Filtered to ${studentsWithSubjects.length} Charter students with subjects`);

        if (studentsWithSubjects.length === 0) {
            toast({
                title: "No Charter students with valid subjects found",
                description: "Please check your Excel file format and data.",
                variant: "destructive"
            });
            return;
        }

        setIsGeneratingReports(true);

        try {
            let successCount = 0;
            let errorCount = 0;

            for (let index = 0; index < studentsWithSubjects.length; index++) {
                const student = studentsWithSubjects[index];
                console.log(`Processing Charter student ${index + 1}/${studentsWithSubjects.length}: ${student.name}`);

                try {
                    console.log('Generating report data for', student.name);
                    const reportData = generateReportData(student);
                    console.log('Report data generated:', reportData);

                    if (reportData.subjects.length === 0) {
                        console.log(`Skipping ${student.name} - no main subjects`);
                        continue;
                    }

                    console.log('Creating temporary DOM container');
                    const tempContainer = document.createElement('div');
                    tempContainer.style.position = 'absolute';
                    tempContainer.style.left = '-9999px';
                    tempContainer.style.top = '-9999px';
                    tempContainer.style.width = '794px';
                    document.body.appendChild(tempContainer);

                    const coverRef = { current: null };
                    const subjectsRef = { current: null };
                    const specialsRef = { current: null };
                    const finalRef = { current: null };

                    console.log('Importing react-dom/client');
                    const { createRoot } = await import('react-dom/client');
                    const root = createRoot(tempContainer);

                    console.log('Rendering CharterReportCard component');
                    await new Promise<void>((resolve) => {
                        const reshapedData = {
                            name: reportData.studentName,
                            grade: reportData.class,
                            academicYear: reportData.academicYear,
                            term: reportData.term,
                            date: new Date().toLocaleDateString(), // or reportData.date
                            subjects: reportData.subjects,
                            average: reportData.studentsAverage,
                            attendance: {
                                unexpectedAbsence: 0,
                                explainedAbsence: 0,
                                late: 0,
                            },
                            remarks: {
                                interpersonal: "",
                                effort: "",
                                classBehaviour: "", // ✅ Required field added
                            },
                            comment: reportData.personalTutorComment || "",
                        };

                        root.render(<CharterReportCard {...reshapedData} />);
                        setTimeout(resolve, 1500);
                    });

                    console.log('Starting PDF generation');
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4',
                        compress: true
                    });
                    const sections = [
                        { ref: coverRef, name: 'cover' },
                        { ref: subjectsRef, name: 'subjects' },
                        { ref: specialsRef, name: 'specials' },
                        { ref: finalRef, name: 'final' }
                    ];

                    for (let i = 0; i < sections.length; i++) {
                        const section = sections[i];
                        console.log(`Processing section ${i + 1}/${sections.length}: ${section.name}`);

                        if (section.ref.current) {
                            console.log('Generating canvas for section', section.name);
                            const canvas = await html2canvas(section.ref.current, {
                                scale: 2,
                                useCORS: true,
                                allowTaint: true,
                                backgroundColor: '#ffffff',
                                width: section.ref.current.scrollWidth,
                                height: section.ref.current.scrollHeight,
                                scrollX: 0,
                                scrollY: -window.scrollY
                            });

                            const imgData = canvas.toDataURL('image/jpeg', 1.0);
                            const imgWidth = 210; // A4 width in mm
                            const pageHeight = 297;
                            const imgHeight = (canvas.height * imgWidth) / canvas.width;

                            if (i > 0) {
                                pdf.addPage();
                            }

                            const yPosition = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;
                            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));

                            console.log(`Added section ${section.name} to PDF`);
                        } else {
                            console.warn(`Section ${section.name} ref is null`);
                        }
                    }

                    console.log('Cleaning up DOM');
                    root.unmount();
                    document.body.removeChild(tempContainer);

                    console.log('Starting upload to Supabase');

                    try {
                        const pdfBlob = pdf.output('blob');
                        const fileName = `charter_${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_report.pdf`;

                        console.log(`Uploading Charter PDF blob of size: ${pdfBlob.size} bytes for ${student.name}`);

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
                        const { data: { publicUrl } } = supabase.storage
                            .from('reports')
                            .getPublicUrl(fileName);

                        console.log('Public URL obtained, inserting database record for', student.name);
                        const dbPromise = supabase
                            .from('student_reports')
                            .insert({
                                student_name: student.name,
                                file_path: uploadData.path,
                                public_url: publicUrl,
                                class_tag: selectedClass || "Year 7",
                                grade_tag: "Charter"
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
                            console.log(`Successfully processed Charter student ${student.name}`);
                            successCount++;
                        }
                    } catch (uploadError) {
                        console.error('Error in upload/database operations for', student.name, uploadError);
                        errorCount++;
                    }
                } catch (studentError) {
                    console.error('Error processing Charter student', student.name, studentError);
                    errorCount++;
                }

                // Add a small delay between students to prevent overwhelming the system
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            toast({
                title: "Charter bulk upload completed!",
                description: `Successfully processed ${successCount} students. ${errorCount} errors.`,
            });

        } catch (error) {
            console.error('Error in Charter bulk generation:', error);
            toast({
                title: "Error generating Charter reports",
                description: "An error occurred during bulk generation.",
                variant: "destructive"
            });
        } finally {
            setIsGeneratingReports(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Charter Report Upload</h1>
                    <p className="text-muted-foreground">Upload Excel files and generate reports for Charter students (Year 7, JSS 2, SSS 1, SSS 2)</p>
                </div>

                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Select Charter Class</label>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose Charter class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {charterClassOptions.map((classOption) => (
                                        <SelectItem key={classOption} value={classOption}>
                                            {classOption}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Upload Excel File</label>
                            <Input
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileUpload}
                                className="mb-4"
                            />
                        </div>

                        {/* Subject Configuration */}
                        {selectedClass && subjects.length > 0 && (
                            <SubjectConfigManager
                                gradeLevel={selectedClass}
                                detectedSubjects={detectedSubjects}
                            />
                        )}

                        {students.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Charter Students Found: {students.length}</h3>
                                <CharterStudentsTable students={students} />

                                <div className="flex gap-4">
                                    <Button
                                        onClick={generateBulkReports}
                                        disabled={isGeneratingReports || !selectedClass}
                                        className="flex-1"
                                    >
                                        {isGeneratingReports ? "Generating Charter Reports..." : "Generate All Charter Reports"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
