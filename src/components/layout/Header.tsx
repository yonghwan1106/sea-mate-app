'use client';

import Link from 'next/link';
import { Bell, User, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { mockUsers } from '@/data/mockUsers';

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin }: HeaderProps) {
  const { user, login } = useAuthStore();
  const { notifications } = useAppStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 데모 계정 전환 가능한 사용자 목록 (어민과 가족만)
  const switchableUsers = mockUsers.filter(
    (u) => u.role === 'fisher' || u.role === 'family'
  ).slice(0, 5);

  const handleUserSwitch = (userId: string) => {
    login(userId);
    setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🚢</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy-500">바다동료</h1>
            {isAdmin && (
              <span className="text-xs text-gray-500">관리자</span>
            )}
          </div>
        </Link>

        {/* 우측 아이콘들 */}
        <div className="flex items-center gap-2">
          {/* 알림 */}
          <Link
            href="/notifications"
            className="relative touch-target text-gray-600 hover:text-primary-500 transition-colors"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          {/* 사용자 프로필 / 데모 계정 전환 */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 touch-target text-gray-600 hover:text-primary-500 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-primary-600" />
              </div>
              <ChevronDown size={16} />
            </button>

            {/* 드롭다운 메뉴 */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                  {/* 현재 사용자 */}
                  {user && (
                    <div className="p-4 bg-primary-50 border-b border-primary-100">
                      <p className="text-sm text-gray-500">현재 데모 계정</p>
                      <p className="font-bold text-navy-500">{user.name}</p>
                      <p className="text-sm text-gray-600">
                        {user.harbor.name} · {user.role === 'fisher' ? '어민' : '가족'}
                      </p>
                    </div>
                  )}

                  {/* 계정 전환 */}
                  <div className="py-2">
                    <p className="px-4 py-2 text-xs text-gray-400 font-medium">
                      다른 데모 계정으로 전환
                    </p>
                    {switchableUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => handleUserSwitch(u.id)}
                        disabled={user?.id === u.id}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                          user?.id === u.id ? 'bg-gray-50 opacity-50' : ''
                        }`}
                      >
                        <div>
                          <p className="font-medium text-navy-500">{u.name}</p>
                          <p className="text-sm text-gray-500">
                            {u.harbor.name} · {u.role === 'fisher' ? '어민' : '가족'}
                          </p>
                        </div>
                        {user?.id === u.id && (
                          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
                            현재
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* 메뉴 링크 */}
                  <div className="border-t border-gray-100 py-2">
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={18} className="inline mr-2" />
                      내 정보
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="inline-block w-[18px] mr-2 text-center">👨‍💼</span>
                      관리자 모드
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
