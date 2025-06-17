
import { useState, useEffect, useCallback } from 'react';

export interface DebouncedFiltersReturn<T> {
  debouncedFilters: T;
  batchUpdateFilters: (updates: Partial<T>) => void;
}

export const useDebouncedFilters = <T extends Record<string, any>>(
  initialFilters: T,
  delay: number = 300,
  onFiltersChange?: (filters: T) => void
): DebouncedFiltersReturn<T> => {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState<T>(initialFilters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
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
    batchUpdateFilters
  };
};
