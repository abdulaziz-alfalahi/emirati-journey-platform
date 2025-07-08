
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProfileLayout from '@/components/profile/ProfileLayout';

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
    return <LoadingSpinner />;
  }

  return <ProfileLayout refreshCounter={refreshCounter} onProfileUpdate={handleProfileUpdate} />;
};

export default ProfilePage;
