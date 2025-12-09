import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import CheckinModal from "@/components/CheckinModal";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "바다동료 Sea-Mate | 어민 안전 커뮤니티",
  description: "어민 상호 안전망 커뮤니티 플랫폼 - 실시간 위험정보 공유, 동료 안전망, SOS 긴급구조",
  keywords: "어민, 안전, 바다, 해양, 커뮤니티, SOS, 위험정보",
  authors: [{ name: "한국어촌어항공단" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "바다동료",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a365d",
  viewportFit: "cover", // Safe Area 지원
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased safe-area-inset">
        {/* 메인 콘텐츠 영역 */}
        <div className="min-h-screen pb-20">
          {children}
        </div>

        {/* 글로벌 컴포넌트 */}
        <BottomNav />
        <CheckinModal />
        <ToastContainer />

        {/* 접근성: 스킵 네비게이션 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg"
        >
          본문으로 건너뛰기
        </a>
      </body>
    </html>
  );
}
