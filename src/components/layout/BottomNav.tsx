'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AlertTriangle, Ship, Users, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    icon: Home,
    label: '홈',
  },
  {
    href: '/risk-reports',
    icon: AlertTriangle,
    label: '위험정보',
  },
  {
    href: '/sos',
    icon: Phone,
    label: 'SOS',
    isSpecial: true,
  },
  {
    href: '/trips',
    icon: Ship,
    label: '출항',
  },
  {
    href: '/buddy',
    icon: Users,
    label: '동료',
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isSpecial) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative -mt-6"
                >
                  <div className="w-16 h-16 bg-danger-500 rounded-full flex items-center justify-center shadow-lg hover:bg-danger-600 active:scale-95 transition-all">
                    <Icon size={28} className="text-white" />
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium text-danger-500">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-item flex-1',
                  isActive && 'active'
                )}
              >
                <Icon
                  size={24}
                  className={cn(
                    'mb-1 transition-colors',
                    isActive ? 'text-primary-500' : 'text-gray-400'
                  )}
                />
                <span
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isActive ? 'text-primary-500' : 'text-gray-500'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* 하단 safe area */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
