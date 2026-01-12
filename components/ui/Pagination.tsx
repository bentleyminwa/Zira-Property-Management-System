'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const pages = getVisiblePages();

  return (
    <nav
      className='flex items-center justify-center space-x-2'
      aria-label='Pagination'
    >
      <Button
        variant='outline'
        size='sm'
        asChild
        disabled={currentPage <= 1}
        className={cn(currentPage <= 1 && 'pointer-events-none opacity-50')}
      >
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className='h-4 w-4 mr-1' />
          Previous
        </Link>
      </Button>

      <div className='hidden sm:flex items-center space-x-2'>
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className='flex h-8 w-8 items-center justify-center text-muted-foreground'
              >
                <MoreHorizontal className='h-4 w-4' />
              </span>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrent ? 'default' : 'outline'}
              size='sm'
              className='h-8 w-8 p-0'
              asChild
            >
              <Link href={createPageURL(page)}>{page}</Link>
            </Button>
          );
        })}
      </div>

      <Button
        variant='outline'
        size='sm'
        asChild
        disabled={currentPage >= totalPages}
        className={cn(
          currentPage >= totalPages && 'pointer-events-none opacity-50'
        )}
      >
        <Link href={createPageURL(currentPage + 1)}>
          Next
          <ChevronRight className='h-4 w-4 ml-1' />
        </Link>
      </Button>
    </nav>
  );
}
