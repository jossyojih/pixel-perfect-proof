import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Index from "./pages/Index";
import UploadReport from "./pages/UploadReport";
import StudentReport from "./pages/StudentReport";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <nav className="border-b border-border p-4">
            <div className="container mx-auto flex gap-4">
              <Button asChild variant="outline">
                <Link to="/">Sample Report</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/upload">Upload Excel</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/results">View Results</Link>
              </Button>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<UploadReport />} />
            <Route path="/report/:studentName" element={<StudentReport />} />
            <Route path="/results" element={<Results />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
