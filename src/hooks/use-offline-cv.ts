
import { useCallback } from 'react';
import { useOfflineStorage } from './use-offline-storage';
import { CVData } from '@/context/CVContext';
import { ResumeData } from '@/components/resume/types';

export const useOfflineCV = () => {
  const { 
    isOnline, 
    saveToOfflineStorage, 
    getFromOfflineStorage, 
    addToSyncQueue 
  } = useOfflineStorage();

  const saveCVOffline = useCallback((cvData: CVData) => {
    const key = `cv_${Date.now()}`;
    saveToOfflineStorage(key, cvData);
    
    if (!isOnline) {
      addToSyncQueue({
        type: 'create',
        table: 'cv_data',
        data: cvData
      });
    }
    
    return key;
  }, [saveToOfflineStorage, addToSyncQueue, isOnline]);

  const saveResumeOffline = useCallback((resumeData: ResumeData) => {
    const key = `resume_${Date.now()}`;
    saveToOfflineStorage(key, resumeData);
    
    if (!isOnline) {
      addToSyncQueue({
        type: 'create',
        table: 'resume_data',
        data: resumeData
      });
    }
    
    return key;
  }, [saveToOfflineStorage, addToSyncQueue, isOnline]);

  const getOfflineCVs = useCallback(() => {
    const cvKeys = Object.keys(localStorage).filter(key => key.startsWith('cv_'));
    return cvKeys.map(key => ({
      key,
      data: getFromOfflineStorage(key),
      timestamp: parseInt(key.split('_')[1])
    }));
  }, [getFromOfflineStorage]);

  const getOfflineResumes = useCallback(() => {
    const resumeKeys = Object.keys(localStorage).filter(key => key.startsWith('resume_'));
    return resumeKeys.map(key => ({
      key,
      data: getFromOfflineStorage(key),
      timestamp: parseInt(key.split('_')[1])
    }));
  }, [getFromOfflineStorage]);

  return {
    isOnline,
    saveCVOffline,
    saveResumeOffline,
    getOfflineCVs,
    getOfflineResumes
  };
};
