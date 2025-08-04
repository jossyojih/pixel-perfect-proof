import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/ReportCard";
import { useToast } from "@/hooks/use-toast";
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
  const reportRef = useRef<HTMLDivElement>(null);

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
        { trait: "Shows Effort", rating: student.showsEffort || "Outstanding" },
        { trait: "Works well with others", rating: student.worksWellWithOthers || "Satisfactory" },
        { trait: "Produces legible handwriting", rating: student.producesLegibleHandwriting || "Outstanding" },
        { trait: "Demonstrates great character trait", rating: student.demonstratesGreatCharacterTrait || "Satisfactory" }
      ],
      generalComment: student.Comments || student.comments,
      attendance: {
        totalDays: student.totalDays || 53,
        daysPresent: student.daysPresent || 48,
        daysAbsent: student.daysAbsent || 5
      }
    };
  };

  const uploadToSupabase = async () => {
    if (!student || !reportRef.current) return;

    setIsUploading(true);
    try {
      const reportData = generateReportData(student);
      
      // Generate canvas from the HTML report card
      const canvas = await html2canvas(reportRef.current, {
        scale: 1, // Reduced scale for smaller file size
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: reportRef.current.scrollWidth,
        height: reportRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Convert canvas to JPEG with compression for smaller file size
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true // Enable PDF compression
      });
      
      // Calculate dimensions to fit A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // Add image to PDF (split across pages if needed)
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Convert PDF to blob
      const pdfBlob = pdf.output('blob');

      // Upload to Supabase Storage
      const fileName = `${student.name.toLowerCase().replace(/\s+/g, '-')}-report-${Date.now()}.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('reports')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf'
        });

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
        description: `Report for ${student.name} has been uploaded as PDF.`
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
            {isUploading ? "Converting to PDF & Uploading..." : "Upload Report as PDF"}
          </Button>
        </div>
      </div>

      <div ref={reportRef}>
        <ReportCard {...reportData} />
      </div>
    </div>
  );
}