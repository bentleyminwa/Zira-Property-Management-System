'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarItems } from '@/lib/site-config';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className='flex h-full flex-col'>
        {/* Logo and Toggle */}
        <div
          className={cn(
            'flex items-center border-b border-border transition-all',
            isCollapsed
              ? 'h-auto flex-col justify-center gap-4 py-4'
              : 'h-16 justify-between px-4'
          )}
        >
          {!isCollapsed ? (
            <div className='flex items-center gap-2 font-bold text-xl text-primary'>
              <div className='relative h-8 w-8'>
                <Image
                  src='/logo.svg'
                  alt='Zira PMS'
                  fill
                  className='object-contain'
                />
              </div>
              <span>Zira PMS</span>
            </div>
          ) : (
            <div className='relative h-8 w-8'>
              <Image
                src='/logo.svg'
                alt='Zira PMS'
                fill
                className='object-contain'
              />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              'rounded-lg p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors'
            )}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className='flex-1 space-y-1 p-2 overflow-y-auto'>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed ? 'justify-center px-2' : ''
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (Optional Placeholder) */}
        <div className='border-t border-border p-4'>
          {!isCollapsed ? (
            <div className='flex items-center gap-3'>
              <div className='h-9 w-9 rounded-full bg-muted flex items-center justify-center'>
                <Users size={20} />
              </div>
              <div className='flex flex-col'>
                <span className='text-sm font-medium'>Admin User</span>
                <span className='text-xs text-muted-foreground'>
                  admin@zira.com
                </span>
              </div>
            </div>
          ) : (
            <div className='flex justify-center'>
              <div className='h-9 w-9 rounded-full bg-muted flex items-center justify-center'>
                <Users size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
