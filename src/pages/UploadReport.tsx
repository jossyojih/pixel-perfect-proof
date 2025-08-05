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

interface ExcelRow {
  [key: string]: any; // More flexible structure to handle different Excel formats
}

interface ParsedStudent {
  name: string;
  subjects: Array<{
    name: string;
    teacher: string;
    grade: number | "N/A";
    comment: string;
  }>;
  rawData?: ExcelRow; // Optional raw Excel data for accessing teacher names
  // Additional fields for report
  Comments?: string;
  showsEffort?: string;
  worksWellWithOthers?: string;
  producesLegibleHandwriting?: string;
  demonstratesGreatCharacterTrait?: string;
  totalDays?: number;
  daysPresent?: number;
  daysAbsent?: number;
}


export default function UploadReport() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { toast } = useToast();

  const classOptions = [
    "Pregrade_A", "Grade 1A", "Grade 1B", "Grade 2A", "Grade 2B", 
    "Grade 3A", "Grade 3B", "Grade 4A", "Grade 4B", "Grade 5A", "Grade 5B"
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
          const studentName = row['__EMPTY_2'] || row['_2'];
          console.log(`Student name found: "${studentName}"`);
          
          if (!studentName || typeof studentName !== 'string') return;

          if (!studentMap.has(studentName)) {
            studentMap.set(studentName, {
              name: studentName,
              subjects: [],
              rawData: row, // Store the raw Excel row data for teacher names
              // Extract additional data from Excel using correct column names
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

          console.log(student,"Student map o")
          
          // Parse all the subjects from the row
          const subjects = [
            {
              name: 'English Language',
              teacher: row['english_language_teacher_name'] || '',
              grade: row['english_language_art'] || "N/A",
              comment: row['english_language_remark'] || ''
            },
            {
              name: 'Mathematics',
              teacher: row['math_language_teacher_name'] || '',
              grade: row['math_language_art'] || "N/A",
              comment: row['math_language_art_remark'] || ''
            },
            {
              name: 'Social Studies',
              teacher: row['social_studies_teacher_name'] || '',
              grade: row['social_studies_art'] || "N/A",
              comment: row['social_studies_remark'] || ''
            },
            {
              name: 'Science',
              teacher: row['science_teacher_name'] || '',
              grade: row['science_art'] || "N/A",
              comment: row['science_remark'] || ''
            },
            {
              name: 'Computer Studies',
              teacher: row['computer_teacher_name'] || '',
              grade: row['Computer_art'] || "N/A",
              comment: ''
            },
            {
              name: 'Hausa',
              teacher: row['hausa_teacher_name'] || '',
              grade: row['hausa_art'] || "N/A",
              comment: ''
            },
            {
              name: 'Religious Studies',
              teacher: row['religious_studies_teacher_name'] || '',
              grade: row['religious_studies_art'] || row['religious_studies_art2'] || "N/A",
              comment: ''
            },
            {
              name: 'French',
              teacher: row['french_teacher_name'] || '',
              grade: row['french_art'] || "N/A",
              comment: ''
            },
               {
              name: 'PHE',
              teacher: row['phe_teacher_name'] || '',
              grade: row['phe_art'] || "N/A",
              comment: ''
            }
          ];

          // Add subjects that have valid grades to the student
          subjects.forEach(subject => {
            if (subject.grade !== "N/A" && subject.grade !== null && subject.grade !== undefined && subject.grade !== "") {
              student.subjects.push(subject);
            }
          });
          
          console.log(`Student ${studentName} has ${student.subjects.length} subjects:`, student.subjects.map(s => s.name));
        });

        const parsedStudents = Array.from(studentMap.values());
        setStudents(parsedStudents);
        
        // Store the students data in localStorage for access in StudentReport
        localStorage.setItem('studentsData', JSON.stringify(parsedStudents));
        
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

  // Use the exact same data processing logic as StudentReport.tsx
  const generateReportData = (student: any) => {
    // Separate main subjects from specials (include Science in specials)
    const mainSubjects = student.subjects.filter((subject: any) => 
      !['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'Science', 'PHE'].includes(subject.name)
    );
    
    const specialSubjects = student.subjects.filter((subject: any) => 
      ['Computer Studies', 'Hausa', 'Religious Studies', 'French',"PHE"].includes(subject.name)
    );

    // Get Science subject for specials page
    const scienceSubject = student.subjects.filter((subject: any) => 
      subject.name === 'Science'
    );

    // // Only add Physical Education if not already in the subjects data
    // const hasPhysicalEducation = specialSubjects.some((subject: any) => 
    //   subject.name.toLowerCase().includes('physical') || subject.name.toLowerCase().includes('pe')
    //   || subject.name.toLowerCase().includes('PHE')
    // );

    // const additionalSpecials = [];
    // if (!hasPhysicalEducation) {
    //   additionalSpecials.push({ 
    //     name: "Physical Education", 
    //     grade: 88, 
    //     teacher: "Geoffrey Nushu Gabriel" 
    //   });
    // }

    return {
      studentName: student.name,
      grade: "Grade 3-A",
      term: "First Term",
      academicYear: "2023/2024",
      subjects: mainSubjects,
      specials: specialSubjects,
      scienceSubject: scienceSubject[0] || null, // Pass science subject separately
      workHabits: [
        { trait: "Shows Effort", rating: student.showsEffort || "Outstanding" },
        { trait: "Works well with others", rating: student.worksWellWithOthers || "Satisfactory" },
        { trait: "Produces legible handwriting", rating: student.producesLegibleHandwriting || "Outstanding" },
        { trait: "Demonstrates great character trait", rating: student.demonstratesGreatCharacterTrait || "Satisfactory" }
      ],
      generalComment: student.Comments || student.comments,
      mathLanguageArt: student.rawData?.['math_language_teacher_name'] || "Math Teacher",
      englishLanguageArtTeacherName: student.rawData?.['english_language_teacher_name'] || "English Teacher",
      attendance: {
        totalDays: student.totalDays || 53,
        daysPresent: student.daysPresent || 53,
        daysAbsent: student.daysAbsent || (student.totalDays && student.daysPresent ? student.totalDays - student.daysPresent : 0)
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
    
    // Filter out students with no subjects
    const studentsWithSubjects = students.filter(student => student.subjects.length > 0);
    console.log(`Filtered to ${studentsWithSubjects.length} students with subjects`);
    
    if (studentsWithSubjects.length === 0) {
      toast({
        title: "No students with valid subjects found",
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
        console.log(`Processing student ${index + 1}/${studentsWithSubjects.length}: ${student.name}`);
        
        try {
          // Generate report data using the same logic as StudentReport
          console.log('Generating report data for', student.name);
          const reportData = generateReportData(student);
          console.log('Report data generated:', reportData);
          
          // Skip students with no main subjects to avoid empty reports
          if (reportData.subjects.length === 0) {
            console.log(`Skipping ${student.name} - no main subjects`);
            continue;
          }
          
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
          const finalRef = { current: null };
          
          // Render ReportCard component using same approach as StudentReport
          console.log('Importing react-dom/client');
          const { createRoot } = await import('react-dom/client');
          const root = createRoot(tempContainer);
          
          console.log('Rendering ReportCard component');
          await new Promise<void>((resolve) => {
            root.render(
              <ReportCard 
                {...reportData}
                pageRefs={{
                  coverRef,
                  subjectsRef,
                  specialsRef,
                  finalRef
                }}
              />
            );
            setTimeout(resolve, 1500); // Increased wait time for render
          });
          
          console.log('Starting PDF generation');
          // Generate PDF using the exact same logic as StudentReport
          const pdf = new jsPDF('p', 'mm', 'a4');
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
                backgroundColor: '#ffffff'
              });
              
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              if (i > 0) {
                pdf.addPage();
              }
              
              pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
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
                <StudentsTable students={students} />
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