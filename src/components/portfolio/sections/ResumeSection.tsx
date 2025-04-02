
import { ResumeData } from "@/components/resume/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/components/resume/utils/dateUtils";
import { Badge } from "@/components/ui/badge";
import { FileText, Building2, GraduationCap, Briefcase } from "lucide-react";

interface ResumeSectionProps {
  resumeData: ResumeData | null | undefined;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <Card className="bg-muted/40">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Resume
          </CardTitle>
          <CardDescription>No resume information available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { personal, summary, experience, education, skills } = resumeData;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Resume
        </CardTitle>
        <CardDescription>Resume information and highlights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {summary && (
          <div>
            <h3 className="text-md font-medium mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Experience
            </h3>
            <div className="space-y-4">
              {experience.slice(0, 2).map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4 pb-4 border-muted-foreground/20">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{exp.position}</h4>
                    <div className="text-xs text-muted-foreground">
                      {exp.startDate && formatDate(new Date(exp.startDate))} - {exp.current ? 'Present' : exp.endDate && formatDate(new Date(exp.endDate))}
                    </div>
                  </div>
                  <p className="text-sm">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
              
              {experience.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  {experience.length - 2} more experience entries available
                </p>
              )}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <GraduationCap className="h-4 w-4 mr-2" />
              Education
            </h3>
            <div className="space-y-4">
              {education.slice(0, 2).map((edu) => (
                <div key={edu.id} className="border-l-2 pl-4 pb-4 border-muted-foreground/20">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="text-xs text-muted-foreground">
                      {edu.startDate && formatDate(new Date(edu.startDate))} - {edu.current ? 'Present' : edu.endDate && formatDate(new Date(edu.endDate))}
                    </div>
                  </div>
                  <p className="text-sm">{edu.institution}</p>
                  {edu.field && <p className="text-xs text-muted-foreground mt-1">{edu.field}</p>}
                </div>
              ))}
              
              {education.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  {education.length - 2} more education entries available
                </p>
              )}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 10).map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
              
              {skills.length > 10 && (
                <Badge variant="outline">+{skills.length - 10} more</Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
