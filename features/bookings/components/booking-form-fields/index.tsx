'use client';

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { BookingFormData } from '../../types/schemas';
import { BookingBasicDetails } from './BookingBasicDetails';
import { BookingFinancialDetails } from './BookingFinancialDetails';
import { BookingTermDetails } from './BookingTermDetails';

interface BookingFormFieldsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  properties: { id: string; name: string; price: number }[];
  tenants: { id: string; firstName: string; lastName: string }[];
  defaultValues?: Partial<BookingFormData>;
}

export function BookingFormFields({
  register,
  errors,
  setValue,
  watch,
  properties,
  tenants,
  defaultValues,
}: BookingFormFieldsProps) {
  return (
    <div className='grid gap-4 py-4'>
      <BookingBasicDetails
        setValue={setValue}
        errors={errors}
        properties={properties}
        tenants={tenants}
        defaultPropertyId={defaultValues?.propertyId}
        defaultTenantId={defaultValues?.tenantId}
      />

      <div className='my-2 border-t' />

      <BookingTermDetails
        setValue={setValue}
        watch={watch}
        errors={errors}
        defaultType={defaultValues?.type}
      />

      <div className='my-2 border-t' />

      <BookingFinancialDetails register={register} errors={errors} />
    </div>
  );
}
