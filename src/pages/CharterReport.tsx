import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CharterReportCard } from "@/components/CharterReportCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function CharterReport() {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get Charter student data from localStorage
    const studentsData = localStorage.getItem('charterStudentsData');
    if (studentsData) {
      const students = JSON.parse(studentsData);
      const foundStudent = students.find((s: any) => s.name === studentName);
      if (foundStudent) {
        setStudent(foundStudent);
        console.log('Found Charter student:', foundStudent);
      } else {
        toast({
          title: "Charter student not found",
          description: "Please go back and select a student from the Charter list.",
          variant: "destructive"
        });
        navigate('/charter-upload');
      }
    } else {
      toast({
        title: "No Charter student data found",
        description: "Please upload a Charter Excel file first.",
        variant: "destructive"
      });
      navigate('/charter-upload');
    }
  }, [studentName, navigate, toast]);

  const uploadToSupabase = async () => {
    if (!student || !reportRef.current) return;

    setIsUploading(true);
    try {
      // Generate PDF from the report
      const canvas = await html2canvas(reportRef.current, {
        scale: 3,
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

      // Preview PDF
      window.open(pdf.output('bloburl'), '_blank');

      const pdfBlob = pdf.output('blob');

      // Upload to Supabase Storage
      const fileName = `charter_${student.name.toLowerCase().replace(/\s+/g, '-')}_report_${Date.now()}.pdf`;
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

      // Store report metadata
      const { error: dbError } = await supabase
        .from('student_reports')
        .insert({
          student_name: student.name,
          file_path: fileName,
          public_url: urlData.publicUrl,
          class_tag: student.class,
          grade_tag: 'Charter',
          uploaded_at: new Date().toISOString()
        });

      if (dbError) throw dbError;

      toast({
        title: "Charter report uploaded successfully!",
        description: `Report for ${student.name} has been uploaded as PDF.`
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
          <p>Loading Charter student data...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Charter Report for {student.name}</h1>
          <p className="text-muted-foreground">{student.class} - Charter School</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/charter-upload')}>
            Back to Charter Upload
          </Button>
          <Button variant="outline" onClick={() => navigate('/results')}>
            View Results
          </Button>
          <Button 
            onClick={uploadToSupabase}
            disabled={isUploading}
          >
            {isUploading ? "Converting to PDF & Uploading..." : "Upload Charter Report"}
          </Button>
        </div>
      </div>

      <div ref={reportRef}>
        <CharterReportCard 
          name={student.name}
          grade={student.class}
          date={new Date().toLocaleDateString()}
          academicYear={student.academicYear}
          term={student.term}
          subjects={student.subjects}
          average={student.average}
          attendance={student.attendance}
          remarks={student.remarks}
          comment={student.comment}
        />
      </div>
    </div>
  );
}