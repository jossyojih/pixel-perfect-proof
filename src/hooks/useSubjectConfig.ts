import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SubjectConfig {
  id: string;
  grade_level: string;
  subject_name: string;
  display_order: number;
  is_active: boolean;
}

export const useSubjectConfig = (gradeLevel?: string) => {
  const [subjects, setSubjects] = useState<SubjectConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSubjects = async (grade?: string) => {
    if (!grade) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subject_configurations')
        .select('*')
        .eq('grade_level', grade)
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch subject configurations",
          variant: "destructive",
        });
        return;
      }

      setSubjects(data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast({
        title: "Error",
        description: "Failed to fetch subject configurations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract base grade level from class names
  const getBaseGradeLevel = (className: string): string => {
    if (className.startsWith('JSS 2')) return 'JSS 2';
    if (className.startsWith('JSS 3')) return 'JSS 3';
    if (className.startsWith('SSS 1')) return 'SSS 1';
    if (className.startsWith('SSS 2')) return 'SSS 2';
    if (className.startsWith('Grade 7')) return 'Grade 7';
    return className; // For Year 7 and other base classes
  };

  const detectSubjectsFromExcel = (excelHeaders: string[], gradeLevel: string): string[] => {
    // Define subject lists based on grade level
    const getTargetSubjects = (grade: string): string[] => {
      const baseGrade = getBaseGradeLevel(grade);
      if (baseGrade === 'JSS 2') {
        return [
          'Mathematics',
          'English',
          'Basic Science',
          'Basic Technology',
          'Agricultural Science',
          'Home Economics',
          'History',
          'Music',
          'Civic Education',
          'Social Studies',
          'French',
          'Hausa',
          'Business Studies',
          'Cultural And Creative Art (CCA)',
          'Religion (IRS)',
          'Religion (CRS)',
          'Physical And Health Education (PHE)',
          'Computer Studies',
          'Arabic Studies',
          'Arabic',
          'Igbo',
          'Yoruba'
        ];
      }
      
      if (baseGrade === 'JSS 3') {
        return [
          'Mathematics',
          'English',
          'Basic Science',
          'Basic Technology',
          'Agricultural Science',
          'Home Economics',
          'History',
          'Music',
          'Civic Education',
          'Social Studies',
          'French',
          'Hausa',
          'Business Studies',
          'Cultural And Creative Art (CCA)',
          'Religion (IRS)',
          'Religion (CRS)',
          'Physical And Health Education (PHE)',
          'Computer Studies',
          'Arabic Studies',
          'Arabic',
          'Igbo',
          'Yoruba'
        ];
      }
      
      if (baseGrade === 'SSS 1' || baseGrade === 'SSS 2') {
        return [
          'English Language',
          'Mathematics',
          'Civic Education',
          'Marketing',
          'Physics',
          'Computer Studies',
          'Chemistry',
          'Biology',
          'Agriculture',
          'Further Mathematics',
          'Government',
          'Economics',
          'Religion (CRS)',
          'Religion (IRS)',
          'Geography',
          'Commerce',
          'Financial Accounting',
          'Literature in English',
          'Hausa',
          'French',
          'Food and Nutrition',
          'Technical Drawing',
          'Visual Art',
          'History',
          'Data Processing',
          'Arabic Studies'
        ];
      }
      
      if (baseGrade === 'Grade 7') {
        return [
          'Language Arts',
          'Mathematics',
          'Science',
          'Social Studies',
          'Health Education',
          'National Values Education',
          'Physical Education',
          'Financial Literacy',
          'Religion (IRK)',
          'Scholastic Fair',
          'Religion (CRK)',
          'Music',
          'Visual Arts',
          'ICT',
          'French',
          'Arabic'
        ];
      }
      
      // Default for Year 7 and other grades
      return [
        'Mathematics',
        'English',
        'Global Perspectives',
        'Basic Science',
        'French',
        'Humanities-History',
        'Humanities-Geography',
        'Arabic',
        'Religion (IRS)',
        'Religion (CRS)',
        'Digital Literacy',
        'Physical And Health Education (PHE)',
        'Hausa',
        'Arts and Design',
        'Music'
      ];
    };

    const targetSubjects = getTargetSubjects(gradeLevel);

    console.log('Target subjects to detect:', targetSubjects);
    console.log('Excel headers to search in:', excelHeaders);
    
    // Create mapping patterns for each subject
    const getSubjectPatterns = (grade: string) => {
      const basePatterns = {
        'Mathematics': ['math', 'mathematics'],
        'English': ['english'],
        'Basic Science': ['science', 'basic_science'],
        'French': ['french'],
        'Religion (IRS)': ['religion', 'irs', 'islamic'],
        'Religion (CRS)': ['religion_crs', 'crs', 'christian'],
        'Physical And Health Education (PHE)': ['phe', 'physical', 'health', 'education'],
        'Hausa': ['hausa'],
        'Music': ['music']
      };

      const baseGrade = getBaseGradeLevel(grade);
      
      if (baseGrade === 'JSS 2') {
        return {
          ...basePatterns,
          'Basic Technology': ['basic_technology', 'technology'],
          'Agricultural Science': ['agricultural_science', 'agriculture'],
          'Home Economics': ['home_economics', 'home', 'economics'],
          'History': ['history'],
          'Civic Education': ['civic_education', 'civic'],
          'Social Studies': ['social_studies', 'social'],
          'Business Studies': ['business_studies', 'business'],
          'Cultural And Creative Art (CCA)': ['cultural', 'creative', 'cca', 'art'],
          'Computer Studies': ['computer_studies', 'computer'],
          'Arabic Studies': ['arabic_studies'],
          'Arabic': ['arabic'],
          'Igbo': ['igbo'],
          'Yoruba': ['yoruba']
        };
      }
      
      if (baseGrade === 'JSS 3') {
        return {
          ...basePatterns,
          'Basic Technology': ['basic_technology', 'technology'],
          'Agricultural Science': ['agricultural_science', 'agriculture'],
          'Home Economics': ['home_economics', 'home', 'economics'],
          'History': ['history'],
          'Civic Education': ['civic_education', 'civic'],
          'Social Studies': ['social_studies', 'social'],
          'Business Studies': ['business_studies', 'business'],
          'Cultural And Creative Art (CCA)': ['cultural', 'creative', 'cca', 'art'],
          'Computer Studies': ['computer_studies', 'computer'],
          'Arabic Studies': ['arabic_studies'],
          'Arabic': ['arabic'],
          'Igbo': ['igbo'],
          'Yoruba': ['yoruba']
        };
      }

      if (baseGrade === 'SSS 1' || baseGrade === 'SSS 2') {
        return {
          'English Language': ['english_lan', 'english'],
          'Mathematics': ['mathematics', 'math'],
          'Civic Education': ['civic_education', 'civic'],
          'Marketing': ['marketing'],
          'Physics': ['physics'],
          'Computer Studies': ['computer_stud', 'computer_studies', 'computer'],
          'Chemistry': ['chemistry'],
          'Biology': ['biology'],
          'Agriculture': ['agriculture'],
          'Further Mathematics': ['further_mathematics', 'further_math', 'fur_maths'],
          'Government': ['government'],
          'Economics': ['economics'],
          'Religion (CRS)': ['religion_crs', 'crs', 'christian'],
          'Religion (IRS)': ['religion_irs', 'irs', 'islamic', 'religion'],
          'Geography': ['geography', 'geo'],
          'Commerce': ['commerce'],
          'Financial Accounting': ['financial_accounting', 'financial', 'accounting', 'fin_acco'],
          'Literature in English': ['literature_in_english', 'literature_english', 'literature'],
          'Hausa': ['hausa'],
          'French': ['french'],
          'Food and Nutrition': ['food_and_nutrition', 'food_nutrition', 'food_nut', 'food', 'nutrition'],
          'Technical Drawing': ['technical_drawing', 'tech_drawing', 'technical'],
          'Visual Art': ['visual_art', 'visual', 'art'],
          'History': ['history'],
          'Data Processing': ['data_processing', 'data', 'ict'],
          'Arabic Studies': ['arabic_studies', 'arabic']
        };
      }
      
      if (baseGrade === 'Grade 7') {
        return {
          'Language Arts': ['language_art', 'language', 'arts', 'lang_arts'],
          'Mathematics': ['mathematics', 'math', 'maths'],
          'Science': ['science', 'basic_science'],
          'Social Studies': ['social_studies', 'social', 'social_st'],
          'Health Education': ['health_education', 'health', 'health_ca', 'health_ed'],
          'National Values Education': ['national_values', 'values', 'education', 'nve', 'nve_ca', 'national_val'],
          'Physical Education': ['physical_education', 'physical', 'pe', 'phy_ed', 'phys_ed'],
          'Financial Literacy': ['financial_literacy', 'financial', 'fncl_literacy', 'fncl_literacy_ca', 'fin_lit'],
          'Religion (IRK)': ['religion_irk', 'irk', 'islamic', 'religion_islamic'],
          'Scholastic Fair': ['scholastic_fair', 'scholastic', 'schol_fair'],
          'Religion (CRK)': ['religion_crk', 'crk', 'christian', 'religion_christian'],
          'Music': ['music'],
          'Visual Arts': ['visual_arts', 'visual', 'arts', 'vis_arts'],
          'ICT': ['ict', 'computer', 'comp'],
          'French': ['french', 'french_language', 'french_language_ca', 'french_lang'],
          'Arabic': ['arabic', 'arabic_lang']
        };
      }
      
      // Year 7 and other grades
      return {
        ...basePatterns,
        'Global Perspectives': ['global', 'perspectives'],
        'Humanities-History': ['history', 'human_hstry', 'humanities'],
        'Humanities-Geography': ['geography', 'human_geo', 'geo'],
        'Arabic': ['arabic'],
        'Digital Literacy': ['digital', 'literacy', 'computer'],
        'Arts and Design': ['arts', 'design', 'art']
      };
    };

    const subjectPatterns = getSubjectPatterns(gradeLevel);

    const detectedSubjects: string[] = [];
    
    targetSubjects.forEach(targetSubject => {
      const patterns = subjectPatterns[targetSubject as keyof typeof subjectPatterns] || [];
      
      const hasMatch = excelHeaders.some(header => {
        const cleanHeader = header.toLowerCase().trim();
        return patterns.some(pattern => {
          // Check if header starts with the pattern (for exact matches)
          const startsWithPattern = cleanHeader.startsWith(pattern);
          // Check if header contains the pattern
          const containsPattern = cleanHeader.includes(pattern);
          // Check pattern without underscores
          const containsPatternNoUnderscore = cleanHeader.includes(pattern.replace('_', ''));
          
          console.log(`Checking "${targetSubject}" pattern "${pattern}" against header "${cleanHeader}": starts=${startsWithPattern}, contains=${containsPattern}, noUnderscore=${containsPatternNoUnderscore}`);
          
          return startsWithPattern || containsPattern || containsPatternNoUnderscore;
        });
      });
      
      if (hasMatch) {
        detectedSubjects.push(targetSubject);
        console.log(`✓ Detected subject: ${targetSubject}`);
      } else {
        console.log(`✗ Subject not found in Excel: ${targetSubject} (patterns: ${patterns.join(', ')})`);
      }
    });

    console.log('Final detected subjects from Excel:', detectedSubjects);
    return detectedSubjects;
  };

  const addDynamicSubject = async (gradeLevel: string, subjectName: string) => {
    try {
      const maxOrder = Math.max(...subjects.map(s => s.display_order), 0);
      const baseGradeLevel = getBaseGradeLevel(gradeLevel);
      
      const { error } = await supabase
        .from('subject_configurations')
        .insert({
          grade_level: baseGradeLevel, // Use base grade level for database
          subject_name: subjectName,
          display_order: maxOrder + 1,
          is_active: true
        });

      if (error) throw error;

      // Refresh subjects
      await fetchSubjects(gradeLevel);
      
      toast({
        title: "Success",
        description: `Added ${subjectName} to ${gradeLevel} subjects`,
      });
    } catch (error) {
      console.error('Error adding subject:', error);
      toast({
        title: "Error",
        description: "Failed to add subject configuration",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (gradeLevel) {
      const baseGradeLevel = getBaseGradeLevel(gradeLevel);
      fetchSubjects(baseGradeLevel);
    }
  }, [gradeLevel]);

  return {
    subjects,
    loading,
    fetchSubjects,
    detectSubjectsFromExcel,
    addDynamicSubject,
  };
};