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
    
    // Academy subjects in the correct order from template
    const academySubjects = [
      'Mathematics', 'English', 'Global Perspectives', 'Science', 'Digital Literacy',
      'French', 'Arabic', 'Religion IRS', 'Religion CRS', 'Humanities-Geography',
      'Humanities-History', 'Music', 'Physical And Health Education (PHE)', 
      'Arts and Design', 'Hausa'
    ];

    const ReportPage = () => (
      <div ref={pageRefs.coverRef} className="relative w-[794px] h-[1123px] bg-white p-4 font-sans text-black text-xs overflow-hidden">
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <img src={aunLogo} alt="AUN Logo Watermark" className="w-96 h-96" />
        </div>
        
        {/* Header */}
        <div className="relative z-10 flex items-start mb-4">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-16 mr-4" />
          <div className="text-center flex-1">
            <h1 className="text-base font-bold">American University of Nigeria Schools – Academy</h1>
            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
            <h2 className="text-base font-bold mt-2">STUDENT REPORT CARD</h2>
          </div>
        </div>

        {/* Student Information */}
        <div className="relative z-10 mb-4">
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-bold w-1/4">Student's ID</td>
                <td className="border border-black p-2 w-1/4">: {studentId}</td>
                <td className="border border-black p-2 font-bold w-1/4">Student's Name</td>
                <td className="border border-black p-2 w-1/4">: {studentName}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">Class</td>
                <td className="border border-black p-2">: {studentClass}</td>
                <td className="border border-black p-2 font-bold">Academic Year</td>
                <td className="border border-black p-2">: {academicYear}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">Position in Class</td>
                <td className="border border-black p-2">: {positionInClass}</td>
                <td className="border border-black p-2 font-bold">Term</td>
                <td className="border border-black p-2">: {term}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold">No. in Class</td>
                <td className="border border-black p-2">: {noInClass}</td>
                <td className="border border-black p-2 font-bold">Total Subject</td>
                <td className="border border-black p-2">: {totalSubjects}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Subjects Table */}
        <div className="relative z-10 mb-4">
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
              {academySubjects.map((subjectName, index) => {
                const subjectData = subjects.find(s => s.name === subjectName);
                return (
                  <tr key={index}>
                    <td className="border border-black p-1">{subjectName}</td>
                    <td className="border border-black p-1">{subjectData?.ca1 || ''}</td>
                    <td className="border border-black p-1">{subjectData?.ca2 || ''}</td>
                    <td className="border border-black p-1">{subjectData?.ca3 || ''}</td>
                    <td className="border border-black p-1">{subjectData?.ca4 || ''}</td>
                    <td className="border border-black p-1">{subjectData?.exam || ''}</td>
                    <td className="border border-black p-1">{subjectData?.total || ''}</td>
                    <td className="border border-black p-1">{subjectData?.score || ''}</td>
                    <td className="border border-black p-1">{subjectData?.grade || ''}</td>
                    <td className="border border-black p-1">{subjectData?.position || ''}</td>
                    <td className="border border-black p-1">{subjectData?.remark || ''}</td>
                    <td className="border border-black p-1">{subjectData?.teachersAverage || ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="relative z-10 mb-4">
          <table className="w-full border-collapse border border-black text-sm">
            <tbody>
              <tr>
                <td className="border border-black p-2 font-bold w-1/3">Cumulative Score : {cumulativeScore?.toFixed(2) || 0}</td>
                <td className="border border-black p-2 font-bold w-1/3">Cut-Off Average : {cutOffAverage || 50}</td>
                <td className="border border-black p-2 font-bold w-1/3">Student's Average : {studentsAverage?.toFixed(2) || 0}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grade Descriptors */}
        <div className="relative z-10 mb-4">
          <div className="bg-blue-900 text-white text-center font-bold p-2 border border-black">
            GRADE DESCRIPTORS
          </div>
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr>
                <th className="border border-black p-1">% Score</th>
                <th className="border border-black p-1">Grade</th>
                <th className="border border-black p-1">Descriptor</th>
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
          <div className="bg-blue-900 text-white text-center font-bold p-2 border border-black">
            PERSONAL TUTOR'S COMMENT
          </div>
          <div className="border border-black min-h-[60px] p-4 relative">
            {/* SCHOOLS Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl font-bold text-gray-300 opacity-30 transform rotate-12">
                SCHOOLS
              </div>
            </div>
            <div className="relative z-10">
              {personalTutorComment}
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="relative z-10 text-center">
          <div className="inline-block">
            <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
            <div className="border-t border-black pt-2 w-40">
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