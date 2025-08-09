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
  mathLanguageArt?: string;
  englishLanguageArtTeacherName?: string;
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

export const ELCReportCard = ({
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
            
            <h1 className="text-l text-black mb-8">
            AUN SCHOOLS – EARLY LEARNING CENTRE
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
                {mathLanguageArt && englishLanguageArtTeacherName 
                  ? `${mathLanguageArt}, ${englishLanguageArtTeacherName}`
                  : "Iveren Iyough Nnamele, Rukayat Akintonde"}
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

        <div className="flex-1 grid grid-cols-2 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="border border-report-border">
              <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold">{subject.name}</h3>
                <span className="text-sm">{subject.teacher}</span>
              </div>
              <div className="bg-report-header px-4 py-2 border-t border-report-border">
                <span className="text-sm font-medium">Term Report</span>
              </div>
              <div className="p-4 bg-card text-card-foreground space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Grade</span>
                  <span className="text-2xl font-bold">{subject.grade}</span>
                </div>
                {subject.comment && (
                  <p className="text-sm leading-relaxed">{subject.comment}</p>
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
          {scienceSubject && (
            <div className="border border-report-border">
              <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold">{scienceSubject.name}</h3>
                <span className="text-sm">{scienceSubject.teacher}</span>
              </div>
              <div className="bg-report-header px-4 py-2 border-t border-report-border">
                <span className="text-sm font-medium">Term Report</span>
              </div>
              <div className="p-4 bg-card text-card-foreground space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Grade</span>
                  <span className="text-2xl font-bold">{scienceSubject.grade}</span>
                </div>
                {scienceSubject.comment && (
                  <p className="text-sm leading-relaxed">{scienceSubject.comment}</p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {specials.map((sp, idx) => (
              <div key={idx} className="border border-report-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center">
                  <h3 className="font-semibold">{sp.name}</h3>
                  <span className="text-sm">{sp.teacher}</span>
                </div>
                <div className="bg-report-header px-4 py-2 border-t border-report-border">
                  <span className="text-sm font-medium">Term Report</span>
                </div>
                <div className="p-4 bg-card text-card-foreground space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium">Grade</span>
                    <span className="text-2xl font-bold">{sp.grade}</span>
                  </div>
                </div>
              </div>
            ))}
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
          {/* Work Habits */}
          <div className="border border-report-border">
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <h3 className="font-semibold">Work Habits</h3>
            </div>
            <div className="bg-card text-card-foreground">
              <div className="grid grid-cols-2 gap-0">
                {workHabits.map((wh, i) => (
                  <div key={i} className="flex justify-between items-center px-4 py-2 border-t border-report-border">
                    <span className="text-sm">{wh.trait}</span>
                    <span className="text-sm font-medium">{wh.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="border border-report-border">
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <h3 className="font-semibold">Attendance</h3>
            </div>
            <div className="bg-card text-card-foreground p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Total Days</p>
                  <p className="text-lg font-bold">{attendance.totalDays}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Present</p>
                  <p className="text-lg font-bold">{attendance.daysPresent}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Absent</p>
                  <p className="text-lg font-bold">{attendance.daysAbsent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border border-report-border">
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <h3 className="font-semibold">Comments</h3>
            </div>
            <div className="p-4 bg-card text-card-foreground">
              <p className="text-sm leading-relaxed">
                {generalComment}
              </p>
            </div>
          </div>



          {/* Signature Section */}
          <div className="text-center space-y-4 mt-6">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" 
                alt="Signature" 
                className="h-10"
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