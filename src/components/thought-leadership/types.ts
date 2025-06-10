
export interface ThoughtLeadershipContent {
  id: string;
  title: string;
  summary?: string;
  content_type: 'article' | 'research_paper' | 'video' | 'podcast';
  author_name: string;
  author_title?: string;
  author_organization?: string;
  published_date: string;
  tags?: string[];
  full_content_url?: string;
  thumbnail_url?: string;
  view_count: number;
  reading_time_minutes?: number;
  duration_minutes?: number;
  is_featured: boolean;
  status: string;
}
