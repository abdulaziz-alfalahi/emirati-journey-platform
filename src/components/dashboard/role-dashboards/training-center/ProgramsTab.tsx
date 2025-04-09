
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { BookOpen, FolderOpen, FileUp, File, FileText, Upload } from 'lucide-react';
import { Program, ProgramDocument, NewProgram } from '@/types/training-center';

interface ProgramsTabProps {
  programs: Program[];
  setPrograms: React.Dispatch<React.SetStateAction<Program[]>>;
}

const ProgramsTab: React.FC<ProgramsTabProps> = ({ programs, setPrograms }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newProgramDialogOpen, setNewProgramDialogOpen] = useState(false);
  const [newProgram, setNewProgram] = useState<NewProgram>({
    title: '',
    description: '',
    startDate: '',
    status: 'planned'
  });

  const handleFileUpload = (programId: number) => {
    // In a real application, this would handle actual file uploads
    toast.success('Document uploaded successfully');
    setIsUploadDialogOpen(false);
  };

  const handleCreateProgram = () => {
    if (!newProgram.title || !newProgram.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProgramItem: Program = {
      id: programs.length + 1,
      title: newProgram.title,
      description: newProgram.description,
      trainees: 0,
      startDate: newProgram.startDate,
      status: newProgram.status as 'active' | 'planned',
      documents: []
    };

    setPrograms([...programs, newProgramItem]);
    setNewProgram({
      title: '',
      description: '',
      startDate: '',
      status: 'planned'
    });
    setNewProgramDialogOpen(false);
    toast.success('New training program created');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Training Programs</CardTitle>
              <CardDescription>Manage your training offerings</CardDescription>
            </div>
            <Dialog open={newProgramDialogOpen} onOpenChange={setNewProgramDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" /> Create New Program
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Training Program</DialogTitle>
                  <DialogDescription>
                    Add details for your new training program.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title*
                    </Label>
                    <Input
                      id="title"
                      value={newProgram.title}
                      onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                      className="col-span-3"
                      placeholder="Program title"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                      className="col-span-3"
                      placeholder="Program description"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Start Date*
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProgram.startDate}
                      onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={newProgram.status}
                      onChange={(e) => setNewProgram({...newProgram, status: e.target.value})}
                      className="col-span-3 p-2 border rounded"
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewProgramDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateProgram}>Create Program</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trainees</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map(program => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.title}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={program.status === 'active' ? 'default' : 'secondary'}
                      className={program.status === 'active' ? 'bg-green-500/10 text-green-700' : ''}
                    >
                      {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.trainees}</TableCell>
                  <TableCell>{program.startDate}</TableCell>
                  <TableCell>
                    {program.documents?.length || 0} files
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedProgram(program)}
                      >
                        <FolderOpen className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Dialog open={isUploadDialogOpen && selectedProgram?.id === program.id} onOpenChange={(open) => {
                        setIsUploadDialogOpen(open);
                        if (open) setSelectedProgram(program);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileUp className="h-4 w-4 mr-1" /> Upload
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Upload Program Document</DialogTitle>
                            <DialogDescription>
                              Add documents related to "{program.title}" program.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="document">Select Document</Label>
                              <Input id="document" type="file" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                              <Label htmlFor="docType">Document Type</Label>
                              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="curriculum">Curriculum</option>
                                <option value="schedule">Schedule</option>
                                <option value="materials">Learning Materials</option>
                                <option value="assessment">Assessment</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => handleFileUpload(program.id)}>Upload</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Program Details Dialog */}
      <Dialog open={!!selectedProgram && !isUploadDialogOpen} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
            <DialogDescription>
              {selectedProgram?.description || 'No description available.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge 
                  variant={selectedProgram?.status === 'active' ? 'default' : 'secondary'}
                  className={selectedProgram?.status === 'active' ? 'bg-green-500/10 text-green-700 ml-2' : 'ml-2'}
                >
                  {selectedProgram?.status.charAt(0).toUpperCase() + selectedProgram?.status.slice(1)}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Start Date:</span> 
                <span className="ml-2">{selectedProgram?.startDate}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Trainees:</span> 
                <span className="ml-2">{selectedProgram?.trainees}</span>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Program Documents</h4>
              {selectedProgram?.documents && selectedProgram.documents.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProgram.documents.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center">
                          <File className="h-4 w-4 mr-2" /> {doc.name}
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No documents uploaded yet</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                    setSelectedProgram(null);
                    setIsUploadDialogOpen(true);
                  }}>
                    <Upload className="h-4 w-4 mr-1" /> Upload Document
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardHeader>
          <CardTitle>Program Analytics</CardTitle>
          <CardDescription>Performance metrics by program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Most Popular Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Web Development</div>
                  <p className="text-xs text-muted-foreground mt-1">128 trainees enrolled</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Highest Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Data Analysis</div>
                  <p className="text-xs text-muted-foreground mt-1">96% completion rate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Best Job Placement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Cloud Computing</div>
                  <p className="text-xs text-muted-foreground mt-1">88% placement rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramsTab;
