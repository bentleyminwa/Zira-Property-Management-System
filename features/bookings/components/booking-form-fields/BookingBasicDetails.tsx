import { FormError } from '@/components/ui/form-error';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { BookingFormData } from '../../types/schemas';

interface BookingBasicDetailsProps {
  setValue: UseFormSetValue<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  properties: { id: string; name: string; price: number }[];
  tenants: { id: string; firstName: string; lastName: string }[];
  defaultPropertyId?: string;
  defaultTenantId?: string;
}

export function BookingBasicDetails({
  setValue,
  errors,
  properties,
  tenants,
  defaultPropertyId,
  defaultTenantId,
}: BookingBasicDetailsProps) {
  return (
    <>
      {/* Property Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='propertyId' className='text-right pt-2'>
          Property <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultPropertyId}
            onValueChange={(value) => setValue('propertyId', value)}
          >
            <SelectTrigger
              className={errors.propertyId ? 'border-destructive' : ''}
            >
              <SelectValue placeholder='Select property' />
            </SelectTrigger>
            <SelectContent>
              {properties.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormError message={errors.propertyId?.message} />
        </div>
      </div>

      {/* Tenant Field */}
      <div className='grid grid-cols-4 items-start gap-4'>
        <Label htmlFor='tenantId' className='text-right pt-2'>
          Tenant <span className='text-destructive'>*</span>
        </Label>
        <div className='col-span-3'>
          <Select
            defaultValue={defaultTenantId}
            onValueChange={(value) => setValue('tenantId', value)}
          >
            <SelectTrigger
              className={errors.tenantId ? 'border-destructive' : ''}
            >
              <SelectValue placeholder='Select tenant' />
            </SelectTrigger>
            <SelectContent>
              {tenants.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.firstName} {t.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormError message={errors.tenantId?.message} />
        </div>
      </div>
    </>
  );
}
