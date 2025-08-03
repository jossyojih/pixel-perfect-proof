import { ReportCard } from "@/components/ReportCard";

const Index = () => {
  const sampleData = {
    studentName: "Ashira Kamsiyochukwu Benjamin",
    grade: "Grade 3 A",
    term: "Term 1",
    academicYear: "2024 - 2025",
    subjects: [
      {
        name: "English language Art",
        grade: 92,
        teacher: "Oyewale Oyinkansola Prisca",
        comment: "Ashira demonstrates excellent phonics and grammar skills, and her comprehension abilities are strong. She communicates effectively and confidently. However, her writing skills would benefit from additional practice to further enhance her overall performance."
      },
      {
        name: "Mathematics",
        grade: 97,
        teacher: "Monsurat Adebimpe",
        comment: "Ashira can round to the nearest tens and hundreds. She can estimate sums and differences. She understands roman numerals and can add and subtract using place value."
      },
      {
        name: "Social Studies",
        grade: 92,
        teacher: "Oyewale Oyinkansola Prisca",
        comment: "Ashira demonstrated a clear understanding of the concepts of maps and globes, water bodies and landforms, natural resources, and climate effects. Her performance reflects her strong grasp of these topics."
      }
    ],
    specials: [
      { name: "PHE", grade: "N/A" as const, teacher: "Emmanuel Abioye" },
      { name: "Computer", grade: 100, teacher: "Ejovwo Jesutekevwe" },
      { name: "Hausa", grade: 88, teacher: "Isa Inuwa" },
      { name: "Religious Studies", grade: 100, teacher: "Chidi Okwuanaso" },
      { name: "French", grade: 86, teacher: "Edward Amechi" }
    ],
    workHabits: [
      { trait: "Shows Effort", rating: "Outstanding" },
      { trait: "Works well with others", rating: "Satisfactory" },
      { trait: "Produces legible handwriting", rating: "Outstanding" },
      { trait: "Demonstrates great character trait", rating: "Satisfactory" }
    ],
    generalComment: "Ashira is an intelligent, competitive student who relates well with classmates and completes her work, often assisting others when asked. However, her attention-seeking behavior and competitive nature can sometimes distract her. With balanced focus, she will continue to excel.",
    attendance: {
      totalDays: 54,
      daysPresent: 54,
      daysAbsent: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ReportCard {...sampleData} />
    </div>
  );
};

export default Index;