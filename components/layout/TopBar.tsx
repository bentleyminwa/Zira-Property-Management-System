'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { mockMessages, mockNotifications, mockUser } from '@/lib/mockData';
import { Bell, Mail, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function TopBar() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, title, isLast };
  });

  return (
    <header className='flex h-16 items-center justify-between border-b border-border bg-card px-6'>
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems.length > 0 && <BreadcrumbSeparator />}
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Profile</DialogTitle>
              <DialogDescription>
                Manage your account settings.
              </DialogDescription>
            </DialogHeader>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-lg'>{mockUser.name}</h3>
                  <p className='text-muted-foreground'>{mockUser.email}</p>
                  <span className='inline-block mt-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
                    {mockUser.role}
                  </span>
                </div>
              </div>
              {/* Placeholder for profile form */}
              <div className='grid gap-2'>
                <label className='text-sm font-medium'>Full Name</label>
                <input
                  type='text'
                  defaultValue={mockUser.name}
                  className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                />
              </div>
              <div className='grid gap-2'>
                <label className='text-sm font-medium'>Email</label>
                <input
                  type='email'
                  defaultValue={mockUser.email}
                  className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                />
              </div>
              <Button className='w-full'>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
