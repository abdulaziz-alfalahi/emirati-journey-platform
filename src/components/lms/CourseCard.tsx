
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import type { Course } from '@/types/lms';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onView?: (courseId: string) => void;
  isEnrolled?: boolean;
  showEnrollButton?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onView,
  isEnrolled = false,
  showEnrollButton = true
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        {course.thumbnail_url && (
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {course.description}
            </CardDescription>
          </div>
          {course.is_featured && (
            <Badge variant="secondary" className="ml-2">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{course.category}</Badge>
          <Badge variant="outline">{course.difficulty_level}</Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {course.duration_hours && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration_hours}h
            </div>
          )}
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            Course
          </div>
        </div>

        {course.price > 0 && (
          <div className="text-lg font-semibold">
            {course.currency} {course.price}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onView?.(course.id)}
          >
            View Details
          </Button>
          {showEnrollButton && !isEnrolled && (
            <Button 
              className="flex-1"
              onClick={() => onEnroll?.(course.id)}
            >
              Enroll Now
            </Button>
          )}
          {isEnrolled && (
            <Button 
              variant="secondary"
              className="flex-1"
              onClick={() => onView?.(course.id)}
            >
              Continue Learning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
