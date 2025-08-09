import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReportCard } from "@/components/ReportCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ELCReportCard } from "@/components/ELCReporCard";

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

export default function ELCStudentReport() {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const subjectsRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

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
    const selectedClass = localStorage.getItem('selectedClass') || "Grade 1 A";
    console.log('Selected Class from localStorage:', selectedClass);
    
    return {
      studentName: student.name,
      grade: selectedClass || student.rawData?.class || "Grade 1-A",
      term: student.term_name || "Term 3",
      academicYear: student.school_year || "2024 - 2025",
      teacherName: student.teacher_name || "Class Teacher",
      attendance: {
        totalDays: student.no_of_school_days || 53,
        daysPresent: student.days_present || 48,
        daysAbsent: student.days_absent || 5
      },
      generalComment: student.teacher_comments || "",
      
      // Development assessments
      developmentAssessments: {
        // Personal, Social and Emotional Development
        relationships: student.relationships_term3 || "",
        selfAwareness: student.self_awareness_term3 || "",
        managingFeelings: student.managing_feelings_term3 || "",
        
        // Communication and Language
        listening: student.listening_term3 || "",
        understanding: student.understanding_term3 || "",
        speaking: student.speaking_term3 || "",
        
        // Physical Development
        movingHandling: student.moving_handling_term3 || "",
        healthSelfcare: student.health_selfcare_term3 || "",
        
        // Literacy
        reading: student.reading_term3 || "",
        writing: student.writing_term3 || "",
        
        // Mathematics
        numbers: student.numbers_term3 || "",
        shape: student.shape_term3 || "",
        
        // Understanding the World
        communities: student.communities_term3 || "",
        world: student.world_term3 || "",
        technology: student.technology_term3 || "",
        
        // Expressive Arts and Design
        exploring: student.exploring_term3 || "",
        imaginative: student.imaginative_term3 || ""
      }
    };
  };

  const uploadToSupabase = async () => {
    if (!student || !coverRef.current || !subjectsRef.current || !specialsRef.current || !finalRef.current) return;

    setIsUploading(true);
    try {
      const reportData = generateReportData(student);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageRefs = [coverRef, subjectsRef, specialsRef, shapeRef, finalRef];
      
      for (let i = 0; i < pageRefs.length; i++) {
        const pageElement = pageRefs[i].current;
        if (!pageElement) continue;

        // Generate canvas for each page section
        const canvas = await html2canvas(pageElement, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: pageElement.scrollWidth,
          height: pageElement.scrollHeight,
          scrollX: 0,
          scrollY: 0
        });

        // Convert to JPEG
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Add new page for each section (except first)
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate dimensions to fit A4 landscape
        const imgWidth = 297; // A4 landscape width in mm
        const pageHeight = 210; // A4 landscape height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Center the image on the page if it's smaller than A4
        const yPosition = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;
        
        pdf.addImage(imgData, 'JPEG', 0, yPosition, imgWidth, Math.min(imgHeight, pageHeight));
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
        description: `Report for ${student.name} has been uploaded as PDF. You can continue uploading more reports or navigate to Results when ready.`
      });
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
            Back to Students List
          </Button>
          <Button variant="outline" onClick={() => navigate('/results')}>
            View Results
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
        <ELCReportCard 
          {...reportData} 
          pageRefs={{
            coverRef,
            subjectsRef,
            specialsRef,
            shapeRef,
            finalRef
          }}
        />
      </div>
    </div>
  );
}