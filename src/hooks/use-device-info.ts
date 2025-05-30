
import { useState, useEffect } from 'react';
import { useMobileDetection } from './use-mobile-detection';

export interface DeviceInfo {
  platform: string;
  model: string;
  operatingSystem: string;
  osVersion: string;
  manufacturer: string;
  isVirtual: boolean;
  webViewVersion?: string;
  memUsed?: number;
  batteryLevel?: number;
  isCharging?: boolean;
}

export const useDeviceInfo = () => {
  const { isCapacitor } = useMobileDetection();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeviceInfo = async () => {
      if (!isCapacitor) {
        // Fallback for web
        setDeviceInfo({
          platform: 'web',
          model: 'Unknown',
          operatingSystem: navigator.platform,
          osVersion: 'Unknown',
          manufacturer: 'Unknown',
          isVirtual: false
        });
        setIsLoading(false);
        return;
      }

      try {
        const { Device } = await import('@capacitor/device');
        const [info, batteryInfo] = await Promise.all([
          Device.getInfo(),
          Device.getBatteryInfo().catch(() => null)
        ]);

        setDeviceInfo({
          platform: info.platform,
          model: info.model,
          operatingSystem: info.operatingSystem,
          osVersion: info.osVersion,
          manufacturer: info.manufacturer,
          isVirtual: info.isVirtual,
          webViewVersion: info.webViewVersion,
          memUsed: info.memUsed,
          batteryLevel: batteryInfo?.batteryLevel,
          isCharging: batteryInfo?.isCharging
        });
      } catch (error) {
        console.error('Error getting device info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getDeviceInfo();
  }, [isCapacitor]);

  return {
    deviceInfo,
    isLoading,
    isAvailable: isCapacitor
  };
};
