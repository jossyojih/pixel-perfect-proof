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
    <div className="bg-white font-sans text-black">
      {/* Cover Page */}
      <div ref={pageRefs?.coverRef} className="w-full p-8 flex flex-col justify-center" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="border-4 border-blue-800 p-8 h-full flex flex-col justify-center items-center text-center relative">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
              alt="AUN Schools Logo" 
              className="h-24 mx-auto"
            />
          </div>
          
          <h1 className="text-base font-normal text-black mb-8">
            AUN SCHOOLS – EARLY LEARNING CENTRE
          </h1>
          
          <div className="space-y-4 mb-12">
            <h2 className="text-lg font-bold italic text-black">
              End of Term Report
            </h2>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-8 left-8 right-8 text-xs text-black border-t border-gray-400 pt-4">
            <div className="flex justify-between">
              <div className="text-left">
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

      {/* Page 2 - Main Report */}
      <div ref={pageRefs?.subjectsRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        {/* Header */}
        <div className="flex items-center mb-4">
          <img 
            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" 
            alt="AUN Schools Logo" 
            className="h-16 mr-4"
          />
          <div>
            <h1 className="text-lg font-bold">AUN SCHOOLS</h1>
            <p className="text-sm">Early Learning Center</p>
          </div>
        </div>

        {/* Student Info Table */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-bold">Child's Name :</td>
              <td className="border border-black px-2 py-1" colSpan={2}>{studentName}</td>
              <td className="border border-black px-2 py-1 font-bold">DOB :</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 font-bold">SEN Level :</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 font-bold">School Year</td>
              <td className="border border-black px-2 py-1">{academicYear}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold">Class :</td>
              <td className="border border-black px-2 py-1">{grade}</td>
              <td className="border border-black px-2 py-1 font-bold">No. of school days</td>
              <td className="border border-black px-2 py-1">{attendance.totalDays}</td>
              <td className="border border-black px-2 py-1 font-bold">Days Present</td>
              <td className="border border-black px-2 py-1">{attendance.daysPresent}</td>
              <td className="border border-black px-2 py-1 font-bold">Days Absent</td>
              <td className="border border-black px-2 py-1">{attendance.daysAbsent}</td>
              <td className="border border-black px-2 py-1 font-bold">Not Assessed</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold">Key</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">EM</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">Emerging</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">EX</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">Expected</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">EXC</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">Exceeding</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">NA</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">Not Assessed</td>
            </tr>
          </tbody>
        </table>

        {/* Personal, Social and Emotional Development */}
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Personal, Social and Emotional Development</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 1</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 2</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Making relationships</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can play co-operatively, taking turns with others.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can show sensitivity to others' needs and feelings</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Forms positive relationships with adults and others.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Self Confidence and Self Awareness</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Is confident to try new activities, and say why they like some activities more than others.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Is confident to speak in a familiar group, will talk about their ideas.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can choose the resources they need for their chosen activities</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can say when they do or don't need help.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Managing Feelings and Behaviour</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about how they and others show feelings</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about their own and others' behaviours and its consequences</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows that some behaviour is unacceptable</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can work as part of a group or class and understand and follow the rules</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can adjust his/her behaviour to different situations, and take changes of routine in their stride</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Red separator */}
        <div className="bg-red-600 h-2 mb-2"></div>

        {/* Communication and Language */}
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Communication and Language</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 1</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 2</th>
              <th className="border border-black px-2 py-1 bg-blue-200 font-bold">Term 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Listening and Attention</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can listen attentively in a rage of situations</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can listen to stories, accurately anticipating key events and respond to what they have heard with relevant comments, questions or actions</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can give his/her attention to what others say and respond appropriately, while engaged in another activity</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 3 - Continuation */}
      <div ref={pageRefs?.specialsRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        {/* Understanding */}
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Understanding</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can follow instructions involving several ideas or actions</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can answer 'how' and 'why' questions about their experiences and in response to stories or events.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Speaking</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can express him/herself effectively, showing awareness of listeners' needs</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can use past, present and future forms accurately when talking about events that have happened or are to happen in the future.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can develop their own narratives and explanations by connecting ideas or events.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Physical Development</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Moving and Handling</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Shows good control and co-ordination in large and small movements.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can move confidently in a range of ways, safely negotiating space.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can handle equipment and tools effectively, including pencils for writing.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Health and Self Care</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows the importance for good health of physical exercise, and a healthy diet, and talk about ways to keep healthy and safe.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can manage his/her own basic hygiene and personal needs successfully, including dressing and going to the toilet independently.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Red separator */}
        <div className="bg-red-600 h-2 mb-2"></div>

        {/* Literacy */}
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Literacy</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Reading</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Has favourite stories, rhymes, songs, poems or jingles.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can repeat words or phrases from familiar stories.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can fill the missing word or phrase in a known rhymes, story or game, e.g. 'Humpty Dumpty sat on a</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Writing</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can distinguish between the different marks they make.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Mathematics</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Numbers</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can recite some number names in sequence</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can use some language of quantities, such as 'more' and 'a lot'</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows that a group of things changes in quantity when something is added or taken away.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Numbers</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare quantities and objects and to solve problems.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can recognise, create and describe patterns</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can explore characteristics of everyday objects and shapes and use mathematical language to describe them</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 4 - Final sections */}
      <div ref={pageRefs?.finalRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        {/* Shape, Space and Measure */}
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Shape, Space and Measure</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can notice simple shapes and pattern pictures</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can begin to use the language of size</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can anticipate specific time-based events such as mealtimes or home time.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Understanding the World</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>People and Communities</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about past and present events in their own lives and the lives of family members.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows that others don't always enjoy the same things, and is sensitive to this.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows about similarities and differences between themselves and others, and among families, communities' and traditions.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>The World</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows about similarities and differences in relation to places, objects, materials and living things.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about the features of their own immediate environment and how environments might vary from one another.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can make observations of animals and plants and explain why some things occur and talk about changes.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Technology</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can recognise that a range of technology is used in places such as homes and schools.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can select and use technology for particular purposes.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Red separator */}
        <div className="bg-red-600 h-2 mb-2"></div>

        {/* Expressive Arts and Design */}
        <table className="w-full border-collapse border border-black text-xs mb-8">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Expressive Arts and Design</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Exploring and Using Media and Materials</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can sing songs, make music and dance, and experiment with ways of changing them.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can safely use and explore a variety of materials, tools and techniques, experimenting with colour, design, texture, form and function.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Being Imaginative</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can use what they have learnt about media and materials in original ways, thinking about uses and purposes.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">♦</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can represent their own ideas, thoughts and feelings through design and technology, art, music, dance, role play and stories.</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>

        {/* Key Descriptor section */}
        <div className="mb-8">
          <h3 className="text-sm font-bold mb-4">Key Descriptor :</h3>
          <table className="w-full border-collapse border border-black text-xs mb-6">
            <tbody>
              <tr>
                <td className="border border-black px-3 py-2 font-bold bg-gray-100">Emerging</td>
                <td className="border border-black px-3 py-2">Not yet at the level expected at the end of the term</td>
              </tr>
              <tr>
                <td className="border border-black px-3 py-2 font-bold bg-gray-100">Expected</td>
                <td className="border border-black px-3 py-2">At the level expected at the end of the term</td>
              </tr>
              <tr>
                <td className="border border-black px-3 py-2 font-bold bg-gray-100">Exceeding</td>
                <td className="border border-black px-3 py-2">Beyond the level expected at the end of the term</td>
              </tr>
              <tr>
                <td className="border border-black px-3 py-2 font-bold bg-gray-100">NA</td>
                <td className="border border-black px-3 py-2">Not yet assessed</td>
              </tr>
            </tbody>
          </table>

          {/* Comment section */}
          <div className="border border-black p-4 mb-8" style={{ minHeight: '200px' }}>
            <p className="text-sm font-bold mb-2">Comment :</p>
            <div className="text-sm">{generalComment}</div>
          </div>

          {/* Signature section */}
          <div className="text-center">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/b688bfc7-7620-4283-b8aa-8d5ab8617a5f.png"
                alt="Signature"
                className="h-16 mx-auto"
              />
            </div>
            <div className="border-t border-black mx-auto w-64 mb-2"></div>
            <div className="text-sm">
              <p className="font-bold">N. Y. Mikail</p>
              <p className="font-bold">Asst. Director Academics</p>
              <p className="font-bold">AUN Schools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};