import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { BookingFormData } from '../../types/schemas';

interface BookingTermDetailsProps {
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  defaultType?: 'SHORT_TERM' | 'LONG_TERM';
}

export function BookingTermDetails({
  setValue,
  watch,
  errors,
  defaultType,
}: BookingTermDetailsProps) {
  const dateRange = watch('dateRange');

  return (
    <>
      {/* Type Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='type' className='text-right pt-2'>
          Type <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultType || 'SHORT_TERM'}
            onValueChange={(value) =>
              setValue('type', value as 'SHORT_TERM' | 'LONG_TERM')
            }
          >
            <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='SHORT_TERM'>Short Term</SelectItem>
              <SelectItem value='LONG_TERM'>Long Term</SelectItem>
            </SelectContent>
          </Select>
          <FormError message={errors.type?.message} />
        </div>
      </div>

      {/* Date Range Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label className='text-right pt-2'>
          Dates <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !dateRange?.from && 'text-muted-foreground',
                  (errors.dateRange?.from || errors.dateRange?.to) &&
                    'border-destructive'
                )}
              >
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} -{' '}
                      {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='range'
                selected={dateRange as any}
                onSelect={(value) =>
                  setValue(
                    'dateRange',
                    value || { from: undefined, to: undefined }
                  )
                }
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {(errors.dateRange?.from || errors.dateRange?.to) && (
            <FormError message='Please select a valid date range' />
          )}
        </div>
      </div>
    </>
  );
}
