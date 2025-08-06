-- First, delete existing Year 7 subject configurations
DELETE FROM public.subject_configurations WHERE grade_level = 'Year 7';

-- Insert the correct subject configurations for Year 7
INSERT INTO public.subject_configurations (grade_level, subject_name, display_order, is_active) VALUES
('Year 7', 'Mathematics', 1, true),
('Year 7', 'English', 2, true),
('Year 7', 'Global Perspectives', 3, true),
('Year 7', 'Basic Science', 4, true),
('Year 7', 'French', 5, true),
('Year 7', 'Humanities-History', 6, true),
('Year 7', 'Humanities-Geography', 7, true),
('Year 7', 'Arabic', 8, true),
('Year 7', 'Religion (IRS)', 9, true),
('Year 7', 'Religion (CRS)', 10, true),
('Year 7', 'Digital Literacy', 11, true),
('Year 7', 'Physical And Health Education (PHE)', 12, true),
('Year 7', 'Hausa', 13, true),
('Year 7', 'Arts and Design', 14, true),
('Year 7', 'Music', 15, true);