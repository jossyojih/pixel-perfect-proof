import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/ReportCard";
import { StudentsTable } from "@/components/StudentsTable";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

interface ExcelRow {
  'Roll No': number;
  'Student Name': string;
  'Subject': string;
  "Subject Teacher's Name": string;
  'Term Report': string;
}

interface ParsedStudent {
  name: string;
  subjects: Array<{
    name: string;
    teacher: string;
    grade: number | "N/A";
    comment: string;
  }>;
}

export default function UploadReport() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
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

        // Group data by student
        const studentMap = new Map<string, ParsedStudent>();

        jsonData.forEach((row) => {
          const studentName = row['Student Name'];
          
          if (!studentName) return;

          if (!studentMap.has(studentName)) {
            studentMap.set(studentName, {
              name: studentName,
              subjects: []
            });
          }

          const student = studentMap.get(studentName)!;
          
          // Parse term report - extract grade and comment
          const termReport = row['Term Report'] || '';
          const gradeMatch = termReport.match(/^(\d+)/);
          const grade = gradeMatch ? parseInt(gradeMatch[1]) : "N/A";
          
          // The comment is the rest of the term report after the grade
          const comment = termReport.replace(/^\d+\s*/, '').trim();

          student.subjects.push({
            name: row['Subject'] || '',
            teacher: row["Subject Teacher's Name"] || '',
            grade: grade,
            comment: comment
          });
        });

        const parsedStudents = Array.from(studentMap.values());
        setStudents(parsedStudents);
        
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

  const handleStudentClick = (student: ParsedStudent) => {
    // Sample data for missing fields - you can make these configurable later
    const reportData = {
      studentName: student.name,
      grade: "Grade 3-A", // Default - can be made dynamic
      term: "First Term",
      academicYear: "2023/2024",
      subjects: student.subjects,
      specials: [
        { name: "Art", grade: 85, teacher: "Art Teacher" },
        { name: "Music", grade: 90, teacher: "Music Teacher" },
        { name: "Physical Education", grade: 88, teacher: "PE Teacher" }
      ],
      workHabits: [
        { trait: "Punctuality", rating: "Excellent" },
        { trait: "Cooperation", rating: "Good" },
        { trait: "Initiative", rating: "Very Good" },
        { trait: "Organization", rating: "Good" }
      ],
      generalComment: `${student.name} has shown excellent progress this term. Continue to encourage reading and mathematical thinking.`,
      attendance: {
        totalDays: 65,
        daysPresent: 63,
        daysAbsent: 2
      }
    };

    setGeneratedReport(reportData);
    toast({
      title: "Report generated!",
      description: `Report card for ${student.name} has been generated.`
    });
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
            <div>
              <label className="block text-sm font-medium mb-2">
                Students from Excel File
              </label>
              <StudentsTable students={students} onStudentClick={handleStudentClick} />
            </div>
          )}
        </div>
      </Card>

      {generatedReport && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Generated Report</h2>
            <Button onClick={() => window.print()} variant="outline">
              Print Report
            </Button>
          </div>
          <ReportCard {...generatedReport} />
        </div>
      )}
    </div>
  );
}