'use client';

import { Bell, Settings, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

interface HeaderProps {
  title?: string;
  showNotification?: boolean;
  showSettings?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({
  title = '바다동료',
  showNotification = true,
  showSettings = true,
  showBack = false,
  onBack,
}: HeaderProps) {
  const router = useRouter();
  const { notifications } = useStore();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      className="sticky top-0 z-30 bg-[#1a365d]/90 backdrop-blur-md safe-area-top"
      role="banner"
    >
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        {/* 왼쪽: 뒤로가기 또는 로고 */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 touch-feedback transition-colors"
              aria-label="뒤로 가기"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          ) : null}

          <h1 className="text-xl font-bold">
            {title === '바다동료' ? (
              <>
                <span className="text-cyan-400">바다</span>
                <span className="text-white">동료</span>
              </>
            ) : (
              <span className="text-white">{title}</span>
            )}
          </h1>
        </div>

        {/* 오른쪽: 알림 및 설정 */}
        <div className="flex items-center gap-1" role="group" aria-label="헤더 메뉴">
          {showNotification && (
            <Link
              href="/notifications"
              className="relative p-2 rounded-full hover:bg-white/10 touch-feedback transition-colors"
              aria-label={`알림${unreadCount > 0 ? `, 읽지 않은 알림 ${unreadCount}개` : ''}`}
            >
              <Bell size={24} aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="notification-badge" aria-hidden="true">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          )}

          {showSettings && (
            <Link
              href="/settings"
              className="p-2 rounded-full hover:bg-white/10 touch-feedback transition-colors"
              aria-label="설정"
            >
              <Settings size={24} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
