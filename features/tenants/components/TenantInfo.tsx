import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tenant } from '@prisma/client';
import { format } from 'date-fns';
import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react';

interface TenantInfoProps {
  tenant: Tenant;
}

export function TenantInfo({ tenant }: TenantInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Tenant Information
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${tenant.firstName}+${tenant.lastName}&background=random`}
              alt={`${tenant.firstName} ${tenant.lastName}`}
            />
            <AvatarFallback>
              {tenant.firstName[0]}
              {tenant.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-2xl font-bold'>
              {tenant.firstName} {tenant.lastName}
            </h3>
            <p className='text-sm text-muted-foreground'>
              Tenant since {format(new Date(tenant.createdAt), 'MMMM yyyy')}
            </p>
          </div>
        </div>

        <div className='grid gap-4'>
          <div className='flex items-center gap-3'>
            <Mail className='h-4 w-4 text-muted-foreground' />
            <a
              href={`mailto:${tenant.email}`}
              className='text-sm hover:underline'
            >
              {tenant.email}
            </a>
          </div>

          {tenant.phone && (
            <div className='flex items-center gap-3'>
              <Phone className='h-4 w-4 text-muted-foreground' />
              <a
                href={`tel:${tenant.phone}`}
                className='text-sm hover:underline'
              >
                {tenant.phone}
              </a>
            </div>
          )}

          {tenant.idNumber && (
            <div className='flex items-center gap-3'>
              <div className='flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-bold text-muted-foreground'>
                ID
              </div>
              <span className='text-sm'>{tenant.idNumber}</span>
            </div>
          )}

          <div className='flex items-center gap-3'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>
              Account created on{' '}
              {format(new Date(tenant.createdAt), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
