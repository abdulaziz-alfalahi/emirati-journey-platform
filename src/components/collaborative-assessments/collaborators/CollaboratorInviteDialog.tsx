
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { CollaboratorRole, CollaboratorPermissions } from '@/types/collaborativeAssessments';
import { inviteCollaborator } from '@/services/collaborativeAssessments/assessmentService';
import { UserPlus } from 'lucide-react';

interface CollaboratorInviteDialogProps {
  assessmentId: string;
  trigger?: React.ReactNode;
}

const rolePermissions: Record<CollaboratorRole, CollaboratorPermissions> = {
  owner: {
    can_edit: true,
    can_evaluate: true,
    can_invite_others: true,
    can_view_reports: true,
    can_comment: true
  },
  trainer: {
    can_edit: true,
    can_evaluate: true,
    can_invite_others: false,
    can_view_reports: true,
    can_comment: true
  },
  mentor: {
    can_edit: false,
    can_evaluate: true,
    can_invite_others: false,
    can_view_reports: true,
    can_comment: true
  },
  employer: {
    can_edit: false,
    can_evaluate: true,
    can_invite_others: false,
    can_view_reports: true,
    can_comment: true
  },
  evaluator: {
    can_edit: false,
    can_evaluate: true,
    can_invite_others: false,
    can_view_reports: false,
    can_comment: true
  },
  viewer: {
    can_edit: false,
    can_evaluate: false,
    can_invite_others: false,
    can_view_reports: true,
    can_comment: true
  }
};

export const CollaboratorInviteDialog: React.FC<CollaboratorInviteDialogProps> = ({
  assessmentId,
  trigger
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<CollaboratorRole>('evaluator');
  const [customPermissions, setCustomPermissions] = useState<CollaboratorPermissions>(
    rolePermissions.evaluator
  );
  const [useCustomPermissions, setUseCustomPermissions] = useState(false);

  const inviteMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      // For now, we'll use a placeholder user ID based on email
      // In a real system, you'd look up the user by email first
      const userId = `user-${email.replace('@', '-').replace('.', '-')}`;
      
      return inviteCollaborator(
        assessmentId,
        userId,
        role,
        user.id,
        useCustomPermissions ? customPermissions : rolePermissions[role]
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessment-collaborators', assessmentId] });
      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${email} as ${role}`
      });
      setOpen(false);
      setEmail('');
      setRole('evaluator');
      setUseCustomPermissions(false);
    },
    onError: (error) => {
      console.error('Error inviting collaborator:', error);
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleRoleChange = (newRole: CollaboratorRole) => {
    setRole(newRole);
    if (!useCustomPermissions) {
      setCustomPermissions(rolePermissions[newRole]);
    }
  };

  const handlePermissionChange = (permission: keyof CollaboratorPermissions, value: boolean) => {
    setCustomPermissions(prev => ({
      ...prev,
      [permission]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    inviteMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Collaborator
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Collaborator</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evaluator">Evaluator</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="custom-permissions"
              checked={useCustomPermissions}
              onCheckedChange={(checked) => setUseCustomPermissions(!!checked)}
            />
            <Label htmlFor="custom-permissions">Customize permissions</Label>
          </div>

          {useCustomPermissions && (
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="text-sm font-medium">Permissions</div>
              {Object.entries(customPermissions).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      handlePermissionChange(key as keyof CollaboratorPermissions, !!checked)
                    }
                  />
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/_/g, ' ').replace(/^can /, 'Can ')}
                  </Label>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={inviteMutation.isPending}>
              {inviteMutation.isPending ? 'Sending...' : 'Send Invitation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
