-- Enable realtime for student_reports table
ALTER TABLE public.student_reports REPLICA IDENTITY FULL;

-- Add the table to the supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.student_reports;