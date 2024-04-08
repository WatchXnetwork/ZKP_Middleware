'use-client';

import { MainNav } from '@/app/(app)/dashboard/components/main-nav';

export function UserNav() {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <MainNav className='mx-6' currentPage='dashboard' />
        {/* <div className='ml-auto flex items-center space-x-4'>
          <CustomWalletMultiButton />
        </div> */}
      </div>
    </div>
  );
}
