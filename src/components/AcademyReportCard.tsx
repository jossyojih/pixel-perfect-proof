import { forwardRef } from "react";
import aunLogo from "@/assets/aun-logo.png";
import signature from "@/assets/signature.png";

interface AcademySubject {
  name: string;
  ca1?: number;
  ca2?: number;
  ca3?: number;
  ca4?: number;
  exam?: number;
  total: number;
  grade: string;
  position?: number;
  remark: string;
  teachersAverage?: number;
}

interface AcademyReportCardProps {
  studentId: string;
  studentName: string;
  class: string;
  academicYear: string;
  positionInClass?: number;
  noInClass?: number;
  term: string;
  totalSubjects: number;
  subjects: AcademySubject[];
  cumulativeScore?: number;
  cutOffAverage?: number;
  studentsAverage?: number;
  personalTutorComment: string;
  pageRefs: {
    coverRef: any;
    subjectsRef?: any;
    specialsRef?: any;
    finalRef?: any;
  };
}

export const AcademyReportCard = forwardRef<HTMLDivElement, AcademyReportCardProps>(
  ({ 
    studentId, studentName, class: studentClass, academicYear, positionInClass, 
    noInClass, term, totalSubjects, subjects, cumulativeScore, cutOffAverage, 
    studentsAverage, personalTutorComment, pageRefs 
  }, ref) => {
    
    // Filter subjects to only show those with actual data for this student
    const studentSubjects = subjects.filter(subject => 
      subject && (subject.total > 0 || subject.ca1 || subject.ca2 || subject.ca3 || subject.ca4 || subject.exam)
    );

    const ReportPage = () => (
      <div ref={pageRefs.coverRef} className="relative w-[794px] h-[1123px] bg-white p-7 font-sans text-black text-xs overflow-hidden">
        {/* Logo Watermark */}
        <div className="absolute inset-0 mb-5 flex items-center justify-center pointer-events-none opacity-30">
          <img 
            src={"/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"} 
            alt="AUN Logo Watermark" 
            className="w-[740px] h-[800px]" 
          />
        </div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-start mb-1 ml-0">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-[130px] w-[130px] -ml-8" 
          />
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold">American University of Nigeria Schools – Academy</h1>
            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
            <h2 className="text-lg font-bold mt-2">STUDENT REPORT CARD</h2>
          </div>
        </div>

              {/* Student Information */}
        <div className="relative z-10 mb-1 border-t-[2px] border-b-[2px] border-black">
          <div className="grid grid-cols-3 text-sm text-center mb-2">
            <div className="flex p-[2px]">
              <span className="text-left text-red-400 min-w-[120px]">Student's ID</span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {studentId}</span>
            </div>
            <div className="flex p-[2px] col-span-2 whitespace-nowrap">
              <span className="text-red-400 min-w-[120px] text-left">Student's Name </span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {studentName}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">Class</span>
               <span className="text-red-400">:</span>
              <span className="ml-2"> {studentClass}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">Academic Year</span>
              <span className="text-red-400">:</span>
              <span className="ml-1"> {academicYear}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">Term :</span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {term}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">Position in Class</span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {positionInClass}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">No. in Class</span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {noInClass}</span>
            </div>
            <div className="flex p-[2px]">
              <span className="text-red-400 min-w-[120px] text-left">Total Subject</span>
              <span className="text-red-400">:</span>
              <span className="ml-2"> {totalSubjects}</span>
            </div>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="relative z-10 mb-1">
          <table className="w-full border-collapse border border-black text-xs text-center">
            <thead>
              <tr className="bg-blue-900 text-white" style={{ paddingBottom: '18px' }}>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">Subject Name</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1 style={{ paddingBottom: '8px' }}">CA1</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">CA2</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1 style={{ padding: '8px' }}">CA3</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1 style={{ padding: '8px' }}">CA4</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1 mb-2">Exam</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">Total Score</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">Grade</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">Position</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">Remark</th>
                <th style={{ paddingBottom: '18px' }} className="border border-black p-1">CSS Average</th>
              </tr>
            </thead>
            <tbody>
              {studentSubjects.map((subject, index) => (
                <tr key={index}>
                  <td style={{ paddingBottom: '10px'}} className="border border-black text-left">{subject.name}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.ca1 || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.ca2 || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.ca3 || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.ca4 || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.exam || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.total || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.grade || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.position || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.remark || ''}</td>
                  <td style={{ paddingBottom: '10px' }} className="border border-black">{subject.teachersAverage || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="relative z-10 mb-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-red-500">Cumulative Score: <span className="text-black ml-[2rem]">{cumulativeScore?.toFixed(2) || 0}</span></span>
            <span className="text-red-500" >Cut-Off Average : {cutOffAverage || 50}</span>
            <span className="text-red-500" >Student's Average: <span className="text-black ml-[2rem]">{studentsAverage?.toFixed(2) || 0}</span></span>
          </div>
        </div>

        {/* Grade Descriptors */}
        <div className="relative z-10 mb-4">
          <div className="bg-blue-900 text-white text-center font-bold p-2">
            GRADE DESCRIPTORS
          </div>
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr>
                <th className="border border-black p-1 font-bold text-left">% Score</th>
                <th className="border border-black p-1 font-bold">Grade</th>
                <th className="border border-black p-1 font-bold">Descriptor</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-black p-1">91.00 - 100.00</td><td className="border border-black p-1 text-center">A1</td><td className="border border-black p-1 text-center">Excellent</td></tr>
              <tr><td className="border border-black p-1">81.00 - 90.00</td><td className="border border-black p-1 text-center">B2</td><td className="border border-black p-1 text-center">Very Good</td></tr>
              <tr><td className="border border-black p-1">71.00 - 80.00</td><td className="border border-black p-1 text-center">B3</td><td className="border border-black p-1 text-center">Good</td></tr>
              <tr><td className="border border-black p-1">65.00 - 70.00</td><td className="border border-black p-1 text-center">C4</td><td className="border border-black p-1 text-center">Credit</td></tr>
              <tr><td className="border border-black p-1">60.00 - 64.00</td><td className="border border-black p-1 text-center">C5</td><td className="border border-black p-1 text-center">Credit</td></tr>
              <tr><td className="border border-black p-1">50.00 - 59.00</td><td className="border border-black p-1 text-center">C6</td><td className="border border-black p-1 text-center">Credit</td></tr>
              <tr><td className="border border-black p-1">45.00 - 49.00</td><td className="border border-black p-1 text-center">D7</td><td className="border border-black p-1 text-center">Pass</td></tr>
              <tr><td className="border border-black p-1">40.00 - 44.00</td><td className="border border-black p-1 text-center">E8</td><td className="border border-black p-1 text-center">Pass</td></tr>
              <tr><td className="border border-black p-1">0.00 - 39.00</td><td className="border border-black p-1 text-center">F9</td><td className="border border-black p-1 text-center">Fail</td></tr>
            </tbody>
          </table>
        </div>

        {/* Personal Tutor Comment */}
        <div className="relative z-10 mb-10">
          <div className="text-black text-center font-bold p-2 text-xl">
            PERSONAL TUTOR'S COMMENT
          </div>
          <div className="relative z-10 p-2">
            {personalTutorComment}
          </div>
        </div>

        {/* Signature */}
        <div className="relative z-10 text-center mt-15">
          <div className="inline-block">
            <img src="/lovable-uploads/c610321b-7d11-4eff-a4f8-083660a257b7.png" alt="Signature" className="h-8 mx-auto" />
            <div className="border-t border-black pt-2 w-48">
              <p className="text-sm font-bold">N. Y. Mikail</p>
              <p className="text-sm font-bold">Asst. Director Academics</p>
              <p className="text-sm font-bold">AUN Schools</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div ref={ref} className="academy-report-card">
        <ReportPage />
      </div>
    );
  }
);

AcademyReportCard.displayName = "AcademyReportCard";