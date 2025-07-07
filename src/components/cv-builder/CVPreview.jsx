
import React from 'react';
import { useCV } from '@/context/CVContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const CVPreview: React.FC = () => {
  const { cvData, saveCV, isSaving } = useCV();

  const handleSave = async () => {
    await saveCV();
  };

  return (
    <div className="space-y-4">
      <Card className="sticky top-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">CV Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-muted/30 border-t">
            <div className="p-4 max-h-[70vh] overflow-auto">
              {/* Personal Info */}
              {cvData.personal.fullName && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold">
                    {cvData.personal.fullName}
                  </h2>
                  {cvData.personal.jobTitle && (
                    <p className="text-lg text-muted-foreground">
                      {cvData.personal.jobTitle}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {cvData.personal.location && (
                      <span>{cvData.personal.location}</span>
                    )}
                    {cvData.personal.email && (
                      <span>{cvData.personal.email}</span>
                    )}
                    {cvData.personal.phone && (
                      <span>{cvData.personal.phone}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                    {cvData.personal.linkedin && (
                      <a 
                        href={cvData.personal.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {cvData.personal.website && (
                      <a 
                        href={cvData.personal.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Summary */}
              {cvData.summary && (
                <div className="mb-6">
                  <h3 className="text-md font-bold border-b pb-1 mb-2">
                    Professional Summary
                  </h3>
                  <p className="text-sm">{cvData.summary}</p>
                </div>
              )}

              {/* Experience */}
              {cvData.experience.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-bold border-b pb-1 mb-2">
                    Work Experience
                  </h3>
                  <div className="space-y-4">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{exp.position}</p>
                            <p>{exp.company}</p>
                          </div>
                          <div className="text-right text-muted-foreground text-xs">
                            <p>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                            </p>
                            {exp.location && <p>{exp.location}</p>}
                          </div>
                        </div>
                        <p className="mt-1 text-xs">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-bold border-b pb-1 mb-2">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{edu.degree} in {edu.field}</p>
                            <p>{edu.institution}</p>
                          </div>
                          <div className="text-right text-muted-foreground text-xs">
                            <p>
                              {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate || '')}
                            </p>
                            {edu.location && <p>{edu.location}</p>}
                          </div>
                        </div>
                        {edu.description && <p className="mt-1 text-xs">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {cvData.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-bold border-b pb-1 mb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cvData.skills.map((skill) => (
                      <Badge key={skill.id} variant="outline">
                        {skill.name}
                        {skill.level && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({skill.level.charAt(0).toUpperCase() + skill.level.slice(1)})
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {cvData.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-bold border-b pb-1 mb-2">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cvData.languages.map((language) => (
                      <Badge key={language.id} variant="outline">
                        {language.name}
                        {language.proficiency && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({language.proficiency.replace('_', ' ')})
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!cvData.personal.fullName && 
               !cvData.summary &&
               cvData.experience.length === 0 &&
               cvData.education.length === 0 &&
               cvData.skills.length === 0 &&
               cvData.languages.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-muted-foreground">
                    Fill in the form to see your CV preview here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-2">
        <Button onClick={handleSave} disabled={isSaving} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Save CV
        </Button>
        <Button variant="outline" className="flex-1">
          <Eye className="mr-2 h-4 w-4" />
          Full Preview
        </Button>
        <Button variant="secondary" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default CVPreview;
