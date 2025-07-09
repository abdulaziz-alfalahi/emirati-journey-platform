import React from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchInput({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  className,
  ...props 
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-8"
        {...props}
      />
    </div>
  );
}