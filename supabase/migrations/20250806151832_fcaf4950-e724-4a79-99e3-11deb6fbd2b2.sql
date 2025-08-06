-- Create subject_configurations table for grade-specific subjects
CREATE TABLE public.subject_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grade_level TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(grade_level, subject_name)
);

-- Enable RLS
ALTER TABLE public.subject_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a configuration table)
CREATE POLICY "Anyone can view subject configurations" 
ON public.subject_configurations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create subject configurations" 
ON public.subject_configurations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update subject configurations" 
ON public.subject_configurations 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete subject configurations" 
ON public.subject_configurations 
FOR DELETE 
USING (true);

-- Insert default subject configurations for different grades
INSERT INTO public.subject_configurations (grade_level, subject_name, display_order) VALUES
-- Year 7 subjects
('Year 7', 'Mathematics', 1),
('Year 7', 'English Language', 2),
('Year 7', 'Science', 3),
('Year 7', 'History', 4),
('Year 7', 'Geography', 5),
('Year 7', 'Art', 6),
('Year 7', 'Physical Education', 7),

-- Year 8 subjects
('Year 8', 'Mathematics', 1),
('Year 8', 'English Language', 2),
('Year 8', 'Science', 3),
('Year 8', 'History', 4),
('Year 8', 'Geography', 5),
('Year 8', 'Art', 6),
('Year 8', 'Physical Education', 7),
('Year 8', 'French', 8),

-- Year 9 subjects
('Year 9', 'Mathematics', 1),
('Year 9', 'English Language', 2),
('Year 9', 'Biology', 3),
('Year 9', 'Chemistry', 4),
('Year 9', 'Physics', 5),
('Year 9', 'History', 6),
('Year 9', 'Geography', 7),
('Year 9', 'Art', 8),
('Year 9', 'Physical Education', 9),
('Year 9', 'French', 10),

-- Year 10 subjects
('Year 10', 'Mathematics', 1),
('Year 10', 'English Language', 2),
('Year 10', 'Biology', 3),
('Year 10', 'Chemistry', 4),
('Year 10', 'Physics', 5),
('Year 10', 'History', 6),
('Year 10', 'Geography', 7),
('Year 10', 'Business Studies', 8),
('Year 10', 'Computer Science', 9),
('Year 10', 'Art', 10),

-- Year 11 subjects
('Year 11', 'Mathematics', 1),
('Year 11', 'English Language', 2),
('Year 11', 'Biology', 3),
('Year 11', 'Chemistry', 4),
('Year 11', 'Physics', 5),
('Year 11', 'History', 6),
('Year 11', 'Economics', 7),
('Year 11', 'Business Studies', 8),
('Year 11', 'Computer Science', 9),
('Year 11', 'Psychology', 10),

-- Year 12 subjects
('Year 12', 'Advanced Mathematics', 1),
('Year 12', 'English Literature', 2),
('Year 12', 'Biology', 3),
('Year 12', 'Chemistry', 4),
('Year 12', 'Physics', 5),
('Year 12', 'History', 6),
('Year 12', 'Economics', 7),
('Year 12', 'Business Studies', 8),
('Year 12', 'Computer Science', 9),
('Year 12', 'Psychology', 10),
('Year 12', 'Philosophy', 11);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_subject_configurations_updated_at
BEFORE UPDATE ON public.subject_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();