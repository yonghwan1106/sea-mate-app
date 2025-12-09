'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Header from './Header';
import BottomNav from './BottomNav';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { isLoggedIn, login } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration 완료 체크
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 데모 계정 자동 로그인 (김순득)
  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      login('user-001'); // 김순득 어민 계정으로 자동 로그인
    }
  }, [isHydrated, isLoggedIn, login]);

  // 관리자 페이지 체크
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header isAdmin={isAdminPage} />
      <main className="flex-1 pb-20 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {children}
        </div>
      </main>
      {!isAdminPage && <BottomNav />}
    </div>
  );
}
