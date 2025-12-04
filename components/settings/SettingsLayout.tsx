'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const sidebarNavItems = [
  {
    title: 'Profile',
    id: 'profile',
  },
  {
    title: 'Account',
    id: 'account',
  },
  {
    title: 'Appearance',
    id: 'appearance',
  },
  {
    title: 'Notifications',
    id: 'notifications',
  },
];

export function SettingsLayout({
  children,
  activeTab,
  onTabChange,
}: SettingsLayoutProps) {
  return (
    <div className='space-y-6 p-10 pb-16 md:block'>
      <div className='space-y-0.5'>
        <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:ml-0 lg:mr-4 lg:w-1/5'>
          <nav
            className={cn(
              'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1'
            )}
          >
            {sidebarNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'secondary' : 'ghost'}
                className={cn(
                  'justify-start',
                  activeTab === item.id
                    ? 'bg-muted hover:bg-muted'
                    : 'hover:bg-transparent hover:underline'
                )}
                onClick={() => onTabChange(item.id)}
              >
                {item.title}
              </Button>
            ))}
          </nav>
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  );
}
