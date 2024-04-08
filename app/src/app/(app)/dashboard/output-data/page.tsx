import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';

import PrivateDataTable from '@/app/(app)/dashboard/output-data/components/data-table';
import DownloadSampleFileButton from '@/app/(app)/dashboard/output-data/components/download-sample-file-button';

export const metadata: Metadata = {
  title: 'Input Data',
  description: 'Insert input data',
};

// Simulate a database read for tasks.

export default async function OutputDataPage() {
  return (
    <div className='space-y-6 lg:max-w-full'>
      <div>
        <h3 className='text-lg font-medium mb-4'>Data</h3>
        {/* <p className='text-sm text-muted-foreground'>Manage app data</p> */}
        <DownloadSampleFileButton />
      </div>
      <Separator />
      <PrivateDataTable />
    </div>
  );
}
