import { Card } from "@/components/ui/card";
import { forwardRef } from "react";

interface DevelopmentAssessments {
    // Personal, Social and Emotional Development
    relationships: string;
    selfAwareness: string;
    managingFeelings: string;
    
    // Communication and Language
    listening: string;
    understanding: string;
    speaking: string;
    
    // Physical Development
    movingHandling: string;
    healthSelfcare: string;
    
    // Literacy
    reading: string;
    writing: string;
    
    // Mathematics
    numbers: string;
    shape: string;
    
    // Understanding the World
    communities: string;
    world: string;
    technology: string;
    
    // Expressive Arts and Design
    exploring: string;
    imaginative: string;
}

interface ReportCardProps {
    studentName: string;
    grade: string;
    term: string;
    academicYear: string;
    teacherName: string;
    attendance: {
        totalDays: number;
        daysPresent: number;
        daysAbsent: number;
    };
    generalComment: string;
    developmentAssessments: DevelopmentAssessments;
    pageRefs?: {
        coverRef: React.RefObject<HTMLDivElement>;
        subjectsRef: React.RefObject<HTMLDivElement>;
        specialsRef: React.RefObject<HTMLDivElement>;
        shapeRef?: React.RefObject<HTMLDivElement>;
        finalRef: React.RefObject<HTMLDivElement>;
    };
}

export const ELCReportCard = ({
    studentName,
    grade,
    term,
    academicYear,
    teacherName,
    attendance,
    generalComment,
    developmentAssessments,
    pageRefs,
}: ReportCardProps) => {
    return (
        <div className="bg-white font-sans text-black">
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

                        <div className="space-y-1 mb-12">
                            <h2 className="text-lg font-bold italic text-black">
                                End of Term Report
                            </h2>
                            <p className="text-lg font-medium text-blue-600">
                                {term}
                            </p>
                            <p className="text-lg text-black">
                                {academicYear}
                            </p>
                        </div>

                        <div className="space-y-0">
                            <h3 className="text-xl font-bold text-black">
                                {studentName}
                            </h3>
                            <p className="text-lg font-medium text-black">
                                {grade}
                            </p>
                            <p className="text-base text-black">
                                {teacherName}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-black pt-4">
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

            {/* Page 2 - Main Report */}
            <div ref={pageRefs?.subjectsRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
                {/* Header */}
                <div className="flex items-center mb-4">
                    <img
                        src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"
                        alt="AUN Schools Logo"
                        className="h-[140px] w-[130px] -ml-7"
                    />
                    <div className="-ml-7">
                        <h1 className="text-[26px] font-bold">AUN SCHOOLS</h1>
                        <p className="text-lg">Early Learning Center</p>
                    </div>
                </div>

                {/* Student Info Table */}
                <table className="w-full border-collapse border border-black text-sm mb-4 ">
                    <tbody>
                        <tr>
                            <td className="border border-black px-2 py-1 font-bold" colSpan={4}>Child's Name : <span>{studentName}</span></td>
                            <td className="border border-black px-2 py-1 font-bold" colSpan={2}>DOB : </td>
                            <td className="border border-black px-2 py-1 font-bold" colSpan={2}>SEN Level :</td>
                            <td className="border border-black px-2 py-1 font-bold">School Year</td>
                            <td className="border border-black px-2 py-1">{academicYear}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 font-bold" colSpan={4}>Class : <span>{grade}</span></td>
                            <td className="border border-black px-2 py-1 font-bold">No. of school days</td>
                            <td className="border border-black px-2 py-1">{attendance.totalDays}</td>
                            <td className="border border-black px-2 py-1 font-bold">Days Present</td>
                            <td className="border border-black px-2 py-1">{attendance.daysPresent}</td>
                            <td className="border border-black px-2 py-1 font-bold">Days Absent</td>
                            <td className="border border-black px-2 py-1">{attendance.daysAbsent}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 font-bold">Key</td>
                            <td className="border border-black px-2 py-1 bg-pink-100 font-bold">EM</td>
                            <td className="border border-black px-2 py-1 font-bold">Emerging</td>
                            <td className="border border-black px-2 py-1 bg-blue-100 font-bold">EX</td>
                            <td className="border border-black px-2 py-1 font-bold w-[13%]">Expected</td>
                            <td className="border border-black px-2 py-1 bg-blue-100 font-bold w-[10%]">EXC </td>
                            <td className="border border-black px-2 py-1 font-bold w-[13%]">Exceeding</td>
                            <td className="border border-black px-2 py-1 bg-yellow-200 font-bold w-[10%]">NA</td>
                            <td className="border border-black px-2 py-1 font-bold" colSpan={2}>Not Assessed</td>
                        </tr>
                    </tbody>
                </table>

                {/* Personal, Social and Emotional Development */}
                <table className="w-full border-collapse border border-black text-xs mb-2">
                    <thead>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Personal, Social and Emotional Development</th>
                            <th className="border border-black px-2 py-1 font-bold w-[8%]">Term 1</th>
                            <th className="border border-black px-2 py-1 font-bold w-[8%]">Term 2</th>
                            <th className="border border-black px-2 py-1 font-bold w-[8%]">Term 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Making relationships</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.relationships}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can play co-operatively, taking turns with others.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can show sensitivity to others' needs and feelings</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Forms positive relationships with adults and others.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-blue-100 text-left font-bold" colSpan={4}>Self Confidence and Self Awareness</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.selfAwareness}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Is confident to try new activities, and say why they like some activities more than others.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Is confident to speak in a familiar group, will talk about their ideas.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can choose the resources they need for their chosen activities</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can say when they do or don't need help.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Managing Feelings and Behaviour</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.managingFeelings}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can talk about how they and others show feelings</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can talk about their own and others' behaviours and its consequences</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Knows that some behaviour is unacceptable</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can work as part of a group or class and understand and follow the rules</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can adjust his/her behaviour to different situations, and take changes of routine in their stride</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 bg-red-600 py-1 h-6" colSpan={8}></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Communication and Language</th>
                            <th className="border border-black px-2 py-1 font-bold"></th>
                            <th className="border border-black px-2 py-1 font-bold"></th>
                            <th className="border border-black px-2 py-1 font-bold"></th>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Listening and Attention</th>
                            <th className="border border-black px-2 py-1 font-bold"></th>
                            <th className="border border-black px-2 py-1 font-bold"></th>
                            <th className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.listening}</th>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can listen attentively in a rage of situations</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can listen to stories, accurately anticipating key events and respond to what they have heard with relevant comments, questions or actions</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <th className="border border-black px-2 py-1 bg-blue-100 text-left font-bold" colSpan={4}>Understanding</th>
                            <td className="border border-black px-2 py-1 w-[8%]"></td>
                            <td className="border border-black px-2 py-1 w-[8%]"></td>
                            <td className="border border-black px-2 py-1 w-[8%] text-center font-bold">{developmentAssessments.understanding}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can follow instructions involving several ideas or actions</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can answer 'how' and 'why' questions about their experiences and in response to stories or events.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Speaking</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.speaking}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can express him/herself effectively, showing awareness of listeners' needs</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can use past, present and future forms accurately when talking about events that have happened or are to happen in the future.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.movingHandling}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Shows good control and co-ordination in large and small movements.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can move confidently in a range of ways, safely negotiating space.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can handle equipment and tools effectively, including pencils for writing.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Health and Self Care</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.healthSelfcare}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Knows the importance for good health of physical exercise, and a healthy diet, and talk about ways to keep healthy and safe.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can manage his/her own basic hygiene and personal needs successfully, including dressing and going to the toilet independently.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 bg-red-600 py-1 h-6" colSpan={8}></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Literacy</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Reading</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.reading}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Has favourite stories, rhymes, songs, poems or jingles.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can repeat words or phrases from familiar stories.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-center font-bold">{developmentAssessments.numbers}</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can recite some number names in sequence</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can use some language of quantities, such as 'more' and 'a lot'</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare quantities and objects and to solve problems.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can recognise, create and describe patterns</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can explore characteristics of everyday objects and shapes and use mathematical language to describe them</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                    </tbody>
                </table>


            </div>

            {/* Page 4 - Final sections */}
            <div ref={pageRefs?.shapeRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
                {/* Shape, Space and Measure */}
                <table className="w-full border-collapse border border-black text-xs mb-2">
                    <tbody>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Shape, Space and Measure</th>
                            <td className="border border-black px-2 py-1 w-[8%]"></td>
                            <td className="border border-black px-2 py-1 w-[8%]"></td>
                            <td className="border border-black px-2 py-1 w-[8%]"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can notice simple shapes and pattern pictures</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can begin to use the language of size</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can talk about past and present events in their own lives and the lives of family members.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Knows that others don't always enjoy the same things, and is sensitive to this.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Knows about similarities and differences in relation to places, objects, materials and living things.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can talk about the features of their own immediate environment and how environments might vary from one another.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can recognise that a range of technology is used in places such as homes and schools.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can select and use technology for particular purposes.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 bg-red-600 py-1 h-6" colSpan={8}></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Expressive Arts and Design</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Exploring and Using Media and Materials</th>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can sing songs, make music and dance, and experiment with ways of changing them.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
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
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can use what they have learnt about media and materials in original ways, thinking about uses and purposes.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                        <tr>
                            <td className="border border-black px-2 py-1 text-sm">❖</td>
                            <td className="border border-black px-2 py-1" colSpan={3}>Can represent their own ideas, thoughts and feelings through design and technology, art, music, dance, role play and stories.</td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div ref={pageRefs?.finalRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
                {/* Key Descriptor section */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold mb-4">Key Descriptor :</h3>
                    <table className="w-full border-collapse border border-black text-xs mb-6">
                        <tbody>
                            <tr>
                                <td className="border border-black px-3 py-2 font-bold">Emerging</td>
                                <td className="border border-black px-3 py-2 font-bold">Not yet at the level expected at the end of the term</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 font-bold">Expected</td>
                                <td className="border border-black px-3 py-2 font-bold">At the level expected at the end of the term</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 font-bold">Exceeding</td>
                                <td className="border border-black px-3 py-2 font-bold">Beyond the level expected at the end of the term</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-3 py-2 font-bold">NA</td>
                                <td className="border border-black px-3 py-2 font-bold">Not yet assessed</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Comment section */}
                    <div className="border border-black mb-8" style={{ minHeight: '200px' }}>
                        <p className="border-b border-black text-sm font-bold mb-2"><span className="px-2">Comment :</span></p>
                        <div className="text-sm px-2">{generalComment}</div>
                    </div>

                    {/* Signature section */}
                    <div className="text-center">
                        <div className="mb-4">
                            <img
                                src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png"
                                alt="Signature"
                                className="h-10 mx-auto"
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