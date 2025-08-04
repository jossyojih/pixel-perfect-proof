import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/ReportCard";
import { StudentsTable } from "@/components/StudentsTable";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
}

interface UploadedReport {
  studentName: string;
  cloudinaryUrl: string;
}

export default function UploadReport() {
  const [file, setFile] = useState<File | null>(null);
  const [students, setStudents] = useState<ParsedStudent[]>([]);
  const [generatedReport, setGeneratedReport] = useState<any>(null);
  const [uploadedReports, setUploadedReports] = useState<UploadedReport[]>([]);
  const [isGeneratingReports, setIsGeneratingReports] = useState(false);
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
          // The student name is in column _2
          const studentName = row['_2'];
          console.log(`Student name found: "${studentName}"`);
          
          if (!studentName || typeof studentName !== 'string') return;

          if (!studentMap.has(studentName)) {
            studentMap.set(studentName, {
              name: studentName,
              subjects: []
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

  // Mock Cloudinary upload function
  const mockCloudinaryUpload = async (reportData: any): Promise<string> => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    
    // Generate unique URL based on student name and timestamp
    const timestamp = Date.now();
    const studentSlug = reportData.studentName.toLowerCase().replace(/\s+/g, '-');
    const mockUrl = `https://res.cloudinary.com/mock-cloud/image/upload/v${timestamp}/reports/${studentSlug}-report-${timestamp}.pdf`;
    
    return mockUrl;
  };

  const generateReportData = (student: ParsedStudent) => {
    return {
      studentName: student.name,
      grade: "Grade 3-A",
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
  };

  const generateAndUploadAllReports = async () => {
    if (students.length === 0) {
      toast({
        title: "No students found",
        description: "Please upload an Excel file first.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingReports(true);
    const uploadResults: UploadedReport[] = [];

    try {
      toast({
        title: "Generating reports...",
        description: `Processing ${students.length} student reports`
      });

      for (const student of students) {
        // Generate report data
        const reportData = generateReportData(student);
        
        // Mock upload to Cloudinary
        const cloudinaryUrl = await mockCloudinaryUpload(reportData);
        
        uploadResults.push({
          studentName: student.name,
          cloudinaryUrl: cloudinaryUrl
        });

        console.log(`Generated report for ${student.name}: ${cloudinaryUrl}`);
      }

      setUploadedReports(uploadResults);
      
      toast({
        title: "All reports generated successfully!",
        description: `${uploadResults.length} reports uploaded to Cloudinary (mocked)`
      });

    } catch (error) {
      toast({
        title: "Error generating reports",
        description: "An error occurred while processing reports.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReports(false);
    }
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Students from Excel File
                </label>
                <StudentsTable students={students} onStudentClick={handleStudentClick} />
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <h3 className="text-lg font-medium">Bulk Report Generation</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate and upload all reports to Cloudinary at once
                  </p>
                </div>
                <Button 
                  onClick={generateAndUploadAllReports}
                  disabled={isGeneratingReports}
                  size="lg"
                >
                  {isGeneratingReports ? "Generating..." : "Generate All Reports"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {uploadedReports.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Uploaded Reports to Cloudinary</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead>Cloudinary Link</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedReports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.studentName}</TableCell>
                    <TableCell>
                      <a 
                        href={report.cloudinaryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        {report.cloudinaryUrl}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(report.cloudinaryUrl)}
                      >
                        Copy Link
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

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