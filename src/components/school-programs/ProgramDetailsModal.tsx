
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, MapPin, Users, Clock, DollarSign, School, 
  BookOpen, Target, CheckCircle, Mail, Phone, ExternalLink
} from 'lucide-react';
import { SchoolProgram } from '@/types/schoolPrograms';

interface ProgramDetailsModalProps {
  program: SchoolProgram;
  isOpen: boolean;
  onClose: () => void;
}

const ProgramDetailsModal: React.FC<ProgramDetailsModalProps> = ({
  program,
  isOpen,
  onClose
}) => {
  const handleApply = () => {
    // In a real app, this would open an application form or redirect to enrollment
    console.log('Applying for program:', program.id);
    // Could open another modal with application form
    alert('Application functionality would be implemented here');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">{program.title}</DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <School className="h-4 w-4" />
                <span>{program.institution}</span>
                <Badge className={getStatusColor(program.status)}>
                  {program.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Program Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={program.image_url} 
                alt={program.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Program Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-ehrdc-teal" />
                Learning Outcomes
              </h3>
              <div className="grid gap-2">
                {program.learning_outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <div className="grid gap-2">
                {program.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-ehrdc-teal mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Program Tags</h3>
              <div className="flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Info Card */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    {program.price.toLocaleString()} {program.currency}
                  </span>
                  <Badge variant="outline">{program.subject_area}</Badge>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-ehrdc-teal" />
                    <span className="font-medium">Grade Level:</span>
                    <span>{program.grade_level}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-ehrdc-teal" />
                    <span className="font-medium">Duration:</span>
                    <span>{program.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-ehrdc-teal" />
                    <span className="font-medium">Schedule:</span>
                    <span className="text-xs">{program.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-ehrdc-teal" />
                    <span className="font-medium">Location:</span>
                    <span className="text-xs">{program.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-ehrdc-teal" />
                    <span className="font-medium">Capacity:</span>
                    <span>{program.enrolled}/{program.capacity} enrolled</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Registration Deadline:</span>
                    <br />
                    <span className="text-muted-foreground">
                      {new Date(program.registration_deadline).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Program Duration:</span>
                    <br />
                    <span className="text-muted-foreground">
                      {new Date(program.start_date).toLocaleDateString()} - {new Date(program.end_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <h4 className="font-semibold">Contact Information</h4>
                
                {program.contact_email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-ehrdc-teal" />
                    <a 
                      href={`mailto:${program.contact_email}`}
                      className="text-ehrdc-teal hover:underline"
                    >
                      {program.contact_email}
                    </a>
                  </div>
                )}
                
                {program.contact_phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-ehrdc-teal" />
                    <a 
                      href={`tel:${program.contact_phone}`}
                      className="text-ehrdc-teal hover:underline"
                    >
                      {program.contact_phone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button 
                className="w-full ehrdc-button-primary"
                onClick={handleApply}
                disabled={program.status === 'full' || program.status === 'closed'}
              >
                {program.status === 'full' ? 'Program Full' : 
                 program.status === 'closed' ? 'Registration Closed' : 
                 'Apply Now'}
              </Button>
              
              <Button variant="outline" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Institution Website
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
