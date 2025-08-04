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
  workHabits,
  generalComment,
  attendance,
  pageRefs,
}: ReportCardProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Cover Page */}
      <Card ref={pageRefs?.coverRef} className="p-8 min-h-[297mm] border-4 border-blue-800 flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
                alt="AUN Schools Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            <h1 className="text-xl font-bold text-black tracking-wide">
              AUN SCHOOLS-ELEMENTARY
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-lg font-bold italic text-black">
                End of Term Report
              </h2>
              <p className="text-lg font-medium text-blue-600">
                Term 1
              </p>
              <p className="text-lg text-black">
                2024 - 2025
              </p>
            </div>
            
            <div className="space-y-6 mt-12">
              <h3 className="text-xl font-bold text-black">
                {studentName}
              </h3>
              <p className="text-lg font-medium text-black">
                {grade}
              </p>
              <p className="text-base text-black">
                Prisca Oyinkansola Oyewale, Monsurat Opeyemi Adebimpe
              </p>
            </div>
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
      </Card>

      {/* Academic Subjects Page */}
      <Card ref={pageRefs?.subjectsRef} className="p-6 min-h-[297mm] border-0 flex flex-col">
        <div className="flex justify-start mb-8">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="flex-1 space-y-6">
          {subjects.map((subject, index) => (
            <div key={index} className="border border-gray-400">
              <div className="bg-gray-400 px-4 py-3 flex justify-between items-center">
                <h3 className="font-medium text-black">{subject.name}</h3>
                <span className="font-medium text-black">{subject.teacher}</span>
              </div>
              
              <div className="border-b border-gray-400 bg-gray-400 px-4 py-2">
                <span className="font-medium text-black">Term Report</span>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-black">Grade</span>
                  <span className="text-xl font-bold text-black">{subject.grade}</span>
                </div>
                {subject.comment && (
                  <p className="text-sm text-black leading-relaxed mt-3">
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
      </Card>

      {/* Specials Page */}
      <Card ref={pageRefs?.specialsRef} className="p-6 min-h-[297mm] border-0 flex flex-col">
        <div className="flex justify-start mb-8">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="flex-1">
          {/* Specials Table */}
          <div className="overflow-hidden border border-gray-400 mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-400">
                  <th className="border-r border-gray-400 px-4 py-3 text-left font-bold text-black">
                    Specials
                  </th>
                  <th className="border-r border-gray-400 px-4 py-3 text-center font-bold text-black">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-black">
                    Subject Teacher's Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {specials.map((special, index) => (
                  <tr key={index} className="border-t border-gray-400">
                    <td className="border-r border-gray-400 px-4 py-3 bg-gray-300 text-black font-medium">
                      {special.name}
                    </td>
                    <td className="border-r border-gray-400 px-4 py-3 text-center text-black font-medium">
                      {special.grade}
                    </td>
                    <td className="px-4 py-3 text-center text-black font-medium">
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
      </Card>

      {/* Work Habits and Final Page */}
      <Card ref={pageRefs?.finalRef} className="p-6 min-h-[297mm] border-0 flex flex-col">
        <div className="flex justify-start mb-8">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="flex-1 space-y-6">
          {/* Work Habits Table */}
          <div className="overflow-hidden border border-gray-400">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-400">
                  <th className="border-r border-gray-400 px-4 py-3 text-left font-bold text-black">
                    Work Habits/Conduct
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-black">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {workHabits.map((habit, index) => (
                  <tr key={index} className="border-t border-gray-400">
                    <td className="border-r border-gray-400 px-4 py-3 text-black">
                      {habit.trait}
                    </td>
                    <td className="px-4 py-3 text-center text-black">
                      {habit.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Metrics Table */}
          <div className="overflow-hidden border border-gray-400">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-400">
                  <th colSpan={6} className="px-4 py-3 text-center font-bold text-black">
                    Metrics
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-400">
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    A = 90-100%
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Superior
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    D = 60-69%
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Below Average
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    B = 80-89%
                  </td>
                  <td className="px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Above Average
                  </td>
                </tr>
                <tr className="border-t border-gray-400">
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    C = 70-79%
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Average
                  </td>
                  <td className="border-r border-gray-400 px-3 py-2 text-sm text-black bg-gray-400 font-medium">
                    U = 0-59%
                  </td>
                  <td className="px-3 py-2 text-sm text-center text-black bg-gray-400 font-medium">
                    Unsatisfactory
                  </td>
                  <td colSpan={2} className="bg-gray-400"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comments Section */}
          <div className="border border-gray-400">
            <div className="bg-gray-400 px-4 py-3">
              <h3 className="font-bold text-black">Comments</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-black leading-relaxed">
                {generalComment}
              </p>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="overflow-hidden border border-gray-400">
            <div className="bg-gray-400 px-4 py-3">
              <h3 className="font-bold text-black">Attendance</h3>
            </div>
            <table className="w-full">
              <tbody>
                <tr className="border-t border-gray-400">
                  <td className="border-r border-gray-400 px-4 py-3 text-black font-medium">No. of School Days</td>
                  <td className="border-r border-gray-400 px-4 py-3 text-center text-black font-bold">{attendance.totalDays}</td>
                  <td className="border-r border-gray-400 px-4 py-3 text-black font-medium">Days Present</td>
                  <td className="border-r border-gray-400 px-4 py-3 text-center text-black font-bold">{attendance.daysPresent}</td>
                  <td className="border-r border-gray-400 px-4 py-3 text-black font-medium">Days Absent</td>
                  <td className="px-4 py-3 text-center text-black font-bold">{attendance.daysAbsent}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Signature Section */}
          <div className="text-center space-y-4 mt-8">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" 
                alt="Signature" 
                className="h-16 w-auto"
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
      </Card>
    </div>
  );
};