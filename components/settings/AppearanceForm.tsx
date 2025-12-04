'use client';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ThemeCard } from './ThemeCard';

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark']),
  font: z.enum(['inter', 'manrope', 'system']),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'light',
  font: 'inter',
};

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      ...defaultValues,
      theme,
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    setTheme(data.theme);
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <p className='text-sm text-muted-foreground'>
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div className='space-y-8'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='space-y-2'>
            <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Theme
            </label>
            <div className='grid max-w-md grid-cols-2 gap-8 pt-2'>
              <ThemeCard
                value='light'
                label='Light'
                register={form.register('theme')}
                colors={{
                  container: '',
                  background: 'bg-[#ecedef]',
                  card: 'bg-white',
                  accent: 'bg-[#ecedef]',
                }}
              />
              <ThemeCard
                value='dark'
                label='Dark'
                register={form.register('theme')}
                colors={{
                  container:
                    'bg-popover hover:bg-accent hover:text-accent-foreground',
                  background: 'bg-slate-950',
                  card: 'bg-slate-800',
                  accent: 'bg-slate-400',
                }}
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Select the theme for the dashboard.
            </p>
          </div>

          <Button type='submit'>Update preferences</Button>
        </form>
      </div>
    </div>
  );
}
