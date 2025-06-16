
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Volume2, 
  MousePointer, 
  Brain, 
  Globe, 
  Settings, 
  HelpCircle,
  Accessibility as AccessibilityIcon,
  Palette,
  Type,
  Mic,
  Keyboard,
  Languages
} from 'lucide-react';
import { useAccessibilityPreferences } from '@/hooks/useAccessibilityPreferences';

export const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, updatePreferences, isLoading } = useAccessibilityPreferences();

  const handleTextSizeChange = (size: string[]) => {
    updatePreferences({
      visual_preferences: {
        ...preferences.visual_preferences,
        text_size: size[0] as 'small' | 'medium' | 'large' | 'extra-large'
      }
    });
  };

  const handleHighContrastToggle = (enabled: boolean) => {
    updatePreferences({
      visual_preferences: {
        ...preferences.visual_preferences,
        high_contrast: enabled
      }
    });
    
    // Apply high contrast mode
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const handleColorBlindFilter = (filter: string) => {
    // Remove any existing filters
    document.documentElement.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia');
    
    if (filter !== 'none') {
      document.documentElement.classList.add(`filter-${filter}`);
    }
    
    updatePreferences({
      visual_preferences: {
        ...preferences.visual_preferences,
        color_blind_filter: filter as 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
      }
    });
  };

  const handleReducedMotion = (enabled: boolean) => {
    updatePreferences({
      visual_preferences: {
        ...preferences.visual_preferences,
        reduce_motion: enabled
      }
    });
    
    if (enabled) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button size="lg" className="rounded-full shadow-lg" disabled>
          <AccessibilityIcon className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Accessibility Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          size="lg" 
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full shadow-lg bg-ehrdc-teal hover:bg-ehrdc-dark-teal"
          aria-label="Open accessibility settings"
        >
          <AccessibilityIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <AccessibilityIcon className="h-5 w-5 text-ehrdc-teal" />
                Accessibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="visual" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="visual" className="flex flex-col gap-1 h-12">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">Visual</span>
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="flex flex-col gap-1 h-12">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-xs">Audio</span>
                  </TabsTrigger>
                  <TabsTrigger value="motor" className="flex flex-col gap-1 h-12">
                    <MousePointer className="h-4 w-4" />
                    <span className="text-xs">Motor</span>
                  </TabsTrigger>
                  <TabsTrigger value="cognitive" className="flex flex-col gap-1 h-12">
                    <Brain className="h-4 w-4" />
                    <span className="text-xs">Mental</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="visual" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Text Size
                    </h4>
                    <div className="space-y-2">
                      <Slider
                        value={[['small', 'medium', 'large', 'extra-large'].indexOf(preferences.visual_preferences?.text_size || 'medium')]}
                        onValueChange={(value) => {
                          const sizes = ['small', 'medium', 'large', 'extra-large'];
                          handleTextSizeChange([sizes[value[0]]]);
                        }}
                        max={3}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Small</span>
                        <span>Medium</span>
                        <span>Large</span>
                        <span>Extra Large</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Display Options
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">High Contrast Mode</label>
                        <Switch 
                          checked={preferences.visual_preferences?.high_contrast || false}
                          onCheckedChange={handleHighContrastToggle}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm">Color Blind Filter</label>
                        <Select 
                          value={preferences.visual_preferences?.color_blind_filter || 'none'}
                          onValueChange={handleColorBlindFilter}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="protanopia">Protanopia (Red-blind)</SelectItem>
                            <SelectItem value="deuteranopia">Deuteranopia (Green-blind)</SelectItem>
                            <SelectItem value="tritanopia">Tritanopia (Blue-blind)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm">Reduced Motion</label>
                        <Switch 
                          checked={preferences.visual_preferences?.reduce_motion || false}
                          onCheckedChange={handleReducedMotion}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="audio" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Audio Assistance
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Screen Reader Support</label>
                        <Switch 
                          checked={preferences.audio_preferences?.screen_reader_enabled || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            audio_preferences: {
                              ...preferences.audio_preferences,
                              screen_reader_enabled: enabled
                            }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Audio Descriptions</label>
                        <Switch 
                          checked={preferences.audio_preferences?.audio_descriptions || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            audio_preferences: {
                              ...preferences.audio_preferences,
                              audio_descriptions: enabled
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm">Voice Navigation</label>
                        <Switch 
                          checked={preferences.audio_preferences?.voice_navigation || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            audio_preferences: {
                              ...preferences.audio_preferences,
                              voice_navigation: enabled
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="motor" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      Navigation Options
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Keyboard Only Navigation</label>
                        <Switch 
                          checked={preferences.motor_preferences?.keyboard_only || false}
                          onCheckedChange={(enabled) => {
                            updatePreferences({
                              motor_preferences: {
                                ...preferences.motor_preferences,
                                keyboard_only: enabled
                              }
                            });
                            
                            if (enabled) {
                              document.documentElement.classList.add('enhanced-focus');
                            } else {
                              document.documentElement.classList.remove('enhanced-focus');
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Voice Control</label>
                        <Switch 
                          checked={preferences.motor_preferences?.voice_control || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            motor_preferences: {
                              ...preferences.motor_preferences,
                              voice_control: enabled
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm">Simplified Interactions</label>
                        <Switch 
                          checked={preferences.motor_preferences?.simplified_interactions || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            motor_preferences: {
                              ...preferences.motor_preferences,
                              simplified_interactions: enabled
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cognitive" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Cognitive Support
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Simplified Language</label>
                        <Switch 
                          checked={preferences.cognitive_preferences?.simplified_language || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            cognitive_preferences: {
                              ...preferences.cognitive_preferences,
                              simplified_language: enabled
                            }
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Step-by-Step Guidance</label>
                        <Switch 
                          checked={preferences.cognitive_preferences?.step_by_step_guidance || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            cognitive_preferences: {
                              ...preferences.cognitive_preferences,
                              step_by_step_guidance: enabled
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm">Progress Indicators</label>
                        <Switch 
                          checked={preferences.cognitive_preferences?.progress_indicators || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            cognitive_preferences: {
                              ...preferences.cognitive_preferences,
                              progress_indicators: enabled
                            }
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm">Auto-Save</label>
                        <Switch 
                          checked={preferences.cognitive_preferences?.auto_save || false}
                          onCheckedChange={(enabled) => updatePreferences({
                            cognitive_preferences: {
                              ...preferences.cognitive_preferences,
                              auto_save: enabled
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-4 border-t space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Save & Close
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-xs" 
                  onClick={() => window.open('/accessibility-help', '_blank')}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Accessibility Help & Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
