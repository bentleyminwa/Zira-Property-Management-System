'use client';

import { sidebarItems } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  isCollapsed: boolean;
}

const NavLinks = ({ isCollapsed }: NavLinksProps) => {
  const pathname = usePathname();

  return (
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
            title={isCollapsed ? item.name : ''}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
