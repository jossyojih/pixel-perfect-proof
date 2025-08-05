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

          // Academy-specific subjects based on actual Excel data structure
          const subjects = [
            {
              name: 'Mathematics',
              teacher: '',
              grade: row['mathematics_total_score'] || "N/A",
              comment: row['mathematics_remark'] || '',
              ca1: row['mathematics_ca_one'],
              ca2: row['mathematics_ca_two'],
              ca3: row['mathematics_ca_three'],
              ca4: row['mathematics_ca_four'],
              exam: row['mathematics_exam'],
              totalScore: row['mathematics_total_score'],
              gradeValue: row['mathematics_grade'],
              position: row['mathematics_position'],
              cssAverage: row['mathematics_css_average']
            },
            {
              name: 'English',
              teacher: '',
              grade: row['english_total_score'] || "N/A",
              comment: row['english_remark'] || '',
              ca1: row['english_ca_one'],
              ca2: row['english_ca_two'],
              ca3: row['english_ca_three'],
              ca4: row['english_ca_four'],
              exam: row['english_exam'],
              totalScore: row['english_total_score'],
              gradeValue: row['english_grade'],
              position: row['english_position'],
              cssAverage: row['english_css_average']
            },
            {
              name: 'Global Perspectives',
              teacher: '',
              grade: row['global_perspectives_total_score'] || "N/A",
              comment: row['global_perspectives_remark'] || '',
              ca1: row['global_perspectives_ca_one'],
              ca2: row['global_perspectives_ca_two'],
              ca3: row['global_perspectives_ca_three'],
              ca4: row['global_perspectives_ca_four'],
              exam: row['global_perspectives_exam'],
              totalScore: row['global_perspectives_total_score'],
              gradeValue: row['global_perspectives_grade'],
              position: row['global_perspectives_position'],
              cssAverage: row['global_perspectives_css_average']
            },
            {
              name: 'Science',
              teacher: '',
              grade: row['basic_science_total_score'] || "N/A",
              comment: row['basic_science_remark'] || '',
              ca1: row['basic_science_ca_one'],
              ca2: row['basic_science_ca_two'],
              ca3: row['basic_science_ca_three'],
              ca4: row['basic_science_ca_four'],
              exam: row['basic_science_exam'],
              totalScore: row['basic_science_total_score'],
              gradeValue: row['basic_science_grade'],
              position: row['basic_science_position'],
              cssAverage: row['basic_science_css_average']
            },
            {
              name: 'Digital Literacy',
              teacher: '',
              grade: row['digital_literacy_total_score'] || "N/A",
              comment: row['digital_literacy_remark'] || '',
              ca1: row['digital_literacy_ca_one'],
              ca2: row['digital_literacy_ca_two'],
              ca3: row['digital_literacy_ca_three'],
              ca4: row['digital_literacy_ca_four'],
              exam: row['digital_literacy_exam'],
              totalScore: row['digital_literacy_total_score'],
              gradeValue: row['digital_literacy_grade'],
              position: row['digital_literacy_position'],
              cssAverage: row['digital_literacy_css_average']
            },
            {
              name: 'French',
              teacher: '',
              grade: row['french_total_score'] || "N/A",
              comment: row['french_remark'] || '',
              ca1: row['french_ca_one'],
              ca2: row['french_ca_two'],
              ca3: row['french_ca_three'],
              ca4: row['french_ca_four'],
              exam: row['french_exam'],
              totalScore: row['french_total_score'],
              gradeValue: row['french_grade'],
              position: row['french_position'],
              cssAverage: row['french_css_average'],
              visible: row['french_visible']
            },
            {
              name: 'Arabic',
              teacher: '',
              grade: row['arabic_total_score'] || "N/A",
              comment: row['arabic_remark'] || '',
              ca1: row['arabic_ca_one'],
              ca2: row['arabic_ca_two'],
              ca3: row['arabic_ca_three'],
              ca4: row['arabic_ca_four'],
              exam: row['arabic_exam'],
              totalScore: row['arabic_total_score'],
              gradeValue: row['arabic_grade'],
              position: row['arabic_position'],
              cssAverage: row['arabic_css_average'],
              visible: row['arabic_visible']
            },
            {
              name: 'Religion IRS',
              teacher: '',
              grade: row['religion_total_score'] || "N/A",
              comment: row['religion_remark'] || '',
              ca1: row['religion_ca_one'],
              ca2: row['religion_ca_two'],
              ca3: row['religion_ca_three'],
              ca4: row['religion_ca_four'],
              exam: row['religion_exam'],
              totalScore: row['religion_total_score'],
              gradeValue: row['religion_grade'],
              position: row['religion_position'],
              cssAverage: row['religion_css_average'],
              visible: row['religion_irs_visible']
            },
            {
              name: 'Religion CRS',
              teacher: '',
              grade: row['religion_crs_total_score'] || "N/A",
              comment: row['religion_crs_remark'] || '',
              ca1: row['religion_crs_ca_one'],
              ca2: row['religion_crs_ca_two'],
              ca3: row['religion_crs_ca_three'],
              ca4: row['religion_crs_ca_four'],
              exam: row['religion_crs_exam'],
              totalScore: row['religion_crs_total_score'],
              gradeValue: row['religion_crs_grade'],
              position: row['religion_crs_position'],
              cssAverage: row['religion_crs_css_average'],
              visible: row['religion_crs_visible']
            },
            {
              name: 'Humanities-Geography',
              teacher: '',
              grade: row['human_geo_total_score'] || "N/A",
              comment: row['human_geo_remark'] || '',
              ca1: row['human_geo_ca_one'],
              ca2: row['human_geo_ca_two'],
              ca3: row['human_geo_ca_three'],
              ca4: row['human_geo_ca_four'],
              exam: row['human_geo_exam'],
              totalScore: row['human_geo_total_score'],
              gradeValue: row['human_geo_grade'],
              position: row['human_geo_position'],
              cssAverage: row['human_geo_css_average']
            },
            {
              name: 'Humanities-History',
              teacher: '',
              grade: row['human_hstry_total_score'] || "N/A",
              comment: row['human_hstry_remark'] || '',
              ca1: row['human_hstry_ca_one'],
              ca2: row['human_hstry_ca_two'],
              ca3: row['human_hstry_ca_three'],
              ca4: row['human_hstry_ca_four'],
              exam: row['human_hstry_exam'],
              totalScore: row['human_hstry_total_score'],
              gradeValue: row['human_hstry_grade'],
              position: row['human_hstry_position'],
              cssAverage: row['human_hstry_css_average'],
              visible: row['human_hstry_visible']
            },
            {
              name: 'Music',
              teacher: '',
              grade: row['music_total_score'] || "N/A",
              comment: row['music_remark'] || '',
              ca1: row['music_ca_one'],
              ca2: row['music_ca_two'],
              ca3: row['music_ca_three'],
              ca4: row['music_ca_four'],
              exam: row['music_exam'],
              totalScore: row['music_total_score'],
              gradeValue: row['music_grade'],
              position: row['music_position'],
              cssAverage: row['music_css_average'],
              visible: row['music_visible']
            },
            {
              name: 'Physical And Health Education (PHE)',
              teacher: '',
              grade: row['phe_total_score'] || "N/A",
              comment: row['phe_remark'] || '',
              ca1: row['phe_ca_one'],
              ca2: row['phe_ca_two'],
              ca3: row['phe_ca_three'],
              ca4: row['phe_ca_four'],
              exam: row['phe_exam'],
              totalScore: row['phe_total_score'],
              gradeValue: row['phe_grade'],
              position: row['phe_position'],
              cssAverage: row['phe_css_average'],
              visible: row['phe_visible']
            },
            {
              name: 'Arts and Design',
              teacher: '',
              grade: row['arts_design_total_score'] || "N/A",
              comment: row['arts_design_remark'] || '',
              ca1: row['arts_design_ca_one'],
              ca2: row['arts_design_ca_two'],
              ca3: row['arts_design_ca_three'],
              ca4: row['arts_design_ca_four'],
              exam: row['arts_design_exam'],
              totalScore: row['arts_design_total_score'],
              gradeValue: row['arts_design_grade'],
              position: row['arts_design_position'],
              cssAverage: row['arts_design_css_average'],
              visible: row['arts_design_visible']
            },
            {
              name: 'Hausa',
              teacher: '',
              grade: row['hausa_total_score'] || "N/A",
              comment: row['hausa_remark'] || '',
              ca1: row['hausa_ca_one'],
              ca2: row['hausa_ca_two'],
              ca3: row['hausa_ca_three'],
              ca4: row['hausa_ca_four'],
              exam: row['hausa_exam'],
              totalScore: row['hausa_total_score'],
              gradeValue: row['hausa_grade'],
              position: row['hausa_position'],
              cssAverage: row['hausa_css_average'],
              visible: row['hausa_visible']
            }
          ];

          // Add subjects that have valid grades and are visible to the student
          subjects.forEach(subject => {
            const isVisible = subject.visible === undefined || subject.visible === "Y";
            const hasValidScore = subject.totalScore && subject.totalScore !== "N/A" && subject.totalScore !== null && subject.totalScore !== undefined && subject.totalScore !== "";
            
            if (isVisible && hasValidScore) {
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
        score: subject.totalScore || 0,
        grade: subject.gradeValue || 'F9',
        position: subject.position || 0,
        remark: subject.comment || 'No remark',
        teachersAverage: subject.cssAverage || 0
      };
    });

    // Get basic student info from raw data
    const rawData = student.rawData || {};
    
    return {
      studentId: rawData[''] || `STU${Math.floor(Math.random() * 10000)}`,
      studentName: student.name,
      class: selectedClass || "Year 7",
      academicYear: rawData['academic_year'] || "2024-2025",
      positionInClass: rawData['position_class'] || 1,
      noInClass: rawData['no_in_class'] || 15,
      term: rawData['term_name'] || "Term 3",
      totalSubjects: rawData['total_subject'] || academySubjects.length,
      subjects: academySubjects,
      cumulativeScore: academySubjects.reduce((sum, s) => sum + s.score, 0),
      cutOffAverage: 50,
      studentsAverage: academySubjects.reduce((sum, s) => sum + s.score, 0) / academySubjects.length,
      personalTutorComment: student.Comments || "The student demonstrates good academic progress."
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