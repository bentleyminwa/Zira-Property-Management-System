'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // We need to check if these exist or create them
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Need to check if this exists
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// We might need to create the Form components if they don't exist.
// Let's assume they don't and I'll need to create them or use standard HTML for now
// to avoid a massive context switch.
// Wait, the user has shadcn/ui. I should check if 'form' component exists.
// I'll check the file structure first.

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      message: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .object({
      website: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .optional()
        .or(z.literal('')),
      twitter: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .optional()
        .or(z.literal('')),
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: {
    website: 'https://shadcn.com',
    twitter: 'https://twitter.com/shadcn',
  },
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>
          This is how others will see you on the site.
        </p>
      </div>
      <div className='space-y-8'>
        {/* Since I'm not sure if the Form components exist, I'll use standard HTML/Tailwind for now 
              to ensure it works, then I can refactor to use the shadcn Form if I verify it exists.
              Actually, let's check if components/ui/form.tsx exists.
          */}
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Username
            </label>
            <Input placeholder='shadcn' {...form.register('username')} />
            {form.formState.errors.username && (
              <p className='text-sm font-medium text-destructive'>
                {form.formState.errors.username.message}
              </p>
            )}
            <p className='text-sm text-muted-foreground'>
              This is your public display name.
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Email
            </label>
            <Input placeholder='m@example.com' {...form.register('email')} />
            {form.formState.errors.email && (
              <p className='text-sm font-medium text-destructive'>
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Bio
            </label>
            <textarea
              className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder='Tell us a little bit about yourself'
              {...form.register('bio')}
            />
            {form.formState.errors.bio && (
              <p className='text-sm font-medium text-destructive'>
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              URLs
            </label>
            <div className='space-y-2'>
              <Input
                placeholder='https://example.com'
                {...form.register('urls.website')}
              />
              <Input
                placeholder='https://twitter.com/johndoe'
                {...form.register('urls.twitter')}
              />
            </div>
          </div>

          <Button type='submit'>Update profile</Button>
        </form>
      </div>
    </div>
  );
}
