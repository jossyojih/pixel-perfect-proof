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
  const coverRef = useRef<HTMLDivElement>(null);
  const subjectsRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);
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
    
    // Separate main subjects from specials (include Science in specials)
    const mainSubjects = student.subjects.filter((subject: any) => 
      !['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'Science', 'PHE'].includes(subject.name)
    );
    
    const specialSubjects = student.subjects.filter((subject: any) => 
      ['Computer Studies', 'Hausa', 'Religious Studies', 'French', 'PHE'].includes(subject.name)
    );

    // Get Science subject for specials page
    const scienceSubject = student.subjects.filter((subject: any) => 
      subject.name === 'Science'
    );

    // Only add Physical Education if not already in the subjects data
    const hasPhysicalEducation = specialSubjects.some((subject: any) => 
      subject.name.toLowerCase().includes('physical') || subject.name.toLowerCase().includes('pe') ||
      subject.name.toLowerCase().includes('phe')
    );

    console.log(hasPhysicalEducation,"Has physical Education")

    const additionalSpecials = [];
    // Only add Physical Education if not already in the subjects data AND not Pre-Grade-A or Pre-Grade-B
    if (!hasPhysicalEducation && selectedClass !== "Pre-Grade A" && selectedClass !== "Pre-Grade B") {
      additionalSpecials.push({ 
        name: "PHE", 
        grade: 88, 
        teacher: "Geoffrey Nushu Gabriel" 
      });
    }
    
    return {
      studentName: student.name,
      grade: selectedClass,
      term: "Term 3",
      academicYear: "2024/2025",
      subjects: mainSubjects,
      specials: [...specialSubjects, ...additionalSpecials],
      scienceSubject: scienceSubject[0] || null, // Pass science subject separately
      workHabits: [
        { trait: "Shows Effort", rating: student.showsEffort || "Outstanding" },
        { trait: "Works well with others", rating: student.worksWellWithOthers || "Satisfactory" },
        { trait: "Produces legible handwriting", rating: student.producesLegibleHandwriting || "Outstanding" },
        { trait: "Demonstrates great character trait", rating: student.demonstratesGreatCharacterTrait || "Satisfactory" }
      ],
      generalComment: student.Comments || student.comments,
      mathLanguageArt: student.rawData?.['math_language_teacher_name'] || "Math Teacher",
      englishLanguageArtTeacherName: student.rawData?.['english_language_teacher_name'] || "English Teacher",
      attendance: {
        totalDays: student.totalDays || 53,
        daysPresent: student.daysPresent || 53,
        daysAbsent: student.daysAbsent || (student.totalDays && student.daysPresent ? student.totalDays - student.daysPresent : 0)
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
        <ReportCard 
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