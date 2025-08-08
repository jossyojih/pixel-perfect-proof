-- Update Grade 8 subjects with the correct list
-- First, delete existing Grade 8 subjects
DELETE FROM subject_configurations WHERE grade_level = 'Grade 8';

-- Insert the correct Grade 8 subjects
INSERT INTO subject_configurations (grade_level, subject_name, display_order, is_active) VALUES
('Grade 8', 'Language Arts', 1, true),
('Grade 8', 'Mathematics', 2, true),
('Grade 8', 'Science', 3, true),
('Grade 8', 'Basic Technology', 4, true),
('Grade 8', 'Social Studies', 5, true),
('Grade 8', 'Physical and Health Education', 6, true),
('Grade 8', 'Civic Education', 7, true),
('Grade 8', 'Agricultural Science', 8, true),
('Grade 8', 'Christian Religious Studies', 9, true),
('Grade 8', 'Islamic Religious Studies', 10, true),
('Grade 8', 'Business Studies', 11, true),
('Grade 8', 'CCA (Creative and Cultural Arts)', 12, true),
('Grade 8', 'Scholastic Fair', 13, true),
('Grade 8', 'ICT', 14, true),
('Grade 8', 'Hausa Language', 15, true),
('Grade 8', 'Arabic Studies', 16, true);