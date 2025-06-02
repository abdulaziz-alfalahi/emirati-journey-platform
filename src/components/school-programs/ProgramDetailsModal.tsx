
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  School, 
  BookOpen,
  Mail,
  Phone,
  Target,
  CheckCircle
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
        <div className="space-y-6">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold">{program.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  {program.institution}
                </DialogDescription>
              </div>
              <Badge className={getStatusColor(program.status)}>
                {program.status}
              </Badge>
            </div>
          </DialogHeader>

          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={program.image_url} 
              alt={program.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Program Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Grade Level:</span>
                      <span className="ml-2">{program.grade_level}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Age Range:</span>
                      <span className="ml-2">{program.age_range}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Duration:</span>
                      <span className="ml-2">{program.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Schedule:</span>
                      <span className="ml-2">{program.schedule}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{program.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-ehrdc-teal" />
                    <div>
                      <span className="font-medium">Price:</span>
                      <span className="ml-2">{program.price.toLocaleString()} {program.currency}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Enrollment Status</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Enrolled Students</span>
                    <span className="font-medium">{program.enrolled}/{program.capacity}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-ehrdc-teal h-2 rounded-full" 
                      style={{ width: `${(program.enrolled / program.capacity) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {program.capacity - program.enrolled} spots remaining
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Registration Deadline:</span>
                      <span className="text-sm font-medium">
                        {new Date(program.registration_deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Start Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(program.start_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">End Date:</span>
                      <span className="text-sm font-medium">
                        {new Date(program.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Program Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-ehrdc-teal" />
                  Learning Outcomes
                </h3>
                <ul className="space-y-2">
                  {program.learning_outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {program.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-ehrdc-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {program.contact_email && (
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-ehrdc-teal" />
                    <a 
                      href={`tel:${program.contact_phone}`}
                      className="text-ehrdc-teal hover:underline"
                    >
                      {program.contact_phone}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-2 pt-4">
            {program.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-ehrdc-teal border-ehrdc-teal">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="ehrdc-button-primary flex-1">
              Apply for Program
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
