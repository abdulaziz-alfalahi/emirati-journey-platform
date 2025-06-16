
export interface AccessibilityEnhancementSystem {
  visualAccessibility: {
    textSizeCustomization: TextSizeCustomizationTool;
    highContrastModes: HighContrastModeSystem;
    colorBlindSupport: ColorBlindFriendlyDesign;
    magnificationTools: MagnificationAndZoomTools;
  };
  audioAccessibility: {
    screenReaderOptimization: ScreenReaderOptimization;
    audioDescriptions: AudioDescriptionSystem;
    voiceNavigation: VoiceNavigationInterface;
    audioFeedback: AudioFeedbackSystem;
  };
  motorAccessibility: {
    keyboardNavigation: KeyboardNavigationSystem;
    voiceControl: VoiceControlInterface;
    simplifiedInteractions: SimplifiedInteractionPatterns;
    assistiveTechnologySupport: AssistiveTechnologyIntegration;
  };
}

export interface InclusiveDesignSystem {
  cognitiveAccessibility: {
    clearLanguage: ClearLanguageGuidelines;
    simplifiedInterfaces: SimplifiedInterfaceDesign;
    comprehensiveHelp: HelpAndSupportSystem;
    progressIndicators: ProgressIndicationSystem;
  };
  culturalAccessibility: {
    multilingualSupport: MultilingualInterfaceSystem;
    culturalAdaptation: CulturalAdaptationFeatures;
    localizedContent: LocalizedContentManagement;
    culturalSensitivity: CulturalSensitivityGuidelines;
  };
  technicalAccessibility: {
    offlineCapabilities: OfflineAccessibilityFeatures;
    lowBandwidthOptimization: LowBandwidthOptimization;
    deviceCompatibility: DeviceCompatibilitySystem;
    performanceOptimization: PerformanceAccessibilityFeatures;
  };
}

export interface AccessibilityPreferences {
  id: string;
  user_id: string;
  visual_preferences: {
    text_size: 'small' | 'medium' | 'large' | 'extra-large';
    high_contrast: boolean;
    color_blind_filter: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
    magnification_level: number;
    reduce_motion: boolean;
  };
  audio_preferences: {
    screen_reader_enabled: boolean;
    audio_descriptions: boolean;
    voice_navigation: boolean;
    audio_feedback: boolean;
    speech_rate: number;
  };
  motor_preferences: {
    keyboard_only: boolean;
    voice_control: boolean;
    simplified_interactions: boolean;
    touch_assistance: boolean;
    hover_timeout: number;
  };
  cognitive_preferences: {
    simplified_language: boolean;
    step_by_step_guidance: boolean;
    progress_indicators: boolean;
    auto_save: boolean;
    reading_assistance: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface TextSizeCustomizationTool {
  setTextSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void;
  getTextSize: () => string;
  applyTextSize: (element: HTMLElement) => void;
}

export interface HighContrastModeSystem {
  enableHighContrast: () => void;
  disableHighContrast: () => void;
  isHighContrastEnabled: () => boolean;
  getContrastRatio: (foreground: string, background: string) => number;
}

export interface ColorBlindFriendlyDesign {
  applyColorBlindFilter: (type: 'protanopia' | 'deuteranopia' | 'tritanopia') => void;
  removeColorBlindFilter: () => void;
  validateColorAccessibility: (colors: string[]) => boolean;
}

export interface ScreenReaderOptimization {
  addAriaLabels: (elements: HTMLElement[]) => void;
  announcePageChange: (pageName: string) => void;
  describeDynamicContent: (content: string) => void;
  setFocusManagement: (container: HTMLElement) => void;
}

export interface VoiceNavigationInterface {
  startVoiceNavigation: () => void;
  stopVoiceNavigation: () => void;
  processVoiceCommand: (command: string) => void;
  getAvailableCommands: () => string[];
}

export interface KeyboardNavigationSystem {
  setupKeyboardShortcuts: () => void;
  manageFocusOrder: (elements: HTMLElement[]) => void;
  createSkipLinks: () => void;
  handleTabTrapping: (container: HTMLElement) => void;
}

export interface SimplifiedInteractionPatterns {
  enableLargerClickTargets: () => void;
  reducedMotionInterface: () => void;
  oneHandedNavigation: () => void;
  voiceActivatedActions: () => void;
}

export interface ClearLanguageGuidelines {
  simplifyText: (text: string) => string;
  addReadingLevel: (content: string) => number;
  provideDefinitions: (terms: string[]) => Record<string, string>;
  createSummaries: (content: string) => string;
}

export interface HelpAndSupportSystem {
  contextualHelp: ContextualHelpProvider;
  tutorialSystem: TutorialSystemInterface;
  accessibilitySupport: AccessibilitySupportInterface;
  emergencyAssistance: EmergencyAssistanceInterface;
}

export interface ContextualHelpProvider {
  showHelp: (context: string) => void;
  hideHelp: () => void;
  getHelpContent: (context: string) => string;
  registerHelpTrigger: (element: HTMLElement, content: string) => void;
}

export interface AccessibilitySupportInterface {
  reportAccessibilityIssue: (issue: AccessibilityIssue) => void;
  requestAssistance: (type: 'technical' | 'navigation' | 'content') => void;
  connectWithSupport: () => void;
  accessibilityFeedback: (feedback: string) => void;
}

export interface AccessibilityIssue {
  id: string;
  user_id: string;
  issue_type: 'visual' | 'audio' | 'motor' | 'cognitive' | 'technical';
  description: string;
  page_url: string;
  device_info: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  created_at: string;
  resolved_at?: string;
}
