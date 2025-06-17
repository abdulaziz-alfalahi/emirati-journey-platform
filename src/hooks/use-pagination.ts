
import { useState } from 'react';

interface UsePaginationProps {
  pageSize?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  getTotalPages: (totalItems: number) => number;
  getPageItems: <T>(items: T[]) => T[];
}

export const usePagination = ({
  pageSize = 10,
  initialPage = 1
}: UsePaginationProps = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setPageSize] = useState(pageSize);

  const nextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, page));
  };

  const getTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / currentPageSize);
  };

  const getPageItems = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return items.slice(startIndex, endIndex);
  };

  return {
    currentPage,
    pageSize: currentPageSize,
    setCurrentPage,
    setPageSize,
    nextPage,
    previousPage,
    goToPage,
    getTotalPages,
    getPageItems
  };
};
