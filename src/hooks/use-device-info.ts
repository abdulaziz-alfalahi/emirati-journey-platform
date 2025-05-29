
import { useState, useEffect } from 'react';
import { Device } from '@capacitor/device';
import { useMobileDetection } from './use-mobile-detection';

export interface DeviceInfo {
  platform: string;
  model: string;
  operatingSystem: string;
  osVersion: string;
  manufacturer: string;
  isVirtual: boolean;
  webViewVersion?: string;
  diskFree?: number;
  diskTotal?: number;
  memUsed?: number;
  realDiskFree?: number;
  realDiskTotal?: number;
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
          diskFree: info.diskFree,
          diskTotal: info.diskTotal,
          memUsed: info.memUsed,
          realDiskFree: info.realDiskFree,
          realDiskTotal: info.realDiskTotal,
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
