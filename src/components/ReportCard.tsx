import { Card } from "@/components/ui/card";
import { forwardRef } from "react";

interface Subject {
  name: string;
  grade: number | "N/A";
  teacher: string;
  comment?: string;
}

interface Special {
  name: string;
  grade: number | "N/A";
  teacher: string;
}

interface WorkHabit {
  trait: string;
  rating: string;
}

interface ReportCardProps {
  studentName: string;
  grade: string;
  term: string;
  academicYear: string;
  subjects: Subject[];
  specials: Special[];
  scienceSubject?: Subject;
  workHabits: WorkHabit[];
  generalComment: string;
  attendance: {
    totalDays: number;
    daysPresent: number;
    daysAbsent: number;
  };
  pageRefs?: {
    coverRef: React.RefObject<HTMLDivElement>;
    subjectsRef: React.RefObject<HTMLDivElement>;
    specialsRef: React.RefObject<HTMLDivElement>;
    finalRef: React.RefObject<HTMLDivElement>;
  };
}

export const ReportCard = ({
  studentName,
  grade,
  term,
  academicYear,
  subjects,
  specials,
  scienceSubject,
  workHabits,
  generalComment,
  attendance,
  pageRefs,
}: ReportCardProps) => {
  return (
    <div className="bg-white font-sans">
      {/* Cover Page */}
      <div ref={pageRefs?.coverRef} className="w-full h-screen p-12 flex flex-col justify-between" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="border-4 border-blue-700 p-8 h-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-12">
              <img 
                src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
                alt="AUN Schools Logo" 
                className="h-32 mx-auto"
              />
            </div>
            
            <h1 className="text-xl font-bold text-black mb-8">
              AUN SCHOOLS-ELEMENTARY
            </h1>
            
            <div className="space-y-4 mb-12">
              <h2 className="text-lg font-bold italic text-black">
                End of Term Report
              </h2>
              <p className="text-lg font-medium text-blue-600">
                Term 3
              </p>
              <p className="text-lg text-black">
                2024 - 2025
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-black">
                {studentName}
              </h3>
              <p className="text-lg font-medium text-black">
                {grade}
              </p>
              <p className="text-base text-black">
                Emmanuel O. Abioye, Monsurat Opeyemi Adebimpe
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-xs text-black border-t border-gray-300 pt-4">
            <div className="flex justify-between">
              <div>
                <p className="font-bold mb-1">ADDRESS</p>
                <p>AUN Schools-Elementary</p>
                <p>99 Lamido Zubairu Way</p>
                <p>Yola Bypass</p>
                <p>Yola Adamawa State</p>
              </div>
              <div className="text-right">
                <p className="font-bold mb-1">CONTACT</p>
                <p>Phone: +2348032425524</p>
                <p>Email: info@aunschools.net</p>
                <p>Website: aunschools.net</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Subjects Page */}
      <div ref={pageRefs?.subjectsRef} className="w-full p-6 flex flex-col" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="mb-12">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-24"
          />
        </div>

        <div className="flex-1 space-y-8">
          {subjects.map((subject, index) => (
            <div key={index} className="border border-black">
              <div className="bg-gray-600 px-4 py-3 flex justify-between items-center border-b border-black">
                <h3 className="font-medium text-white">{subject.name}</h3>
                <span className="font-medium text-white">{subject.teacher}</span>
              </div>
              
              <div className="bg-gray-400 px-4 py-2 border-b border-black">
                <span className="font-medium text-black">Term Report</span>
              </div>
              
              <div className="p-6 bg-white border-b border-black">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black font-medium">Grade</span>
                  <span className="text-2xl font-bold text-black">{subject.grade}</span>
                </div>
                {subject.comment && (
                  <p className="text-base text-black leading-relaxed mt-4">
                    {subject.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-xs text-black border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <div>
              <p className="font-bold mb-1">ADDRESS</p>
              <p>AUN Schools-Elementary</p>
              <p>99 Lamido Zubairu Way</p>
              <p>Yola Bypass</p>
              <p>Yola Adamawa State</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">CONTACT</p>
              <p>Phone: +2348032425524</p>
              <p>Email: info@aunschools.net</p>
              <p>Website: aunschools.net</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specials Page */}
      <div ref={pageRefs?.specialsRef} className="w-full p-6 flex flex-col" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="mb-12">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-24"
          />
        </div>

        <div className="flex-1 space-y-8">
          {/* Science Subject Section */}
          {scienceSubject && (
            <div className="border border-black mb-8">
              <div className="bg-gray-600 px-4 py-3 flex justify-between items-center border-b border-black">
                <h3 className="font-medium text-white">{scienceSubject.name}</h3>
                <span className="font-medium text-white">{scienceSubject.teacher}</span>
              </div>
              
              <div className="bg-gray-400 px-4 py-2 border-b border-black">
                <span className="font-medium text-black">Term Report</span>
              </div>
              
              <div className="p-6 bg-white border-b border-black">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-black font-medium">Grade</span>
                  <span className="text-2xl font-bold text-black">{scienceSubject.grade}</span>
                </div>
                {scienceSubject.comment && (
                  <p className="text-base text-black leading-relaxed mt-4">
                    {scienceSubject.comment}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Specials Table */}
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th className="border-r border-black px-6 py-4 text-left font-bold text-white text-base">
                    Specials
                  </th>
                  <th className="border-r border-black px-6 py-4 text-center font-bold text-white text-base">
                    Grade
                  </th>
                  <th className="px-6 py-4 text-center font-bold text-white text-base">
                    Subject Teacher's Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {specials.map((special, index) => (
                  <tr key={index} className="border-t border-black">
                    <td className="border-r border-black px-6 py-4 bg-gray-300 text-black font-medium text-base">
                      {special.name}
                    </td>
                    <td className="border-r border-black px-6 py-4 text-center text-black font-medium bg-white text-base">
                      {special.grade}
                    </td>
                    <td className="px-6 py-4 text-center text-black font-medium bg-white text-base">
                      {special.teacher}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-xs text-black border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <div>
              <p className="font-bold mb-1">ADDRESS</p>
              <p>AUN Schools-Elementary</p>
              <p>99 Lamido Zubairu Way</p>
              <p>Yola Bypass</p>
              <p>Yola Adamawa State</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">CONTACT</p>
              <p>Phone: +2348032425524</p>
              <p>Email: info@aunschools.net</p>
              <p>Website: aunschools.net</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Habits and Final Page */}
      <div ref={pageRefs?.finalRef} className="w-full p-6 flex flex-col" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="mb-8">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-24"
          />
        </div>

        <div className="flex-1 space-y-6">
          {/* Work Habits Table */}
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th className="border-r border-black px-4 py-3 text-left font-bold text-white">
                    Work Habits/Conduct
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-white">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {workHabits.map((habit, index) => (
                  <tr key={index} className="border-t border-black">
                    <td className="border-r border-black px-4 py-3 text-black bg-white">
                      {habit.trait}
                    </td>
                    <td className="px-4 py-3 text-center text-black bg-white">
                      {habit.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Metrics Table */}
          <div className="border border-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-600">
                  <th colSpan={6} className="px-4 py-3 text-center font-bold text-white">
                    Metrics
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black">
                  <td className="border-r border-black px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    A = 90-100%
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Superior
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    D = 60-69%
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Below Average
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    B = 80-89%
                  </td>
                  <td className="px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Above Average
                  </td>
                </tr>
                <tr className="border-t border-black">
                  <td className="border-r border-black px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    C = 70-79%
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Average
                  </td>
                  <td className="border-r border-black px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    U = 0-59%
                  </td>
                  <td className="px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Unsatisfactory
                  </td>
                  <td colSpan={2} className="bg-gray-400 border-l border-black"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comments Section */}
          <div className="border border-black">
            <div className="bg-gray-600 px-4 py-3 border-b border-black">
              <h3 className="font-bold text-white">Comments</h3>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm text-black leading-relaxed">
                {generalComment}
              </p>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="border border-black">
            <div className="bg-gray-600 px-4 py-3 border-b border-black">
              <h3 className="font-bold text-white">Attendance</h3>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border-r border-black px-4 py-3 text-black font-medium bg-white">No. of School Days</td>
                  <td className="border-r border-black px-4 py-3 text-center text-black font-bold bg-white">{attendance.totalDays}</td>
                  <td className="border-r border-black px-4 py-3 text-black font-medium bg-white">Days Present</td>
                  <td className="border-r border-black px-4 py-3 text-center text-black font-bold bg-white">{attendance.daysPresent}</td>
                  <td className="border-r border-black px-4 py-3 text-black font-medium bg-white">Days Absent</td>
                  <td className="px-4 py-3 text-center text-black font-bold bg-white">{attendance.daysAbsent}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature Section */}
          <div className="text-center space-y-4 mt-6">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" 
                alt="Signature" 
                className="h-16"
              />
            </div>
            <div className="border-t border-black w-64 mx-auto"></div>
            <div className="space-y-1">
              <p className="font-bold text-black">N. Y. Mikail</p>
              <p className="text-sm text-black font-medium">Asst. Director Academics</p>
              <p className="text-sm text-black font-medium">AUN Schools</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-xs text-black border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <div>
              <p className="font-bold mb-1">ADDRESS</p>
              <p>AUN Schools-Elementary</p>
              <p>99 Lamido Zubairu Way</p>
              <p>Yola Bypass</p>
              <p>Yola Adamawa State</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-1">CONTACT</p>
              <p>Phone: +2348032425524</p>
              <p>Email: info@aunschools.net</p>
              <p>Website: aunschools.net</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};