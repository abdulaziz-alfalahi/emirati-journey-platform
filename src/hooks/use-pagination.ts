
import { useState } from 'react';

export interface PaginationConfig {
  pageSize?: number;
  initialPage?: number;
}

export interface PaginationReturn {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  getTotalPages: (totalCount: number) => number;
  hasNextPage: (totalCount: number) => boolean;
  hasPreviousPage: () => boolean;
  getOffset: () => number;
}

export const usePagination = (config: PaginationConfig = {}): PaginationReturn => {
  const { pageSize: initialPageSize = 10, initialPage = 1 } = config;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const getTotalPages = (totalCount: number) => {
    return Math.ceil(totalCount / pageSize);
  };

  const hasNextPage = (totalCount: number) => {
    return currentPage < getTotalPages(totalCount);
  };

  const hasPreviousPage = () => {
    return currentPage > 1;
  };

  const getOffset = () => {
    return (currentPage - 1) * pageSize;
  };

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    getTotalPages,
    hasNextPage,
    hasPreviousPage,
    getOffset
  };
};
