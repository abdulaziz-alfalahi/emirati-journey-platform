
import { useState, useEffect } from 'react';

interface MobileDetection {
  isMobile: boolean;
  isCapacitor: boolean;
  screenWidth: number;
}

export const useMobileDetection = (): MobileDetection => {
  const [detection, setDetection] = useState<MobileDetection>({
    isMobile: false,
    isCapacitor: false,
    screenWidth: 0
  });

  useEffect(() => {
    const checkMobileAndCapacitor = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isCapacitor = !!(window as any).Capacitor;

      setDetection({
        isMobile,
        isCapacitor,
        screenWidth: width
      });
    };

    // Initial check
    checkMobileAndCapacitor();

    // Listen for resize events
    window.addEventListener('resize', checkMobileAndCapacitor);

    return () => {
      window.removeEventListener('resize', checkMobileAndCapacitor);
    };
  }, []);

  return detection;
};
