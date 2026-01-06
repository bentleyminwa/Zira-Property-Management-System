import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { mockMessages, mockNotifications } from '@/lib/mockData';
import { UserButton } from '@clerk/nextjs';
import { Bell, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function TopBar() {
  const pathname = usePathname();
  const { overrides } = useBreadcrumb();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;
    // Check if there's a custom override for this segment, otherwise capitalize it
    const title =
      overrides[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, title, isLast };
  });

  return (
    <header className='flex h-16 items-center justify-between border-b border-border bg-card px-6'>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
          {breadcrumbItems.map((item) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!item.isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right Actions */}
      <div className='flex items-center gap-4'>
        {/* Messages */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='icon' className='relative'>
              <Mail size={20} />
              {mockMessages.some((m) => !m.read) && (
                <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500' />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Messages</DialogTitle>
              <DialogDescription>
                You have {mockMessages.filter((m) => !m.read).length} unread
                messages.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              {mockMessages.map((msg) => (
                <div key={msg.id} className='border-b pb-2 last:border-0'>
                  <div className='flex justify-between'>
                    <span className='font-semibold'>{msg.sender}</span>
                    <span className='text-xs text-muted-foreground'>
                      {msg.time}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>{msg.content}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Notifications */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell size={20} />
              {mockNotifications.some((n) => !n.read) && (
                <span className='absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500' />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>Recent activity and alerts.</DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              {mockNotifications.map((notif) => (
                <div key={notif.id} className='border-b pb-2 last:border-0'>
                  <div className='flex justify-between'>
                    <span className='font-semibold'>{notif.title}</span>
                    <span className='text-xs text-muted-foreground'>
                      {notif.time}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {notif.description}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* User Profile */}
        <UserButton afterSignOutUrl='/' />
      </div>
    </header>
  );
}
