'use client';

import { useEffect } from 'react';
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

  // 데모 계정 자동 로그인 (김순득)
  useEffect(() => {
    if (!isLoggedIn) {
      login('user-001'); // 김순득 어민 계정으로 자동 로그인
    }
  }, [isLoggedIn, login]);

  // 관리자 페이지 체크
  const isAdminPage = pathname.startsWith('/admin');

  // SOS 페이지는 전체 화면
  const isSOSPage = pathname === '/sos';

  if (isSOSPage) {
    return <>{children}</>;
  }

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
