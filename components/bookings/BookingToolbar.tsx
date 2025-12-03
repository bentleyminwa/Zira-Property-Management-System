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
import { useDebouncedCallback } from 'use-debounce';

export function BookingToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
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
          placeholder='Search bookings...'
          className='pl-9'
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Select
          defaultValue={searchParams.get('status') || 'ALL'}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className='w-[140px]'>
            <div className='flex items-center gap-2'>
              <SlidersHorizontal className='h-4 w-4' />
              <SelectValue placeholder='Status' />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='ALL'>All Status</SelectItem>
            <SelectItem value='PENDING'>Pending</SelectItem>
            <SelectItem value='CONFIRMED'>Confirmed</SelectItem>
            <SelectItem value='CANCELLED'>Cancelled</SelectItem>
            <SelectItem value='COMPLETED'>Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={searchParams.get('sort') || 'newest'}
          onValueChange={(value) => handleFilterChange('sort', value)}
        >
          <SelectTrigger className='w-[140px]'>
            <SelectValue placeholder='Sort by' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='newest'>Newest</SelectItem>
            <SelectItem value='price_asc'>Price: Low to High</SelectItem>
            <SelectItem value='price_desc'>Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
