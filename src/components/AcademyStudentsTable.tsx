import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ParsedStudent {
  name: string;
  subjects: Array<{
    name: string;
    teacher: string;
    grade: number | "N/A";
    comment: string;
  }>;
}

interface AcademyStudentsTableProps {
  students: ParsedStudent[];
}

export function AcademyStudentsTable({ students }: AcademyStudentsTableProps) {
  const navigate = useNavigate();

  const handleStudentClick = (student: ParsedStudent) => {
    // Store Academy students data in localStorage for the Academy report page
    localStorage.setItem('academyStudentsData', JSON.stringify(students));
    navigate(`/academy-report/${encodeURIComponent(student.name)}`);
  };

  if (students.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Academy Student Name</TableHead>
            <TableHead>Number of Subjects</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.subjects.length}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {student.subjects.slice(0, 3).map((subject, idx) => (
                    <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                      {subject.name}
                    </span>
                  ))}
                  {student.subjects.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{student.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button 
                  onClick={() => handleStudentClick(student)}
                  variant="outline"
                  size="sm"
                >
                  View Academy Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}