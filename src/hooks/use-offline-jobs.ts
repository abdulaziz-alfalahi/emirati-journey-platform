
import { useCallback, useState, useEffect } from 'react';
import { useOfflineStorage } from './use-offline-storage';

export interface OfflineJob {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary?: string;
  type: string;
  requirements: string[];
  savedAt: number;
}

export const useOfflineJobs = () => {
  const { 
    isOnline, 
    saveToOfflineStorage, 
    getFromOfflineStorage 
  } = useOfflineStorage();
  
  const [savedJobs, setSavedJobs] = useState<OfflineJob[]>([]);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = useCallback(() => {
    try {
      const stored = localStorage.getItem('offline_jobs');
      if (stored) {
        setSavedJobs(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    }
  }, []);

  const saveJobOffline = useCallback((job: Omit<OfflineJob, 'savedAt'>) => {
    const offlineJob: OfflineJob = {
      ...job,
      savedAt: Date.now()
    };

    const updatedJobs = [...savedJobs, offlineJob];
    setSavedJobs(updatedJobs);
    localStorage.setItem('offline_jobs', JSON.stringify(updatedJobs));
    
    saveToOfflineStorage(`job_${job.id}`, offlineJob);
  }, [savedJobs, saveToOfflineStorage]);

  const removeJobOffline = useCallback((jobId: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem('offline_jobs', JSON.stringify(updatedJobs));
  }, [savedJobs]);

  const getJobOffline = useCallback((jobId: string) => {
    return savedJobs.find(job => job.id === jobId) || null;
  }, [savedJobs]);

  const searchOfflineJobs = useCallback((query: string) => {
    if (!query.trim()) return savedJobs;
    
    const lowerQuery = query.toLowerCase();
    return savedJobs.filter(job => 
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.description.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery)
    );
  }, [savedJobs]);

  return {
    isOnline,
    savedJobs,
    saveJobOffline,
    removeJobOffline,
    getJobOffline,
    searchOfflineJobs,
    hasSavedJobs: savedJobs.length > 0
  };
};
