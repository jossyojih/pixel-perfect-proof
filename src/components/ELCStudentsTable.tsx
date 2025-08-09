import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ParsedStudent {
  name: string;
  rawData?: any;
  term_name?: string;
  year_name?: string;
  school_year?: string;
  teacher_name?: string;
  no_of_school_days?: number;
  days_present?: number;
  days_absent?: number;
  teacher_comments?: string;
  // Add development assessments for display purposes
  relationships_term3?: string;
  self_awareness_term3?: string;
  managing_feelings_term3?: string;
}

interface StudentsTableProps {
  students: ParsedStudent[];
}

export function ELCStudentsTable({ students }: StudentsTableProps) {
  const navigate = useNavigate();

  const handleStudentClick = (student: ParsedStudent) => {
    // Store students data in localStorage for the report page
    localStorage.setItem('studentsData', JSON.stringify(students));
    navigate(`/elc-report/${encodeURIComponent(student.name)}`);
  };
  if (students.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.teacher_name || 'N/A'}</TableCell>
              <TableCell>{student.term_name || 'N/A'}</TableCell>
              <TableCell>
                <Button 
                  onClick={() => handleStudentClick(student)}
                  variant="outline"
                  size="sm"
                >
                  View Report
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}