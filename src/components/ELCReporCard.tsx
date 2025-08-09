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


      <div ref={pageRefs?.subjectsRef} className="w-full p-6 flex flex-col" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="mb-12">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-24"
          />
        </div>


        
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

      <div ref={pageRefs?.finalRef} className="w-full p-6 flex flex-col" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="mb-8">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-24"
          />
        </div>

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