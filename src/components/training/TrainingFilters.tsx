
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TrainingFilters as TrainingFiltersType } from '@/types/training';

interface TrainingFiltersProps {
  filters: TrainingFiltersType;
  onFiltersChange: (filters: TrainingFiltersType) => void;
  onClearFilters: () => void;
}

export const TrainingFilters: React.FC<TrainingFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const { t } = useTranslation('common');
  const handleFilterChange = (key: keyof TrainingFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('training.filters.title')}
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              {t('training.filters.clear')}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">{t('training.filters.search')}</Label>
          <Input
            id="search"
            placeholder={t('training.filters.searchPlaceholder')}
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>{t('training.filters.category')}</Label>
          <Select 
            value={filters.category || undefined} 
            onValueChange={(value) => handleFilterChange('category', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('training.filters.allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical_skills">{t('training.categories.technicalSkills')}</SelectItem>
              <SelectItem value="trade_skills">{t('training.categories.tradeSkills')}</SelectItem>
              <SelectItem value="service_skills">{t('training.categories.serviceSkills')}</SelectItem>
              <SelectItem value="entrepreneurship_business">{t('training.categories.entrepreneurshipBusiness')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Training Mode */}
        <div className="space-y-2">
          <Label>{t('training.filters.trainingMode')}</Label>
          <Select 
            value={filters.training_mode || undefined} 
            onValueChange={(value) => handleFilterChange('training_mode', value || undefined)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('training.filters.allModes')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_person">{t('training.modes.inPerson')}</SelectItem>
              <SelectItem value="online">{t('training.modes.online')}</SelectItem>
              <SelectItem value="hybrid">{t('training.modes.hybrid')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certification Offered */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="certification"
            checked={filters.certification_offered || false}
            onCheckedChange={(checked) => 
              handleFilterChange('certification_offered', checked ? true : undefined)
            }
          />
          <Label htmlFor="certification" className="text-sm font-normal">
            {t('training.filters.certificationOffered')}
          </Label>
        </div>

        {/* Job Placement Assistance */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="job-placement"
            checked={filters.job_placement_assistance || false}
            onCheckedChange={(checked) => 
              handleFilterChange('job_placement_assistance', checked ? true : undefined)
            }
          />
          <Label htmlFor="job-placement" className="text-sm font-normal">
            {t('training.filters.jobPlacementAssistance')}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};
