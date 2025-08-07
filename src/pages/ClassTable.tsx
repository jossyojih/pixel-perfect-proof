import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";

interface UploadedReport {
  id: string;
  student_name: string;
  public_url: string;
  class_tag: string;
  grade_tag: string;
  uploaded_at: string;
}

export default function ClassTable() {
  const [reports, setReports] = useState<UploadedReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('student_reports')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
      
      // Extract unique class_tag values for the dropdown
      const uniqueClasses = [...new Set(data?.map(report => report.class_tag) || [])];
      setAvailableClasses(uniqueClasses);
      
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error loading reports",
        description: "There was an error loading the class reports.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter reports based on selected class
  const filteredReports = selectedClass && selectedClass !== 'all'
    ? reports.filter(report => report.class_tag === selectedClass)
    : reports;

  const exportToExcel = () => {
    const worksheetData = filteredReports.map(report => ({
      'Student Name': report.student_name,
      'Class': report.class_tag,
      'Grade': report.grade_tag,
      'Upload Date': new Date(report.uploaded_at).toLocaleDateString(),
      'Report URL': report.public_url
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Class Reports");
    
    XLSX.writeFile(workbook, `class_reports_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    toast({
      title: "Export successful",
      description: "Class reports have been exported to Excel."
    });
  };

  const deleteSelectedClass = async () => {
    if (!selectedClass || selectedClass === 'all') {
      toast({
        title: "No class selected",
        description: "Please select a specific class to delete.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('student_reports')
        .delete()
        .eq('class_tag', selectedClass);

      if (error) throw error;

      // Update local state
      const updatedReports = reports.filter(report => report.class_tag !== selectedClass);
      setReports(updatedReports);
      
      // Update available classes
      const uniqueClasses = [...new Set(updatedReports.map(report => report.class_tag))];
      setAvailableClasses(uniqueClasses);
      
      // Reset filter to 'all' since the selected class no longer exists
      setSelectedClass('all');
      
      toast({
        title: "Class deleted",
        description: `All reports for ${selectedClass} have been deleted.`
      });
    } catch (error) {
      console.error('Error deleting class reports:', error);
      toast({
        title: "Error deleting class",
        description: "There was an error deleting the class reports.",
        variant: "destructive"
      });
    }
  };

  const deleteReport = async (reportId: string, studentName: string) => {
    try {
      const { error } = await supabase
        .from('student_reports')
        .delete()
        .eq('id', reportId);

      if (error) throw error;

      // Update local state
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
      
      // Update available classes in case this was the last report for a class
      const uniqueClasses = [...new Set(updatedReports.map(report => report.class_tag))];
      setAvailableClasses(uniqueClasses);
      
      toast({
        title: "Report deleted",
        description: `Report for ${studentName} has been deleted.`
      });
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: "Error deleting report",
        description: "There was an error deleting the report.",
        variant: "destructive"
      });
    }
  };

  const clearDatabase = async () => {
    try {
      const { error } = await supabase
        .from('student_reports')
        .delete()
        .not('id', 'is', null); // Delete all records where id is not null (all records)

      if (error) throw error;

      setReports([]);
      setAvailableClasses([]);
      setSelectedClass('all');
      
      toast({
        title: "Database cleared",
        description: "All student reports have been deleted from the database."
      });
    } catch (error) {
      console.error('Error clearing database:', error);
      toast({
        title: "Error clearing database",
        description: "There was an error clearing the database.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <p>Loading class reports...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Class Reports Table</h1>
          <p className="text-muted-foreground">All uploaded student reports</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                disabled={!selectedClass || selectedClass === 'all'}
              >
                <Trash2 className="h-4 w-4" />
                Delete Class
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Class Reports</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all reports for "{selectedClass}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteSelectedClass} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Class
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Clear Database
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Database</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all student reports from the database. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearDatabase} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Clear Database
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="class-select" className="text-sm font-medium">
            Filter by Class:
          </label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {availableClasses.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">
          Showing {filteredReports.length} of {reports.length} reports
        </p>
      </div>

      <Card className="p-6">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No reports found in the database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Report Link</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.student_name}</TableCell>
                    <TableCell>{report.class_tag}</TableCell>
                    <TableCell>{report.grade_tag}</TableCell>
                    <TableCell>
                      {new Date(report.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <a 
                        href={report.public_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline"
                      >
                        View Report
                      </a>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Report</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the report for "{report.student_name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteReport(report.id, report.student_name)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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