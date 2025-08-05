import { forwardRef } from "react";
import { Card } from "@/components/ui/card";
import aunLogo from "@/assets/aun-logo.png";
import signature from "@/assets/signature.png";

interface AcademyReportCardProps {
  studentName: string;
  grade: string;
  term: string;
  academicYear: string;
  subjects: Array<{
    name: string;
    teacher: string;
    grade: number | string;
    comment: string;
  }>;
  specials: Array<{
    name: string;
    teacher: string;
    grade: number | string;
    comment: string;
  }>;
  scienceSubject?: {
    name: string;
    teacher: string;
    grade: number | string;
    comment: string;
  } | null;
  workHabits: Array<{
    trait: string;
    rating: string;
  }>;
  generalComment: string;
  mathLanguageArt: string;
  englishLanguageArtTeacherName: string;
  attendance: {
    totalDays: number;
    daysPresent: number;
    daysAbsent: number;
  };
  pageRefs: {
    coverRef: any;
    subjectsRef: any;
    specialsRef: any;
    finalRef: any;
  };
}

export const AcademyReportCard = forwardRef<HTMLDivElement, AcademyReportCardProps>(
  ({ 
    studentName, 
    grade, 
    term, 
    academicYear, 
    subjects, 
    specials, 
    scienceSubject, 
    workHabits, 
    generalComment, 
    mathLanguageArt, 
    englishLanguageArtTeacherName, 
    attendance,
    pageRefs 
  }, ref) => {
    
    // Cover Page
    const CoverPage = () => (
      <div ref={pageRefs.coverRef} className="w-[794px] h-[1123px] bg-white p-8 flex flex-col font-serif">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img src={aunLogo} alt="AUN Logo" className="h-16" />
          <div className="text-center flex-1 mx-4">
            <h1 className="text-2xl font-bold text-primary">AMERICAN UNIVERSITY OF NIGERIA</h1>
            <h2 className="text-xl font-semibold text-primary">PREPARATORY SCHOOL</h2>
            <h3 className="text-lg font-medium text-primary">ACADEMY</h3>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Report Card Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">REPORT CARD</h2>
          <div className="w-32 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Student Information */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold w-32">Student Name:</span>
              <span className="border-b border-gray-400 flex-1 pl-2">{studentName}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Class:</span>
              <span className="border-b border-gray-400 flex-1 pl-2">{grade}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold w-32">Term:</span>
              <span className="border-b border-gray-400 flex-1 pl-2">{term}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Academic Year:</span>
              <span className="border-b border-gray-400 flex-1 pl-2">{academicYear}</span>
            </div>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">GRADING SCALE</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Academic Subjects:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>A = 90-100</span>
                  <span>Outstanding</span>
                </div>
                <div className="flex justify-between">
                  <span>B = 80-89</span>
                  <span>Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span>C = 70-79</span>
                  <span>Good</span>
                </div>
                <div className="flex justify-between">
                  <span>D = 60-69</span>
                  <span>Satisfactory</span>
                </div>
                <div className="flex justify-between">
                  <span>F = Below 60</span>
                  <span>Needs Improvement</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Work Habits & Special Areas:</h4>
              <div className="space-y-1 text-sm">
                <div>O = Outstanding</div>
                <div>S = Satisfactory</div>
                <div>N = Needs Improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-1 flex items-end">
          <div className="w-full text-center">
            <div className="border-t border-gray-300 pt-4">
              <p className="text-sm text-gray-600">This report card reflects the student's academic performance and personal development</p>
            </div>
          </div>
        </div>
      </div>
    );

    // Subjects Page
    const SubjectsPage = () => (
      <div ref={pageRefs.subjectsRef} className="w-[794px] h-[1123px] bg-white p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-primary">ACADEMIC SUBJECTS</h2>
          <p className="text-sm text-gray-600">{studentName} - {grade}</p>
        </div>

        {/* Academic Subjects Table */}
        <div className="mb-8">
          <table className="w-full border-2 border-gray-800">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-3 text-left font-semibold">SUBJECT</th>
                <th className="border border-gray-800 p-3 text-center font-semibold w-20">GRADE</th>
                <th className="border border-gray-800 p-3 text-left font-semibold">TEACHER</th>
                <th className="border border-gray-800 p-3 text-left font-semibold">COMMENTS</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-800 p-3 font-medium">{subject.name}</td>
                  <td className="border border-gray-800 p-3 text-center font-bold text-lg">
                    {typeof subject.grade === 'number' ? subject.grade : subject.grade}
                  </td>
                  <td className="border border-gray-800 p-3">{subject.teacher}</td>
                  <td className="border border-gray-800 p-3 text-sm">{subject.comment}</td>
                </tr>
              ))}
              {/* Fill empty rows if needed */}
              {Array.from({ length: Math.max(0, 6 - subjects.length) }).map((_, index) => (
                <tr key={`empty-${index}`} className={subjects.length + index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-800 p-3 h-12"></td>
                  <td className="border border-gray-800 p-3"></td>
                  <td className="border border-gray-800 p-3"></td>
                  <td className="border border-gray-800 p-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Science Subject (if applicable) */}
        {scienceSubject && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">SCIENCE</h3>
            <table className="w-full border-2 border-gray-800">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-800 p-3 text-left font-semibold">SUBJECT</th>
                  <th className="border border-gray-800 p-3 text-center font-semibold w-20">GRADE</th>
                  <th className="border border-gray-800 p-3 text-left font-semibold">TEACHER</th>
                  <th className="border border-gray-800 p-3 text-left font-semibold">COMMENTS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 p-3 font-medium">{scienceSubject.name}</td>
                  <td className="border border-gray-800 p-3 text-center font-bold text-lg">
                    {typeof scienceSubject.grade === 'number' ? scienceSubject.grade : scienceSubject.grade}
                  </td>
                  <td className="border border-gray-800 p-3">{scienceSubject.teacher}</td>
                  <td className="border border-gray-800 p-3 text-sm">{scienceSubject.comment}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Attendance */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">ATTENDANCE</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{attendance.totalDays}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{attendance.daysPresent}</div>
                <div className="text-sm text-gray-600">Days Present</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{attendance.daysAbsent}</div>
                <div className="text-sm text-gray-600">Days Absent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Special Areas Page
    const SpecialAreasPage = () => (
      <div ref={pageRefs.specialsRef} className="w-[794px] h-[1123px] bg-white p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-primary">SPECIAL AREAS & WORK HABITS</h2>
          <p className="text-sm text-gray-600">{studentName} - {grade}</p>
        </div>

        {/* Special Areas */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">SPECIAL AREAS</h3>
          <table className="w-full border-2 border-gray-800">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-3 text-left font-semibold">SUBJECT</th>
                <th className="border border-gray-800 p-3 text-center font-semibold w-20">RATING</th>
                <th className="border border-gray-800 p-3 text-left font-semibold">TEACHER</th>
              </tr>
            </thead>
            <tbody>
              {specials.map((special, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-800 p-3 font-medium">{special.name}</td>
                  <td className="border border-gray-800 p-3 text-center font-bold">
                    {typeof special.grade === 'number' && special.grade >= 90 ? 'O' :
                     typeof special.grade === 'number' && special.grade >= 70 ? 'S' :
                     typeof special.grade === 'number' && special.grade < 70 ? 'N' :
                     special.grade}
                  </td>
                  <td className="border border-gray-800 p-3">{special.teacher}</td>
                </tr>
              ))}
              {/* Fill empty rows */}
              {Array.from({ length: Math.max(0, 5 - specials.length) }).map((_, index) => (
                <tr key={`special-empty-${index}`} className={specials.length + index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-800 p-3 h-12"></td>
                  <td className="border border-gray-800 p-3"></td>
                  <td className="border border-gray-800 p-3"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Work Habits */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">WORK HABITS & SOCIAL DEVELOPMENT</h3>
          <table className="w-full border-2 border-gray-800">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 p-3 text-left font-semibold">TRAIT</th>
                <th className="border border-gray-800 p-3 text-center font-semibold w-20">RATING</th>
              </tr>
            </thead>
            <tbody>
              {workHabits.map((habit, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-800 p-3">{habit.trait}</td>
                  <td className="border border-gray-800 p-3 text-center font-bold">
                    {habit.rating === 'Outstanding' ? 'O' :
                     habit.rating === 'Satisfactory' ? 'S' :
                     habit.rating === 'Needs Improvement' ? 'N' :
                     habit.rating.charAt(0).toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Rating Scale:</h4>
          <div className="text-sm space-y-1">
            <div><strong>O</strong> = Outstanding</div>
            <div><strong>S</strong> = Satisfactory</div>
            <div><strong>N</strong> = Needs Improvement</div>
          </div>
        </div>
      </div>
    );

    // Final Page with Comments and Signatures
    const FinalPage = () => (
      <div ref={pageRefs.finalRef} className="w-[794px] h-[1123px] bg-white p-8 font-serif">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-primary">TEACHER COMMENTS & SIGNATURES</h2>
          <p className="text-sm text-gray-600">{studentName} - {grade}</p>
        </div>

        {/* General Comments */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">GENERAL COMMENTS</h3>
          <div className="border-2 border-gray-300 p-4 min-h-[100px] bg-gray-50">
            <p className="text-sm leading-relaxed">{generalComment || "No general comments provided."}</p>
          </div>
        </div>

        {/* Signatures Section */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Class Teacher</h4>
              <div className="border-b border-gray-400 pb-2 mb-2">
                <p className="text-sm">{englishLanguageArtTeacherName}</p>
              </div>
              <div className="text-center">
                <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-xs">Signature</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Mathematics Teacher</h4>
              <div className="border-b border-gray-400 pb-2 mb-2">
                <p className="text-sm">{mathLanguageArt}</p>
              </div>
              <div className="text-center">
                <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-xs">Signature</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Head of Academy</h4>
              <div className="border-b border-gray-400 pb-2 mb-2">
                <p className="text-sm">Dr. Sarah Johnson</p>
              </div>
              <div className="text-center">
                <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-xs">Signature</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Principal</h4>
              <div className="border-b border-gray-400 pb-2 mb-2">
                <p className="text-sm">Mrs. Elizabeth Williams</p>
              </div>
              <div className="text-center">
                <img src={signature} alt="Signature" className="h-12 mx-auto mb-2" />
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-xs">Signature</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="text-center border-t border-gray-300 pt-4">
            <p className="text-xs text-gray-600">
              American University of Nigeria - Preparatory School Academy
            </p>
            <p className="text-xs text-gray-600">
              Academic Year: {academicYear} | {term}
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div ref={ref} className="academy-report-card">
        <CoverPage />
        <SubjectsPage />
        <SpecialAreasPage />
        <FinalPage />
      </div>
    );
  }
);

AcademyReportCard.displayName = "AcademyReportCard";