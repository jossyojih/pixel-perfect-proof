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
      <div ref={pageRefs.coverRef} className="w-[794px] h-[1123px] bg-white p-6 font-sans text-black">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img src={aunLogo} alt="AUN Logo" className="h-16 w-16" />
          <div className="text-center flex-1">
            <h1 className="text-lg font-bold">American University of Nigeria Schools - Academy</h1>
            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
            <h2 className="text-lg font-bold mt-2">STUDENT REPORT CARD</h2>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Student Information Grid */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-sm">
          <div className="bg-red-100 p-2">
            <div className="font-bold">Student's ID</div>
            <div>{studentId}</div>
          </div>
          <div className="bg-green-100 p-2">
            <div className="font-bold">Student's Name</div>
            <div>{studentName}</div>
          </div>
          <div className="bg-blue-100 p-2">
            <div className="font-bold">Academic Year</div>
            <div>{academicYear}</div>
          </div>
          <div className="bg-yellow-100 p-2">
            <div className="font-bold">Term</div>
            <div>{term}</div>
          </div>
          <div className="bg-gray-100 p-2">
            <div className="font-bold">Class</div>
            <div>{studentClass}</div>
          </div>
          <div className="bg-purple-100 p-2">
            <div className="font-bold">Position in Class</div>
            <div>{positionInClass || '-'}</div>
          </div>
          <div className="bg-pink-100 p-2">
            <div className="font-bold">No. in Class</div>
            <div>{noInClass || '-'}</div>
          </div>
          <div className="bg-orange-100 p-2">
            <div className="font-bold">Total Subject</div>
            <div>{totalSubjects}</div>
          </div>
        </div>

        {/* Subjects Table */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead>
            <tr className="bg-blue-200">
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
              <th className="border border-black p-1">Teacher's Average</th>
            </tr>
          </thead>
          <tbody>
            {orderedSubjects.map((subject, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-black p-1 font-medium">{subject.name}</td>
                <td className="border border-black p-1 text-center">{subject.ca1 || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.ca2 || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.ca3 || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.ca4 || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.exam || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.total || '-'}</td>
                <td className="border border-black p-1 text-center font-bold">{subject.score || '-'}</td>
                <td className="border border-black p-1 text-center font-bold">{subject.grade || getLetterGrade(subject.score)}</td>
                <td className="border border-black p-1 text-center">{subject.position || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.remark || '-'}</td>
                <td className="border border-black p-1 text-center">{subject.teachersAverage || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="bg-gray-100 p-2">
            <span className="font-bold">Cumulative Score:</span> {cumulativeScore || '-'}
          </div>
          <div className="bg-gray-100 p-2">
            <span className="font-bold">Cut-Off Average:</span> {cutOffAverage || '-'}
          </div>
          <div className="bg-gray-100 p-2">
            <span className="font-bold">Student's Average:</span> {studentsAverage || '-'}
          </div>
        </div>

        {/* Grade Descriptors */}
        <div className="mb-4">
          <h3 className="text-center font-bold bg-blue-200 p-2 mb-2">GRADE DESCRIPTORS</h3>
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-black p-1">% Score</th>
                <th className="border border-black p-1">Grade</th>
                <th className="border border-black p-1">Descriptor</th>
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
        <div className="mb-6">
          <h3 className="text-center font-bold bg-purple-200 p-2 mb-2">PERSONAL TUTOR'S COMMENT</h3>
          <div className="border border-black p-4 min-h-[60px] bg-gray-50">
            <p className="text-sm">{personalTutorComment}</p>
          </div>
        </div>

        {/* Signature */}
        <div className="text-center mt-8">
          <div className="inline-block">
            <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
            <div className="border-t border-black pt-2 w-48">
              <p className="text-sm font-bold">N. Y. Mikail</p>
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