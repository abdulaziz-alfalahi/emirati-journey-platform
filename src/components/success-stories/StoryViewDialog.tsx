
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SuccessStory } from '@/types/successStories';
import SocialShareButtons from './SocialShareButtons';
import MediaPlayer from './MediaPlayer';

interface StoryViewDialogProps {
  story: SuccessStory | null;
  onClose: () => void;
}

const StoryViewDialog: React.FC<StoryViewDialogProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <Dialog open={!!story} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{story.title}</DialogTitle>
              <DialogDescription className="text-base">{story.summary}</DialogDescription>
            </div>
            <Badge variant="outline" className="ml-4">
              {story.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </div>
          
          {story.media.video_testimonial ? (
            <MediaPlayer
              type="video"
              src={story.media.video_testimonial.url}
              title="Video Testimonial"
              thumbnail={story.media.video_testimonial.thumbnail || story.media.featured_image}
              duration={story.media.video_testimonial.duration}
              className="w-full"
            />
          ) : story.media.featured_image && (
            <img 
              src={story.media.featured_image} 
              alt={story.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-base leading-relaxed">{story.content}</p>
          </div>
          
          {/* Audio Clips Section */}
          {story.media.audio_clips && story.media.audio_clips.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Audio Highlights</h4>
              <div className="space-y-3">
                {story.media.audio_clips.map((clip, index) => (
                  <MediaPlayer
                    key={index}
                    type="audio"
                    src={clip.url}
                    title={clip.title}
                    duration={clip.duration}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Image Gallery */}
          {story.media.gallery && story.media.gallery.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {story.media.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          {story.metrics && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impact & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {story.metrics.career_growth && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Career Growth</h4>
                      <p className="font-semibold">{story.metrics.career_growth}</p>
                    </div>
                  )}
                  {story.metrics.impact && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Impact</h4>
                      <p className="font-semibold">{story.metrics.impact}</p>
                    </div>
                  )}
                  {story.metrics.timeline && (
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Timeline</h4>
                      <p className="font-semibold">{story.metrics.timeline}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <SocialShareButtons story={story} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewDialog;
