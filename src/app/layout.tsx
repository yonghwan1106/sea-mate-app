import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata: Metadata = {
  title: '바다동료 - 어민 안전 커뮤니티',
  description: '어민들의 안전한 조업을 위한 상호 안전망 커뮤니티 플랫폼',
  keywords: ['어민', '안전', '해양', '어촌', '커뮤니티', 'SOS'],
  authors: [{ name: '바다동료 팀' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0066CC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
