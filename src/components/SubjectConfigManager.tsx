import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useSubjectConfig, SubjectConfig } from '@/hooks/useSubjectConfig';
import { Trash2, Plus } from 'lucide-react';

interface SubjectConfigManagerProps {
  gradeLevel: string;
  detectedSubjects: string[];
}

export const SubjectConfigManager = ({ gradeLevel, detectedSubjects }: SubjectConfigManagerProps) => {
  const [newSubjectName, setNewSubjectName] = useState('');
  const { subjects, loading, addDynamicSubject, fetchSubjects } = useSubjectConfig(gradeLevel);
  const { toast } = useToast();

  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) return;
    
    await addDynamicSubject(gradeLevel, newSubjectName.trim());
    setNewSubjectName('');
  };

  const addDetectedSubject = async (subjectName: string) => {
    await addDynamicSubject(gradeLevel, subjectName);
  };

  const unConfiguredSubjects = detectedSubjects.filter(detected => 
    !subjects.some(config => 
      config.subject_name.toLowerCase().includes(detected.toLowerCase()) ||
      detected.toLowerCase().includes(config.subject_name.toLowerCase())
    )
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Subject Configuration for {gradeLevel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configured Subjects */}
        <div>
          <h4 className="font-medium mb-2">Configured Subjects</h4>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Badge key={subject.id} variant="default">
                {subject.subject_name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Detected but Not Configured */}
        {unConfiguredSubjects.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Detected in Excel (Not Configured)</h4>
            <div className="flex flex-wrap gap-2">
              {unConfiguredSubjects.map((subject) => (
                <Badge 
                  key={subject} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => addDetectedSubject(subject)}
                >
                  {subject} <Plus className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Click on a subject to add it to the configuration
            </p>
          </div>
        )}

        {/* Add New Subject */}
        <div>
          <h4 className="font-medium mb-2">Add New Subject</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Subject name"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
            />
            <Button 
              onClick={handleAddSubject}
              disabled={!newSubjectName.trim() || loading}
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};