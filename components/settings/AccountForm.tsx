'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  dob: z.string().optional(),
  language: z.string().min(1, {
    message: 'Please select a language.',
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const defaultValues: Partial<AccountFormValues> = {
  name: '',
  language: 'en',
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <div className='space-y-8'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Name
            </label>
            <Input placeholder='Your name' {...form.register('name')} />
            {form.formState.errors.name && (
              <p className='text-sm font-medium text-destructive'>
                {form.formState.errors.name.message}
              </p>
            )}
            <p className='text-sm text-muted-foreground'>
              This is the name that will be displayed on your profile and in
              emails.
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Date of Birth
            </label>
            <Input type='date' {...form.register('dob')} />
            <p className='text-sm text-muted-foreground'>
              Your date of birth is used to calculate your age.
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Language
            </label>
            {/* Using native select for simplicity as Select component might be complex to integrate without Form wrapper */}
            <select
              className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              {...form.register('language')}
            >
              <option value='en'>English</option>
              <option value='fr'>French</option>
              <option value='de'>German</option>
              <option value='es'>Spanish</option>
            </select>
            <p className='text-sm text-muted-foreground'>
              This is the language that will be used in the dashboard.
            </p>
          </div>

          <Button type='submit'>Update account</Button>
        </form>
      </div>
    </div>
  );
}
