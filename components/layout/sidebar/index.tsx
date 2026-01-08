import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';
import NavLinks from './NavLinks';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
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
          <div className='flex items-center gap-2 font-bold text-xl text-primary'>
            <Logo />
            {!isCollapsed && <span>Zira Homes</span>}
          </div>
          <Button
            size='icon'
            variant='ghost'
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
          </Button>
        </div>

        <NavLinks isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
