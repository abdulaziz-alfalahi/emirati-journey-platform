
import { useState } from 'react';

interface PaginationOptions {
  pageSize: number;
  initialPage?: number;
}

export const usePagination = (options: PaginationOptions) => {
  const { pageSize, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / pageSize);
  };

  const hasNextPage = (totalItems: number) => {
    return currentPage < getTotalPages(totalItems);
  };

  const hasPreviousPage = () => {
    return currentPage > 1;
  };

  const goToNextPage = (totalItems: number) => {
    if (hasNextPage(totalItems)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage()) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    getTotalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage
  };
};
