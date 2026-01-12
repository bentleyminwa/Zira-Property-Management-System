'use client';

import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PropertyFormData } from '../../types/schemas';
import { BasicDetails } from './BasicDetails';
import { PropertyClassification } from './PropertyClassification';
import { PropertySpecs } from './PropertySpecs';

interface PropertyFormFieldsProps {
  register: UseFormRegister<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
  defaultType?: string;
  defaultStatus?: string;
  defaultBookingType?: string;
}

export function PropertyFormFields({
  register,
  errors,
  setValue,
  defaultType,
  defaultStatus,
  defaultBookingType,
}: PropertyFormFieldsProps) {
  return (
    <div className='grid gap-4 py-4'>
      <BasicDetails register={register} errors={errors} />

      <PropertyClassification
        setValue={setValue}
        errors={errors}
        defaultType={defaultType}
        defaultStatus={defaultStatus}
        defaultBookingType={defaultBookingType}
      />

      <PropertySpecs register={register} errors={errors} />
    </div>
  );
}
