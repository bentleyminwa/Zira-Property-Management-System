import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tenant } from '@prisma/client';
import { Mail, Phone, User } from 'lucide-react';

interface BookingTenantCardProps {
  tenant: Tenant;
}

export function BookingTenantCard({ tenant }: BookingTenantCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Tenant Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div>
            <p className='text-sm font-medium text-muted-foreground'>
              Full Name
            </p>
            <p className='text-lg font-semibold'>
              {tenant.firstName} {tenant.lastName}
            </p>
          </div>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div>
              <p className='text-sm font-medium text-muted-foreground flex items-center gap-1'>
                <Mail className='h-3.5 w-3.5' />
                Email
              </p>
              <p className='text-sm'>{tenant.email}</p>
            </div>
            {tenant.phone && (
              <div>
                <p className='text-sm font-medium text-muted-foreground flex items-center gap-1'>
                  <Phone className='h-3.5 w-3.5' />
                  Phone
                </p>
                <p className='text-sm'>{tenant.phone}</p>
              </div>
            )}
          </div>
          {tenant.idNumber && (
            <div>
              <p className='text-sm font-medium text-muted-foreground'>
                ID Number
              </p>
              <p className='text-sm font-mono'>{tenant.idNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
