import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StudentsTable } from "@/components/StudentsTable";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();

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
          // The student name is in column __EMPTY_2
          const studentName = row['__EMPTY_2'];
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
              totalDays: parseInt(row['No. of school days']) || 53,
              daysPresent: parseInt(row['Days Present']) || 48,
              daysAbsent: parseInt(row['Days Absent']) || 5
            });
          }

          const student = studentMap.get(studentName)!;
          
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
            }
          ];

          // Add subjects that have valid grades to the student
          subjects.forEach(subject => {
            if (subject.grade !== "N/A" && subject.grade !== null && subject.grade !== undefined) {
              student.subjects.push(subject);
            }
          });
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


  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Generate Report from Excel</h1>
        
        <div className="space-y-4">
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
                  <h3 className="text-lg font-medium">Individual Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any student name to view and upload their individual report
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

    </div>
  );
}