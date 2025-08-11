import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { forwardRef, useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
    dateOfBirth?: string;
    rawData: any;
    pageRefs?: {
        coverRef: React.RefObject<HTMLDivElement>;
        subjectsRef: React.RefObject<HTMLDivElement>;
        specialsRef: React.RefObject<HTMLDivElement>;
        finalRef: React.RefObject<HTMLDivElement>;
    };
}

export const DolphinReportCard = ({
    studentName,
    dateOfBirth,
    rawData,
    pageRefs,
}: ReportCardProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();
    
    const getCheckboxState = (field: string) => rawData?.[field] === 'Y';
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const uploadToSupabase = async () => {
        if (!pageRefs?.coverRef.current || !pageRefs?.subjectsRef.current) return;

        setIsUploading(true);
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            const pageElements = [pageRefs.coverRef.current, pageRefs.subjectsRef.current];
            
            for (let i = 0; i < pageElements.length; i++) {
                const pageElement = pageElements[i];
                if (!pageElement) continue;

                const canvas = await html2canvas(pageElement, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff',
                    width: pageElement.scrollWidth,
                    height: pageElement.scrollHeight,
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                
                if (i > 0) {
                    pdf.addPage();
                }
                
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
            }
            
            const pdfBlob = pdf.output('blob');

            const fileName = `dolphin_${studentName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('reports')
                .upload(fileName, pdfBlob, {
                    contentType: 'application/pdf',
                    upsert: true
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                throw uploadError;
            }

            const { data: urlData } = supabase.storage
                .from('reports')
                .getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from('student_reports')
                .insert({
                    student_name: studentName,
                    file_path: fileName,
                    public_url: urlData.publicUrl,
                    class_tag: 'Curious Dolphins',
                    grade_tag: 'A'
                });

            if (dbError) {
                console.error('Database error:', dbError);
                throw dbError;
            }

            toast({
                title: "Report uploaded successfully!",
                description: `Report for ${studentName} has been uploaded as PDF.`
            });
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload failed",
                description: `Error: ${error.message || 'Please try again.'}`,
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            {/* Page 1 */}
            <div
                ref={pageRefs?.coverRef}
                className="w-full p-4 bg-white"
                style={{ minHeight: '297mm', width: '210mm' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center w-full">
                        <img
                            src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png"
                            alt="AUN Schools Logo"
                            className="h-[130px] w-[130px] mr-4"
                        />
                        <div className="text-center flex-1">
                            <h1 className="text-lg font-bold">
                                American University of Nigeria Schools – Early Learning Center
                            </h1>
                            <p className="text-sm">
                                No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250
                            </p>
                            <p className="text-sm font-bold mt-2">
                                STUDENT REPORT CARD
                            </p>
                        </div>
                    </div>
                </div>

                {/* Age Group Header */}
                <div className="border-4 border-green-600 bg-blue-900 text-white p-6 rounded-xl mb-6">
                    <h2 className="text-2xl font-bold py-0" style={{
                        verticalAlign: "top",
                        paddingBottom: "10px"
                    }} >
                        Your Child at 12 – 24 Months
                    </h2>
                </div>

                {/* Student Info */}
                <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 mb-6 text-center items-start">
                    {/* Child's Name */}
                    <div className="pb-2 self-start">
                        <p
                            className="font-bold border-b border-black whitespace-nowrap py-0 px-4"
                            style={{
                                verticalAlign: "top",
                                paddingBottom: "10px",
                            }}
                        >
                            {studentName}
                        </p>
                        <p className="font-bold">Child's Name</p>
                    </div>

                    {/* Date of Birth */}
                    <div className="pb-2 self-start w-32">
                        <p
                            className="font-bold border-b border-black min-h-[1.5rem]"
                            style={{
                                verticalAlign: "top",
                                paddingBottom: "10px",
                            }}
                        >
                            {dateOfBirth || "\u00A0"}
                        </p>
                        <p className="font-bold">Date of Birth</p>
                    </div>

                    {/* Today's Date */}
                    <div className="pb-2 self-start w-32">
                        <p
                            className="font-bold border-b border-black py-0"
                            style={{
                                verticalAlign: "top",
                                paddingBottom: "10px",
                            }}
                        >
                            {today}
                        </p>
                        <p className="font-bold">Today's Date</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm mb-6">
                    How your child plays, learns, speaks, acts and moves offers important clues about your child's development.
                    Developmental milestones which this report is based on are things children can do by certain age.
                </p>

                {/* Development Sections */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-blue-600 mb-4">
                        What Most Children Do at this Age :
                    </h3>

                    {[
                        {
                            title: "Social/Emotional",
                            items: [
                                { text: "Likes to hand things to others as play", field: "likes_to_hand_social" },
                                { text: "May have temper tantrums", field: "tantrums_social" },
                                { text: "May be afraid of strangers", field: "strangers_social" },
                                { text: "Shows affection to familiar people", field: "familiar_social" },
                                { text: "May cling to caregivers in new situation", field: "situation_social" },
                                { text: "Points to show others something interesting", field: "interesting_social" },
                                { text: "Explores alone but with parents close by", field: "explores_social" }
                            ]
                        },
                        {
                            title: "Language/Communication",
                            items: [
                                { text: "Says several single words", field: "several_communication" },
                                { text: "Says and shakes head \"no\"", field: "shakes_communication" },
                                { text: "Points to show someone what he/she wants", field: "wants_communication" },
                                { text: "Imitates words and actions", field: "imitates_words" }
                            ]
                        },
                        {
                            title: "Cognitive",
                            items: [
                                { text: "Points to get attention of others", field: "attention_cognitive" },
                                { text: "Shows interest in doll or stuffed animal by pretending to feed", field: "feed_cognitive" },
                                { text: "Consistently responds to name", field: "body_consistently" },
                                { text: "Scribbles on his own", field: "own_cognitive" },
                                { text: "Can follow 1-step verbal command without any gestures; for example, sits when you say \"sit down\"", field: "command_cognitive" }
                            ]
                        },
                        {
                            title: "Movement/Physical Development",
                            items: [
                                { text: "Walks alone", field: "alone_development" },
                                { text: "May walk up steps and run", field: "run_development" },
                                { text: "Pulls toys while walking", field: "walking_development" },
                                { text: "Moves body to music", field: "help_moves" },
                                { text: "Drinks from a cup", field: "cup_development" },
                                { text: "Eats with a spoon", field: "spoon_development" }
                            ]
                        }
                    ].map((section, sIdx) => (
                        <div key={sIdx}>
                            <h4 className="text-md font-bold text-blue-600 mb-3">{section.title}</h4>
                            <div className="space-y-2">
                                {section.items.map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className={`w-5 h-5 border border-black mr-3 flex items-center justify-center ${getCheckboxState(item.field) ? 'bg-white' : ''}`}>
                                            {getCheckboxState(item.field) && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="black"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    width="16"
                                                    height="16"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm py-0" style={{
                                            verticalAlign: "top",
                                            paddingBottom: "10px",
                                        }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Page 2 */}
            <div
                ref={pageRefs?.subjectsRef}
                className="w-full p-4 bg-white"
                style={{ minHeight: '297mm', width: '210mm' }}
            >
                {/* Header */}
                <div className="border-4 border-green-600 bg-blue-900 text-white p-6 rounded-xl mb-6">
                    <h2 className="text-2xl font-bold py-0" style={{
                        verticalAlign: "top",
                        paddingBottom: "10px"
                    }}>Help Your Child Learn and Grow</h2>
                </div>

                <p className="text-sm mb-6">
                    You can help your child learn and grow. Talk, read, sing and play together every day. Below are some activities to enjoy with your Toddler child today.
                </p>

                {/* Activities */}
                <div className="border-2 border-blue-400 p-6 mb-8">
                    <h3 className="text-lg font-bold text-blue-600 mb-4">
                        What You Can Do For Your 12 - 24 months :
                    </h3>

                    <div className="grid grid-cols-2 gap-6 items-start">
                        <div className="space-y-3">
                            {[
                                "Provide a safe, loving environment. It's important to be consistent and predictable.",
                                "Praise good behaviors more than you punish bad behaviors (use only very brief time outs).",
                                "Describe his/her emotions. For example, say, \"You are happy when we read this book\".",
                                "Encourage pretend play.",
                                "Encourage empathy. For example, when he/she sees a child who is sad, encourage him/her to hug or pat the other child.",
                                "Read books and talk about the pictures using simple words.",
                                "Copy your child's words.",
                                "Use words that describe feelings and emotions.",
                                "Use simple, clear phrases",
                                "Ask simple questions."
                            ].map((text, i) => (
                                <div key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span className="text-sm">{text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {[
                                "Hide things under blankets and pillows and encourage him/her to find them.",
                                "Play with blocks, balls, puzzles, books, and toys that teach cause and effect and problem solving.",
                                "Name pictures in books and body parts.",
                                "Provide toys that encourage pretend play; for example, dolls, play telephones.",
                                "Provide safe areas for your child to walk and move around in.",
                                "Provide toys that he/she can push or pull safely.",
                                "Provide balls for him/her to kick, roll, and throw.",
                                "Encourage him to drink from his/her cup and use a spoon, no matter how messy."
                            ].map((text, i) => (
                                <div key={i} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span className="text-sm">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Teacher Comments */}
                {rawData?.teacher_comments && (
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed">{rawData.teacher_comments}</p>
                    </div>
                )}

                {/* Signature */}
                <div className="mt-16 text-center">
                    <div className="mb-4">
                        <img
                            src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png"
                            alt="Signature"
                            className="h-12 mx-auto"
                        />
                    </div>
                    <div className="border-t border-black mx-auto w-64 mb-2"></div>
                    <div className="text-sm font-bold">N. Y. Mikail</div>
                    <div className="text-sm font-bold">Asst. Director Academics</div>
                    <div className="text-sm font-bold">AUN Schools</div>
                </div>
            </div>

            {/* Upload Button */}
            <div className="w-full text-center mt-6 print:hidden">
                <Button 
                    onClick={uploadToSupabase}
                    disabled={isUploading}
                    className="px-8 py-2"
                >
                    {isUploading ? "Uploading Report..." : "Upload Report as PDF"}
                </Button>
            </div>
        </>
    );
};
