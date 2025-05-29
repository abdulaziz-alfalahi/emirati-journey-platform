
import { useState, useCallback } from 'react';
import { useMobileDetection } from './use-mobile-detection';
import { toast } from 'sonner';

export interface CameraOptions {
  quality?: number;
  allowEditing?: boolean;
  source?: any;
  resultType?: any;
}

export const useCamera = () => {
  const { isCapacitor } = useMobileDetection();
  const [isCapturing, setIsCapturing] = useState(false);

  const takePicture = useCallback(async (options: CameraOptions = {}) => {
    if (!isCapacitor) {
      toast.error('Camera not available in web browser');
      return null;
    }

    setIsCapturing(true);
    try {
      const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');
      
      const image = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing || true,
        resultType: options.resultType || CameraResultType.DataUrl,
        source: options.source || CameraSource.Prompt,
      });

      return image.dataUrl || image.webPath;
    } catch (error) {
      console.error('Camera error:', error);
      toast.error('Failed to capture image');
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [isCapacitor]);

  const requestPermissions = useCallback(async () => {
    if (!isCapacitor) return false;

    try {
      const { Camera } = await import('@capacitor/camera');
      const permissions = await Camera.requestPermissions();
      return permissions.camera === 'granted';
    } catch (error) {
      console.error('Camera permission error:', error);
      return false;
    }
  }, [isCapacitor]);

  return {
    takePicture,
    requestPermissions,
    isCapturing,
    isAvailable: isCapacitor
  };
};
