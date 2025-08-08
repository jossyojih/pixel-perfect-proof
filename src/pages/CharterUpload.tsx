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

  // Map Excel field names to subject display names
  const mapExcelFieldToSubject = (fieldName: string): string => {
    const mapping: { [key: string]: string } = {
      'language_art_ca': 'Language Arts',
      'language_art_exam': 'Language Arts',
      'language_art_final': 'Language Arts',
      'language_art_total': 'Language Arts',
      'language_arts_ca': 'Language Arts',
      'language_arts_exam': 'Language Arts',
      'language_arts_final': 'Language Arts',
      'language_arts_total': 'Language Arts',
      'mathematics_ca': 'Mathematics',
      'mathematics_exam': 'Mathematics',
      'mathematics_final': 'Mathematics',
      'mathematics_total': 'Mathematics',
      'science_ca': 'Science', 
      'science_exam': 'Science',
      'science_final': 'Science',
      'science_total': 'Science',
      'social_studies_ca': 'Social Studies',
      'social_studies_exam': 'Social Studies',
      'social_studies_final': 'Social Studies',
      'social_studies_total': 'Social Studies',
      'health_ca': 'Health Education',
      'health_exam': 'Health Education',
      'health_final': 'Health Education',
      'health_total': 'Health Education',
      'health_education_ca': 'Health Education',
      'health_education_exam': 'Health Education',
      'health_education_final': 'Health Education',
      'health_education_total': 'Health Education',
      'nve_ca': 'National Values Education',
      'nve_exam': 'National Values Education',
      'nve_final': 'National Values Education',
      'nve_total': 'National Values Education',
      'national_values_education_ca': 'National Values Education',
      'national_values_education_exam': 'National Values Education',
      'national_values_education_final': 'National Values Education',
      'national_values_education_total': 'National Values Education',
      'phy_ed_ca': 'Physical Education',
      'phy_ed_exam': 'Physical Education',
      'phy_ed_final': 'Physical Education',
      'phy_ed_total': 'Physical Education',
      'physical_education_ca': 'Physical Education',
      'physical_education_exam': 'Physical Education',
      'physical_education_final': 'Physical Education',
      'physical_education_total': 'Physical Education',
      'fncl_literacy_ca': 'Financial Literacy',
      'fncl_literacy_exam': 'Financial Literacy',
      'fncl_literacy_final': 'Financial Literacy',
      'fncl_literacy_total': 'Financial Literacy',
      'financial_literacy_ca': 'Financial Literacy',
      'financial_literacy_exam': 'Financial Literacy',
      'financial_literacy_final': 'Financial Literacy',
      'financial_literacy_total': 'Financial Literacy',
      'religion_irk_ca': 'Religion (IRK)',
      'religion_irk_exam': 'Religion (IRK)',
      'religion_irk_final': 'Religion (IRK)',
      'religion_irk_total': 'Religion (IRK)',
      'schol_fair_ca': 'Scholastic Fair',
      'schol_fair_exam': 'Scholastic Fair',
      'schol_fair_final': 'Scholastic Fair',
      'schol_fair_total': 'Scholastic Fair',
      'scholastic_fair_ca': 'Scholastic Fair',
      'scholastic_fair_exam': 'Scholastic Fair',
      'scholastic_fair_final': 'Scholastic Fair',
      'scholastic_fair_total': 'Scholastic Fair',
      'religion_crk_ca': 'Religion (CRK)',
      'religion_crk_exam': 'Religion (CRK)',
      'religion_crk_final': 'Religion (CRK)',
      'religion_crk_total': 'Religion (CRK)',
      'music_ca': 'Music',
      'music_exam': 'Music',
      'music_final': 'Music',
      'music_total': 'Music',
      'vis_arts_ca': 'Visual Arts',
      'vis_arts_exam': 'Visual Arts',
      'vis_arts_final': 'Visual Arts',
      'vis_arts_total': 'Visual Arts',
      'visual_arts_ca': 'Visual Arts',
      'visual_arts_exam': 'Visual Arts',
      'visual_arts_final': 'Visual Arts',
      'visual_arts_total': 'Visual Arts',
      'ict_ca': 'ICT',
      'ict_exam': 'ICT',
      'ict_final': 'ICT',
      'ict_total': 'ICT',
      'french_language_ca': 'French',
      'french_language_exam': 'French',
      'french_language_final': 'French',
      'french_language_total': 'French',
      'french_ca': 'French',
      'french_exam': 'French',
      'french_final': 'French',
      'french_total': 'French',
      'arabic_ca': 'Arabic',
      'arabic_exam': 'Arabic',
      'arabic_final': 'Arabic',
      'arabic_total': 'Arabic',
      'ara_stu_ca': 'Arabic',
      'ara_stu_exam': 'Arabic',
      'ara_stu_final': 'Arabic',
      'ara_stu_total': 'Arabic'
    };
    
    return mapping[fieldName] || fieldName;
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

        // Group by student name and parse subjects
        const studentMap = new Map<string, ParsedStudent>();

        jsonData.forEach((row) => {
          // Extract student name - adjust field name based on actual Excel structure
          const studentName = row['Student Name'] || row['student_name'] || row['Name'] || row['name'] || 
                              row['__EMPTY_1'] || row['_1'] || Object.values(row)[1];
          
          if (!studentName || typeof studentName !== 'string') return;

          console.log('Processing student:', studentName);

          if (!studentMap.has(studentName)) {
            // Extract data from Excel row with fallbacks
            const term = row['term'] || row['Term'] || row['TERM'] || "Term 3";
            const academicYear = row['academic_year'] || row['Academic Year'] || row['year'] || "2024-2025";
            const date = row['date'] || row['Date'] || row['report_date'] || new Date().toLocaleDateString();
            
            // Parse attendance data
            const unexpectedAbsence = parseInt(row['unexpected_absence'] || row['Unexpected Absence'] || row['unexcused_absence'] || '0') || 0;
            const explainedAbsence = parseInt(row['explained_absence'] || row['Explained Absence'] || row['excused_absence'] || '0') || 0;
            const late = parseInt(row['late'] || row['Late'] || row['lateness'] || '0') || 0;
            
            // Parse remarks - try multiple possible column names
            const interpersonal = row['interpersonal'] || row['Interpersonal'] || row['interpersonal_skills'] || 
                                 row['Interpersonal Skills'] || row['INTERPERSONAL'] || "";
            const effort = row['effort'] || row['Effort'] || row['student_effort'] || 
                          row['Student Effort'] || row['EFFORT'] || "";
            const classBehaviour = row['class_behaviour'] || row['Class Behaviour'] || row['behavior'] || 
                                  row['behaviour'] || row['Behavior'] || row['CLASS_BEHAVIOUR'] || 
                                  row['class_behavior'] || row['Class Behavior'] || "";
            
            // Initialize student with extracted data
            studentMap.set(studentName, {
              name: studentName,
              subjects: [],
              rawData: row,
              class: selectedClass || "Grade 7 A",
              term: term,
              academicYear: academicYear,
              date: date,
              average: 0,
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
              comment: row['teacher_comment'] || row['comments'] || row['comment'] || row['Comment'] || 
                       row['Comments'] || row['teacher_comments'] || row['Teacher Comment'] || 
                       row['Teacher Comments'] || row['COMMENTS'] || row['COMMENT'] || ""
            });
          }

          const student = studentMap.get(studentName)!;

          // Extract subjects from Excel columns
          const subjectScores = new Map<string, { ca: number; exam: number; finalScore: number }>();

          // Parse all Excel fields for subject scores
          Object.keys(row).forEach(fieldName => {
            const value = parseFloat(row[fieldName]) || 0;
            
            if (fieldName.includes('_ca')) {
              const subjectName = mapExcelFieldToSubject(fieldName);
              if (!subjectScores.has(subjectName)) {
                subjectScores.set(subjectName, { ca: 0, exam: 0, finalScore: 0 });
              }
              subjectScores.get(subjectName)!.ca = value;
            } else if (fieldName.includes('_exam')) {
              const subjectName = mapExcelFieldToSubject(fieldName);
              if (!subjectScores.has(subjectName)) {
                subjectScores.set(subjectName, { ca: 0, exam: 0, finalScore: 0 });
              }
              subjectScores.get(subjectName)!.exam = value;
            } else if (fieldName.includes('_final') || fieldName.includes('_total') || fieldName.includes('_score')) {
              const subjectName = mapExcelFieldToSubject(fieldName.replace('_final', '').replace('_total', '').replace('_score', ''));
              if (!subjectScores.has(subjectName)) {
                subjectScores.set(subjectName, { ca: 0, exam: 0, finalScore: 0 });
              }
              subjectScores.get(subjectName)!.finalScore = value;
            }
          });

          // Convert to subject objects and filter out subjects with no scores
          const subjects = Array.from(subjectScores.entries())
            .map(([subjectName, scores]) => {
              // Use final score from Excel if available, otherwise calculate
              const finalScore = scores.finalScore > 0 ? scores.finalScore : scores.ca + scores.exam;
              return {
                name: subjectName,
                ca: scores.ca,
                exam: scores.exam,
                finalScore: finalScore,
                letterGrade: getLetterGrade(finalScore)
              };
            })
            .filter(subject => subject.finalScore > 0); // Only include subjects with actual scores

          student.subjects = subjects;
          
          // Extract average directly from Excel instead of calculating
          const excelAverage = parseFloat(row['average'] || row['Average'] || row['AVERAGE'] || row['overall_average'] || '0') || 0;
          student.average = excelAverage > 0 ? excelAverage : (subjects.length > 0 ? subjects.reduce((sum, s) => sum + s.finalScore, 0) / subjects.length : 0);

          console.log(`Student ${studentName} has ${subjects.length} subjects with scores, average: ${student.average}`);
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