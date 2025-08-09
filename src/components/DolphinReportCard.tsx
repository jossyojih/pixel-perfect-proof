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

export const DolphinReportCard = ({
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
        <>
        </   >
    );
};