/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useWallet } from '@solana/wallet-adapter-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function DownloadSampleFileButton() {
  const { wallet } = useWallet();
  const { toast } = useToast();
  if (!wallet) {
    toast({
      title: 'Access denied',
      description: (
        <div className='bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg'>
          <p>You should connect your wallet first</p>
        </div>
      ),
    });
  }
  const handleClick = () => {
    // @ts-ignore
    window.location.href = '/samples/input-file.csv';
  };
  return <Button onClick={handleClick}>Download sample file</Button>;
}
