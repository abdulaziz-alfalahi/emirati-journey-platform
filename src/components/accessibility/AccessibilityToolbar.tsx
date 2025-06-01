
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { 
  Accessibility, 
  Type, 
  Eye, 
  Keyboard, 
  Volume2, 
  MousePointer,
  Contrast,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  dyslexiaFont: boolean;
  focusIndicator: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  colorBlindFilter: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export const AccessibilityToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    dyslexiaFont: false,
    focusIndicator: true,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindFilter: 'none'
  });

  // Apply accessibility settings to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size adjustment
    root.style.fontSize = `${settings.fontSize}%`;
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Dyslexia-friendly font
    if (settings.dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }
    
    // Enhanced focus indicators
    if (settings.focusIndicator) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    
    // Color blind filters
    if (settings.colorBlindFilter !== 'none') {
      root.classList.add(`filter-${settings.colorBlindFilter}`);
    } else {
      root.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia');
    }
    
    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    }
  }, []);

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      setSettings(prev => ({ ...prev, fontSize: prev.fontSize + 10 }));
    }
  };

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      setSettings(prev => ({ ...prev, fontSize: prev.fontSize - 10 }));
    }
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleDyslexiaFont = () => {
    setSettings(prev => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      dyslexiaFont: false,
      focusIndicator: true,
      screenReader: false,
      keyboardNavigation: true,
      colorBlindFilter: 'none'
    });
  };

  const setColorBlindFilter = (filter: AccessibilitySettings['colorBlindFilter']) => {
    setSettings(prev => ({ ...prev, colorBlindFilter: filter }));
  };

  const hasActiveSettings = settings.fontSize !== 100 || 
                           settings.highContrast || 
                           settings.dyslexiaFont || 
                           settings.colorBlindFilter !== 'none';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`flex items-center space-x-2 transition-colors ${
            hasActiveSettings 
              ? 'text-ehrdc-teal bg-ehrdc-teal/10 hover:bg-ehrdc-teal/20' 
              : 'text-ehrdc-neutral-dark hover:text-ehrdc-teal hover:bg-ehrdc-teal/10'
          }`}
          aria-label="Accessibility options"
          title="Accessibility Toolbar"
        >
          <Accessibility className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Accessibility</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-white border border-ehrdc-neutral-light shadow-lg"
        sideOffset={5}
      >
        <DropdownMenuLabel className="text-ehrdc-neutral-dark font-semibold">
          Accessibility Options
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-ehrdc-neutral-light" />
        
        {/* Text Size Controls */}
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ehrdc-neutral-dark flex items-center">
              <Type className="h-4 w-4 mr-2" />
              Text Size
            </span>
            <span className="text-xs text-ehrdc-neutral-dark/70">
              {settings.fontSize}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              disabled={settings.fontSize <= 80}
              className="border-ehrdc-neutral-light hover:border-ehrdc-teal hover:text-ehrdc-teal"
              aria-label="Decrease text size"
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <div className="flex-1 h-2 bg-ehrdc-neutral-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-ehrdc-teal transition-all duration-200"
                style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              disabled={settings.fontSize >= 150}
              className="border-ehrdc-neutral-light hover:border-ehrdc-teal hover:text-ehrdc-teal"
              aria-label="Increase text size"
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-ehrdc-neutral-light" />
        
        {/* Visual Adjustments */}
        <DropdownMenuItem
          onClick={toggleHighContrast}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.highContrast ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Contrast className="h-4 w-4 mr-2" />
          <span>High Contrast</span>
          {settings.highContrast && (
            <span className="ml-auto text-xs bg-ehrdc-teal text-white px-2 py-1 rounded">
              ON
            </span>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={toggleDyslexiaFont}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.dyslexiaFont ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Type className="h-4 w-4 mr-2" />
          <span>Dyslexia-Friendly Font</span>
          {settings.dyslexiaFont && (
            <span className="ml-auto text-xs bg-ehrdc-teal text-white px-2 py-1 rounded">
              ON
            </span>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-ehrdc-neutral-light" />
        
        {/* Color Blind Support */}
        <DropdownMenuLabel className="text-xs text-ehrdc-neutral-dark/70 font-medium">
          Color Vision Support
        </DropdownMenuLabel>
        
        <DropdownMenuItem
          onClick={() => setColorBlindFilter('none')}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.colorBlindFilter === 'none' ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          <span>Normal Vision</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setColorBlindFilter('protanopia')}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.colorBlindFilter === 'protanopia' ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          <span>Protanopia (Red-blind)</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setColorBlindFilter('deuteranopia')}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.colorBlindFilter === 'deuteranopia' ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          <span>Deuteranopia (Green-blind)</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setColorBlindFilter('tritanopia')}
          className={`cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal ${
            settings.colorBlindFilter === 'tritanopia' ? 'bg-ehrdc-teal/10 text-ehrdc-teal' : ''
          }`}
        >
          <Eye className="h-4 w-4 mr-2" />
          <span>Tritanopia (Blue-blind)</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-ehrdc-neutral-light" />
        
        {/* Navigation Aids */}
        <DropdownMenuItem className="cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal">
          <Keyboard className="h-4 w-4 mr-2" />
          <span>Keyboard Navigation Guide</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer hover:bg-ehrdc-teal/10 hover:text-ehrdc-teal">
          <Volume2 className="h-4 w-4 mr-2" />
          <span>Screen Reader Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-ehrdc-neutral-light" />
        
        {/* Reset Button */}
        <DropdownMenuItem
          onClick={resetSettings}
          className="cursor-pointer hover:bg-orange-50 hover:text-orange-600 text-orange-600"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          <span>Reset All Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
