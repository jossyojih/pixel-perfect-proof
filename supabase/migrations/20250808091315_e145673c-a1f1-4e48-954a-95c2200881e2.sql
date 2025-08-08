-- Insert Grade 7 subject configurations
INSERT INTO public.subject_config (grade_level, subject_name, display_order, is_active) VALUES
('Grade 7', 'Language Arts', 1, true),
('Grade 7', 'Mathematics', 2, true),
('Grade 7', 'Science', 3, true),
('Grade 7', 'Social Studies', 4, true),
('Grade 7', 'Health Education', 5, true),
('Grade 7', 'National Values Education', 6, true),
('Grade 7', 'Physical Education', 7, true),
('Grade 7', 'Financial Literacy', 8, true),
('Grade 7', 'Religion (IRK)', 9, true),
('Grade 7', 'Scholastic Fair', 10, true),
('Grade 7', 'Religion (CRK)', 11, true),
('Grade 7', 'Music', 12, true),
('Grade 7', 'Visual Arts', 13, true),
('Grade 7', 'ICT', 14, true),
('Grade 7', 'French', 15, true),
('Grade 7', 'Arabic', 16, true)
ON CONFLICT (grade_level, subject_name) DO NOTHING;