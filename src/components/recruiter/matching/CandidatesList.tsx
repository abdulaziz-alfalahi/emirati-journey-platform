
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import CandidateCard from './CandidateCard';

interface Candidate {
  id: string;
  name: string;
  matchScore: number;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  status?: 'shortlisted' | 'rejected' | 'pending' | 'hired';
}

interface CandidatesListProps {
  candidates: Candidate[];
  isMatching: boolean;
  onCandidateAction: (candidateId: string, action: 'shortlist' | 'reject' | 'message' | 'interview') => void;
}

const CandidatesList = ({ candidates, isMatching, onCandidateAction }: CandidatesListProps) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <div>
          <CardTitle>Matching Candidates</CardTitle>
          <CardDescription>{candidates.length} candidates found</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-1" /> Filter
        </Button>
      </CardHeader>
      <CardContent>
        {candidates.length > 0 ? (
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onAction={onCandidateAction}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-muted-foreground">
              {isMatching ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
                  <p>Finding matching candidates...</p>
                </div>
              ) : (
                <p>No matching candidates found. Try adjusting the match threshold.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidatesList;
