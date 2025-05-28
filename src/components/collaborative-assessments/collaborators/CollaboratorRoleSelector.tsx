
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CollaboratorRole, CollaboratorPermissions } from '@/types/collaborativeAssessments';
import { Settings } from 'lucide-react';

interface CollaboratorRoleSelectorProps {
  currentRole: CollaboratorRole;
  currentPermissions: CollaboratorPermissions;
  onRoleChange: (role: CollaboratorRole, permissions: CollaboratorPermissions) => void;
  disabled?: boolean;
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

export const CollaboratorRoleSelector: React.FC<CollaboratorRoleSelectorProps> = ({
  currentRole,
  currentPermissions,
  onRoleChange,
  disabled
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<CollaboratorRole>(currentRole);
  const [customPermissions, setCustomPermissions] = useState<CollaboratorPermissions>(currentPermissions);
  const [useCustomPermissions, setUseCustomPermissions] = useState(
    JSON.stringify(currentPermissions) !== JSON.stringify(rolePermissions[currentRole])
  );

  const handleRoleChange = (newRole: CollaboratorRole) => {
    setSelectedRole(newRole);
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

  const handleSave = () => {
    onRoleChange(selectedRole, customPermissions);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedRole(currentRole);
    setCustomPermissions(currentPermissions);
    setUseCustomPermissions(
      JSON.stringify(currentPermissions) !== JSON.stringify(rolePermissions[currentRole])
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Role & Permissions</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="evaluator">Evaluator</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="trainer">Trainer</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="owner">Owner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="custom-permissions"
              checked={useCustomPermissions}
              onCheckedChange={setUseCustomPermissions}
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
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
