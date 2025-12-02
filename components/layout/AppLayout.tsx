'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='flex min-h-screen'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <TopBar />
        <div className='p-8'>{children}</div>
      </main>
    </div>
  );
}
