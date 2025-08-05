-- First, manually delete all data from student_reports table
DELETE FROM student_reports;

-- Add RLS policy to allow deleting all records
CREATE POLICY "Anyone can delete student reports" 
ON student_reports 
FOR DELETE 
USING (true);