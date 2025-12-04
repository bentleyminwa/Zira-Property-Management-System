'use client';

import { createProperty } from '@/app/actions/properties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/Modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AddPropertyModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      await createProperty(formData);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Property
        </Button>
      }
      title='Add Property'
      description="Add a new property to your portfolio. Click save when you're done."
      footerContent={
        <Button type='submit' form='add-property-form' disabled={loading}>
          {loading ? 'Saving...' : 'Save changes'}
        </Button>
      }
    >
      <form id='add-property-form' onSubmit={onSubmit}>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              name='name'
              placeholder='Sunset Villa'
              className='col-span-3'
              required
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='address' className='text-right'>
              Address
            </Label>
            <Input
              id='address'
              name='address'
              placeholder='123 Ocean Dr'
              className='col-span-3'
              required
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='price' className='text-right'>
              Price
            </Label>
            <Input
              id='price'
              name='price'
              type='number'
              placeholder='2500.00'
              className='col-span-3'
              required
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='type' className='text-right'>
              Type
            </Label>
            <Select name='type' defaultValue='APARTMENT'>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='APARTMENT'>Apartment</SelectItem>
                <SelectItem value='HOUSE'>House</SelectItem>
                <SelectItem value='COMMERCIAL'>Commercial</SelectItem>
                <SelectItem value='CONDO'>Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='status' className='text-right'>
              Status
            </Label>
            <Select name='status' defaultValue='AVAILABLE'>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='AVAILABLE'>Available</SelectItem>
                <SelectItem value='RENTED'>Rented</SelectItem>
                <SelectItem value='MAINTENANCE'>Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
