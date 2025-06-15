
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Eye, 
  Palette, 
  Zap, 
  Shield, 
  Brain, 
  Target,
  Clock,
  MessageCircle,
  Layout,
  Bell
} from 'lucide-react';
import { usePersonalization } from '@/context/PersonalizationContext';
import { useToast } from '@/components/ui/use-toast';

const PersonalizationSettings: React.FC = () => {
  const { profile, updateProfile, applyInterfaceAdaptation } = usePersonalization();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    contentTypes: ['articles', 'videos', 'interactive'],
    interfaceLayout: 'spacious' as const,
    notificationFrequency: 'medium' as const,
    learningPace: 'moderate' as const,
    communicationStyle: 'casual' as const
  });

  const [privacySettings, setPrivacySettings] = useState({
    allowBehaviorTracking: true,
    allowPersonalization: true,
    allowPredictiveAnalytics: true,
    shareAnonymizedData: false
  });

  useEffect(() => {
    if (profile) {
      setPreferences(profile.preferences);
    }
  }, [profile]);

  const handlePreferenceChange = async (key: string, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    try {
      await updateProfile(newPreferences);
      await applyInterfaceAdaptation();
      
      toast({
        title: 'Preferences Updated',
        description: 'Your personalization preferences have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update preferences. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleContentTypeToggle = (contentType: string) => {
    const newContentTypes = preferences.contentTypes.includes(contentType)
      ? preferences.contentTypes.filter(type => type !== contentType)
      : [...preferences.contentTypes, contentType];
    
    handlePreferenceChange('contentTypes', newContentTypes);
  };

  const handlePrivacySettingChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    
    toast({
      title: 'Privacy Setting Updated',
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const resetToDefaults = async () => {
    const defaultPreferences = {
      contentTypes: ['articles', 'videos', 'interactive'],
      interfaceLayout: 'spacious' as const,
      notificationFrequency: 'medium' as const,
      learningPace: 'moderate' as const,
      communicationStyle: 'casual' as const
    };
    
    setPreferences(defaultPreferences);
    await updateProfile(defaultPreferences);
    
    toast({
      title: 'Settings Reset',
      description: 'All preferences have been reset to default values.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Personalization Settings</h2>
        </div>
        <Button variant="outline" onClick={resetToDefaults}>
          Reset to Defaults
        </Button>
      </div>

      {/* Content Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Content Preferences</span>
          </CardTitle>
          <CardDescription>
            Choose the types of content you prefer to see
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-base font-medium">Preferred Content Types</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { id: 'articles', label: 'Articles', icon: '📄' },
                { id: 'videos', label: 'Videos', icon: '🎥' },
                { id: 'interactive', label: 'Interactive', icon: '🎯' },
                { id: 'podcasts', label: 'Podcasts', icon: '🎧' },
                { id: 'infographics', label: 'Infographics', icon: '📊' },
                { id: 'webinars', label: 'Webinars', icon: '🖥️' }
              ].map((type) => (
                <Badge
                  key={type.id}
                  variant={preferences.contentTypes.includes(type.id) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleContentTypeToggle(type.id)}
                >
                  <span className="mr-1">{type.icon}</span>
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="h-5 w-5" />
            <span>Interface Preferences</span>
          </CardTitle>
          <CardDescription>
            Customize how the interface looks and behaves
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="layout">Layout Style</Label>
              <Select
                value={preferences.interfaceLayout}
                onValueChange={(value) => handlePreferenceChange('interfaceLayout', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="spacious">Spacious</SelectItem>
                  <SelectItem value="focused">Focused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="communication">Communication Style</Label>
              <Select
                value={preferences.communicationStyle}
                onValueChange={(value) => handlePreferenceChange('communicationStyle', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Learning Preferences</span>
          </CardTitle>
          <CardDescription>
            Optimize the experience for your learning style
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pace">Learning Pace</Label>
              <Select
                value={preferences.learningPace}
                onValueChange={(value) => handlePreferenceChange('learningPace', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow & Thorough</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="fast">Fast & Efficient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notifications">Notification Frequency</Label>
              <Select
                value={preferences.notificationFrequency}
                onValueChange={(value) => handlePreferenceChange('notificationFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (Daily)</SelectItem>
                  <SelectItem value="medium">Medium (Weekly)</SelectItem>
                  <SelectItem value="low">Low (Monthly)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & AI Control</span>
          </CardTitle>
          <CardDescription>
            Control how AI personalizes your experience and what data is used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Behavior Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the system to track your interactions for personalization
                </p>
              </div>
              <Switch
                checked={privacySettings.allowBehaviorTracking}
                onCheckedChange={(checked) => handlePrivacySettingChange('allowBehaviorTracking', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">AI Personalization</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered recommendations and interface adaptations
                </p>
              </div>
              <Switch
                checked={privacySettings.allowPersonalization}
                onCheckedChange={(checked) => handlePrivacySettingChange('allowPersonalization', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Predictive Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the system to predict your future needs and interests
                </p>
              </div>
              <Switch
                checked={privacySettings.allowPredictiveAnalytics}
                onCheckedChange={(checked) => handlePrivacySettingChange('allowPredictiveAnalytics', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Anonymous Data Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Share anonymized data to improve the platform for everyone
                </p>
              </div>
              <Switch
                checked={privacySettings.shareAnonymizedData}
                onCheckedChange={(checked) => handlePrivacySettingChange('shareAnonymizedData', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Transparency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>AI Transparency</span>
          </CardTitle>
          <CardDescription>
            Understand how AI makes decisions about your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2">How Your Personalization Works</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI analyzes your interaction patterns and preferences</li>
                <li>• Machine learning algorithms predict your interests</li>
                <li>• Interface adapts based on your learning style</li>
                <li>• Recommendations improve with more usage</li>
                <li>• All data processing respects your privacy settings</li>
              </ul>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Brain className="h-4 w-4 mr-2" />
              View Detailed AI Decision Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationSettings;
