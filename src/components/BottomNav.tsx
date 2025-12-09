'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Ship, AlertCircle, User } from 'lucide-react';
import { useStore } from '@/store/useStore';

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/community', icon: MessageCircle, label: '커뮤니티' },
  { href: '/trip', icon: Ship, label: '출항' },
  { href: '/sos', icon: AlertCircle, label: 'SOS' },
  { href: '/mypage', icon: User, label: '마이' },
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
    <nav className="fixed bottom-0 left-0 right-0 bottom-nav safe-area-bottom z-40">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          const isSOS = href === '/sos';

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-16 h-full touch-feedback relative ${
                isSOS ? 'text-red-400' : isActive ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon
                  size={isSOS ? 28 : 24}
                  className={isSOS ? 'animate-pulse' : ''}
                />
                {href === '/' && unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </div>
              <span className={`text-xs mt-1 ${isSOS ? 'font-bold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
