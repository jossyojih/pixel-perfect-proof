import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/ReportCard";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StudentReportProps {
  students?: Array<{
    name: string;
    subjects: Array<{
      name: string;
      teacher: string;
      grade: number | "N/A";
      comment: string;
    }>;
  }>;
}

export default function StudentReport() {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    // Get student data from localStorage (passed from UploadReport page)
    const studentsData = localStorage.getItem('studentsData');
    if (studentsData) {
      const students = JSON.parse(studentsData);
      const foundStudent = students.find((s: any) => s.name === studentName);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        toast({
          title: "Student not found",
          description: "Please go back and select a student from the list.",
          variant: "destructive"
        });
        navigate('/upload');
      }
    } else {
      toast({
        title: "No student data found",
        description: "Please upload an Excel file first.",
        variant: "destructive"
      });
      navigate('/upload');
    }
  }, [studentName, navigate, toast]);

  const generateReportData = (student: any) => {
    // Separate main subjects from specials
    const mainSubjects = student.subjects.filter((subject: any) => 
      !['Computer Studies', 'Hausa', 'Religious Studies', 'French'].includes(subject.name)
    );
    
    const specialSubjects = student.subjects.filter((subject: any) => 
      ['Computer Studies', 'Hausa', 'Religious Studies', 'French'].includes(subject.name)
    );

    // Only add Physical Education if not already in the subjects data
    const hasPhysicalEducation = specialSubjects.some((subject: any) => 
      subject.name.toLowerCase().includes('physical') || subject.name.toLowerCase().includes('pe')
    );

    const additionalSpecials = [];
    if (!hasPhysicalEducation) {
      additionalSpecials.push({ 
        name: "Physical Education", 
        grade: 88, 
        teacher: "Geoffrey Nushu Gabriel" 
      });
    }

    return {
      studentName: student.name,
      grade: "Grade 3-A",
      term: "First Term",
      academicYear: "2023/2024",
      subjects: mainSubjects,
      specials: [...specialSubjects, ...additionalSpecials],
      workHabits: [
        { trait: "Punctuality", rating: "Excellent" },
        { trait: "Cooperation", rating: "Good" },
        { trait: "Initiative", rating: "Very Good" },
        { trait: "Organization", rating: "Good" }
      ],
      generalComment: `${student.name} has shown excellent progress this term. Continue to encourage reading and mathematical thinking.`,
      attendance: {
        totalDays: 85,
        daysPresent: 82,
        daysAbsent: 3
      }
    };
  };

  const uploadToSupabase = async () => {
    if (!student) return;

    setIsUploading(true);
    try {
      const reportData = generateReportData(student);
      
      // Create a simple text representation of the report for storage
      const reportContent = `
Student Report Card
==================
Student: ${reportData.studentName}
Grade: ${reportData.grade}
Term: ${reportData.term}
Academic Year: ${reportData.academicYear}

SUBJECTS:
${reportData.subjects.map(subject => 
  `${subject.name}: ${subject.grade} (Teacher: ${subject.teacher})\nComment: ${subject.comment}`
).join('\n\n')}

SPECIAL SUBJECTS:
${reportData.specials.map(special => 
  `${special.name}: ${special.grade} (Teacher: ${special.teacher})`
).join('\n')}

WORK HABITS:
${reportData.workHabits.map(habit => 
  `${habit.trait}: ${habit.rating}`
).join('\n')}

ATTENDANCE:
Total Days: ${reportData.attendance.totalDays}
Days Present: ${reportData.attendance.daysPresent}
Days Absent: ${reportData.attendance.daysAbsent}

GENERAL COMMENT:
${reportData.generalComment}
      `;

      // Upload to Supabase Storage
      const fileName = `${student.name.toLowerCase().replace(/\s+/g, '-')}-report-${Date.now()}.txt`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('reports')
        .upload(fileName, new Blob([reportContent], { type: 'text/plain' }));

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('reports')
        .getPublicUrl(fileName);

      // Store report metadata in database
      const { error: dbError } = await supabase
        .from('student_reports')
        .insert({
          student_name: student.name,
          file_path: fileName,
          public_url: urlData.publicUrl,
          class_tag: 'elementary',
          grade_tag: 'class 2',
          uploaded_at: new Date().toISOString()
        });

      if (dbError) throw dbError;

      toast({
        title: "Report uploaded successfully!",
        description: `Report for ${student.name} has been uploaded to Supabase.`
      });

      navigate('/results');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!student) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p>Loading student data...</p>
        </Card>
      </div>
    );
  }

  const reportData = generateReportData(student);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Report for {student.name}</h1>
          <p className="text-muted-foreground">Elementary - Class 2</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/upload')}>
            Back to Upload
          </Button>
          <Button 
            onClick={uploadToSupabase}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload to Supabase"}
          </Button>
        </div>
      </div>

      <ReportCard {...reportData} />
    </div>
  );
}