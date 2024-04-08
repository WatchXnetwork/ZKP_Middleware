import Link from 'next/link';

import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLElement> & {
  currentPage: string;
};
const navs = [
  {
    id: 'home',
    text: 'Home',
    href: '/',
  },
  {
    id: 'dashboard',
    text: 'Dashboard',
    href: '/dashboard',
  },
];
export function MainNav({ className, currentPage, ...props }: Props) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {navs.map((nav) => (
        <Link
          key={nav.href}
          href={nav.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            nav.id != currentPage ? 'text-muted-foreground' : ''
          }`}
        >
          {nav.text}
        </Link>
      ))}
    </nav>
  );
}
