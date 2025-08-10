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
    // Helper function to get checkbox state from raw data
    const getCheckboxState = (field: string) => rawData?.[field] === 'Y';
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    return (
        <>
            {/* Page 1 - Main Report */}
            <div ref={pageRefs?.coverRef} className="w-full p-8 bg-white" style={{ minHeight: '297mm', width: '210mm' }}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                        <img src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" alt="AUN Schools Logo" className="h-20 w-20 mr-4" />
                        <div>
                            <h1 className="text-lg font-bold">American University of Nigeria Schools – Early Learning Center</h1>
                            <p className="text-sm">No. 99, Lamido Zubairu Way, Yola Bye – Pass, P.M.B. 2250</p>
                            <p className="text-sm font-bold mt-2">STUDENT REPORT CARD</p>
                        </div>
                    </div>
                    <div className="w-24 h-32 border-2 border-gray-400"></div>
                </div>

                {/* Age Group Header */}
                <div className="bg-blue-800 text-white p-4 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold">Your Child at 12 – 24 Months</h2>
                </div>

                {/* Student Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="border-b-2 border-gray-400 pb-2">
                        <p className="font-bold">Child's Name</p>
                        <p className="mt-2">{studentName}</p>
                    </div>
                    <div className="border-b-2 border-gray-400 pb-2">
                        <p className="font-bold">Date of birth</p>
                        <p className="mt-2">{dateOfBirth || ''}</p>
                    </div>
                    <div className="border-b-2 border-gray-400 pb-2">
                        <p className="font-bold">Today's Date</p>
                        <p className="mt-2">{today}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm mb-6">
                    How your child plays, learns, speaks, acts and moves offers important clues about your child's development. 
                    Developmental milestones which this report is based on are things children can do by certain age.
                </p>

                {/* Development Sections */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-blue-600 mb-4">What Most Children Do at this Age :</h3>

                     {/* Social/Emotional */}
                    <div>
                        <h4 className="text-md font-bold text-blue-600 mb-3">Social/Emotional</h4>
                        <div className="space-y-2">
                            {[
                                { text: "Likes to hand things to others as play", field: "likes_to_hand_social" },
                                { text: "May have temper tantrums", field: "tantrums_social" }, 
                                { text: "May be afraid of strangers", field: "strangers_social" },
                                { text: "Shows affection to familiar people", field: "familiar_social" },
                                { text: "May cling to caregivers in new situation", field: "situation_social" },
                                { text: "Points to show others something interesting", field: "interesting_social" },
                                { text: "Explores alone but with parents close by", field: "explores_social" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-4 h-4 border border-gray-400 mr-3 flex items-center justify-center ${getCheckboxState(item.field) ? 'bg-blue-600' : ''}`}>
                                        {getCheckboxState(item.field) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Language/Communication */}
                    <div>
                        <h4 className="text-md font-bold text-blue-600 mb-3">Language/Communication</h4>
                        <div className="space-y-2">
                            {[
                                { text: "Says several single words", field: "several_communication" },
                                { text: "Says and shakes head \"no\"", field: "shakes_communication" },
                                { text: "Points to show someone what he/she wants", field: "wants_communication" },
                                { text: "Imitates words and actions", field: "imitates_words" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-4 h-4 border border-gray-400 mr-3 flex items-center justify-center ${getCheckboxState(item.field) ? 'bg-blue-600' : ''}`}>
                                        {getCheckboxState(item.field) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cognitive */}
                    <div>
                        <h4 className="text-md font-bold text-blue-600 mb-3">Cognitive</h4>
                        <div className="space-y-2">
                            {[
                                { text: "Points to get attention of others", field: "attention_cognitive" },
                                { text: "Shows interest in doll or stuffed animal by pretending to feed", field: "feed_cognitive" },
                                { text: "Consistently responds to name", field: "body_consistently" },
                                { text: "Scribbles on his own", field: "own_cognitive" },
                                { text: "Can follow 1-step verbal command without any gestures; for example, sits when you say \"sit down\"", field: "command_cognitive" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-4 h-4 border border-gray-400 mr-3 flex items-center justify-center ${getCheckboxState(item.field) ? 'bg-blue-600' : ''}`}>
                                        {getCheckboxState(item.field) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Movement/Physical Development */}
                    <div>
                        <h4 className="text-md font-bold text-blue-600 mb-3">Movement/Physical Development</h4>
                        <div className="space-y-2">
                            {[
                                { text: "Walks alone", field: "alone_development" },
                                { text: "May walk up steps and run", field: "run_development" },
                                { text: "Pulls toys while walking", field: "walking_development" },
                                { text: "Moves body to music", field: "help_moves" },
                                { text: "Drinks from a cup", field: "cup_development" },
                                { text: "Eats with a spoon", field: "spoon_development" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-4 h-4 border border-gray-400 mr-3 flex items-center justify-center ${getCheckboxState(item.field) ? 'bg-blue-600' : ''}`}>
                                        {getCheckboxState(item.field) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Page 2 - Help Your Child Learn and Grow */}
            <div ref={pageRefs?.subjectsRef} className="w-full p-8 bg-white" style={{ minHeight: '297mm', width: '210mm' }}>
                <div className="flex justify-end mb-8">
                    <div className="w-24 h-32 border-2 border-gray-400"></div>
                </div>

                {/* Header */}
                <div className="bg-blue-800 text-white p-4 rounded-lg mb-6">
                    <h2 className="text-2xl font-bold">Help Your Child Learn and Grow</h2>
                </div>

                <p className="text-sm mb-6">
                    You can help your child learn and grow. Talk, read, sing and play together every day. Below are some activities to 
                    enjoy with your Toddler child today.
                </p>

                {/* Activities Box */}
                <div className="border-2 border-blue-400 p-6 mb-8">
                    <h3 className="text-lg font-bold text-blue-600 mb-4">What You Can Do For Your 12 - 24 months :</h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Provide a safe, loving environment. It's important to be consistent and predictable.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Praise good behaviors more than you punish bad behaviors (use only very brief time outs).</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Describe his/her emotions. For example, say, "You are happy when we read this book".</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Encourage pretend play.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Encourage empathy. For example, when he/she sees a child who is sad, encourage him/her to hug or pat the other child.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Read books and talk about the pictures using simple words.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Copy your child's words.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Use words that describe feelings and emotions.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Use simple, clear phrases</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Ask simple questions.</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Hide things under blankets and pillows and encourage him/her to find them.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Play with blocks, balls, puzzles, books, and toys that teach cause and effect and problem solving.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Name pictures in books and body parts.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Provide toys that encourage pretend play; for example, dolls, play telephones.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Provide safe areas for your child to walk and move around in.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Provide toys that he/she can push or pull safely.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Provide balls for him/her to kick, roll, and throw.</span>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span className="text-sm">Encourage him to drink from his/her cup and use a spoon, no matter how messy.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher Comments */}
                {rawData?.teacher_comments && (
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed">{rawData.teacher_comments}</p>
                    </div>
                )}

                {/* Signature Section */}
                <div className="mt-16 text-center">
                    <div className="mb-4">
                        <img src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" alt="Signature" className="h-12 mx-auto" />
                    </div>
                    <div className="border-t border-black mx-auto w-64 mb-2"></div>
                    <div className="text-sm font-bold">N. Y. Mikail</div>
                    <div className="text-sm font-bold">Asst. Director Academics</div>
                    <div className="text-sm font-bold">AUN Schools</div>
                </div>
            </div>
        </>
    );
};