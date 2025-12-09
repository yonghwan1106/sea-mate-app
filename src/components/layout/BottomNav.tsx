'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, AlertTriangle, Ship, Users, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/appStore';

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
  const { notifications } = useAppStore();

  // 읽지 않은 알림 수
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 pb-safe-bottom"
      aria-label="메인 네비게이션"
      role="navigation"
    >
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
                  className="relative -mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2 rounded-full"
                  aria-label={`${item.label} 긴급 버튼`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="w-16 h-16 bg-danger-500 rounded-full flex items-center justify-center shadow-lg hover:bg-danger-600 active:scale-95 transition-all">
                    <Icon size={28} className="text-white" aria-hidden="true" />
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
                  'nav-item flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg relative',
                  isActive && 'active'
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
              >
                <Icon
                  size={24}
                  className={cn(
                    'mb-1 transition-colors',
                    isActive ? 'text-primary-500' : 'text-gray-400'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'text-xs font-medium transition-colors',
                    isActive ? 'text-primary-500' : 'text-gray-500'
                  )}
                >
                  {item.label}
                </span>
                {/* 홈 아이콘에 알림 배지 표시 */}
                {item.href === '/' && unreadCount > 0 && (
                  <span
                    className="absolute -top-1 right-1/4 w-5 h-5 bg-danger-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    aria-label={`${unreadCount}개의 읽지 않은 알림`}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
