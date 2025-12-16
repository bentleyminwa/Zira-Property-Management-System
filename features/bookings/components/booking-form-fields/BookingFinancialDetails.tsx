import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BookingFormData } from '../../types/schemas';

interface BookingFinancialDetailsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export function BookingFinancialDetails({
  register,
  errors,
}: BookingFinancialDetailsProps) {
  return (
    <>
      {/* Total Price Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='totalPrice' className='text-right pt-2'>
          Total Price <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Input
            id='totalPrice'
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register('totalPrice', { valueAsNumber: true })}
            className={errors.totalPrice ? 'border-destructive' : ''}
          />
          <FormError message={errors.totalPrice?.message} />
        </div>
      </div>

      {/* Deposit Amount Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='depositAmount' className='text-right pt-2'>
          Deposit Amount
        </Label>
        <div className='col-span-3'>
          <Input
            id='depositAmount'
            type='number'
            step='0.01'
            placeholder='0.00'
            {...register('depositAmount', { valueAsNumber: true })}
            className={errors.depositAmount ? 'border-destructive' : ''}
          />
          <FormError message={errors.depositAmount?.message} />
        </div>
      </div>

      {/* Notes Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='notes' className='text-right pt-2'>
          Notes
        </Label>
        <div className='col-span-3'>
          <Textarea
            id='notes'
            placeholder='Any additional notes...'
            rows={3}
            {...register('notes')}
            className={errors.notes ? 'border-destructive' : ''}
          />
          <FormError message={errors.notes?.message} />
        </div>
      </div>
    </>
  );
}
