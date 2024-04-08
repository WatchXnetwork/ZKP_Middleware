'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { useUserStore } from '@/stores/user.store';

const accountFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: 'First name must be at least 2 characters.',
    })
    .max(30, {
      message: 'First name must not be longer than 30 characters.',
    }),
  last_name: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Last name must not be longer than 30 characters.',
    }),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.

export function AccountForm() {
  const { toast } = useToast();
  const { wallet, signTransaction, publicKey } = useWallet();

  const { user, setUser } = useUserStore();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: user,
  });

  async function onFormSubmit(data: AccountFormValues) {
    if (!wallet || !signTransaction) {
      toast({
        title: 'Access denied',
        description: (
          <div className='bg-red-100 border border-red-500 text-red-700 p-4 rounded-lg'>
            <p>You should connect your wallet</p>
          </div>
        ),
      });
      return;
    }
    setUser({
      ...data,
      wallet_id: publicKey?.toBase58(),
    });
    toast({
      title: 'Data saved',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-8'>
        <div className='flex items-center justify-start w-full'>
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem className='gap-2'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='last_name'
            render={({ field }) => (
              <FormItem className='ml-10'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Update account</Button>
      </form>
    </Form>
  );
}
