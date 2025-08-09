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

  return (
    <div className="space-y-8">
      {/* Cover Page */}
      <div ref={pageRefs.coverRef} className="min-h-[210mm] w-[297mm] mx-auto bg-white p-8 border-4 border-blue-900">
        <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
          <img src={logo} alt="AUN Schools Logo" className="w-24 h-24" />
          
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-blue-900">AUN SCHOOLS – EARLY LEARNING CENTRE</h1>
            <h2 className="text-lg font-bold italic">End of Term Report</h2>
            <div className="text-lg">
              <p className="font-bold">{getRating('term_name')}</p>
              <p>{getRating('year_name')}</p>
            </div>
          </div>

          <div className="space-y-2 text-lg">
            <h3 className="text-xl font-bold">{studentName}</h3>
            <p className="font-bold">Busy Bees 1</p>
            <p>{getRating('teacher_name')}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl text-sm">
            <div className="space-y-2">
              <h4 className="font-bold">ADDRESS</h4>
              <div>
                <p>AUN Schools-Elementary</p>
                <p>99 Lamido Zubairu Way</p>
                <p>Yola Bypass</p>
                <p>Yola Adamawa State</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold">CONTACT</h4>
              <div>
                <p>Phone: +2348032425524</p>
                <p>Email: info@aunschools.net</p>
                <p>Website: aunschools.net</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Table Page 1 */}
      <div ref={pageRefs.subjectsRef} className="min-h-[210mm] w-[297mm] mx-auto bg-white p-4">
        <div className="flex items-center mb-4">
          <img src={logo} alt="AUN Schools Logo" className="w-12 h-12 mr-4" />
          <div>
            <h1 className="text-lg font-bold">AUN SCHOOLS</h1>
            <p className="text-sm">Early Learning Center</p>
          </div>
        </div>

        {/* Student Info Table */}
        <table className="w-full border-collapse border border-black mb-4 text-xs">
          <tr>
            <td className="border border-black p-1 font-bold">Child's Name</td>
            <td className="border border-black p-1">: {studentName}</td>
            <td className="border border-black p-1 font-bold">DOB : 24 Sep 2022</td>
            <td className="border border-black p-1 font-bold">SEN Level :</td>
            <td className="border border-black p-1 font-bold">School Year</td>
            <td className="border border-black p-1">{getRating('year_name')}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 font-bold">Class</td>
            <td className="border border-black p-1">: Busy Bees 1</td>
            <td className="border border-black p-1 font-bold">No. of school days</td>
            <td className="border border-black p-1">{getRating('no_of_school_days')}</td>
            <td className="border border-black p-1 font-bold">Days Present</td>
            <td className="border border-black p-1">{getRating('days_present')}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 font-bold">Key</td>
            <td className="border border-black p-1 bg-gray-200">EM</td>
            <td className="border border-black p-1 bg-gray-200">Emerging</td>
            <td className="border border-black p-1 bg-gray-200">EX</td>
            <td className="border border-black p-1 bg-gray-200">Expected</td>
            <td className="border border-black p-1 bg-gray-200">EXC</td>
          </tr>
          <tr>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1 bg-gray-200">Exceeding</td>
            <td className="border border-black p-1 bg-gray-200">NA</td>
            <td className="border border-black p-1 bg-gray-200">Not Assessed</td>
            <td className="border border-black p-1"></td>
            <td className="border border-black p-1"></td>
          </tr>
        </table>

        {/* Personal, Social and Emotional Development */}
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Personal, Social and Emotional Development</th>
              <th className="border border-black p-1">Term 1</th>
              <th className="border border-black p-1">Term 2</th>
              <th className="border border-black p-1">Term 3</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Making relationships</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can play co-operatively, taking turns with others.</td>
              <td className="border border-black p-1 text-center">{getRating('can_play_taking_turns_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_can_play_taking_turns_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_can_play_taking_turns_relationships')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can show sensitivity to others' needs and feelings</td>
              <td className="border border-black p-1 text-center">{getRating('needs_and_feelings_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_needs_and_feelings_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_needs_and_feelings_relationships')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Forms positive relationships with adults and others.</td>
              <td className="border border-black p-1 text-center">{getRating('forms_positive_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_forms_positive_relationships')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_forms_positive_relationships')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Self Confidence and Self Awareness</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Is confident to try new activities, and say why they like some activities more than others.</td>
              <td className="border border-black p-1 text-center">{getRating('Is_confident_to_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_Is_confident_to_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_Is_confident_to_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Is confident to speak in a familiar group, will talk about their ideas.</td>
              <td className="border border-black p-1 text-center">{getRating('familiar_group_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_familiar_group_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_familiar_group_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can choose the resources they need for their chosen activities</td>
              <td className="border border-black p-1 text-center">{getRating('their_chosen_activities_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_their_chosen_activities_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_their_chosen_activities_self_awareness')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can say when they do or don't need help.</td>
              <td className="border border-black p-1 text-center">{getRating('Can_say_when_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_Can_say_when_self_awareness')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_Can_say_when_self_awareness')}</td>
            </tr>

            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Managing Feelings and Behaviour</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can talk about how they and others show feelings</td>
              <td className="border border-black p-1 text-center">{getRating('show_feelings_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_show_feelings_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_show_feelings_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can talk about their own and others' behaviours and its consequences</td>
              <td className="border border-black p-1 text-center">{getRating('consequences_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_consequences_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_consequences_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows that some behaviour is unacceptable</td>
              <td className="border border-black p-1 text-center">{getRating('unacceptable_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_unacceptable_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_unacceptable_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can work as part of a group or class and understand and follow the rules</td>
              <td className="border border-black p-1 text-center">{getRating('follow_the_rules_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_follow_the_rules_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_follow_the_rules_managing_feelings')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can adjust his/her behaviour to different situations, and take changes of routine in their stride</td>
              <td className="border border-black p-1 text-center">{getRating('routine_in_their_stride_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_routine_in_their_stride_managing_feelings')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_routine_in_their_stride_managing_feelings')}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-red-600 h-2 w-full my-2"></div>

        {/* Communication and Language */}
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Communication and Language</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Listening and Attention</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can listen attentively in a range of situations</td>
              <td className="border border-black p-1 text-center">{getRating('situations_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_situations_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_situations_listening')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can listen to stories, accurately anticipating key events and respond to what they have heard with relevant comments, questions or actions</td>
              <td className="border border-black p-1 text-center">{getRating('questions_or_actions_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_questions_or_actions_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_questions_or_actions_listening')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can give his/her attention to what others say and respond appropriately, while engaged in another activity</td>
              <td className="border border-black p-1 text-center">{getRating('another_activity_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_another_activity_listening')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_another_activity_listening')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 2 - Understanding, Speaking, Physical Development */}
      <div ref={pageRefs.specialsRef} className="min-h-[210mm] w-[297mm] mx-auto bg-white p-4">
        {/* Understanding */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Understanding</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can follow instructions involving several ideas or actions</td>
              <td className="border border-black p-1 text-center">{getRating('ideas_or_actions_understanding')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_ideas_or_actions_understanding')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_ideas_or_actions_understanding')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can answer 'how' and 'why' questions about their experiences and in response to stories or events.</td>
              <td className="border border-black p-1 text-center">{getRating('stories_understanding')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_stories_understanding')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_stories_understanding')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Speaking</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can express him/herself effectively, showing awareness of listeners' needs</td>
              <td className="border border-black p-1 text-center">{getRating('listeners_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_listeners_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_listeners_speaking')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can use past, present and future forms accurately when talking about events that have happened or are to happen in the future.</td>
              <td className="border border-black p-1 text-center">{getRating('happen_in_the_future_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_happen_in_the_future_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_happen_in_the_future_speaking')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can develop their own narratives and explanations by connecting ideas or events.</td>
              <td className="border border-black p-1 text-center">{getRating('ideas_or_events_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_ideas_or_events_speaking')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_ideas_or_events_speaking')}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-red-600 h-2 w-full my-2"></div>

        {/* Physical Development */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Physical Development</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Moving and Handling</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Shows good control and co-ordination in large and small movements.</td>
              <td className="border border-black p-1 text-center">{getRating('small_movements_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_small_movements_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_small_movements_moving_handling')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can move confidently in a range of ways, safely negotiating space.</td>
              <td className="border border-black p-1 text-center">{getRating('negotiating_space_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_negotiating_space_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_negotiating_space_moving_handling')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can handle equipment and tools effectively, including pencils for writing.</td>
              <td className="border border-black p-1 text-center">{getRating('pencils_for_writing_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_pencils_for_writing_moving_handling')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_pencils_for_writing_moving_handling')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Health and Self Care</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows the importance for good health of physical exercise, and a healthy diet, and talk about ways to keep healthy and safe.</td>
              <td className="border border-black p-1 text-center">{getRating('healthy_and_safe_moving_health_self_care')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_healthy_and_safe_moving_health_self_care')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_healthy_and_safe_moving_health_self_care')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can manage his/her own basic hygiene and personal needs successfully, including dressing and going to the toilet independently.</td>
              <td className="border border-black p-1 text-center">{getRating('toilet_independently_health_self_care')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_toilet_independently_health_self_care')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_toilet_independently_health_self_care')}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-red-600 h-2 w-full my-2"></div>

        {/* Literacy */}
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Literacy</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Reading</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Has favourite stories, rhymes, songs, poems or jingles.</td>
              <td className="border border-black p-1 text-center">{getRating('sentences_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_sentences_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_sentences_reading')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can repeat words or phrases from familiar stories.</td>
              <td className="border border-black p-1 text-center">{getRating('aloud_accurately_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_aloud_accurately_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_aloud_accurately_reading')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can fill the missing word or phrase in a known rhymes, story or game, e.g. 'Humpty Dumpty sat on a'</td>
              <td className="border border-black p-1 text-center">{getRating('irregular_words_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_irregular_words_reading')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_irregular_words_reading')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Writing</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can distinguish between the different marks they make.</td>
              <td className="border border-black p-1 text-center">{getRating('spoken_sounds_writing')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_spoken_sounds_writing')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_spoken_sounds_writing')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 3 - Mathematics */}
      <div ref={pageRefs.shapeRef} className="min-h-[210mm] w-[297mm] mx-auto bg-white p-4">
        {/* Mathematics */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Mathematics</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1">❖ Can recite some number names in sequence</td>
              <td className="border border-black p-1 text-center">{getRating('names_in_sequence')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_names_in_sequence')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_names_in_sequence')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can use some language of quantities, such as 'more' and 'a lot'</td>
              <td className="border border-black p-1 text-center">{getRating('language_of_quantities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_language_of_quantities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_language_of_quantities')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows that a group of things changes in quantity when something is added or taken away.</td>
              <td className="border border-black p-1 text-center">{getRating('quantity_when_something')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_quantity_when_something')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_quantity_when_something')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Numbers</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can use everyday language to talk about size, weight, capacity, position, distance, time and money to compare quantities and objects and to solve problems.</td>
              <td className="border border-black p-1 text-center">{getRating('given_number_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_given_number_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_given_number_numbers')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can recognise, create and describe patterns</td>
              <td className="border border-black p-1 text-center">{getRating('find_the_answer_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_find_the_answer_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_find_the_answer_numbers')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can explore characteristics of everyday objects and shapes and use mathematical language to describe them</td>
              <td className="border border-black p-1 text-center">{getRating('solve_problems_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_solve_problems_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_solve_problems_shape')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Shape, Space and Measure</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can notice simple shapes and pattern pictures</td>
              <td className="border border-black p-1 text-center">{getRating('patterns_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_patterns_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_patterns_shape')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can begin to use the language of size</td>
              <td className="border border-black p-1 text-center">{getRating('describe_them_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_describe_them_shape')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_describe_them_shape')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can anticipate specific time-based events such as mealtimes or home time.</td>
              <td className="border border-black p-1 text-center">{getRating('order_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_order_numbers')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_order_numbers')}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-red-600 h-2 w-full my-2"></div>

        {/* Understanding the World */}
        <table className="w-full border-collapse border border-black text-xs mb-4">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Understanding the World</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>People and Communities</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can talk about past and present events in their own lives and the lives of family members.</td>
              <td className="border border-black p-1 text-center">{getRating('family_members_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_family_members_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_family_members_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows that others don't always enjoy the same things, and is sensitive to this.</td>
              <td className="border border-black p-1 text-center">{getRating('sensitive_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_sensitive_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_sensitive_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows about similarities and differences between themselves and others, and among families, communities' and traditions.</td>
              <td className="border border-black p-1 text-center">{getRating('traditions_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_traditions_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_traditions_communities')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>The World</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Knows about similarities and differences in relation to places, objects, materials and living things.</td>
              <td className="border border-black p-1 text-center">{getRating('living_things_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_living_things_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_living_things_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can talk about the features of their own immediate environment and how environments might vary from one another.</td>
              <td className="border border-black p-1 text-center">{getRating('another_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_another_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_another_communities')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can make observations of animals and plants and explain why some things occur and talk about changes.</td>
              <td className="border border-black p-1 text-center">{getRating('talk_about_changes_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_talk_about_changes_communities')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_talk_about_changes_communities')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Technology</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can recognise that a range of technology is used in places such as homes and schools.</td>
              <td className="border border-black p-1 text-center">{getRating('schools_technology')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_schools_technology')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_schools_technology')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can select and use technology for particular purposes.</td>
              <td className="border border-black p-1 text-center">{getRating('purposes_technology')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_purposes_technology')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_purposes_technology')}</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-red-600 h-2 w-full my-2"></div>

        {/* Expressive Arts and Design */}
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-blue-200">
              <th className="border border-black p-1 text-left font-bold">Expressive Arts and Design</th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
              <th className="border border-black p-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Exploring and Using Media and Materials</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can sing songs, make music and dance, and experiment with ways of changing them.</td>
              <td className="border border-black p-1 text-center">{getRating('experiment_exploring')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_experiment_exploring')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_experiment_exploring')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can safely use and explore a variety of materials, tools and techniques, experimenting with colour, design, texture, form and function.</td>
              <td className="border border-black p-1 text-center">{getRating('design_texture_exploring')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_design_texture_exploring')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_design_texture_exploring')}</td>
            </tr>
            
            <tr className="bg-pink-200">
              <td className="border border-black p-1 font-bold" colSpan={4}>Being Imaginative</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can use what they have learnt about media and materials in original ways, thinking about uses and purposes.</td>
              <td className="border border-black p-1 text-center">{getRating('uses_and_purposes_imaginative')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_uses_and_purposes_imaginative')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_uses_and_purposes_imaginative')}</td>
            </tr>
            <tr>
              <td className="border border-black p-1">❖ Can represent their own ideas, thoughts and feelings through design and technology, art, music, dance, role play and stories.</td>
              <td className="border border-black p-1 text-center">{getRating('stories_imaginative')}</td>
              <td className="border border-black p-1 text-center">{getRating('term2_stories_imaginative')}</td>
              <td className="border border-black p-1 text-center">{getRating('term3_stories_imaginative')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Page 4 - Key Descriptor and Comment */}
      <div ref={pageRefs.finalRef} className="min-h-[210mm] w-[297mm] mx-auto bg-white p-4">
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Key Descriptor :</h3>
          <table className="w-full border-collapse border border-black text-sm mb-8">
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-200">Emerging</td>
              <td className="border border-black p-2">Not yet at the level expected at the end of the term</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-200">Expected</td>
              <td className="border border-black p-2">At the level expected at the end of the term</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-200">Exceeding</td>
              <td className="border border-black p-2">Beyond the level expected at the end of the term</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-bold bg-gray-200">NA</td>
              <td className="border border-black p-2">Not yet assessed</td>
            </tr>
          </table>

          <div className="border border-black p-4 mb-8">
            <h4 className="font-bold mb-2">Comment :</h4>
            <p className="text-sm leading-relaxed">{getRating('teacher_comment')}</p>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-center">
              <img src={signature} alt="Signature" className="w-32 h-16 mx-auto mb-2" />
              <div className="border-t border-black pt-2">
                <p className="font-bold">N. Y. Mikail</p>
                <p className="font-bold">Asst. Director Academics</p>
                <p className="font-bold">AUN Schools</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}