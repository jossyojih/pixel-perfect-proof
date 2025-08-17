import React from 'react';
import { Card } from "@/components/ui/card";
import logo from '@/assets/aun-logo.png';
import signature from '@/assets/signature.png';

interface ELCReportCardProps {
  studentName: string;
  rawData: any;
  pageRefs: {
    coverRef: React.RefObject<HTMLDivElement>;
    subjectsRef: React.RefObject<HTMLDivElement>;
    specialsRef: React.RefObject<HTMLDivElement>;
    shapeRef: React.RefObject<HTMLDivElement>;
    finalRef: React.RefObject<HTMLDivElement>;
  };
}



export function ELCReportCard({ studentName, rawData, pageRefs }: ELCReportCardProps) {

  const getRating = (fieldName: string) => {
    return rawData[fieldName] || '';
  };

  console.log(rawData, " rawData");

  const selectedClass = (localStorage.getItem('selectedClass'))

  return (
    <div className="bg-white font-sans text-black">
      {/* Cover Page */}
      <div ref={pageRefs.coverRef} className="w-full h-screen p-12 flex flex-col justify-between" style={{ minHeight: '210mm', width: '297mm' }}>
        <div className="border-4 border-blue-700 p-8 h-full flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-12">
              <img src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" alt="AUN Schools Logo" className="h-32 mx-auto" />
            </div>

            <h1 className="text-l text-black mb-8">
              AUN SCHOOLS – EARLY LEARNING CENTRE
            </h1>

            <div className="space-y-1 mb-12">
              <h2 className="text-lg font-bold italic text-black">
                End of Term Report
              </h2>
              <p className="text-lg font-medium text-blue-600">
                {getRating('term_name')}
              </p>
              <p className="text-lg text-black">
                {getRating('year_name')}
              </p>
            </div>

            <div className="space-y-0">
              <h3 className="text-xl font-bold text-black">
                {studentName}
              </h3>
              <p className="text-lg font-medium text-black">
                {selectedClass || "Busy Bees 1"}
              </p>
              <p className="text-base text-black">
                {getRating('teacher_name')}
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
      <div ref={pageRefs.subjectsRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        {/* Header */}
        <div className="flex items-center mb-4">
          <img src="/lovable-uploads/954eecdc-9246-49b3-925a-05f9a22862d4.png" alt="AUN Schools Logo" className="h-[140px] w-[130px] -ml-7" />
          <div className="-ml-7">
            <h1 className="text-[26px] font-bold">AUN SCHOOLS</h1>
            <p className="text-lg">Early Learning Center</p>
          </div>
        </div>

        {/* Student Info Table */}
        <table className="w-full border-collapse border border-black text-sm mb-4">
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-bold" colSpan={4}>Child's Name : <span>{studentName}</span></td>
              <td className="border border-black px-2 py-1 font-bold" colSpan={2}>DOB : </td>
              <td className="border border-black px-2 py-1 font-bold" colSpan={2}>SEN Level :</td>
              <td className="border border-black px-2 py-1 font-bold">School Year</td>
              <td className="border border-black px-2 py-1">{getRating('year_name')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold" colSpan={4}>Class : <span>Busy Bees 1</span></td>
              <td className="border border-black px-2 py-1 font-bold">No. of school days</td>
              <td className="border border-black px-2 py-1">{getRating('no_of_school_days')}</td>
              <td className="border border-black px-2 py-1 font-bold">Days Present</td>
              <td className="border border-black px-2 py-1">{getRating('days_present')}</td>
              <td className="border border-black px-2 py-1 font-bold">Days Absent</td>
              <td className="border border-black px-2 py-1">{getRating('no_of_school_days') - getRating('days_present')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 font-bold">Key</td>
              <td className="border border-black px-2 py-1 bg-pink-100 font-bold">EM</td>
              <td className="border border-black px-2 py-1 font-bold">Emerging</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold">EX</td>
              <td className="border border-black px-2 py-1 font-bold w-[13%]">Expected</td>
              <td className="border border-black px-2 py-1 bg-blue-100 font-bold w-[10%]">EXC</td>
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
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can play co-operatively, taking turns with others.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('can_play_taking_turns_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_can_play_taking_turns_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_can_play_taking_turns_relationships')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can show sensitivity to others' needs and feelings</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('needs_and_feelings_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_needs_and_feelings_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_needs_and_feelings_relationships')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Forms positive relationships with adults and others.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('forms_positive_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_forms_positive_relationships')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_forms_positive_relationships')}</td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-100 text-left font-bold" colSpan={4}>Self Confidence and Self Awareness</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Is confident to try new activities, and say why they like some activities more than others.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('Is_confident_to_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_Is_confident_to_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_Is_confident_to_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Is confident to speak in a familiar group, will talk about their ideas.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('familiar_group_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_familiar_group_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_familiar_group_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can choose the resources they need for their chosen activities</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('their_chosen_activities_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_their_chosen_activities_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_their_chosen_activities_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can say when they do or don't need help.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('Can_say_when_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_Can_say_when_self_awareness')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_Can_say_when_self_awareness')}</td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Managing Feelings and Behaviour</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about how they and others show feelings</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('show_feelings_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_show_feelings_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_show_feelings_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about their own and others' behaviours and its consequences</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('consequences_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_consequences_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_consequences_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows that some behaviour is unacceptable</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('unacceptable_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_unacceptable_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_unacceptable_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can work as part of a group or class and understand and follow the rules</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('follow_the_rules_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_follow_the_rules_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_follow_the_rules_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can adjust his/her behaviour to different situations, and take changes of routine in their stride</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('routine_in_their_stride_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_routine_in_their_stride_managing_feelings')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_routine_in_their_stride_managing_feelings')}</td>
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
              <th className="border border-black px-2 py-1 text-center font-bold"></th>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can listen attentively in a range of situations</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('situations_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_situations_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_situations_listening')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can listen to stories, accurately anticipating key events and respond to what they have heard with relevant comments, questions or actions</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('questions_or_actions_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_questions_or_actions_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_questions_or_actions_listening')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can give his/her attention to what others say and respond appropriately, while engaged in another activity</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('another_activity_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_another_activity_listening')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_another_activity_listening')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 3 - Continuation */}
      <div ref={pageRefs.specialsRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <tbody>
            <tr>
              <th className="border border-black px-2 py-1 bg-blue-100 text-left font-bold" colSpan={4}>Understanding</th>
              <td className="border border-black px-2 py-1 w-[8%]"></td>
              <td className="border border-black px-2 py-1 w-[8%]"></td>
              <td className="border border-black px-2 py-1 w-[8%] text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can follow instructions involving several ideas or actions</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('ideas_or_actions_understanding')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_ideas_or_actions_understanding')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_ideas_or_actions_understanding')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can answer 'how' and 'why' questions about their experiences and in response to stories or events.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('stories_understanding')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_stories_understanding')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_stories_understanding')}</td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Speaking</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can express him/herself effectively, showing awareness of listeners' needs</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('listeners_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_listeners_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_listeners_speaking')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can use past, present and future forms accurately when talking about events that have happened or are to happen in the future.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('happen_in_the_future_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_happen_in_the_future_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_happen_in_the_future_speaking')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can develop their own narratives and explanations by connecting ideas or events.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('ideas_or_events_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_ideas_or_events_speaking')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_ideas_or_events_speaking')}</td>
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
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Shows good control and co-ordination in large and small movements.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('small_movements_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_small_movements_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_small_movements_moving_handling')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can move confidently in a range of ways, safely negotiating space.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('negotiating_space_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_negotiating_space_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_negotiating_space_moving_handling')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can handle equipment and tools effectively, including pencils for writing.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('pencils_for_writing_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_pencils_for_writing_moving_handling')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_pencils_for_writing_moving_handling')}</td>
            </tr>
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Health and Self Care</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows the importance for good health of physical exercise, and a healthy diet, and talk about ways to keep healthy and safe.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('healthy_and_safe_moving_health_self_care')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_healthy_and_safe_moving_health_self_care')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_healthy_and_safe_moving_health_self_care')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can manage his/her own basic hygiene and personal needs successfully, including dressing and going to the toilet independently.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('toilet_independently_health_self_care')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_toilet_independently_health_self_care')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_toilet_independently_health_self_care')}</td>
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
              <td className="border border-black px-2 py-1 text-center font-bold"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>

              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Has favourite stories, rhymes, songs, poems or jingles.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_sentences_reading')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can recognise and identify their sounds.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_sentences_reading')}</td>
                  </>

                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can read and understand simple sentences.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_sentences_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_sentences_reading')}</td>
                  </>
                ) : null
              }

            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>

              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can repeat words or phrases from familiar stories.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_aloud_accurately_reading')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use phonic knowledge to decode regular words and read them aloud accurately.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_aloud_accurately_reading')}</td>
                  </>

                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use phonic knowledge to decode regular words and read them aloud accurately.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_aloud_accurately_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_aloud_accurately_reading')}</td>
                  </>
                ) : null
              }
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>

              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can fill the missing word or phrase in a known rhymes, story or game, e.g. 'Humpty Dumpty sat on a'</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_irregular_words_reading')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}> Can also sound and blend irregular words.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_irregular_words_reading')}</td>
                  </>

                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can also read some common irregular words.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_irregular_words_reading')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_irregular_words_reading')}</td>
                  </>
                ) : null
              }
            </tr>
            {

              (selectedClass.startsWith("Eager Explorers") || selectedClass.startsWith("Lively Learners")) && (
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>

                  {
                    selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}> Can demonstrate understanding when talking with others about what they have read.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('sentences_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_sentences_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_sentences_reading')}</td>
                      </>

                    ) : selectedClass.startsWith("Lively Learners") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can demonstrate understanding when talking with others about what they have read.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('reads_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_reads_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_reads_reading')}</td>
                      </>
                    ) : null
                  }
                </tr>
              )
            }
            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Writing</th>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>

              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can distinguish between the different marks they make.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_spoken_sounds_writing')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use their phonic knowledge to write words in ways which match their spoken sounds.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_spoken_sounds_writing')}</td>
                  </>

                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use his/her phonic knowledge to write words in ways which match their spoken sounds.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_spoken_sounds_writing')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_spoken_sounds_writing')}</td>
                  </>
                ) : null
              }
            </tr>
            {

              (selectedClass.startsWith("Eager Explorers") || selectedClass.startsWith("Lively Learners")) && (
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>

                  {
                    selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can gives meaning to marks as they draw and paint.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('common_words_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_common_words_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_common_words_writing')}</td>
                      </>

                    ) : selectedClass.startsWith("Lively Learners") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can also write some irregular common words.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('irregular_in_sequence_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_irregular_in_sequence_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_irregular_in_sequence_writing')}</td>
                      </>
                    ) : null
                  }
                </tr>
              )
            }
            {

              (selectedClass.startsWith("Eager Explorers") || selectedClass.startsWith("Lively Learners")) && (
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>

                  {
                    selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can trace each sound correctly.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('themselves_and_others_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_themselves_and_others_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_themselves_and_others_writing')}</td>
                      </>

                    ) : selectedClass.startsWith("Lively Learners") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can write simple sentences which can be read by themselves and others.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('themselves_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_themselves_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_themselves_writing')}</td>
                      </>
                    ) : null
                  }
                </tr>
              )
            }
            {

              (selectedClass.startsWith("Eager Explorers") || selectedClass.startsWith("Lively Learners")) && (
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  {
                    selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can write each sound correctly.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('phonetically_plausible_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('phonetically_plausible_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('phonetically_plausible_writing')}</td>
                      </>


                    ) : selectedClass.startsWith("Lively Learners") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can show some words are spelt correctly and others are phonetically plausible.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('phonetically_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_phonetically_writing')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_phonetically_writing')}</td>
                      </>
                    ) : null
                  }
                </tr>
              )
            }

            {/* Show this for only Busy bees and eager explorers. The Lively learners is pushed to next page */}
            {
              (selectedClass.startsWith("Busy Bees") || selectedClass.startsWith("Eager Explorers")) &&
              <tr>
                <th className="border border-black px-2 py-1 bg-blue-200 text-left font-bold" colSpan={4}>Mathematics</th>
                <td className="border border-black px-2 py-1"></td>
                <td className="border border-black px-2 py-1"></td>
                <td className="border border-black px-2 py-1"></td>
              </tr>
            }


            {
              selectedClass.startsWith("Busy Bees") && (
                <>
                  <tr>
                    <td className="border border-black px-2 py-1 text-sm">❖</td>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can recite some number names in sequence</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('names_in_sequence')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_names_in_sequence')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_names_in_sequence')}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 text-sm">❖</td>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use some language of quantities, such as 'more' and 'a lot'</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('language_of_quantities')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_language_of_quantities')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_language_of_quantities')}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 text-sm">❖</td>
                    <td className="border border-black px-2 py-1" colSpan={3}>Knows that a group of things changes in quantity when something is added or taken away.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('quantity_when_something')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_quantity_when_something')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_quantity_when_something')}</td>
                  </tr>
                </>
              )

            }

            {
              (selectedClass.startsWith("Busy Bees") || selectedClass.startsWith("Eager Explorers")) &&
              <>
                <tr>
                  <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Numbers</th>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                  <td className="border border-black px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  {
                    selectedClass.startsWith("Busy Bees") ? (
                      <>

                        <td className="border border-black px-2 py-1" colSpan={3}>Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare quantities and objects and to solve problems.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('given_number_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_given_number_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_given_number_numbers')}</td>
                      </>
                    ) : selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can count reliably with numbers from one to twenty and place them in order</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('given_number_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_given_number_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_given_number_numbers')}</td>
                      </>

                    ) : null
                  }

                </tr>

                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>

                  {
                    selectedClass.startsWith("Busy Bees") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can recognise, create and describe patterns</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('find_the_answer_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_find_the_answer_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_find_the_answer_numbers')}</td>
                      </>
                    ) : selectedClass.startsWith("Eager Explorers") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Compares two groups of objects, saying when they have the same number.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('find_the_answer_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_find_the_answer_numbers')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_find_the_answer_numbers')}</td>
                      </>

                    ) : null
                  }
                </tr>
              </>


            }

            {

              (selectedClass.startsWith("Busy Bees")) && (
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  {
                    selectedClass.startsWith("Busy Bees") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can explore characteristics of everyday objects and shapes and use mathematical language to describe them.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('solve_problems_shape')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_solve_problems_shape')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_solve_problems_shape')}</td>
                      </>
                    ) : selectedClass.startsWith("Lively Learners") ? (
                      <>
                        <td className="border border-black px-2 py-1" colSpan={3}>Can write simple sentences which can be read by themselves and others.</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('sentences_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term2_sentences_reading')}</td>
                        <td className="border border-black px-2 py-1 text-center">{getRating('term3_sentences_reading')}</td>
                      </>
                    ) : null
                  }
                </tr>
              )
            }

          </tbody>
        </table>
      </div>

      {/* Page 4 - Final sections */}
      <div ref={pageRefs.shapeRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
        <table className="w-full border-collapse border border-black text-xs mb-2">
          <tbody>
            {
              (selectedClass.startsWith("Lively Learners")) &&
              <>
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
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  <td className="border border-black px-2 py-1" colSpan={3}>Can count reliably with numbers from one to twenty and place them in order.</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('given_number_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term2_given_number_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term3_given_number_numbers')}</td>
                </tr>
                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  <td className="border border-black px-2 py-1" colSpan={3}>Says which number is one more or one less than a given number.</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('order_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term2_order_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term3_order_numbers')}</td>
                </tr>

                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  <td className="border border-black px-2 py-1" colSpan={3}>Using quantities and objects , can add and subtract two single digit numbers and count on or back to find the answer.</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('find_the_answer_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term2_find_the_answer_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term3_find_the_answer_numbers')}</td>

                </tr>

                <tr>
                  <td className="border border-black px-2 py-1 text-sm">❖</td>
                  <td className="border border-black px-2 py-1" colSpan={3}>Can solve problems, including doubling, halving and sharing.</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('sharing_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term2_sharing_numbers')}</td>
                  <td className="border border-black px-2 py-1 text-center">{getRating('term3_sharing_numbers')}</td>
                </tr>

              </>
            }

            <tr>
              <th className="border border-black px-2 py-1 bg-pink-100 text-left font-bold" colSpan={4}>Shape, Space and Measure</th>
              <td className="border border-black px-2 py-1 w-[8%]"></td>
              <td className="border border-black px-2 py-1 w-[8%]"></td>
              <td className="border border-black px-2 py-1 w-[8%]"></td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can notice simple shapes and pattern pictures</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_patterns_shape')}</td>
                  </>

                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Using quantities and objects, can add two single digit numbers and count on or back to find the answer.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_patterns_shape')}</td>
                  </>
                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare quantities
                      and objects and to solve problems.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('solve_problems_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_solve_problems_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_solve_problems_shape')}</td>
                  </>
                ) : null
              }


            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can begin to use the language of size</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_describe_them_shape')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Knows that numbers identify how many objects are in a set.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('sharing_numbers')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_sharing_numbers')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_sharing_numbers')}</td>
                  </>
                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can recognise, create and describe patterns.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_patterns_shape')}</td>
                  </>
                ) : null
              }

            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              {
                selectedClass.startsWith("Busy Bees") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can anticipate specific time-based events such as mealtimes or home time.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('order_numbers')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_order_numbers')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_order_numbers')}</td>
                  </>
                ) : selectedClass.startsWith("Eager Explorers") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare
                      quantities and objects and to solve problems.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('solve_problems_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_solve_problems_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_solve_problems_shape')}</td>
                  </>
                ) : selectedClass.startsWith("Lively Learners") ? (
                  <>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can explore characteristics of everyday objects and shapes and use mathematical language to describe them.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_describe_them_shape')}</td>
                  </>
                ) : null
              }
            </tr>
            {
              selectedClass.startsWith("Eager Explorers") && (
                <>
                  <tr>
                    <td className="border border-black px-2 py-1 text-sm">❖</td>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can recognise, create and describe patterns.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_patterns_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_patterns_shape')}</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1 text-sm">❖</td>
                    <td className="border border-black px-2 py-1" colSpan={3}>Can explore characteristics of everyday objects and shapes and use mathematical language to describe them.</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term2_describe_them_shape')}</td>
                    <td className="border border-black px-2 py-1 text-center">{getRating('term3_describe_them_shape')}</td>
                  </tr>
                </>

              )
            }
            <tr>
              <td className="border border-black px-2 bg-red-600 py-1 h-6" colSpan={8}></td>
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
              <td className="border Trang bị cho học sinh các kỹ năng cần thiết để phát triển toàn diện trong môi trường học tập năng động và sáng tạo. border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about past and present events in their own lives and the lives of family members.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('family_members_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_family_members_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_family_members_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows that others don't always enjoy the same things, and is sensitive to this.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('sensitive_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_sensitive_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_sensitive_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Knows about similarities and differences between themselves and others, and among families, communities' and traditions.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('traditions_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_traditions_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_traditions_communities')}</td>
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
              <td className="border border-black px-2 py-1 text-center">{getRating('living_things_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_living_things_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_living_things_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can talk about the features of their own immediate environment and how environments might vary from one another.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('another_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_another_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_another_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can make observations of animals and plants and explain why some things occur and talk about changes.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('talk_about_changes_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_talk_about_changes_communities')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_talk_about_changes_communities')}</td>
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
              <td className="border border-black px-2 py-1 text-center">{getRating('schools_technology')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_schools_technology')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_schools_technology')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can select and use technology for particular purposes.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('purposes_technology')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_purposes_technology')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_purposes_technology')}</td>
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
              <td className="border border-black px-2 py-1 text-center">{getRating('experiment_exploring')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_experiment_exploring')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_experiment_exploring')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can safely use and explore a variety of materials, tools and techniques, experimenting with colour, design, texture, form and function.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('design_texture_exploring')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_design_texture_exploring')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_design_texture_exploring')}</td>
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
              <td className="border border-black px-2 py-1 text-center">{getRating('uses_and_purposes_imaginative')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_uses_and_purposes_imaginative')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_uses_and_purposes_imaginative')}</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-sm">❖</td>
              <td className="border border-black px-2 py-1" colSpan={3}>Can represent their own ideas, thoughts and feelings through design and technology, art, music, dance, role play and stories.</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('stories_imaginative')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term2_stories_imaginative')}</td>
              <td className="border border-black px-2 py-1 text-center">{getRating('term3_stories_imaginative')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div ref={pageRefs.finalRef} className="w-full p-4" style={{ minHeight: '210mm', width: '297mm' }}>
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

          <div
            className="border border-black mb-8 flex flex-col justify-start"
            style={{ minHeight: '200px' }}
          >
            <p className="border-b border-black text-sm font-bold leading-tight m-0 pb-2">
              <span className="px-2">Comment :</span>
            </p>
            <div className="text-sm px-2">{getRating('teacher_comment')}</div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <img src="/lovable-uploads/8e2cb997-99fd-4baa-98af-b2cfb393803f.png" alt="Signature" className="h-10 mx-auto" />
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
}