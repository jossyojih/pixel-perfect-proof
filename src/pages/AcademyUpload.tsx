import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AcademyStudentsTable } from "@/components/AcademyStudentsTable";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { AcademyReportCard } from "@/components/AcademyReportCard";
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

export default function AcademyUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { toast } = useToast();

  // Academy-specific class options
  const academyClassOptions = [
    "Year 7", "JSS 2", "SSS 1", "SSS 2"
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
          const studentName = row['__EMPTY_2'] || row['_2'];
          console.log(`Student name found: "${studentName}"`);
          
          if (!studentName || typeof studentName !== 'string') return;

          if (!studentMap.has(studentName)) {
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

          // Academy-specific subjects (adjust based on your Excel template)
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
        
        // Store the Academy students data and selected class in localStorage for access in AcademyReport
        localStorage.setItem('academyStudentsData', JSON.stringify(parsedStudents));
        localStorage.setItem('selectedAcademyClass', selectedClass);
        
        toast({
          title: "Excel file parsed successfully!",
          description: `Found ${parsedStudents.length} Academy students with their subjects.`
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
    const mainSubjects = student.subjects.filter((subject: any) => 
      !['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'Science', 'PHE'].includes(subject.name)
    );
    
    const specialSubjects = student.subjects.filter((subject: any) => 
      ['Computer Studies', 'Hausa', 'Religious Studies', 'French',"PHE"].includes(subject.name)
    );

    const scienceSubject = student.subjects.filter((subject: any) => 
      subject.name === 'Science'
    );

    return {
      studentName: student.name,
      grade: selectedClass || "Year 7",
      term: "First Term",
      academicYear: "2023/2024",
      subjects: mainSubjects,
      specials: specialSubjects,
      scienceSubject: scienceSubject[0] || null,
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

  const generateBulkReports = async () => {
    console.log('Starting Academy bulk upload for', students.length, 'students');
    
    if (students.length === 0) {
      console.log('No students found');
      return;
    }
    
    const studentsWithSubjects = students.filter(student => student.subjects.length > 0);
    console.log(`Filtered to ${studentsWithSubjects.length} Academy students with subjects`);
    
    if (studentsWithSubjects.length === 0) {
      toast({
        title: "No Academy students with valid subjects found",
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
        console.log(`Processing Academy student ${index + 1}/${studentsWithSubjects.length}: ${student.name}`);
        
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
          
          console.log('Rendering AcademyReportCard component');
          await new Promise<void>((resolve) => {
            root.render(
              <AcademyReportCard 
                {...reportData}
                pageRefs={{
                  coverRef,
                  subjectsRef,
                  specialsRef,
                  finalRef
                }}
              />
            );
            setTimeout(resolve, 1500);
          });
          
          console.log('Starting PDF generation');
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
              
              const imgData = canvas.toDataURL('image/jpeg', 0.8);
              const imgWidth = 297;
              const pageHeight = 210;
              const imgHeight = (canvas.height * imgWidth) / canvas.width;
              
              if (i > 0) {
                pdf.addPage();
              }
              
              const yPosition = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;
              pdf.addImage(imgData, 'JPEG', 0, yPosition, imgWidth, Math.min(imgHeight, pageHeight));
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
            const fileName = `academy_${student.name.replace(/[^a-zA-Z0-9]/g, '_')}_report.pdf`;
            
            console.log(`Uploading Academy PDF blob of size: ${pdfBlob.size} bytes for ${student.name}`);
            
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
                grade_tag: "Academy"
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
              console.log(`Successfully processed Academy student ${student.name}`);
              successCount++;
            }
          } catch (uploadError) {
            console.error('Error in upload/database operations for', student.name, uploadError);
            errorCount++;
          }
        } catch (studentError) {
          console.error('Error processing Academy student', student.name, studentError);
          errorCount++;
        }
        
        // Add a small delay between students to prevent overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      toast({
        title: "Academy bulk upload completed!",
        description: `Successfully processed ${successCount} students. ${errorCount} errors.`,
      });
      
    } catch (error) {
      console.error('Error in Academy bulk generation:', error);
      toast({
        title: "Error generating Academy reports",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Academy Report Upload</h1>
          <p className="text-muted-foreground">Upload Excel files and generate reports for Academy students (Year 7, JSS 2, SSS 1, SSS 2)</p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Academy Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Academy class" />
                </SelectTrigger>
                <SelectContent>
                  {academyClassOptions.map((classOption) => (
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

            {students.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academy Students Found: {students.length}</h3>
                <AcademyStudentsTable students={students} />
                
                <div className="flex gap-4">
                  <Button 
                    onClick={generateBulkReports}
                    disabled={isGeneratingReports || !selectedClass}
                    className="flex-1"
                  >
                    {isGeneratingReports ? "Generating Academy Reports..." : "Generate All Academy Reports"}
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