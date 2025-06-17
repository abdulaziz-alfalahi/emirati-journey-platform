
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';

const AdminUserRolesPage: React.FC = () => {
  const { user, roles, hasRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('school_student');

  // Check if user has admin access
  if (!hasRole('administrator') && !hasRole('admin')) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              You don't have permission to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };

  const availableRoles: UserRole[] = [
    'school_student',
    'university_student',
    'parent',
    'educational_institution',
    'training_center',
    'mentor',
    'entrepreneur',
    'retiree',
    'government_representative',
    'administrator'
  ];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Roles Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Available Roles</h3>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map((role) => (
                  <Badge
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleRoleSelection(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Selected Role</h3>
              <Badge variant="default">{selectedRole}</Badge>
            </div>

            <Button onClick={() => console.log('Role management action')}>
              Manage Roles
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserRolesPage;
