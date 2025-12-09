'use client';

import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

interface HeaderProps {
  title?: string;
  showNotification?: boolean;
  showSettings?: boolean;
}

export default function Header({
  title = '바다동료',
  showNotification = true,
  showSettings = true,
}: HeaderProps) {
  const { notifications } = useStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-[#1a365d]/90 backdrop-blur-md safe-area-top">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <span className="text-cyan-400">바다</span>
          <span className="text-white">동료</span>
        </h1>

        <div className="flex items-center gap-2">
          {showNotification && (
            <Link
              href="/notifications"
              className="relative p-2 rounded-full hover:bg-white/10 touch-feedback"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </Link>
          )}

          {showSettings && (
            <Link
              href="/settings"
              className="p-2 rounded-full hover:bg-white/10 touch-feedback"
            >
              <Settings size={24} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
