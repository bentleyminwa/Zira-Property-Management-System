'use client';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
              {/* Custom Radio Cards */}
              <label className='cursor-pointer'>
                <input
                  type='radio'
                  value='light'
                  className='peer sr-only'
                  {...form.register('theme')}
                />
                <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent peer-checked:border-primary'>
                  <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
                    <div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
                      <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
                      <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                    </div>
                    <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                      <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                      <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                    </div>
                    <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
                      <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                      <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                    </div>
                  </div>
                </div>
                <span className='block w-full p-2 text-center font-normal'>
                  Light
                </span>
              </label>

              <label className='cursor-pointer'>
                <input
                  type='radio'
                  value='dark'
                  className='peer sr-only'
                  {...form.register('theme')}
                />
                <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary'>
                  <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
                    <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                      <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
                      <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                    </div>
                    <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                      <div className='h-4 w-4 rounded-full bg-slate-400' />
                      <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                    </div>
                    <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
                      <div className='h-4 w-4 rounded-full bg-slate-400' />
                      <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                    </div>
                  </div>
                </div>
                <span className='block w-full p-2 text-center font-normal'>
                  Dark
                </span>
              </label>
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
