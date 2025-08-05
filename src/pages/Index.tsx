import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen, School, Building, Trophy, Briefcase } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: "elementary",
      title: "Elementary",
      description: "Primary school report generation for grades 1-6",
      icon: <GraduationCap className="h-8 w-8" />,
      status: "active",
      color: "bg-primary/10 text-primary border-primary/20",
      buttonText: "Manage Elementary Reports",
      onClick: () => navigate("/upload")
    },
    {
      id: "academy",
      title: "Academy",
      description: "Report generation for Year 7, JSS 2, SSS 1 and SSS 2 students",
      icon: <School className="h-8 w-8" />,
      status: "coming-soon",
      color: "bg-muted/50 text-muted-foreground border-muted",
      buttonText: "Coming Soon",
      onClick: () => {}
    },
    {
      id: "charter-school",
      title: "Charter School",
      description: "Charter school report management system",
      icon: <Building className="h-8 w-8" />,
      status: "coming-soon",
      color: "bg-muted/50 text-muted-foreground border-muted",
      buttonText: "Coming Soon",
      onClick: () => {}
    },
    {
      id: "hse",
      title: "HSE",
      description: "Higher School Education report generation",
      icon: <BookOpen className="h-8 w-8" />,
      status: "coming-soon",
      color: "bg-muted/50 text-muted-foreground border-muted",
      buttonText: "Coming Soon",
      onClick: () => {}
    },
    {
      id: "dolphin",
      title: "Dolphin",
      description: "Dolphin program report management",
      icon: <Trophy className="h-8 w-8" />,
      status: "coming-soon",
      color: "bg-muted/50 text-muted-foreground border-muted",
      buttonText: "Coming Soon",
      onClick: () => {}
    },
    {
      id: "administration",
      title: "Administration",
      description: "School administration and management tools",
      icon: <Users className="h-8 w-8" />,
      status: "coming-soon", 
      color: "bg-muted/50 text-muted-foreground border-muted",
      buttonText: "Coming Soon",
      onClick: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            School Report Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate, manage, and distribute student reports across all school sections. 
            Upload Excel data and create professional report cards with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              className={`relative transition-all duration-200 hover:shadow-lg ${section.color}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={section.status === "active" ? "default" : "secondary"}
                    className="ml-2"
                  >
                    {section.status === "active" ? "Active" : "Coming Soon"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={section.onClick}
                  disabled={section.status !== "active"}
                  className="w-full"
                  variant={section.status === "active" ? "default" : "outline"}
                >
                  {section.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Quick Start with Elementary</h3>
            <p className="text-muted-foreground mb-6">
              Get started by uploading your Excel file with student data. 
              Our system will automatically generate individual report cards that you can review and upload to Supabase.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate("/upload")} size="lg">
                Upload Excel File
              </Button>
              <Button variant="outline" onClick={() => navigate("/results")} size="lg">
                View Uploaded Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;