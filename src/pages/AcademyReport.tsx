import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AcademyReportCard } from "@/components/AcademyReportCard";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function AcademyReport() {
  const { studentName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const subjectsRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get Academy student data from localStorage
    const studentsData = localStorage.getItem('academyStudentsData');
    if (studentsData) {
      const students = JSON.parse(studentsData);
      const foundStudent = students.find((s: any) => s.name === studentName);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        toast({
          title: "Academy student not found",
          description: "Please go back and select a student from the Academy list.",
          variant: "destructive"
        });
        navigate('/academy-upload');
      }
    } else {
      toast({
        title: "No Academy student data found",
        description: "Please upload an Academy Excel file first.",
        variant: "destructive"
      });
      navigate('/academy-upload');
    }
  }, [studentName, navigate, toast]);

  const generateAcademyReportData = (student: any) => {
    const mainSubjects = student.subjects.filter((subject: any) => 
      !['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'Science', 'PHE'].includes(subject.name)
    );
    
    const specialSubjects = student.subjects.filter((subject: any) => 
      ['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'PHE'].includes(subject.name)
    );

    const scienceSubject = student.subjects.find((subject: any) => 
      subject.name === 'Science'
    );

    return {
      studentName: student.name,
      grade: localStorage.getItem('selectedAcademyClass') || "Year 7",
      term: "First Term",
      academicYear: "2023/2024",
      subjects: mainSubjects,
      specials: specialSubjects,
      scienceSubject: scienceSubject || null,
      workHabits: [
        { trait: "Shows Effort", rating: student.showsEffort || "Outstanding" },
        { trait: "Works well with others", rating: student.worksWellWithOthers || "Satisfactory" },
        { trait: "Produces legible handwriting", rating: student.producesLegibleHandwriting || "Outstanding" },
        { trait: "Demonstrates great character trait", rating: student.demonstratesGreatCharacterTrait || "Satisfactory" }
      ],
      generalComment: student.Comments || student.comments || "The student has shown excellent progress throughout the term and demonstrates strong academic potential.",
      mathLanguageArt: student.rawData?.['math_language_teacher_name'] || "Mathematics Teacher",
      englishLanguageArtTeacherName: student.rawData?.['english_language_teacher_name'] || "English Teacher",
      attendance: {
        totalDays: student.totalDays || 53,
        daysPresent: student.daysPresent || 48,
        daysAbsent: student.daysAbsent || (student.totalDays && student.daysPresent ? student.totalDays - student.daysPresent : 5)
      }
    };
  };

  const uploadToSupabase = async () => {
    if (!student || !coverRef.current || !subjectsRef.current || !specialsRef.current || !finalRef.current) return;

    setIsUploading(true);
    try {
      const reportData = generateAcademyReportData(student);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pageRefs = [coverRef, subjectsRef, specialsRef, finalRef];
      
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
      const fileName = `academy_${student.name.toLowerCase().replace(/\s+/g, '-')}_report_${Date.now()}.pdf`;
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

      // Store Academy report metadata in database
      const { error: dbError } = await supabase
        .from('student_reports')
        .insert({
          student_name: student.name,
          file_path: fileName,
          public_url: urlData.publicUrl,
          class_tag: localStorage.getItem('selectedAcademyClass') || 'Year 7',
          grade_tag: 'Academy',
          uploaded_at: new Date().toISOString()
        });

      if (dbError) throw dbError;

      toast({
        title: "Academy report uploaded successfully!",
        description: `Academy report for ${student.name} has been uploaded as PDF.`
      });
    } catch (error) {
      console.error('Academy upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the Academy report. Please try again.",
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
          <p>Loading Academy student data...</p>
        </Card>
      </div>
    );
  }

  const reportData = generateAcademyReportData(student);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Academy Report for {student.name}</h1>
          <p className="text-muted-foreground">Academy - {reportData.grade}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/academy-upload')}>
            Back to Academy Students
          </Button>
          <Button variant="outline" onClick={() => navigate('/results')}>
            View Results
          </Button>
          <Button 
            onClick={uploadToSupabase}
            disabled={isUploading}
          >
            {isUploading ? "Converting to PDF & Uploading..." : "Upload Academy Report"}
          </Button>
        </div>
      </div>

      <div ref={reportRef}>
        <AcademyReportCard 
          {...reportData} 
          pageRefs={{
            coverRef,
            subjectsRef,
            specialsRef,
            finalRef
          }}
        />
      </div>
    </div>
  );
}