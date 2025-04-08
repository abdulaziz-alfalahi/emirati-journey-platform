
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Users } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string | null;
  location: string | null;
  posted_date: string;
  created_at: string;
}

interface JobsTableProps {
  jobs: Job[];
  onFindMatches: (jobId: string) => void;
}

const JobsTable = ({ jobs, onFindMatches }: JobsTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Posted Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs?.length ? (
          jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company || 'Not specified'}</TableCell>
              <TableCell>{job.location || 'Not specified'}</TableCell>
              <TableCell>{new Date(job.posted_date || job.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onFindMatches(job.id)}
                  >
                    <Users className="h-4 w-4 mr-1" /> Find Matches
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => navigate(`/job-descriptions/${job.id}`)}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              No job descriptions found. Create or upload job descriptions to get started.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default JobsTable;
