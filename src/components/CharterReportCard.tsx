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
            <div ref={ref} className="w-[794px] h-[1123px] bg-white px-3 text-xs text-black relative font-sans overflow-hidden" >

                {/* Watermark */}
                <div className="absolute top-[85px] opacity-30 pointer-events-none">

                    <img src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" className="w-[950px] h-[830px]" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col h-full">

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-start mb-0 ml-0">
                        <img
                            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"
                            alt="AUN Schools Logo"
                            className="h-[100px] w-[100px] -ml-4"
                        />
                        <div className="text-center flex-1">
                            <h1 className="text-lg font-bold">American University of Nigeria Schools – Charter</h1>
                            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
                            <p className="text-sm">Phone: +234 7055019053 Email: charter.schoo@aun.edu.ng</p>
                        </div>
                    </div>

                    <h2 className="text-sm font-bold mt-0 mb-1 text-center">Term 3 Report Card</h2>

                    {/* Student Info */}
                    <div className="relative z-10 mb-1">
                        <div className="grid [grid-template-columns:1.5fr_1fr_1.5fr] gap-x-2 text-[14px] text-center mb-1">
                            <div className="flex items-center px-3">
                                <span className="text-left min-w-[95px]">Name</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1 flex-1 whitespace-nowrap">{name}</span>
                            </div>
                            <div className="flex items-center px-1">
                                <span className="flex-1 text-left">Grade</span>
                                <span className="mx-1">:</span>
                                <span className="ml-5 flex-1 text-left">{grade}</span>
                            </div>
                            <div className="flex items-center px-1">
                                <span className="min-w-[60px] text-right">Date</span>
                                <span className="mx-5 text-center">:</span>
                                <span className="ml-0">{date}</span>
                            </div>
                            <div className="flex items-center px-3 py-1">
                                <span className="text-left min-w-[95px]">Academic Year</span>
                                <span className="mx-1">:</span>
                                <span className="ml-1">{academicYear}</span>
                            </div>
                            <div className="flex items-center px-1 py-1">
                                <span className="flex-1 text-left">Term</span>
                                <span className="mx-1">:</span>
                                <span className="ml-5 flex-1 text-left">{term}</span>
                            </div>
                        </div>
                    </div>

                    {/* Subjects Table */}
                    <table className="w-full border border-collapse text-center mb-1 table-fixed">
                        <thead className="text-[12px] align-top">
                            {/* First header row: 3 columns, each spans 2 */}
                            <tr>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border px-1 py-[0px]"></th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border px-1 py-[0px]">Term 3</th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border px-1 py-[0px]">OVERALL</th>
                            </tr>

                            {/* Second header row: 6 equal columns */}
                            <tr>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border px-1 py-0 w-1/6">Subjects</th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border  px-1 py-0 w-1/6">CA (%)</th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border  px-1 py-0 w-1/6">Exams (%)</th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border  px-1 py-0 w-1/6">Final Score (%)</th>
                                <th style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border  px-1 py-0 w-1/6">Letter Grade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {subjects.map((s, i) => (
                                <tr key={i} className="text-[12px]">
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} colSpan={2} className="border text-left pl-2 w-1/3 ml-2">{s.name}</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  w-1/3">{s.ca}</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  w-1/3">{s.exam}</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  w-1/6">{s.finalScore}</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  w-1/6">{s.letterGrade}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="text-[12px] font-semibold ">
                            <tr>
                                <td style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border  text-left pl-2"></td>
                                <td style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} colSpan={2} className="border  text-bold">Average (%) </td>
                                <td style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border ">{average.toFixed(1)}</td>
                                <td style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="border "></td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Attendance + Grade Scale */}
                    {/* Attendance + Grade Scale */}
                    <div className="flex justify-between text-[12px] mb-1 w-full">
                        {/* Left Table (Attendance) */}
                        <div className="mt-[1.5rem] mb-[1.5rem] w-[59%]">
                            <table className="border  border-collapse text-center w-full table-fixed h-[4.5rem]">
                                <thead>
                                    <tr className="h-[24px]">
                                        <th style={{
                                            verticalAlign: "top",
                                            paddingBottom: "18px"
                                        }} className="border px-1 py-3">Attendance</th>
                                        <th style={{
                                            verticalAlign: "top",
                                            paddingBottom: "18px"
                                        }} className="border px-1">Unexpected Absence</th>
                                        <th style={{
                                            verticalAlign: "top",
                                            paddingBottom: "18px"
                                        }} className="border px-1">Explained Absence</th>
                                        <th style={{
                                            verticalAlign: "top",
                                            paddingBottom: "18px"
                                        }} className="border px-1 py-3 ">Late</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="">
                                        <td style={{
                                            verticalAlign: "top",
                                            paddingBottom: "10px"
                                        }} className="border  text-left px-2">Term 3</td>
                                        <td style={{
                                            verticalAlign: "top",
                                            paddingBottom: "10px"
                                        }} className="border  align-middle">{attendance.unexpectedAbsence}</td>
                                        <td style={{
                                            verticalAlign: "top",
                                            paddingBottom: "10px"
                                        }} className="border  align-middle">{attendance.explainedAbsence}</td>
                                        <td style={{
                                            verticalAlign: "top",
                                            paddingBottom: "10px"
                                        }} className="border  align-middle">{attendance.late}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Right Table (Grade Legend) */}
                        <table className="border  border-collapse text-center w-[40%] table-fixed text-[12px]">
                            <tbody>
                                <tr style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="h-6"><td className="border ">A</td><td className="border ">90 – 100</td></tr>
                                <tr style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="h-6"><td className="border ">B</td><td className="border ">80 – 89</td></tr>
                                <tr style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="h-6"><td className="border ">C</td><td className="border ">70 – 79</td></tr>
                                <tr style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="h-6"><td className="border ">D</td><td className="border ">60 – 69</td></tr>
                                <tr style={{
                                    verticalAlign: "top",
                                    paddingBottom: "10px"
                                }} className="h-6"><td className="border ">F</td><td className="border ">Below – 60</td></tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Remarks */}
                    <div className="mb-1 text-[12px]">
                        <table className="w-full border border-collapse text-left table-fixed leading-none">
                            <thead className="text-[12px] align-top">
                                <tr>
                                    <th style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[20%]"></th>
                                    <th style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border px-1 py-[0px] w-[80%] text-center">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="align-top">
                                <tr>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[20%]">Interpersonal</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[80%]">{remarks.interpersonal}</td>
                                </tr>
                                <tr>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[20%]">Effort</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[80%]">{remarks.effort}</td>
                                </tr>
                                <tr>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[20%]">Class Behaviour</td>
                                    <td style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="border  px-1 py-[0px] w-[80%]">{remarks.classBehaviour}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* Comment - Expanded for more space */}
                    <div className="text-[12px] border px-2 py-2 min-h-[120px] flex-grow mb-1">
                        <div className="text-[12px] font-bold mb-1">Comments:</div>
                        <div className="text-[11px]">{comment}</div>
                    </div>

                    {/* Signatures */}
                    <table className="w-full text-center text-[12px] mt-auto border border-collapse table-fixed">
                        <tbody>
                            <tr className="h-[24px]">
                                <td className="w-1/2 py-3 border align-middle">
                                    <img src={sigAun} alt="Signature of Ms. Rose Clarkson" className="h-5 mx-auto" />
                                </td>
                                <td className="w-1/2 border  align-middle">
                                    <img src="/lovable-uploads/c610321b-7d11-4eff-a4f8-083660a257b7.png" alt="Signature of N. Y. Mikail" className="h-5 mx-auto" />
                                </td>
                            </tr>
                            <tr className="h-[24px]">
                                <td className="w-1/2 border  px-1 py-0">
                                    <p className="font-bold">Ms. Rose Clarkson</p>
                                    <p className="font-bold">Supervisor, AUN Schools – Charter</p>
                                </td>
                                <td className="w-1/2 border  px-1 py-0">
                                    <p className="font-bold">N. Y. Mikail</p>
                                    <p className="font-bold">Asst. Director Academics</p>
                                    <p style={{
                                        verticalAlign: "top",
                                        paddingBottom: "10px"
                                    }} className="font-bold">AUN Schools</p>
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
