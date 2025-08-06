import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AcademyStudentsTable } from "@/components/AcademyStudentsTable";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { AcademyReportCard } from "@/components/AcademyReportCard";
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

export default function AcademyUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [detectedSubjects, setDetectedSubjects] = useState<string[]>([]);
  const { toast } = useToast();
  const { subjects, loading: subjectsLoading, fetchSubjects, detectSubjectsFromExcel, addDynamicSubject } = useSubjectConfig(selectedClass);

  // Academy-specific class options
  const academyClassOptions = [
    "Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", 
    "JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"
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

        // Detect subjects from Excel headers
        const excelHeaders = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
        const detected = detectSubjectsFromExcel(excelHeaders, selectedClass);
        setDetectedSubjects(detected);

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

          // Dynamic subject mapping based on database configuration
          const subjectMappings = {
            'mathematics': ['Mathematics', 'Maths'],
            'english': ['English', 'English Language'],
            'global_perspectives': ['Global Perspectives'],
            'basic_science': ['Science', 'Basic Science'],
            'digital_literacy': ['Digital Literacy', 'Computer Science'],
            'french': ['French'],
            'arabic': ['Arabic'],
            'religion': ['Religion IRS', 'Islamic Religious Studies'],
            'religion_crs': ['Religion CRS', 'Christian Religious Studies'],
            'human_geo': ['Humanities-Geography', 'Geography'],
            'human_hstry': ['Humanities-History', 'History'],
            'music': ['Music'],
            'phe': ['Physical And Health Education (PHE)', 'Physical Education'],
            'arts_design': ['Arts and Design', 'Art'],
            'hausa': ['Hausa']
          };

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
            const isVisible = row[visibleKey] === undefined || row[visibleKey] === "Y";
            const hasValidScore = totalScore && totalScore !== "N/A" && totalScore !== null && totalScore !== undefined && totalScore !== "";

            if (isVisible && hasValidScore) {
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
    // Convert subjects to Academy format using actual Excel data
    const academySubjects = student.subjects.map((subject: any) => {
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
      studentId:rawData['__EMPTY_1'] || `STU${Math.floor(Math.random() * 10000)}`,
      studentName: student.name,
      class: selectedClass || "Year 7",
      academicYear: rawData['academic_year'] || "2024/2025",
      positionInClass: rawData['position_class'] || 1,
      noInClass: rawData['no_in_class'] || 15,
      term: rawData['term_name'] || "Term 3",
      totalSubjects: rawData['total_subject'] || academySubjects.length,
      subjects: academySubjects,
      cumulativeScore: rawData["cumulative_score"],
      cutOffAverage: rawData["cut_of_average"],
      studentsAverage: rawData["student_average"],
      personalTutorComment: rawData["teacher_comment"] || "The student demonstrates good academic progress."
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
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: section.ref.current.scrollWidth,
                height: section.ref.current.scrollHeight,
                scrollX: 0,
                scrollY: 0
              });
              
              const imgData = canvas.toDataURL('image/png');
              const imgWidth = 210; // A4 width in mm
              const pageHeight = 297;
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

            {/* Subject Configuration */}
            {selectedClass && subjects.length > 0 && (
              <SubjectConfigManager 
                gradeLevel={selectedClass} 
                detectedSubjects={detectedSubjects}
              />
            )}

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