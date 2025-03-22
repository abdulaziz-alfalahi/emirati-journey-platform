
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileSummary from '@/components/profile/ProfileSummary';
import ProfileForm from '@/components/profile/ProfileForm';

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  useEffect(() => {
    // If no user, redirect to login
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  const handleProfileUpdate = () => {
    // Increment the counter to trigger a refresh of the profile summary
    setRefreshCounter(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emirati-teal"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary Card */}
        <div className="md:col-span-1">
          <ProfileSummary refreshCounter={refreshCounter} />
        </div>
        
        {/* Edit Profile Form */}
        <div className="md:col-span-2">
          <ProfileForm onProfileUpdate={handleProfileUpdate} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
