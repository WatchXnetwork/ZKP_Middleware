import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';

import PrivateDataTable from '@/app/(app)/dashboard/private-data/components/data-table';
import PrivateDataFileInput from '@/app/(app)/dashboard/private-data/components/private-data-file-input';

export const metadata: Metadata = {
  title: 'Input Data',
  description: 'Insert input data',
};

// Simulate a database read for tasks.

export default async function PrivateDataPage() {
  return (
    <div className='space-y-6 lg:max-w-full'>
      <div>
        <h3 className='text-lg font-medium mb-4'>Data</h3>
        {/* <p className='text-sm text-muted-foreground'>Manage app data</p> */}
        <PrivateDataFileInput />
      </div>
      <Separator />
      <PrivateDataTable />
    </div>
  );
}
