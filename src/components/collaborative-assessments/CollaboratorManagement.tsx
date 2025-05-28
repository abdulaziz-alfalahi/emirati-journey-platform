
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollaboratorsList } from './collaborators/CollaboratorsList';
import { CollaboratorInviteDialog } from './collaborators/CollaboratorInviteDialog';
import { Users, UserPlus, Shield } from 'lucide-react';

interface CollaboratorManagementProps {
  assessmentId: string;
}

export const CollaboratorManagement: React.FC<CollaboratorManagementProps> = ({
  assessmentId
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Collaborator Management</h2>
        </div>
        <CollaboratorInviteDialog 
          assessmentId={assessmentId}
          trigger={
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              <span>Invite Collaborator</span>
            </button>
          }
        />
      </div>

      <Tabs defaultValue="collaborators" className="w-full">
        <TabsList>
          <TabsTrigger value="collaborators">Current Collaborators</TabsTrigger>
          <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="collaborators">
          <CollaboratorsList assessmentId={assessmentId} />
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Role Permissions Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <RolePermissionCard
                    role="Owner"
                    description="Full control over the assessment"
                    permissions={[
                      'Edit assessment',
                      'Evaluate candidates',
                      'Invite collaborators',
                      'View reports',
                      'Add comments'
                    ]}
                    color="bg-purple-50 border-purple-200"
                  />
                  
                  <RolePermissionCard
                    role="Trainer"
                    description="Can edit and evaluate"
                    permissions={[
                      'Edit assessment',
                      'Evaluate candidates',
                      'View reports',
                      'Add comments'
                    ]}
                    color="bg-blue-50 border-blue-200"
                  />
                  
                  <RolePermissionCard
                    role="Mentor"
                    description="Evaluate and guide candidates"
                    permissions={[
                      'Evaluate candidates',
                      'View reports',
                      'Add comments'
                    ]}
                    color="bg-green-50 border-green-200"
                  />
                  
                  <RolePermissionCard
                    role="Employer"
                    description="Assess potential employees"
                    permissions={[
                      'Evaluate candidates',
                      'View reports',
                      'Add comments'
                    ]}
                    color="bg-orange-50 border-orange-200"
                  />
                  
                  <RolePermissionCard
                    role="Evaluator"
                    description="Focused evaluation role"
                    permissions={[
                      'Evaluate candidates',
                      'Add comments'
                    ]}
                    color="bg-gray-50 border-gray-200"
                  />
                  
                  <RolePermissionCard
                    role="Viewer"
                    description="View-only access"
                    permissions={[
                      'View reports',
                      'Add comments'
                    ]}
                    color="bg-slate-50 border-slate-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface RolePermissionCardProps {
  role: string;
  description: string;
  permissions: string[];
  color: string;
}

const RolePermissionCard: React.FC<RolePermissionCardProps> = ({
  role,
  description,
  permissions,
  color
}) => {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <h3 className="font-semibold text-lg mb-1">{role}</h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <ul className="space-y-1">
        {permissions.map((permission, index) => (
          <li key={index} className="text-sm flex items-center space-x-1">
            <span className="w-1 h-1 bg-current rounded-full"></span>
            <span>{permission}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
