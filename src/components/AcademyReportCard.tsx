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
    studentId,
    studentName, 
    class: studentClass,
    academicYear,
    positionInClass,
    noInClass,
    term,
    totalSubjects,
    subjects,
    cumulativeScore,
    cutOffAverage,
    studentsAverage,
    personalTutorComment,
    pageRefs 
  }, ref) => {
    
    // Convert numeric grade to letter grade
    const getLetterGrade = (score: number): string => {
      if (score >= 91) return 'A1';
      if (score >= 81) return 'A2';  
      if (score >= 71) return 'B3';
      if (score >= 65) return 'C4';
      if (score >= 60) return 'C5';
      if (score >= 50) return 'C6';
      if (score >= 45) return 'D7';
      if (score >= 40) return 'E8';
      return 'F9';
    };

    // Get grade description
    const getGradeDescription = (grade: string): string => {
      switch (grade) {
        case 'A1': return 'Excellent';
        case 'A2': return 'Very Good';
        case 'B3': return 'Good';
        case 'C4': case 'C5': case 'C6': return 'Credit';
        case 'D7': case 'E8': return 'Pass';
        case 'F9': return 'Fail';
        default: return '';
      }
    };

    // Academy subjects in the correct order from template
    const academySubjectOrder = [
      'Mathematics', 'English', 'Global Perspectives', 'Science', 'Digital Literacy',
      'French', 'Arabic', 'Religion IRS', 'Religion CRS', 'Humanities-Geography',
      'Humanities-History', 'Music', 'Physical And Health Education (PHE)', 
      'Arts and Design', 'Hausa'
    ];

    // Ensure all subjects are included and ordered correctly
    const orderedSubjects = academySubjectOrder.map(subjectName => {
      const foundSubject = subjects.find(s => 
        s.name.toLowerCase().includes(subjectName.toLowerCase()) ||
        subjectName.toLowerCase().includes(s.name.toLowerCase())
      );
      return foundSubject || {
        name: subjectName,
        ca1: 0,
        ca2: 0, 
        ca3: 0,
        ca4: 0,
        exam: 0,
        total: 0,
        score: 0,
        grade: 'F9',
        remark: '-',
        teachersAverage: 0
      };
    });

    const ReportPage = () => (
      <div ref={pageRefs.coverRef} className="w-[794px] h-[1123px] bg-white p-4 font-sans text-black text-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <img src={aunLogo} alt="AUN Logo" className="h-12 w-12" />
          <div className="text-center flex-1">
            <h1 className="text-sm font-bold">American University of Nigeria Schools - Academy</h1>
            <p className="text-xs">No. 99, Lamido Zubairu Way, Yola Bye - Pass, P.M.B. 2250</p>
            <h2 className="text-sm font-bold mt-1">STUDENT REPORT CARD</h2>
          </div>
          <div className="w-12"></div>
        </div>

        {/* Student Information Grid */}
        <div className="grid grid-cols-4 gap-0 mb-3 text-xs border border-black">
          <div className="bg-red-200 p-1 border-r border-black">
            <div className="font-bold">Student's ID</div>
            <div></div>
          </div>
          <div className="bg-green-200 p-1 border-r border-black">
            <div className="font-bold">Student's Name</div>
            <div></div>
          </div>
          <div className="bg-blue-200 p-1 border-r border-black">
            <div className="font-bold">Academic Year</div>
            <div></div>
          </div>
          <div className="bg-yellow-200 p-1">
            <div className="font-bold">Term</div>
            <div></div>
          </div>
          <div className="bg-purple-200 p-1 border-r border-black border-t border-black">
            <div className="font-bold">Class</div>
            <div></div>
          </div>
          <div className="bg-pink-200 p-1 border-r border-black border-t border-black">
            <div className="font-bold">Position in Class</div>
            <div></div>
          </div>
          <div className="bg-orange-200 p-1 border-r border-black border-t border-black">
            <div className="font-bold">No. in Class</div>
            <div></div>
          </div>
          <div className="bg-cyan-200 p-1 border-t border-black">
            <div className="font-bold">Total Subject</div>
            <div></div>
          </div>
        </div>

        {/* Subjects Table */}
        <table className="w-full border-collapse border border-black text-xs mb-3">
          <thead>
            <tr className="bg-blue-300">
              <th className="border border-black p-1 text-xs">Subject Name</th>
              <th className="border border-black p-1 text-xs">CA1</th>
              <th className="border border-black p-1 text-xs">CA2</th>
              <th className="border border-black p-1 text-xs">CA3</th>
              <th className="border border-black p-1 text-xs">CA4</th>
              <th className="border border-black p-1 text-xs">Exam</th>
              <th className="border border-black p-1 text-xs">Total</th>
              <th className="border border-black p-1 text-xs">Score</th>
              <th className="border border-black p-1 text-xs">Grade</th>
              <th className="border border-black p-1 text-xs">Position</th>
              <th className="border border-black p-1 text-xs">Remark</th>
              <th className="border border-black p-1 text-xs">Teacher's Average</th>
            </tr>
          </thead>
          <tbody>
            {orderedSubjects.map((subject, index) => (
              <tr key={index} className={
                index === 0 || index === 3 || index === 6 || index === 9 || index === 12 ? "bg-green-100" :
                index === 1 || index === 4 || index === 7 || index === 10 || index === 13 ? "bg-blue-100" :
                index === 2 || index === 5 || index === 8 || index === 11 || index === 14 ? "bg-pink-100" : "bg-white"
              }>
                <td className="border border-black p-1 text-xs">{subject.name}</td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
                <td className="border border-black p-1 text-center text-xs"></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-0 mb-3 text-xs border border-black">
          <div className="bg-gray-200 p-1 border-r border-black">
            <span className="font-bold">Cumulative Score :</span>
          </div>
          <div className="bg-gray-200 p-1 border-r border-black">
            <span className="font-bold">Cut-Off Average :</span>
          </div>
          <div className="bg-gray-200 p-1">
            <span className="font-bold">Student's Average :</span>
          </div>
        </div>

        {/* Grade Descriptors */}
        <div className="mb-3">
          <h3 className="text-center font-bold bg-blue-300 p-1 mb-0 text-xs border border-black border-b-0">GRADE DESCRIPTORS</h3>
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-blue-200">
                <th className="border border-black p-1 text-xs">% Score</th>
                <th className="border border-black p-1 text-xs">Grade</th>
                <th className="border border-black p-1 text-xs">Descriptor</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-black p-1">91.00 - 100.00</td><td className="border border-black p-1">A1</td><td className="border border-black p-1">Excellent</td></tr>
              <tr><td className="border border-black p-1">81.00 - 90.00</td><td className="border border-black p-1">A2</td><td className="border border-black p-1">Very Good</td></tr>
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
        <div className="mb-4">
          <h3 className="text-center font-bold bg-blue-300 p-1 mb-0 text-xs border border-black border-b-0">PERSONAL TUTOR'S COMMENT</h3>
          <div className="border border-black p-2 min-h-[40px] bg-white">
          </div>
        </div>

        {/* Signature */}
        <div className="text-center mt-6">
          <div className="inline-block">
            <img src={signature} alt="Signature" className="h-8 mx-auto mb-1" />
            <div className="border-t border-black pt-1 w-32">
              <p className="text-xs font-bold">N. Y. Mikail</p>
              <p className="text-xs">Asst. Director Academics</p>
              <p className="text-xs">AUN Schools</p>
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