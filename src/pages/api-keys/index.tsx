
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ApiKeysPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>API Keys</h1>
      <p>This page is only accessible to authenticated users.</p>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
          {/* Display API keys or related content here */}
          <Button>Generate New API Key</Button>
        </div>
      )}
    </div>
  );
};

export default ApiKeysPage;
