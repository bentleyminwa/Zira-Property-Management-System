import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Edit, FileText } from 'lucide-react';

export function BookingQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        <Button className='w-full'>
          <CreditCard className='mr-2 h-4 w-4' />
          Add Payment
        </Button>
        <Button variant='outline' className='w-full'>
          <Edit className='mr-2 h-4 w-4' />
          Update Status
        </Button>
        <Button variant='outline' className='w-full'>
          <FileText className='mr-2 h-4 w-4' />
          Generate Invoice
        </Button>
      </CardContent>
    </Card>
  );
}
