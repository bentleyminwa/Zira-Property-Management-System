'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

interface SortOption {
  label: string;
  value: string;
}

interface DataTableToolbarProps {
  searchKey?: string;
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  sortOptions?: SortOption[];
  children?: ReactNode;
}

export function DataTableToolbar({
  searchKey = 'query',
  searchPlaceholder = 'Search...',
  filterOptions = [],
  sortOptions = [],
  children,
}: DataTableToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(searchKey, term);
    } else {
      params.delete(searchKey);
    }
    router.replace(`?${params.toString()}`);
  }, 500);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'ALL') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-lg border shadow-sm mb-6'>
      <div className='relative flex-1 max-w-sm'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder={searchPlaceholder}
          className='pl-9'
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get(searchKey)?.toString()}
        />
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {filterOptions.map((filter) => (
          <Select
            key={filter.key}
            defaultValue={searchParams.get(filter.key) || 'ALL'}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
          >
            <SelectTrigger className='w-[140px]'>
              <div className='flex items-center gap-2'>
                <SlidersHorizontal className='h-4 w-4' />
                <SelectValue placeholder={filter.label} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {sortOptions.length > 0 && (
          <Select
            defaultValue={searchParams.get('sort') || sortOptions[0].value}
            onValueChange={(value) => handleFilterChange('sort', value)}
          >
            <SelectTrigger className='w-[140px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {children}
      </div>
    </div>
  );
}
