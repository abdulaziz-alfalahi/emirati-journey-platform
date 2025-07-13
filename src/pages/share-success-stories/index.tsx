import React from 'react';
import { useLifelongEngagementTranslation } from '@/hooks/useLifelongEngagementTranslation';
import { LifelongEngagementLayout } from '@/components/lifelong-engagement/LifelongEngagementLayout';
import { Share2, Heart, Users, Award, Star, MessageCircle, Camera, Edit3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ShareSuccessStoriesPage: React.FC = () => {
  const { t } = useLifelongEngagementTranslation('share-success-stories');

  const stats = [
    {
      label: t('stats.storiesLabel', 'Shared Stories'),
      value: t('stats.stories', '2,850+'),
      icon: Share2,
      color: 'text-blue-600'
    },
    {
      label: t('stats.inspirationsLabel', 'Lives Inspired'),
      value: t('stats.inspirations', '125K+'),
      icon: Heart,
      color: 'text-red-600'
    },
    {
      label: t('stats.communitiesLabel', 'Active Communities'),
      value: t('stats.communities', '180+'),
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: t('stats.recognitionsLabel', 'Recognition Awards'),
      value: t('stats.recognitions', '450+'),
      icon: Award,
      color: 'text-purple-600'
    }
  ];

  const tabs = [
    {
      id: 'share',
      label: t('tabs.share.label', 'Share Your Story'),
      icon: <Edit3 className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-blue-500" />
                {t('tabs.share.content.form.title', 'Tell Your Success Story')}
              </CardTitle>
              <CardDescription>
                {t('tabs.share.content.form.description', 'Share your journey and inspire others in the Emirati community')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.share.content.form.categories.title', 'Story Categories')}</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-sm">{t('tabs.share.content.form.categories.professional.title', 'Professional Achievement')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.share.content.form.categories.professional.description', 'Career milestones, promotions, business success')}</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-sm">{t('tabs.share.content.form.categories.education.title', 'Educational Journey')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.share.content.form.categories.education.description', 'Academic achievements, skill development, learning experiences')}</div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm">{t('tabs.share.content.form.categories.community.title', 'Community Impact')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.share.content.form.categories.community.description', 'Volunteer work, social initiatives, helping others')}</div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-sm">{t('tabs.share.content.form.categories.personal.title', 'Personal Growth')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.share.content.form.categories.personal.description', 'Overcoming challenges, life transformations, wellness journeys')}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.share.content.form.guidelines.title', 'Story Guidelines')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{t('tabs.share.content.form.guidelines.authentic', 'Be authentic and genuine in your storytelling')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{t('tabs.share.content.form.guidelines.specific', 'Include specific details and outcomes')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{t('tabs.share.content.form.guidelines.inspiring', 'Focus on lessons learned and inspiration for others')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{t('tabs.share.content.form.guidelines.respectful', 'Maintain respect for privacy and confidentiality')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <span>{t('tabs.share.content.form.guidelines.positive', 'Emphasize positive impact and growth')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-sm mb-2">{t('tabs.share.content.form.tips.title', 'Writing Tips')}</div>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>{t('tabs.share.content.form.tips.structure', '• Start with the challenge or goal')}</li>
                      <li>{t('tabs.share.content.form.tips.journey', '• Describe your journey and actions taken')}</li>
                      <li>{t('tabs.share.content.form.tips.outcome', '• Share the outcome and impact')}</li>
                      <li>{t('tabs.share.content.form.tips.lessons', '• Conclude with lessons and advice')}</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button size="lg">
                  {t('tabs.share.content.form.actions.start', 'Start Writing Your Story')}
                </Button>
                <Button variant="outline" size="lg">
                  {t('tabs.share.content.form.actions.template', 'Use Story Template')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tabs.share.content.multimedia.title', 'Multimedia Stories')}</CardTitle>
              <CardDescription>
                {t('tabs.share.content.multimedia.description', 'Enhance your story with photos, videos, and documents')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Camera className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.share.content.multimedia.types.photos.title', 'Photo Stories')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.share.content.multimedia.types.photos.description', 'Add meaningful photos to illustrate your journey')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.share.content.multimedia.types.video.title', 'Video Testimonials')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.share.content.multimedia.types.video.description', 'Record personal video messages to connect with others')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.share.content.multimedia.types.documents.title', 'Achievement Documents')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.share.content.multimedia.types.documents.description', 'Share certificates, awards, and recognition documents')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'browse',
      label: t('tabs.browse.label', 'Browse Stories'),
      icon: <Share2 className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-green-500" />
                {t('tabs.browse.content.featured.title', 'Featured Success Stories')}
              </CardTitle>
              <CardDescription>
                {t('tabs.browse.content.featured.description', 'Inspiring journeys from fellow Emiratis across various fields')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {t('tabs.browse.content.featured.stories.sarah.initials', 'SA')}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{t('tabs.browse.content.featured.stories.sarah.name', 'Sarah Al-Mansouri')}</CardTitle>
                        <CardDescription className="text-xs">{t('tabs.browse.content.featured.stories.sarah.title', 'Tech Entrepreneur')}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-2">{t('tabs.browse.content.featured.stories.sarah.story.title', 'From Student to Startup Founder')}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {t('tabs.browse.content.featured.stories.sarah.story.excerpt', 'How I built a successful AI startup while completing my engineering degree at UAEU...')}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">{t('tabs.browse.content.featured.stories.sarah.category', 'Entrepreneurship')}</Badge>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs">{t('tabs.browse.content.featured.stories.sarah.likes', '245')}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('tabs.browse.content.featured.stories.sarah.action', 'Read Full Story')}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        {t('tabs.browse.content.featured.stories.mohammed.initials', 'MK')}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{t('tabs.browse.content.featured.stories.mohammed.name', 'Mohammed Al-Kaabi')}</CardTitle>
                        <CardDescription className="text-xs">{t('tabs.browse.content.featured.stories.mohammed.title', 'Community Leader')}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-2">{t('tabs.browse.content.featured.stories.mohammed.story.title', 'Transforming My Neighborhood')}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {t('tabs.browse.content.featured.stories.mohammed.story.excerpt', 'Leading a community initiative that brought together 500+ families for environmental conservation...')}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">{t('tabs.browse.content.featured.stories.mohammed.category', 'Community Service')}</Badge>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs">{t('tabs.browse.content.featured.stories.mohammed.likes', '189')}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('tabs.browse.content.featured.stories.mohammed.action', 'Read Full Story')}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {t('tabs.browse.content.featured.stories.fatima.initials', 'FN')}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{t('tabs.browse.content.featured.stories.fatima.name', 'Dr. Fatima Al-Nuaimi')}</CardTitle>
                        <CardDescription className="text-xs">{t('tabs.browse.content.featured.stories.fatima.title', 'Medical Researcher')}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm mb-2">{t('tabs.browse.content.featured.stories.fatima.story.title', 'Breakthrough in Cancer Research')}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {t('tabs.browse.content.featured.stories.fatima.story.excerpt', 'My journey from medical student to leading groundbreaking research that could save thousands of lives...')}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">{t('tabs.browse.content.featured.stories.fatima.category', 'Healthcare Innovation')}</Badge>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-500" />
                        <span className="text-xs">{t('tabs.browse.content.featured.stories.fatima.likes', '312')}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('tabs.browse.content.featured.stories.fatima.action', 'Read Full Story')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 text-center">
                <Button>
                  {t('tabs.browse.content.featured.action', 'View All Stories')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.browse.content.categories.title', 'Story Categories')}</CardTitle>
                <CardDescription>
                  {t('tabs.browse.content.categories.description', 'Explore stories by category and find inspiration in your field')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{t('tabs.browse.content.categories.list.business.title', 'Business & Entrepreneurship')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.browse.content.categories.list.business.count', '485 stories')}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('tabs.browse.content.categories.list.business.action', 'Browse')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{t('tabs.browse.content.categories.list.education.title', 'Education & Learning')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.browse.content.categories.list.education.count', '392 stories')}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('tabs.browse.content.categories.list.education.action', 'Browse')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{t('tabs.browse.content.categories.list.community.title', 'Community Impact')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.browse.content.categories.list.community.count', '267 stories')}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('tabs.browse.content.categories.list.community.action', 'Browse')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{t('tabs.browse.content.categories.list.personal.title', 'Personal Growth')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.browse.content.categories.list.personal.count', '341 stories')}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('tabs.browse.content.categories.list.personal.action', 'Browse')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-sm">{t('tabs.browse.content.categories.list.innovation.title', 'Innovation & Technology')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.browse.content.categories.list.innovation.count', '198 stories')}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      {t('tabs.browse.content.categories.list.innovation.action', 'Browse')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.browse.content.trending.title', 'Trending Stories')}</CardTitle>
                <CardDescription>
                  {t('tabs.browse.content.trending.description', 'Most popular and inspiring stories this month')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.browse.content.trending.stories.first.title', 'From Refugee to Tech CEO')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.browse.content.trending.stories.first.author', 'by Ahmed Al-Rashid')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{t('tabs.browse.content.trending.stories.first.category', 'Entrepreneurship')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.browse.content.trending.stories.first.views', '12.5K views')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.browse.content.trending.stories.second.title', 'Building Schools in Remote Areas')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.browse.content.trending.stories.second.author', 'by Mariam Al-Zaabi')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{t('tabs.browse.content.trending.stories.second.category', 'Education')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.browse.content.trending.stories.second.views', '9.8K views')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.browse.content.trending.stories.third.title', 'Olympic Dreams Realized')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.browse.content.trending.stories.third.author', 'by Khalid Al-Mansoori')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{t('tabs.browse.content.trending.stories.third.category', 'Sports')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.browse.content.trending.stories.third.views', '8.2K views')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.browse.content.trending.stories.fourth.title', 'Sustainable Fashion Revolution')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.browse.content.trending.stories.fourth.author', 'by Noura Al-Shamsi')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{t('tabs.browse.content.trending.stories.fourth.category', 'Sustainability')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.browse.content.trending.stories.fourth.views', '7.1K views')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'engage',
      label: t('tabs.engage.label', 'Community Engagement'),
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                {t('tabs.engage.content.community.title', 'Story Community Features')}
              </CardTitle>
              <CardDescription>
                {t('tabs.engage.content.community.description', 'Connect with storytellers and build meaningful relationships through shared experiences')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.engage.content.community.features.comments.title', 'Story Comments')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.engage.content.community.features.comments.description', 'Share thoughts and encouragement with storytellers')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.engage.content.community.features.reactions.title', 'Story Reactions')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.engage.content.community.features.reactions.description', 'Express appreciation and support through reactions')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.engage.content.community.features.sharing.title', 'Story Sharing')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.engage.content.community.features.sharing.description', 'Amplify inspiring stories within your network')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.engage.content.discussions.title', 'Community Discussions')}</CardTitle>
                <CardDescription>
                  {t('tabs.engage.content.discussions.description', 'Join conversations around inspiring stories and shared experiences')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold text-sm">{t('tabs.engage.content.discussions.topics.entrepreneurship.title', 'Entrepreneurship Journey')}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {t('tabs.engage.content.discussions.topics.entrepreneurship.description', 'Discussing challenges and successes in building businesses from scratch')}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{t('tabs.engage.content.discussions.topics.entrepreneurship.participants', '45 participants')}</Badge>
                      <span className="text-xs text-gray-500">{t('tabs.engage.content.discussions.topics.entrepreneurship.activity', 'Active now')}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span className="font-semibold text-sm">{t('tabs.engage.content.discussions.topics.education.title', 'Educational Achievements')}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {t('tabs.engage.content.discussions.topics.education.description', 'Sharing experiences about academic pursuits and lifelong learning')}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{t('tabs.engage.content.discussions.topics.education.participants', '32 participants')}</Badge>
                      <span className="text-xs text-gray-500">{t('tabs.engage.content.discussions.topics.education.activity', '2 hours ago')}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold text-sm">{t('tabs.engage.content.discussions.topics.community.title', 'Community Service Impact')}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {t('tabs.engage.content.discussions.topics.community.description', 'Exploring ways to make meaningful contributions to society')}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{t('tabs.engage.content.discussions.topics.community.participants', '28 participants')}</Badge>
                      <span className="text-xs text-gray-500">{t('tabs.engage.content.discussions.topics.community.activity', '1 day ago')}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  {t('tabs.engage.content.discussions.action', 'Join Discussions')}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.engage.content.mentorship.title', 'Mentorship Connections')}</CardTitle>
                <CardDescription>
                  {t('tabs.engage.content.mentorship.description', 'Connect with mentors and mentees through shared success stories')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{t('tabs.engage.content.mentorship.opportunities.mentor.title', 'Become a Mentor')}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {t('tabs.engage.content.mentorship.opportunities.mentor.description', 'Share your expertise and guide others on their journey to success')}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600 mb-3">
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentor.benefits.impact', '• Make a meaningful impact on someone\'s life')}</li>
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentor.benefits.network', '• Expand your professional network')}</li>
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentor.benefits.skills', '• Develop leadership and coaching skills')}</li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('tabs.engage.content.mentorship.opportunities.mentor.action', 'Apply to Mentor')}
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">{t('tabs.engage.content.mentorship.opportunities.mentee.title', 'Find a Mentor')}</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {t('tabs.engage.content.mentorship.opportunities.mentee.description', 'Connect with experienced professionals who can guide your growth')}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600 mb-3">
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentee.benefits.guidance', '• Receive personalized career guidance')}</li>
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentee.benefits.insights', '• Gain industry insights and knowledge')}</li>
                      <li>{t('tabs.engage.content.mentorship.opportunities.mentee.benefits.confidence', '• Build confidence and skills')}</li>
                    </ul>
                    <Button variant="outline" size="sm" className="w-full">
                      {t('tabs.engage.content.mentorship.opportunities.mentee.action', 'Find Mentors')}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.mentorship.stats.title', 'Mentorship Impact')}</div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <div className="text-lg font-bold text-green-600">{t('tabs.engage.content.mentorship.stats.connections', '150+')}</div>
                        <div className="text-xs text-gray-600">{t('tabs.engage.content.mentorship.stats.connectionsLabel', 'Connections')}</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">{t('tabs.engage.content.mentorship.stats.mentors', '85')}</div>
                        <div className="text-xs text-gray-600">{t('tabs.engage.content.mentorship.stats.mentorsLabel', 'Active Mentors')}</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{t('tabs.engage.content.mentorship.stats.success', '92%')}</div>
                        <div className="text-xs text-gray-600">{t('tabs.engage.content.mentorship.stats.successLabel', 'Success Rate')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('tabs.engage.content.events.title', 'Community Events & Workshops')}</CardTitle>
              <CardDescription>
                {t('tabs.engage.content.events.description', 'Join storytelling events and workshops to enhance your narrative skills')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.engage.content.events.upcoming.title', 'Upcoming Events')}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.upcoming.list.storytelling.title', 'Digital Storytelling Workshop')}</div>
                      <div className="text-xs text-gray-600 mb-2">{t('tabs.engage.content.events.upcoming.list.storytelling.description', 'Learn to create compelling multimedia stories')}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{t('tabs.engage.content.events.upcoming.list.storytelling.date', 'March 15, 2024')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.engage.content.events.upcoming.list.storytelling.format', 'Virtual')}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.upcoming.list.networking.title', 'Success Stories Networking')}</div>
                      <div className="text-xs text-gray-600 mb-2">{t('tabs.engage.content.events.upcoming.list.networking.description', 'Connect with fellow achievers and share experiences')}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{t('tabs.engage.content.events.upcoming.list.networking.date', 'March 22, 2024')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.engage.content.events.upcoming.list.networking.format', 'In-person')}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.upcoming.list.writing.title', 'Impactful Writing Masterclass')}</div>
                      <div className="text-xs text-gray-600 mb-2">{t('tabs.engage.content.events.upcoming.list.writing.description', 'Master the art of writing stories that inspire action')}</div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{t('tabs.engage.content.events.upcoming.list.writing.date', 'April 5, 2024')}</Badge>
                        <span className="text-xs text-gray-500">{t('tabs.engage.content.events.upcoming.list.writing.format', 'Hybrid')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.engage.content.events.resources.title', 'Learning Resources')}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.resources.list.guides.title', 'Storytelling Guides')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.engage.content.events.resources.list.guides.description', 'Comprehensive guides for effective storytelling')}</div>
                    </div>
                    
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.resources.list.templates.title', 'Story Templates')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.engage.content.events.resources.list.templates.description', 'Ready-to-use templates for different story types')}</div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.resources.list.videos.title', 'Video Tutorials')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.engage.content.events.resources.list.videos.description', 'Step-by-step video guides for story creation')}</div>
                    </div>
                    
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.engage.content.events.resources.list.webinars.title', 'Expert Webinars')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.engage.content.events.resources.list.webinars.description', 'Learn from successful storytellers and experts')}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button>
                  {t('tabs.engage.content.events.actions.register', 'Register for Events')}
                </Button>
                <Button variant="outline">
                  {t('tabs.engage.content.events.actions.resources', 'Access Resources')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'moderation',
      label: t('tabs.moderation.label', 'Content Moderation'),
      icon: <Award className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-orange-500" />
                {t('tabs.moderation.content.overview.title', 'Content Quality & Safety')}
              </CardTitle>
              <CardDescription>
                {t('tabs.moderation.content.overview.description', 'Ensuring high-quality, authentic, and safe content for our community')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.moderation.content.overview.principles.quality.title', 'Quality Assurance')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.moderation.content.overview.principles.quality.description', 'Maintaining high standards for story content and authenticity')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.moderation.content.overview.principles.community.title', 'Community Safety')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.moderation.content.overview.principles.community.description', 'Creating a safe and respectful environment for all users')}</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">{t('tabs.moderation.content.overview.principles.recognition.title', 'Content Recognition')}</h4>
                  <p className="text-sm text-gray-600">{t('tabs.moderation.content.overview.principles.recognition.description', 'Highlighting exceptional stories and contributions')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.moderation.content.process.title', 'Moderation Process')}</CardTitle>
                <CardDescription>
                  {t('tabs.moderation.content.process.description', 'Our systematic approach to content review and approval')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.moderation.content.process.steps.submission.title', 'Story Submission')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.moderation.content.process.steps.submission.description', 'Authors submit their stories through the platform')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.moderation.content.process.steps.review.title', 'Initial Review')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.moderation.content.process.steps.review.description', 'Automated and manual checks for content guidelines compliance')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.moderation.content.process.steps.verification.title', 'Fact Verification')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.moderation.content.process.steps.verification.description', 'Verification of key claims and achievements mentioned')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h4 className="font-semibold text-sm">{t('tabs.moderation.content.process.steps.approval.title', 'Final Approval')}</h4>
                      <p className="text-xs text-gray-600">{t('tabs.moderation.content.process.steps.approval.description', 'Editorial team approves and publishes the story')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.process.timeline.title', 'Review Timeline')}</div>
                  <div className="text-xs text-gray-600">{t('tabs.moderation.content.process.timeline.description', 'Most stories are reviewed and published within 2-3 business days')}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('tabs.moderation.content.guidelines.title', 'Content Guidelines')}</CardTitle>
                <CardDescription>
                  {t('tabs.moderation.content.guidelines.description', 'Standards and requirements for story submissions')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.guidelines.requirements.authenticity.title', 'Authenticity Required')}</div>
                    <div className="text-xs text-gray-600">{t('tabs.moderation.content.guidelines.requirements.authenticity.description', 'Stories must be genuine personal experiences or verified achievements')}</div>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.guidelines.requirements.respectful.title', 'Respectful Content')}</div>
                    <div className="text-xs text-gray-600">{t('tabs.moderation.content.guidelines.requirements.respectful.description', 'Content must be respectful and appropriate for all audiences')}</div>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.guidelines.requirements.constructive.title', 'Constructive Message')}</div>
                    <div className="text-xs text-gray-600">{t('tabs.moderation.content.guidelines.requirements.constructive.description', 'Stories should inspire, educate, or provide valuable insights')}</div>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.guidelines.requirements.privacy.title', 'Privacy Protection')}</div>
                    <div className="text-xs text-gray-600">{t('tabs.moderation.content.guidelines.requirements.privacy.description', 'Respect privacy of others mentioned in your story')}</div>
                  </div>
                  
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.guidelines.requirements.original.title', 'Original Content')}</div>
                    <div className="text-xs text-gray-600">{t('tabs.moderation.content.guidelines.requirements.original.description', 'Content must be original and not plagiarized from other sources')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('tabs.moderation.content.reporting.title', 'Community Reporting & Support')}</CardTitle>
              <CardDescription>
                {t('tabs.moderation.content.reporting.description', 'How our community helps maintain content quality and safety')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.moderation.content.reporting.mechanisms.title', 'Reporting Mechanisms')}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.reporting.mechanisms.inappropriate.title', 'Report Inappropriate Content')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.reporting.mechanisms.inappropriate.description', 'Flag content that violates community guidelines')}</div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.reporting.mechanisms.misinformation.title', 'Report Misinformation')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.reporting.mechanisms.misinformation.description', 'Help us identify and address false or misleading information')}</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.reporting.mechanisms.harassment.title', 'Report Harassment')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.reporting.mechanisms.harassment.description', 'Report any form of harassment or bullying behavior')}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">{t('tabs.moderation.content.support.title', 'Support Resources')}</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.support.resources.help.title', 'Help Center')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.support.resources.help.description', 'Comprehensive guides and FAQs for content creation')}</div>
                    </div>
                    
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.support.resources.contact.title', 'Contact Moderators')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.support.resources.contact.description', 'Direct communication with our moderation team')}</div>
                    </div>
                    
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">{t('tabs.moderation.content.support.resources.appeal.title', 'Appeal Process')}</div>
                      <div className="text-xs text-gray-600">{t('tabs.moderation.content.support.resources.appeal.description', 'Request review of moderation decisions')}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button>
                  {t('tabs.moderation.content.support.action', 'Contact Support Team')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <LifelongEngagementLayout
      title={t('title', 'Share Success Stories')}
      description={t('description', 'Inspire others by sharing your achievements and learn from the success journeys of fellow Emiratis')}
      icon={<Share2 className="h-6 w-6" />}
      stats={stats}
      tabs={tabs}
      defaultTab="share"
    />
  );
};

export default ShareSuccessStoriesPage;

