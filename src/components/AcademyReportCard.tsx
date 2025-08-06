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
  score: number;
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
      subject && (subject.score > 0 || subject.total > 0 || subject.ca1 || subject.ca2 || subject.ca3 || subject.ca4 || subject.exam)
    );

    const ReportPage = () => (
      <div ref={pageRefs.coverRef} className="relative w-[794px] h-[1123px] bg-white p-4 font-sans text-black text-xs overflow-hidden">
        {/* Logo Watermark */}
        <div className="absolute inset-0 mb-5 flex items-center justify-center pointer-events-none opacity-30">
          <img 
            src={"/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"} 
            alt="AUN Logo Watermark" 
            className="w-[740px] h-[800px]" 
          />
        </div>
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-start mb-1">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-[120px] w-[120px]" 
          />
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold">American University of Nigeria Schools – Academy</h1>
            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
            <h2 className="text-lg font-bold mt-2">STUDENT REPORT CARD</h2>
          </div>
        </div>

        {/* Student Information */}
        <div className="relative z-10 mb-1 border-t-[2px] border-b-[2px] border-black">
          <div className="grid grid-cols-3 text-sm">
            <div className="flex p-[2px]">
              <span className="text-red-400">Student's ID :</span>
              <span className="ml-2"> {studentId}</span>
            </div>
            <div className="flex p-[2px] col-span-2 whitespace-nowrap">
              <span className="text-red-400">Student's Name :</span>
              <span className="ml-2"> {studentName}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">Class :</span>
              <span className="ml-2"> {studentClass}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">Academic Year :</span>
              <span className="ml-1"> {academicYear}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">Term :</span>
              <span className="ml-2"> {term}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">Position in Class :</span>
              <span className="ml-2"> {positionInClass}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">No. in Class :</span>
              <span className="ml-2"> {noInClass}</span>
            </div>
            <div className="flex p-1">
              <span className="text-red-400">Total Subject :</span>
              <span className="ml-2"> {totalSubjects}</span>
            </div>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="relative z-10 mb-2">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="border border-black p-1">Subject Name</th>
                <th className="border border-black p-1">CA1</th>
                <th className="border border-black p-1">CA2</th>
                <th className="border border-black p-1">CA3</th>
                <th className="border border-black p-1">CA4</th>
                <th className="border border-black p-1">Exam</th>
                <th className="border border-black p-1">Total</th>
                <th className="border border-black p-1">Score</th>
                <th className="border border-black p-1">Grade</th>
                <th className="border border-black p-1">Position</th>
                <th className="border border-black p-1">Remark</th>
                <th className="border border-black p-1">CSS Average</th>
              </tr>
            </thead>
            <tbody>
              {studentSubjects.map((subject, index) => (
                <tr key={index}>
                  <td className="border border-black p-1">{subject.name}</td>
                  <td className="border border-black p-1">{subject.ca1 || ''}</td>
                  <td className="border border-black p-1">{subject.ca2 || ''}</td>
                  <td className="border border-black p-1">{subject.ca3 || ''}</td>
                  <td className="border border-black p-1">{subject.ca4 || ''}</td>
                  <td className="border border-black p-1">{subject.exam || ''}</td>
                  <td className="border border-black p-1">{subject.total || ''}</td>
                  <td className="border border-black p-1">{subject.score || ''}</td>
                  <td className="border border-black p-1">{subject.grade || ''}</td>
                  <td className="border border-black p-1">{subject.position || ''}</td>
                  <td className="border border-black p-1">{subject.remark || ''}</td>
                  <td className="border border-black p-1">{subject.teachersAverage || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="relative z-10 mb-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-red-500">Cumulative Score: <span className="text-black ml-7">{cumulativeScore?.toFixed(2) || 0}</span></span>
            <span className="text-red-500" >Cut-Off Average : {cutOffAverage || 50}</span>
            <span className="text-red-500" >Student's Average: <span className="text-black ml-7">{studentsAverage?.toFixed(2) || 0}</span></span>
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
              <tr><td className="border border-black p-1">91.00 - 100.00</td><td className="border border-black p-1">A1</td><td className="border border-black p-1">Excellent</td></tr>
              <tr><td className="border border-black p-1">81.00 - 90.00</td><td className="border border-black p-1">B2</td><td className="border border-black p-1">Very Good</td></tr>
              <tr><td className="border border-black p-1">71.00 - 80.00</td><td className="border border-black p-1">B3</td><td className="border border-black p-1">Good</td></tr>
              <tr><td className="border border-black p-1">65.00 - 70.00</td><td className="border border-black p-1">C4</td><td className="border border-black p-1">Credit</td></tr>
              <tr><td className="border border-black p-1">60.00 - 64.00</td><td className="border border-black p-1">C5</td><td className="border border-black p-1">Credit</td></tr>
              <tr><td className="border border-black p-1">50.00 - 59.00</td><td className="border border-black p-1">C6</td><td className="border border-black p-1">Credit</td></tr>
              <tr><td className="border border-black p-1">45.00 - 49.00</td><td className="border border-black p-1">D7</td><td className="border border-black p-1">Pass</td></tr>
              <tr><td className="border border-black p-1">40.00 - 44.00</td><td className="border border-black p-1">E8</td><td className="border border-black p-1">Pass</td></tr>
              <tr><td className="border border-black p-1">0.00 - 39.00</td><td className="border border-black p-1">F9</td><td className="border border-black p-1">Fail</td></tr>
            </tbody>
          </table>
        </div>

        {/* Personal Tutor Comment */}
        <div className="relative z-10 mb-6">
          <div className="text-black text-center font-bold p-2">
            PERSONAL TUTOR'S COMMENT
          </div>
          <div className="relative z-10 p-2">
            {personalTutorComment}
          </div>
        </div>

        {/* Signature */}
        <div className="relative z-10 text-center mt-10">
          <div className="inline-block">
            <img src="/lovable-uploads/c610321b-7d11-4eff-a4f8-083660a257b7.png" alt="Signature" className="h-9 mx-auto mb-2" />
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