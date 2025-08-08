import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CharterStudentsTable } from "@/components/CharterStudentsTable";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { CharterReportCard } from "@/components/CharterReportCard";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from "react";
import * as XLSX from 'xlsx';

// Grade 7 subjects based on user requirements
const GRADE_7_SUBJECTS = [
  'Language Arts',
  'Mathematics', 
  'Science',
  'Social Studies',
  'Health Education',
  'National Values Education',
  'Physical Education',
  'Financial Literacy',
  'Religion (IRK)',
  'Scholastic Fair',
  'Religion (CRK)',
  'Music',
  'Visual Arts',
  'ICT',
  'French',
  'Arabic'
];

// Grade 8 subjects - correct list
const GRADE_8_SUBJECTS = [
  'Language Arts',
  'Mathematics',
  'Science',
  'Basic Technology',
  'Social Studies',
  'Physical and Health Education',
  'Civic Education',
  'Agricultural Science',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Business Studies',
  'CCA (Creative and Cultural Arts)',
  'Scholastic Fair',
  'ICT',
  'Hausa Language',
  'Arabic Studies'
];

interface ExcelRow {
  [key: string]: any;
}

interface ParsedStudent {
  name: string;
  subjects: Array<{
    name: string;
    ca: number;
    exam: number; 
    finalScore: number;
    letterGrade: string;
  }>;
  rawData: ExcelRow;
  class: string;
  term: string;
  academicYear: string;
  date: string;
  average: number;
  attendance: {
    unexpectedAbsence: number;
    explainedAbsence: number;
    late: number;
  };
  remarks: {
    interpersonal: string;
    effort: string;
    classBehaviour: string;
  };
  comment: string;
}

export default function CharterUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { toast } = useToast();

  // Fixed class options without duplicates
  const charterClassOptions = [
    "Grade 7 A", "Grade 7 B", 
    "Grade 8 A", "Grade 8 B", 
    "Grade 9 A", "Grade 9 B", 
    "Grade 10 A", "Grade 10 B", 
    "Grade 11 A", "Grade 11 B", 
    "Grade 12 A", "Grade 12 B"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      parseExcel(uploadedFile);
    }
  };

  const getLetterGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Subject mapping for Grade 7 Excel headers
  const GRADE_7_SUBJECT_MAPPING = {
    'language_art': 'Language Arts',
    'mathematics': 'Mathematics',
    'science': 'Science',
    'social_studies': 'Social Studies',
    'health': 'Health Education',
    'nve': 'National Values Education',
    'physical_education': 'Physical Education',
    'fncl_literacy': 'Financial Literacy',
    'religion_irk': 'Religion (IRK)',
    'scholastic_fair': 'Scholastic Fair',
    'religion_crk': 'Religion (CRK)',
    'music': 'Music',
    'visual_arts': 'Visual Arts',
    'ict': 'ICT',
    'french_language': 'French',
    'ara_stu': 'Arabic'
  };

  // Subject mapping for Grade 8 Excel headers (based on actual Excel column names)
  const GRADE_8_SUBJECT_MAPPING = {
    'language_art': 'Language Arts',
    'mathematics': 'Mathematics',
    'science': 'Science',
    'basic_technology': 'Basic Technology',
    'social_studies': 'Social Studies',
    'physical_health': 'Physical and Health Education',
    'civic_edu': 'Civic Education',
    'agricultural_science': 'Agricultural Science',
    'christian_religious': 'Christian Religious Studies',
    'islamic_religious': 'Islamic Religious Studies',
    'business_studies': 'Business Studies',
    'creative_arts': 'CCA (Creative and Cultural Arts)',
    'scholastic_fair': 'Scholastic Fair',
    'information_technology': 'ICT',
    'hausa_language': 'Hausa Language',
    'ara_stu': 'Arabic Studies'
  };

  // Get appropriate subject mapping based on selected class
  const getSubjectMapping = () => {
    if (selectedClass.includes('Grade 8')) {
      return GRADE_8_SUBJECT_MAPPING;
    }
    return GRADE_7_SUBJECT_MAPPING; // Default to Grade 7
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

         console.log('Excel data:', jsonData);
         console.log('Headers:', jsonData.length > 0 ? Object.keys(jsonData[0]) : []);
         console.log('First few rows:', jsonData.slice(0, 5));

        // Group by student name and parse subjects
        const studentMap = new Map<string, ParsedStudent>();

        jsonData.forEach((row, index) => {
          // Extract student name using exact Excel header - actual student name is in __EMPTY_2
          const studentName = row['__EMPTY_2'];
          
          // Skip header rows (first 3 rows are headers) and invalid entries
          if (!studentName || 
              typeof studentName !== 'string' || 
              studentName.toLowerCase().includes('roll') ||
              studentName.toLowerCase().includes('name') ||
              studentName.toLowerCase().includes('student') ||
              studentName === 'Student Name' ||
              index < 3) { // Skip first 3 header rows
            console.log(`Skipping row ${index}: ${studentName}`);
            return;
          }

          console.log('Processing student:', studentName);

          if (!studentMap.has(studentName)) {
            // Extract data using exact Excel headers
            const term = row['term_name'] || "Term 3";
            const academicYear = row['year_name'] || "2024-2025";
            const date = row['date'] || new Date().toLocaleDateString();
            
            // Parse attendance data using exact headers
            const unexpectedAbsence = parseInt(row['unexpected_absence'] || '0') || 0;
            const explainedAbsence = parseInt(row['explained_absence'] || '0') || 0;
            const late = parseInt(row['absent_late'] || '0') || 0;
            
            // Parse remarks using exact headers
            const interpersonal = row['interpersonal_remarks'] || "";
            const effort = row['effort_remarks'] || "";
            const classBehaviour = row['class_behaviour_remarks'] || "";
            
            // Get average directly from Excel
            const average = parseFloat(row['average_marks'] || '0') || 0;
            
            // Extract subjects data directly from Excel
            const subjects = [];
            
            // Process each subject using appropriate mapping
            const subjectMapping = getSubjectMapping();
            Object.keys(subjectMapping).forEach(subjectKey => {
              const subjectName = subjectMapping[subjectKey as keyof typeof subjectMapping];
              const ca = parseFloat(row[`${subjectKey}_ca`] || '0') || 0;
              const exam = parseFloat(row[`${subjectKey}_exam`] || '0') || 0;
              const overall = parseFloat(row[`${subjectKey}_overall`] || '0') || 0;
              const grade = row[`${subjectKey}_grade`] || '';
              
              // Check if subject is visible for this student
              const visibilityKey = `${subjectKey}_visible`;
              const isVisible = row[visibilityKey] === 'Y';
              
              // Include subject if it has scores OR if it's marked as visible
              if (ca > 0 || exam > 0 || overall > 0 || isVisible) {
                subjects.push({
                  name: subjectName,
                  ca: ca,
                  exam: exam,
                  finalScore: overall, // Use overall score directly from Excel
                  letterGrade: grade || getLetterGrade(overall)
                });
              }
            });
            
            // Initialize student with extracted data
            studentMap.set(studentName, {
              name: studentName,
              subjects: subjects,
              rawData: row,
              class: selectedClass || "Grade 7 A",
              term: term,
              academicYear: academicYear,
              date: date,
              average: average, // Use average directly from Excel
              attendance: {
                unexpectedAbsence: unexpectedAbsence,
                explainedAbsence: explainedAbsence,
                late: late
              },
              remarks: {
                interpersonal: interpersonal,
                effort: effort,
                classBehaviour: classBehaviour
              },
              comment: row['teacher_comments'] || ""
            });
          }

          console.log(`Student ${studentName} processed with ${studentMap.get(studentName)?.subjects.length} subjects`);
        });

        const parsedStudents = Array.from(studentMap.values());
        setStudents(parsedStudents);
        
        // Store in localStorage for report generation
        localStorage.setItem('charterStudentsData', JSON.stringify(parsedStudents));
        localStorage.setItem('selectedCharterClass', selectedClass);

        toast({
          title: "Excel file parsed successfully!",
          description: `Found ${parsedStudents.length} Charter students.`
        });

      } catch (error) {
        console.error('Excel parsing error:', error);
        toast({
          title: "Error parsing Excel file",
          description: "Please check the file format and try again.",
          variant: "destructive"
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const generateBulkReports = async () => {
    if (students.length === 0) {
      toast({
        title: "No students found",
        description: "Please upload an Excel file first.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingReports(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const student of students) {
        try {
          // Create a temporary DOM element for PDF generation
          const tempDiv = document.createElement('div');
          tempDiv.style.position = 'absolute';
          tempDiv.style.left = '-9999px';
          tempDiv.style.width = '794px';
          tempDiv.style.height = '1123px';
          document.body.appendChild(tempDiv);

          // Create React element and render it
          const { createRoot } = await import('react-dom/client');
          const root = createRoot(tempDiv);
          
          const reportElement = (
            <CharterReportCard
              name={student.name}
              grade={student.class}
              date={student.date}
              academicYear={student.academicYear}
              term={student.term}
              subjects={student.subjects}
              average={student.average}
              attendance={student.attendance}
              remarks={student.remarks}
              comment={student.comment}
            />
          );

          root.render(reportElement);

          // Wait for render
          await new Promise(resolve => setTimeout(resolve, 1000));

          console.log("Generating pdf for", student)

          // Generate PDF
          const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const imgData = canvas.toDataURL('image/png');
          const pageWidth = 210;
          const pageHeight = 297;
          const margin = 10;
          
          const maxWidth = pageWidth - 2 * margin;
          const maxHeight = pageHeight - 2 * margin;
          
          let renderWidth = maxWidth;
          let renderHeight = (canvas.height * renderWidth) / canvas.width;
          
          if (renderHeight > maxHeight) {
            renderHeight = maxHeight;
            renderWidth = (canvas.width * renderHeight) / canvas.height;
          }

          const x = (pageWidth - renderWidth) / 2;
          const y = (pageHeight - renderHeight) / 2;

          pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);

          const pdfBlob = pdf.output('blob');

          // Upload to Supabase
          const fileName = `charter_${student.name.toLowerCase().replace(/\s+/g, '-')}_report_${Date.now()}.pdf`;
          console.log("Uploading to supa-base")
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('reports')
            .upload(fileName, pdfBlob, {
              contentType: 'application/pdf'
            });

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage
            .from('reports')
            .getPublicUrl(fileName);

          const { error: dbError } = await supabase
            .from('student_reports')
            .insert({
              student_name: student.name,
              file_path: fileName,
              public_url: urlData.publicUrl,
              class_tag: selectedClass,
              grade_tag: 'Charter',
              uploaded_at: new Date().toISOString()
            });

          if (dbError) throw dbError;

          // Clean up
          root.unmount();
          document.body.removeChild(tempDiv);
          
          successCount++;
          console.log("Uplaod done!")
          console.log(successCount)

        } catch (error) {
          console.error(`Error generating report for ${student.name}:`, error);
          errorCount++;
        }
      }

      toast({
        title: "Bulk report generation completed",
        description: `Successfully generated ${successCount} reports. ${errorCount} errors.`
      });

    } catch (error) {
      console.error('Bulk generation error:', error);
      toast({
        title: "Error generating reports",
        description: "There was an error during bulk generation.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReports(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Charter Upload</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {charterClassOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
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
              disabled={!selectedClass}
            />
            {!selectedClass && (
              <p className="text-sm text-muted-foreground mt-1">
                Please select a class first
              </p>
            )}
          </div>

          {students.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Charter Students ({students.length})
                </h2>
                <Button 
                  onClick={generateBulkReports}
                  disabled={isGeneratingReports}
                >
                  {isGeneratingReports ? "Generating Reports..." : "Generate All Reports"}
                </Button>
              </div>
              
              <CharterStudentsTable students={students} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}