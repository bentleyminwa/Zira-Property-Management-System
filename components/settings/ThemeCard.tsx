import { UseFormRegisterReturn } from 'react-hook-form';

interface ThemeCardProps {
  value: 'light' | 'dark';
  label: string;
  register: UseFormRegisterReturn;
  colors: {
    container: string;
    background: string;
    card: string;
    accent: string;
  };
}

export function ThemeCard({ value, label, register, colors }: ThemeCardProps) {
  return (
    <label className='cursor-pointer'>
      <input
        type='radio'
        value={value}
        className='peer sr-only'
        {...register}
      />
      <div
        className={`items-center rounded-md border-2 border-muted p-1 hover:border-accent peer-checked:border-primary ${colors.container}`}
      >
        <div className={`space-y-2 rounded-sm ${colors.background} p-2`}>
          <div className={`space-y-2 rounded-md ${colors.card} p-2 shadow-sm`}>
            <div className={`h-2 w-[80px] rounded-lg ${colors.accent}`} />
            <div className={`h-2 w-[100px] rounded-lg ${colors.accent}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${colors.card} p-2 shadow-sm`}
          >
            <div className={`h-4 w-4 rounded-full ${colors.accent}`} />
            <div className={`h-2 w-[100px] rounded-lg ${colors.accent}`} />
          </div>
          <div
            className={`flex items-center space-x-2 rounded-md ${colors.card} p-2 shadow-sm`}
          >
            <div className={`h-4 w-4 rounded-full ${colors.accent}`} />
            <div className={`h-2 w-[100px] rounded-lg ${colors.accent}`} />
          </div>
        </div>
      </div>
      <span className='block w-full p-2 text-center font-normal'>{label}</span>
    </label>
  );
}
