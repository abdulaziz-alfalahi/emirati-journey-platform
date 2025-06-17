
import { useState, useCallback, useRef } from 'react';

export const useDebouncedFilters = <T extends Record<string, any>>(
  initialFilters: T,
  delay: number,
  onFiltersChange: (filters: T) => void
) => {
  const [debouncedFilters, setDebouncedFilters] = useState<T>(initialFilters);
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const batchUpdateFilters = useCallback((updates: Partial<T>) => {
    const newFilters = { ...debouncedFilters, ...updates };
    setDebouncedFilters(newFilters);
    setIsUpdating(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onFiltersChange(newFilters);
      setIsUpdating(false);
    }, delay);
  }, [debouncedFilters, delay, onFiltersChange]);

  return {
    debouncedFilters,
    batchUpdateFilters,
    isUpdating
  };
};
