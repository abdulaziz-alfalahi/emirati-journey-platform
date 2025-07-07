// Global fix script
// This file contains the replacement mappings for fixing toast imports

export const toastImportFixes = [
  // Virtual Events
  'src/components/virtual-events/AttendeeMatching.tsx',
  'src/components/virtual-events/BoothHeatmap.tsx',
  'src/components/virtual-events/BreakoutRooms.tsx',
  'src/components/virtual-events/CertificateViewer.tsx',
  'src/components/virtual-events/CreateEventDialog.tsx',
  'src/components/virtual-events/EngagementDashboard.tsx',
  'src/components/virtual-events/EnhancedEventSessions.tsx',
  'src/components/virtual-events/EventFeedbackForm.tsx',
  'src/components/virtual-events/InteractiveQA.tsx',
  'src/components/virtual-events/NetworkingRooms.tsx',
  'src/components/virtual-events/PostEventDashboard.tsx',
  'src/components/virtual-events/SessionChat.tsx',
  'src/components/virtual-events/VirtualBooths.tsx',
  'src/components/virtual-events/VirtualEventCard.tsx',
  'src/components/virtual-events/VirtualEventsGrid.tsx',
  
  // Pages
  'src/pages/career-advisory/interviews/index.tsx',
  'src/pages/career-advisory/interviews/schedule.tsx',
  'src/pages/virtual-events/[id].tsx'
];

// Change from '@/components/ui/use-toast' to '@/hooks/use-toast'