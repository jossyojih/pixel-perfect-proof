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
  const coverRef = useRef<HTMLDivElement>(null);
  const subjectsRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get Charter student data from localStorage
    const studentsData = localStorage.getItem('charterStudentsData');
    if (studentsData) {
      const students = JSON.parse(studentsData);
      const foundStudent = students.find((s: any) => s.name === studentName);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        toast({
          title: "Charter student not found",
          description: "Please go back and select a student from the Charter list.",
          variant: "destructive"
        });
        // navigate('/charter-upload');
      }
    } else {
      toast({
        title: "No Charter student data found",
        description: "Please upload an Charter Excel file first.",
        variant: "destructive"
      });
      // navigate('/charter-upload');
    }
  }, [studentName, navigate, toast]);

  const generateCharterReportData = (student: any) => {
    console.log('\n=== CHARTER REPORT DATA GENERATION ===');
    console.log('Student name:', student.name);
    console.log('Student raw data available:', student.rawData ? Object.keys(student.rawData) : 'No raw data');
    console.log('Student subjects from parsing:', student.subjects?.length || 0);
    console.log('Student subject names:', student.subjects?.map((s: any) => s.name) || []);
    
    // Check if this is Abdallah Mohammed specifically
    if (student.name.toLowerCase().includes('abdallah')) {
      console.log('\n=== ABDALLAH MOHAMMED DETAILED DEBUG ===');
      console.log('Full student object:', student);
      console.log('Raw data keys:', Object.keys(student.rawData || {}));
      
      // Look for any score-related fields in raw data
      const rawData = student.rawData || {};
      const scoreFields = Object.keys(rawData).filter(key => 
        key.includes('total_score') || 
        key.includes('_exam') || 
        key.includes('_ca')
      );
      console.log('Score-related fields in raw data:', scoreFields);
      
      scoreFields.forEach(field => {
        console.log(`${field}: ${rawData[field]}`);
      });
    }
    
    // Use actual data from Excel parsing and filter subjects with complete scores
    const charterSubjects = student.subjects
      .map((subject: any) => {
        console.log('Processing subject for report:', subject.name, 'with data:', subject);
        
        const getLetterGrade = (score: number): string => {
          if (score >= 91) return 'A1';
          if (score >= 81) return 'B2';  
          if (score >= 71) return 'B3';
          if (score >= 65) return 'C4';
          if (score >= 60) return 'C5';
          if (score >= 50) return 'C6';
          if (score >= 45) return 'D7';
          if (score >= 40) return 'E8';
          return 'F9';
        };

        // Use actual scores from Excel data
        const totalScore = subject.totalScore || subject.grade || 0;
        const ca1 = subject.ca1 || 0;
        const ca2 = subject.ca2 || 0;
        const ca3 = subject.ca3 || 0;
        const ca4 = subject.ca4 || 0;
        const exam = subject.exam || 0;
        const gradeValue = subject.gradeValue || getLetterGrade(totalScore);
        const position = subject.position || 0;
        const comment = subject.comment || '';
        const cssAverage = subject.cssAverage || 0;

        return {
          name: subject.name,
          ca1: ca1,
          ca2: ca2,
          ca3: ca3,
          ca4: ca4,
          exam: exam,
          total: totalScore,
          score: totalScore,
          grade: gradeValue,
          position: position,
          remark: comment || (totalScore >= 70 ? 'Good' : totalScore >= 60 ? 'Satisfactory' : 'Needs Improvement'),
          teachersAverage: cssAverage
        };
      })
      .filter((subject: any) => {
        // Only include subjects that have a Total Score
        const includeSubject = subject.total > 0;
        
        console.log(`Subject ${subject.name}: Total=${subject.total}, Include=${includeSubject}`);
        
        return includeSubject;
      });

    // Extract actual student data from Excel fields
    const rawData = student.rawData || {};
    console.log('Extracting student info from rawData:', rawData);
    
    // Student ID from Excel field __EMPTY_1
    const studentId = rawData['__EMPTY_1'] || rawData['Roll No'] || rawData['roll_no'] || 
                     rawData['ROLL NO'] || rawData['Roll_No'] || rawData['__EMPTY'] || 
                     `AUN${Date.now().toString().slice(-4)}`;
    
    // Term data from Excel
    const termData = rawData['term_name'] || rawData['term'] || rawData['Term'] || 
                    rawData['TERM'] || rawData['current_term'] || rawData['school_term'] || "Term 3";
    
    // Position in class from Excel field position_class
    const positionInClass = parseInt(rawData['position_class']) || 
                           parseInt(rawData['position_in_class']) || 
                           parseInt(rawData['Position in Class']) || 
                           parseInt(rawData['position']) || 
                           parseInt(rawData['Position']) || 
                           parseInt(rawData['class_position']) || 
                           parseInt(rawData['overall_position']) || 
                           parseInt(rawData['rank']) || 
                           parseInt(rawData['pos']) || 0;
    
    // Cumulative Score from Excel field cumulative_score
    const cumulativeScore = parseFloat(rawData['cumulative_score']) || 
                           charterSubjects.filter(s => s.total > 0).reduce((sum, s) => sum + s.total, 0);
    
    // Student's Average from Excel field student_average
    const studentsAverage = parseFloat(rawData['student_average']) || 
                           (charterSubjects.filter(s => s.total > 0).length > 0 ? 
                            cumulativeScore / charterSubjects.filter(s => s.total > 0).length : 0);
    
    // Number in class from Excel
    const noInClass = parseInt(rawData['no_in_class']) || 
                     parseInt(rawData['No in Class']) || 
                     parseInt(rawData['class_size']) || 
                     parseInt(rawData['total_students']) || 
                     parseInt(rawData['class_total']) || 
                     parseInt(rawData['students_in_class']) || 15;
    
    // Total subjects count based on actual subjects offered by the student
    const totalSubjects = charterSubjects.length;
    
    const selectedClass = localStorage.getItem('selectedCharterClass') || localStorage.getItem('selectedClass') || "Year 7";
    
    console.log('Extracted student info:', {
      studentId,
      termData,
      positionInClass,
      noInClass,
      totalSubjects,
      selectedClass
    });
    
    return {
      studentId: studentId,
      studentName: student.name,
      class: selectedClass,
      academicYear: "2024/2025",
      positionInClass: positionInClass,
      noInClass: noInClass,
      term: termData,
      totalSubjects: totalSubjects,
      subjects: charterSubjects,
      cumulativeScore: cumulativeScore,
      cutOffAverage: 50,
      studentsAverage: studentsAverage,
      personalTutorComment: rawData['teacher_comment'] || student.Comments || student.comments || "The student has shown excellent progress throughout the term and demonstrates strong academic potential."
    };
  };

  const uploadToSupabase = async () => {
    if (!student || !coverRef.current) return;
  
    setIsUploading(true);
    try {
      const reportData = generateCharterReportData(student);
  
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
  
      // You can add more refs here if needed
      const pageRefs = [coverRef, subjectsRef, specialsRef, finalRef];
  
      for (let i = 0; i < pageRefs.length; i++) {
        const pageElement = pageRefs[i].current;
        if (!pageElement) continue;
  
        // Optional: force A4 size for rendering layout consistency
        pageElement.style.width = '794px';
        pageElement.style.minHeight = '1123px';
        pageElement.style.padding = '24px';
        pageElement.style.boxSizing = 'border-box';
        pageElement.style.backgroundColor = '#ffffff';
  
        const canvas = await html2canvas(pageElement, {
          scale: 3, // High resolution
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0
        });
  
        const imgData = canvas.toDataURL('image/png');
  
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        const yPosition = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 0;
  
        if (i > 0) pdf.addPage();
  
        pdf.addImage(imgData, 'PNG', 0, yPosition, imgWidth, Math.min(imgHeight, pageHeight));
      }
  
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
          class_tag: localStorage.getItem('selectedCharterClass') || 'Year 7',
          grade_tag: 'Charter',
          uploaded_at: new Date().toISOString()
        });
  
      if (dbError) throw dbError;
  
      toast({
        title: "Charter report uploaded successfully!",
        description: `Charter report for ${student.name} has been uploaded as PDF.`
      });
    } catch (error) {
      console.error('Charter upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the Charter report. Please try again.",
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

  const reportData = generateCharterReportData(student);
  const reshapedReportData = {
    name: reportData.studentName,
    grade: reportData.class,
    academicYear: reportData.academicYear,
    term: reportData.term,
    date: new Date().toLocaleDateString(), // or a date from data
    subjects: reportData.subjects,
    average: reportData.studentsAverage,
    attendance: {
      unexpectedAbsence: 0,
      explainedAbsence: 0,
      late: 0
    },
    remarks: {
      interpersonal: "",
      effort: "",
      classBehaviour: ""
    },
    comment: reportData.personalTutorComment || ""
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Charter Report for {student.name}</h1>
          <p className="text-muted-foreground">Charter - {reportData.class}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/charter-upload')}>
            Back to Charter Students
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
          {...reshapedReportData} 
        />
      </div>
    </div>
  );
}