import { Card } from "@/components/ui/card";

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
}: ReportCardProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Cover Page */}
      <Card className="p-8 mb-8 border-4 border-primary">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
              alt="AUN Schools Logo" 
              className="h-24 w-auto"
            />
          </div>
          
          <h1 className="text-xl font-bold text-foreground tracking-wide">
            AUN SCHOOLS-ELEMENTARY
          </h1>
          
          <div className="space-y-3">
            <h2 className="text-lg font-bold italic text-foreground">
              End of Term Report
            </h2>
            <p className="text-lg font-medium text-blue-600">
              {term}
            </p>
            <p className="text-lg text-foreground">
              {academicYear}
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-bold text-foreground">
              {studentName}
            </h3>
            <p className="text-lg font-medium text-foreground">
              {grade}
            </p>
            <p className="text-sm text-foreground">
              Emmanuel O. Abioye, Monsurat Opeyemi Adebimpe
            </p>
          </div>
        </div>
      </Card>

      {/* Academic Subjects Page */}
      <Card className="p-6 mb-8 border-2 border-report-border">
        <div className="flex justify-start mb-6">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <div key={index} className="border border-report-border">
              <div className="bg-report-header px-4 py-2 flex justify-between items-center">
                <h3 className="font-medium text-foreground">{subject.name}</h3>
                <span className="font-medium text-foreground">{subject.teacher}</span>
              </div>
              
              <div className="border-b border-report-border bg-report-header px-4 py-2">
                <span className="font-medium text-foreground">Term Report</span>
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Grade</span>
                  <span className="text-lg font-bold text-foreground">{subject.grade}</span>
                </div>
                {subject.comment && (
                  <p className="text-sm text-foreground leading-relaxed">
                    {subject.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Specials Page */}
      <Card className="p-6 mb-8 border-2 border-report-border">
        <div className="flex justify-start mb-6">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Specials Table */}
        <div className="overflow-hidden border border-report-border">
          <table className="w-full">
            <thead>
              <tr className="bg-report-header">
                <th className="border-r border-report-border px-4 py-2 text-left font-medium text-foreground">
                  Specials
                </th>
                <th className="border-r border-report-border px-4 py-2 text-center font-medium text-foreground">
                  Grade
                </th>
                <th className="px-4 py-2 text-center font-medium text-foreground">
                  Subject Teacher's Name
                </th>
              </tr>
            </thead>
            <tbody>
              {specials.map((special, index) => (
                <tr key={index} className="border-t border-report-border">
                  <td className="border-r border-report-border px-4 py-2 bg-report-header text-foreground">
                    {special.name}
                  </td>
                  <td className="border-r border-report-border px-4 py-2 text-center text-foreground">
                    {special.grade}
                  </td>
                  <td className="px-4 py-2 text-center text-foreground">
                    {special.teacher}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Work Habits and Final Page */}
      <Card className="p-6 border-2 border-report-border">
        <div className="flex justify-start mb-6">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Work Habits Table */}
        <div className="mb-6 overflow-hidden border border-report-border">
          <table className="w-full">
            <thead>
              <tr className="bg-report-header">
                <th className="border-r border-report-border px-4 py-2 text-left font-medium text-foreground">
                  Work Habits/Conduct
                </th>
                <th className="px-4 py-2 text-center font-medium text-foreground">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {workHabits.map((habit, index) => (
                <tr key={index} className="border-t border-report-border">
                  <td className="border-r border-report-border px-4 py-2 text-foreground">
                    {habit.trait}
                  </td>
                  <td className="px-4 py-2 text-center text-foreground">
                    {habit.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Metrics Table */}
        <div className="mb-6 overflow-hidden border border-report-border">
          <table className="w-full">
            <thead>
              <tr className="bg-report-header">
                <th colSpan={6} className="px-4 py-2 text-center font-medium text-foreground">
                  Metrics
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-report-border">
                <td className="border-r border-report-border px-3 py-2 text-sm text-foreground bg-report-header">
                  A = 90-100%
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-center text-foreground">
                  Superior
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-foreground bg-report-header">
                  D = 60-69%
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-center text-foreground">
                  Below Average
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-foreground bg-report-header">
                  B = 80-89%
                </td>
                <td className="px-3 py-2 text-sm text-center text-foreground">
                  Above Average
                </td>
              </tr>
              <tr className="border-t border-report-border">
                <td className="border-r border-report-border px-3 py-2 text-sm text-foreground bg-report-header">
                  C = 70-79%
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-center text-foreground">
                  Average
                </td>
                <td className="border-r border-report-border px-3 py-2 text-sm text-foreground bg-report-header">
                  U = 0-59%
                </td>
                <td className="px-3 py-2 text-sm text-center text-foreground">
                  Unsatisfactory
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Comments Section */}
        <div className="mb-6 border border-report-border">
          <div className="bg-report-header px-4 py-2">
            <h3 className="font-medium text-foreground">Comments</h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-foreground leading-relaxed">
              {generalComment}
            </p>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="mb-8 border border-report-border">
          <div className="bg-report-header px-4 py-2">
            <h3 className="font-medium text-foreground">Attendance</h3>
          </div>
          <div className="p-4">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 text-foreground">No. of School Days</td>
                  <td className="py-2 text-center text-foreground font-medium">{attendance.totalDays}</td>
                  <td className="py-2 text-foreground">Days Present</td>
                  <td className="py-2 text-center text-foreground font-medium">{attendance.daysPresent}</td>
                  <td className="py-2 text-foreground">Days Absent</td>
                  <td className="py-2 text-center text-foreground font-medium">{attendance.daysAbsent}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" 
              alt="Signature" 
              className="h-16 w-auto"
            />
          </div>
          <div className="border-t border-report-border w-64 mx-auto"></div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">N. Y. Mikail</p>
            <p className="text-sm text-foreground">Asst. Director Academics</p>
            <p className="text-sm text-foreground">AUN Schools</p>
          </div>
        </div>
      </Card>

      {/* Footer on all pages */}
      <div className="mt-8 text-xs text-foreground">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">ADDRESS</p>
            <p>AUN Schools-Elementary</p>
            <p>99 Lamido Zubairu Way</p>
            <p>Yola Bypass</p>
            <p>Yola Adamawa State</p>
          </div>
          <div className="text-right">
            <p className="font-medium">CONTACT</p>
            <p>Phone: +2348032425524</p>
            <p>Email: info@aunschools.net</p>
            <p>Website: aunschools.net</p>
          </div>
        </div>
      </div>
    </div>
  );
};