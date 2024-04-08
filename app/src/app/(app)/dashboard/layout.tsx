import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';

import { SidebarNav } from '@/app/(app)/dashboard/components/sidebar-nav';
import { UserNav } from '@/app/(app)/dashboard/components/user-nav';
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

const sidebarNavItems = [
  {
    title: 'Account',
    href: '/dashboard',
  },
  {
    title: 'Input Data',
    href: '/dashboard/private-data',
  },
  {
    title: 'Output Data',
    href: '/dashboard/output-data',
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <UserNav />
      <div className='hidden space-y-6 p-10 pb-16 md:block'>
        <div className='space-y-0.5'>
          <h2 className='text-4xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your data and account settings
          </p>
        </div>

        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-full'>{children}</div>
        </div>
      </div>
    </>
  );
}
