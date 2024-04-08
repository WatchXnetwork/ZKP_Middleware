'use client';
import CustomWalletMultiButton from '@/components/solana/custom-wallet-multi-button';
import { Tabs } from '@/components/ui/tabs';

import { AccountForm } from '@/app/(app)/dashboard/account/account-form';

export default function DashboardPage() {
  return (
    <div className='hidden flex-col md:flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>Account</h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'></Tabs>
        <div>
          <CustomWalletMultiButton />
        </div>
        <AccountForm />
      </div>
    </div>
  );
}
