-- Create student_reports table
CREATE TABLE public.student_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  class_tag TEXT NOT NULL,
  grade_tag TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read reports (public access)
CREATE POLICY "Anyone can view student reports" 
ON public.student_reports 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert reports
CREATE POLICY "Anyone can create student reports" 
ON public.student_reports 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for reports
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reports', 'reports', true);

-- Create policy for report file access
CREATE POLICY "Anyone can view report files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'reports');

-- Create policy for report file uploads
CREATE POLICY "Anyone can upload report files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'reports');