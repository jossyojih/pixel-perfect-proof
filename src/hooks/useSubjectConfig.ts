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
    // Get configured subjects for the grade
    const configuredSubjects = subjects.map(s => s.subject_name.toLowerCase());
    
    // Filter Excel headers to find matching subjects
    const detectedSubjects = excelHeaders.filter(header => {
      const cleanHeader = header.toLowerCase().trim();
      return configuredSubjects.some(subject => 
        cleanHeader.includes(subject.toLowerCase()) || 
        subject.toLowerCase().includes(cleanHeader)
      );
    });

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