import { forwardRef } from "react";
import sigAun from "@/assets/sigAun.png";

interface Subject {
    name: string;
    ca: number;
    exam: number;
    finalScore: number;
    letterGrade: string;
}

interface CharterReportCardProps {
    name: string;
    grade: string;
    date: string;
    academicYear: string;
    term: string;
    subjects: Subject[];
    average: number;
    attendance: {
        unexpectedAbsence: number;
        explainedAbsence: number;
        late: number;
    };
    remarks: {
        interpersonal: string;
        effort: string;
        classBehaviour: string;
    };
    comment: string;
}

export const CharterReportCard = forwardRef<HTMLDivElement, CharterReportCardProps>(
    ({
        name,
        grade,
        date,
        academicYear,
        term,
        subjects,
        average,
        attendance,
        remarks,
        comment
    }, ref) => {
        return (
            <div ref={ref} className="w-[794px] h-[1123px] bg-white p-6 text-xs text-black relative font-sans overflow-hidden" >

                {/* Watermark */}
                <div className="absolute top-[85px] opacity-30 pointer-events-none">

                    <img src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" className="w-[950px] h-[830px]" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full">

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-start mb-1 ml-0">
                        <img
                            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"
                            alt="AUN Schools Logo"
                            className="h-[110px] w-[110px] -ml-6"
                        />
                        <div className="text-center flex-1 mb-2">
                            <h1 className="text-lg font-bold">American University of Nigeria Schools – Charter</h1>
                            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
                            <p className="text-sm">Phone: +234 7055019053 Email: charter.schoo@aun.edu.ng</p>

                        </div>
                    </div>

                    <h2 className="text-sm font-bold mt-3 mb-3 text-center">Term 3 Report Card</h2>

                    {/* Student Info */}
                    <div className="relative z-10 mb-1">
                        <div className="grid [grid-template-columns:1.5fr_1fr_1.5fr] gap-x-2 text-[13px] text-center mb-1">
                            <div className="flex items-center px-3">
                                <span className="text-left min-w-[80px]">Name</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1 flex-1 whitespace-nowrap">{name}</span>
                            </div>
                            <div className="flex items-center px-1">
                                <span className="flex-1 text-left">Grade</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1 flex-1">{grade}</span>
                            </div>
                            <div className="flex items-center px-1">
                                <span className="min-w-[60px] text-right">Date</span>
                                <span className="mx-1 text-center">:</span>
                                <span className="ml-1 flex-1">{date}</span>
                            </div>
                            <div className="flex items-center px-3 py-1">
                                <span className="min-w-[80px] text-left">Academic Year</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1">{academicYear}</span>
                            </div>
                            <div className="flex items-center px-1 py-1">
                                <span className="flex-1 text-left">Term</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1 flex-1">{term}</span>
                            </div>
                        </div>
                    </div>

                    {/* Subjects Table */}
                    <table className="w-full border border-black border-collapse text-center mb-2 table-fixed">
                        <thead className="text-[11px]">
                            {/* First header row: 3 columns, each spans 2 */}
                            <tr>
                                <th colSpan={2} className="border border-black px-1 py-1"></th>
                                <th colSpan={2} className="border border-black px-1 py-1">Term 3</th>
                                <th colSpan={2} className="border border-black px-1 py-1">OVERALL</th>
                            </tr>

                            {/* Second header row: 6 equal columns */}
                            <tr>
                                <th colSpan={2} className="border border-black px-1 py-1 w-1/6">Subjects</th>
                                <th className="border border-black px-1 py-1 w-1/6">CA (%)</th>
                                <th className="border border-black px-1 py-1 w-1/6">Exams (%)</th>
                                <th className="border border-black px-1 py-1 w-1/6">Final Score (%)</th>
                                <th className="border border-black px-1 py-1 w-1/6">Letter Grade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.map((s, i) => (
                                <tr key={i} className="text-[11px]">
                                    <td colSpan={2} className="border border-black text-left pl-2 w-1/3">{s.name}</td>
                                    <td className="border border-black w-1/3">{s.ca}</td>
                                    <td className="border border-black w-1/3">{s.exam}</td>
                                    <td className="border border-black w-1/6">{s.finalScore}</td>
                                    <td className="border border-black w-1/6">{s.letterGrade}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="text-[12px] font-semibold">
                            <tr>
                                <td colSpan={2} className="border border-black text-left pl-2"></td>
                                <td colSpan={2} className="border border-black text-bold">Average (%) </td>
                                <td className="border border-black">83</td>
                                <td className="border border-black"></td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Attendance + Grade Scale */}
                    <div className="flex justify-between text-[12px] mb-1 w-full">
                        {/* Left Table (Attendance) */}
                        <div className="mt-[1.5rem] mb-[1.5rem] w-[59%]">
                            <table className="border border-black border-collapse text-center w-full table-fixed h-[4.5rem]">
                                <thead>
                                    <tr>
                                        <th className="border border-black px-1 py-3.5">Attendance</th>
                                        <th className="border border-black">Unexpected Absence</th>
                                        <th className="border border-black">Explained Absence</th>
                                        <th className="border border-black">Late</th>
                                    </tr>
                                </thead>
                                <tbody className="h-full">
                                    <tr className="h-full">
                                        <td className="border border-black align-middle">Term 2</td>
                                        <td className="border border-black align-middle">{attendance.unexpectedAbsence}</td>
                                        <td className="border border-black align-middle">{attendance.explainedAbsence}</td>
                                        <td className="border border-black align-middle">{attendance.late}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Right Table (Grade Legend) */}
                        <table className="border border-black border-collapse text-center w-[40%] table-fixed">
                            <tbody>
                                <tr className="h-6"><td className="border border-black">A</td><td className="border border-black">90 – 100</td></tr>
                                <tr className="h-6"><td className="border border-black">B</td><td className="border border-black">80 – 89</td></tr>
                                <tr className="h-6"><td className="border border-black">C</td><td className="border border-black">70 – 79</td></tr>
                                <tr className="h-6"><td className="border border-black">D</td><td className="border border-black">60 – 69</td></tr>
                                <tr className="h-6"><td className="border border-black">F</td><td className="border border-black">Below – 60</td></tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Remarks */}
                    <div className="mb-1 text-[12px]">
                        <table className="w-full border border-black border-collapse text-left table-fixed">
                            <thead className="text-[11px]">
                                <tr>
                                    <th className="border border-black px-1 py-1 w-[20%]"></th>
                                    <th className="border border-black px-1 py-1 w-[80%] text-center">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-1 py-1 w-[20%]">Interpersonal</td>
                                    <td className="border border-black px-1 py-1 w-[80%]">{remarks.interpersonal}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-1 py-1 w-[20%]">Effort</td>
                                    <td className="border border-black px-1 py-1 w-[80%]">{remarks.effort}</td>
                                </tr>
                                <tr>
                                    <td className="border border-black px-1 py-1 w-[20%]">Class Behaviour</td>
                                    <td className="border border-black px-1 py-1 w-[80%]">{remarks.classBehaviour}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Comment */}
                    <div className="my-2 text-[12px] border border-black px-2 h-[10.5rem]">
                        <div className="text-[14px] font-bold my-1">Comments:</div>
                        {comment}
                    </div>

                    {/* Signatures */}
                    <table className="w-full text-center text-[12px] border border-black border-collapse table-fixed">
                        <tbody>
                            <tr>
                                <td className="w-1/2 py-4 border border-black align-middle">
                                    <img src={sigAun} alt="Signature of Ms. Rose Clarkson" className="h-6 mx-auto" />
                                </td>
                                <td className="w-1/2 border border-black align-middle">
                                    <img src="/lovable-uploads/c610321b-7d11-4eff-a4f8-083660a257b7.png" alt="Signature of N. Y. Mikail" className="h-6 mx-auto" />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-1/2 border border-black px-1 py-1">
                                    <p className="font-bold">Ms. Rose Clarkson</p>
                                    <p className="font-bold">Supervisor, AUN Schools – Charter</p>
                                </td>
                                <td className="w-1/2 border border-black px-1 py-1">
                                    <p className="font-bold">N. Y. Mikail</p>
                                    <p className="font-bold">Asst. Director Academics</p>
                                    <p className="font-bold">AUN Schools</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>




                </div>
            </div>
        );
    }
);

CharterReportCard.displayName = "CharterReportCard";
