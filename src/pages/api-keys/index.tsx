import React from 'react';
// Update the Button import to correct lowercase path
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ApiKeysPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
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

