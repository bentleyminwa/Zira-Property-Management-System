'use client';

import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const notificationsFormSchema = z.object({
  communication_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(true).optional(),
  security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};

export function NotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Notifications</h3>
        <p className='text-sm text-muted-foreground'>
          Configure how you receive notifications.
        </p>
      </div>
      <div className='space-y-8'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div>
            <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
            <div className='space-y-4'>
              <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...form.register('communication_emails')}
                />
                <div className='space-y-1 leading-none'>
                  <label className='text-sm font-medium leading-none'>
                    Communication emails
                  </label>
                  <p className='text-sm text-muted-foreground'>
                    Receive emails about your account activity.
                  </p>
                </div>
              </div>
              <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...form.register('marketing_emails')}
                />
                <div className='space-y-1 leading-none'>
                  <label className='text-sm font-medium leading-none'>
                    Marketing emails
                  </label>
                  <p className='text-sm text-muted-foreground'>
                    Receive emails about new products, features, and more.
                  </p>
                </div>
              </div>
              <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...form.register('social_emails')}
                />
                <div className='space-y-1 leading-none'>
                  <label className='text-sm font-medium leading-none'>
                    Social emails
                  </label>
                  <p className='text-sm text-muted-foreground'>
                    Receive emails for friend requests, follows, and more.
                  </p>
                </div>
              </div>
              <div className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  {...form.register('security_emails')}
                  disabled
                />
                <div className='space-y-1 leading-none'>
                  <label className='text-sm font-medium leading-none'>
                    Security emails
                  </label>
                  <p className='text-sm text-muted-foreground'>
                    Receive emails about your account security and activity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button type='submit'>Update notifications</Button>
        </form>
      </div>
    </div>
  );
}
