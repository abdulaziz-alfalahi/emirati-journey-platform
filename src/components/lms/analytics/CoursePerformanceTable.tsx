
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUpDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CoursePerformance {
  id: string;
  courseName: string;
  enrollments: number;
  completions: number;
  completionRate: number;
  averageScore: number;
  engagementRate: number;
  dropoffRate: number;
  trend: 'up' | 'down' | 'stable';
}

export const CoursePerformanceTable: React.FC = () => {
  const [sortField, setSortField] = useState<keyof CoursePerformance>('completionRate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const courseData: CoursePerformance[] = [
    {
      id: '1',
      courseName: 'React Fundamentals',
      enrollments: 120,
      completions: 107,
      completionRate: 89,
      averageScore: 85,
      engagementRate: 92,
      dropoffRate: 11,
      trend: 'up'
    },
    {
      id: '2',
      courseName: 'JavaScript Mastery',
      enrollments: 95,
      completions: 72,
      completionRate: 76,
      averageScore: 78,
      engagementRate: 84,
      dropoffRate: 24,
      trend: 'down'
    },
    {
      id: '3',
      courseName: 'UI/UX Design',
      enrollments: 88,
      completions: 72,
      completionRate: 82,
      averageScore: 87,
      engagementRate: 89,
      dropoffRate: 18,
      trend: 'up'
    },
    {
      id: '4',
      courseName: 'Data Analytics',
      enrollments: 110,
      completions: 72,
      completionRate: 65,
      averageScore: 75,
      engagementRate: 78,
      dropoffRate: 35,
      trend: 'stable'
    },
    {
      id: '5',
      courseName: 'Project Management',
      enrollments: 76,
      completions: 69,
      completionRate: 91,
      averageScore: 88,
      engagementRate: 94,
      dropoffRate: 9,
      trend: 'up'
    }
  ];

  const sortedData = [...courseData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: keyof CoursePerformance) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCompletionRateBadge = (rate: number) => {
    if (rate >= 85) return 'default';
    if (rate >= 70) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('enrollments')}
                  className="h-auto p-0 font-semibold"
                >
                  Enrollments
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('completionRate')}
                  className="h-auto p-0 font-semibold"
                >
                  Completion Rate
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('averageScore')}
                  className="h-auto p-0 font-semibold"
                >
                  Avg Score
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('engagementRate')}
                  className="h-auto p-0 font-semibold"
                >
                  Engagement
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.courseName}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.enrollments}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.completions} completed
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Badge variant={getCompletionRateBadge(course.completionRate)}>
                      {course.completionRate}%
                    </Badge>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="font-medium">{course.averageScore}%</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{course.engagementRate}%</div>
                    <div className="text-sm text-red-500">
                      {course.dropoffRate}% dropoff
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(course.trend)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
