
import { useState, useEffect, useCallback } from 'react';

export interface DebouncedFiltersReturn<T> {
  debouncedFilters: T;
  batchUpdateFilters: (updates: Partial<T>) => void;
  isUpdating: boolean;
}

export const useDebouncedFilters = <T extends Record<string, any>>(
  initialFilters: T,
  delay: number = 300,
  onFiltersChange?: (filters: T) => void
): DebouncedFiltersReturn<T> => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<T>(initialFilters);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
      setIsUpdating(false);
      if (onFiltersChange) {
        onFiltersChange(filters);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [filters, delay, onFiltersChange]);

  const batchUpdateFilters = useCallback((updates: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    debouncedFilters,
    batchUpdateFilters,
    isUpdating
  };
};
