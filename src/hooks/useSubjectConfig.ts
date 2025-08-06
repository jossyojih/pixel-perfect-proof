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

  const detectSubjectsFromExcel = (excelHeaders: string[], gradeLevel: string): string[] => {
    // Your provided subject names list
    const targetSubjects = [
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

    console.log('Target subjects to detect:', targetSubjects);
    console.log('Excel headers to search in:', excelHeaders);
    
    // Create mapping patterns for each subject
    const subjectPatterns = {
      'Mathematics': ['math', 'mathematics'],
      'English': ['english'],
      'Global Perspectives': ['global', 'perspectives'],
      'Basic Science': ['science', 'basic_science'],
      'French': ['french'],
      'Humanities-History': ['history', 'human_hstry', 'humanities'],
      'Humanities-Geography': ['geography', 'human_geo', 'geo'],
      'Arabic': ['arabic'],
      'Religion (IRS)': ['religion', 'irs', 'islamic'],
      'Religion (CRS)': ['religion_crs', 'crs', 'christian'],
      'Digital Literacy': ['digital', 'literacy', 'computer'],
      'Physical And Health Education (PHE)': ['phe', 'physical', 'health', 'education'],
      'Hausa': ['hausa'],
      'Arts and Design': ['arts', 'design', 'art'],
      'Music': ['music']
    };

    const detectedSubjects: string[] = [];
    
    targetSubjects.forEach(targetSubject => {
      const patterns = subjectPatterns[targetSubject as keyof typeof subjectPatterns] || [];
      
      const hasMatch = excelHeaders.some(header => {
        const cleanHeader = header.toLowerCase().trim();
        return patterns.some(pattern => 
          cleanHeader.includes(pattern) || 
          cleanHeader.includes(pattern.replace('_', ''))
        );
      });
      
      if (hasMatch) {
        detectedSubjects.push(targetSubject);
        console.log(`✓ Detected subject: ${targetSubject}`);
      } else {
        console.log(`✗ Subject not found in Excel: ${targetSubject}`);
      }
    });

    console.log('Final detected subjects from Excel:', detectedSubjects);
    return detectedSubjects;
  };

  const addDynamicSubject = async (gradeLevel: string, subjectName: string) => {
    try {
      const maxOrder = Math.max(...subjects.map(s => s.display_order), 0);
      
      const { error } = await supabase
        .from('subject_configurations')
        .insert({
          grade_level: gradeLevel,
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
      fetchSubjects(gradeLevel);
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