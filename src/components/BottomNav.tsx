'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Ship, AlertCircle, User } from 'lucide-react';
import { useStore } from '@/store/useStore';

const navItems = [
  { href: '/', icon: Home, label: '홈', ariaLabel: '홈 화면으로 이동' },
  { href: '/community', icon: MessageCircle, label: '커뮤니티', ariaLabel: '위험정보 커뮤니티로 이동' },
  { href: '/trip', icon: Ship, label: '출항', ariaLabel: '출항 관리로 이동' },
  { href: '/sos', icon: AlertCircle, label: 'SOS', ariaLabel: '긴급 SOS 화면으로 이동' },
  { href: '/mypage', icon: User, label: '마이', ariaLabel: '마이페이지로 이동' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { notifications } = useStore();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // 관리자 페이지에서는 숨김
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bottom-nav safe-area-bottom z-40"
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label, ariaLabel }) => {
          const isActive = pathname === href;
          const isSOS = href === '/sos';

          return (
            <Link
              key={href}
              href={href}
              aria-label={`${ariaLabel}${href === '/' && unreadCount > 0 ? `, 읽지 않은 알림 ${unreadCount}개` : ''}`}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-16 h-full touch-feedback relative transition-colors ${
                isSOS ? 'text-red-400' : isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon
                  size={isSOS ? 28 : 24}
                  className={isSOS ? 'animate-pulse' : ''}
                  aria-hidden="true"
                />
                {href === '/' && unreadCount > 0 && (
                  <span
                    className="notification-badge"
                    aria-hidden="true"
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span
                className={`text-xs mt-1 ${isSOS ? 'font-bold' : ''}`}
                aria-hidden="true"
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
