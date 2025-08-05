import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from 'xlsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UploadedReport {
  id: string;
  student_name: string;
  public_url: string;
  class_tag: string;
  grade_tag: string;
  uploaded_at: string;
}

export default function Results() {
  const [reports, setReports] = useState<UploadedReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  
  // Predefined grades list
  const availableGrades = [
    'Pregrade_A',
    'Grade 1A',
    'Grade 1B', 
    'Grade 2A',
    'Grade 2B',
    'Grade 3A',
    'Grade 3B',
    'Grade 4A',
    'Grade 4B',
    'Grade 5A',
    'Grade 5B'
  ];
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvailableOptions();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedGrade) {
      fetchReports();
    }
  }, [selectedClass, selectedGrade]);

  // Set up real-time subscription for new reports
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'student_reports'
        },
        (payload) => {
          const newReport = payload.new as UploadedReport;
          // Only add the report if it matches current filters
          if (newReport.class_tag === selectedClass && newReport.grade_tag === selectedGrade) {
            setReports(prev => [newReport, ...prev]);
            toast({
              title: "New report uploaded",
              description: `Report for ${newReport.student_name} has been uploaded.`
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedClass, selectedGrade, toast]);

  const fetchAvailableOptions = async () => {
    try {
      // Fetch distinct class tags
      const { data: classes, error: classError } = await supabase
        .from('student_reports')
        .select('class_tag')
        .neq('class_tag', null);

      if (classError) throw classError;

      const uniqueClasses = [...new Set(classes?.map(item => item.class_tag) || [])];
      setAvailableClasses(uniqueClasses);

    } catch (error) {
      console.error('Error fetching available options:', error);
      toast({
        title: "Error loading options",
        description: "There was an error loading the available classes.",
        variant: "destructive"
      });
    }
  };

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('student_reports')
        .select('*')
        .eq('class_tag', selectedClass)
        .eq('grade_tag', selectedGrade)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error loading reports",
        description: "There was an error loading the uploaded reports.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The report link has been copied to your clipboard."
    });
  };

  const exportToExcel = () => {
    if (reports.length === 0) return;

    const exportData = reports.map(report => ({
      'Student Name': report.student_name,
      'Class': report.class_tag,
      'Grade': report.grade_tag,
      'Upload Date': new Date(report.uploaded_at).toLocaleDateString(),
      'Report Link': report.public_url
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');
    
    XLSX.writeFile(workbook, `${selectedClass}-${selectedGrade}-reports-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Export successful",
      description: "Reports have been exported to Excel file."
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p>Loading uploaded reports...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Uploaded Reports</h1>
          <p className="text-muted-foreground">{selectedClass} - {selectedGrade}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToExcel} disabled={reports.length === 0}>
            Export to Excel
          </Button>
          <Button variant="outline" onClick={() => navigate('/upload')}>
            Upload More Reports
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {availableClasses.map((classTag) => (
                  <SelectItem key={classTag} value={classTag}>
                    {classTag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Grade</label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select a grade" />
              </SelectTrigger>
              <SelectContent>
                {availableGrades.map((gradeTag) => (
                  <SelectItem key={gradeTag} value={gradeTag}>
                    {gradeTag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reports uploaded yet.</p>
            <Button className="mt-4" onClick={() => navigate('/upload')}>
              Upload Your First Report
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead>Uploaded Date</TableHead>
                  <TableHead>Supabase Link</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.student_name}</TableCell>
                    <TableCell>
                      {new Date(report.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={report.public_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline break-all"
                      >
                        {report.public_url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(report.public_url)}
                      >
                        Copy Link
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}