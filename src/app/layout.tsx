import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import CheckinModal from "@/components/CheckinModal";

export const metadata: Metadata = {
  title: "바다동료 Sea-Mate | 어민 안전 커뮤니티",
  description: "어민 상호 안전망 커뮤니티 플랫폼 - 실시간 위험정보 공유, 동료 안전망, SOS 긴급구조",
  keywords: "어민, 안전, 바다, 해양, 커뮤니티, SOS, 위험정보",
  authors: [{ name: "한국어촌어항공단" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a365d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="min-h-screen pb-20">
          {children}
        </div>
        <BottomNav />
        <CheckinModal />
      </body>
    </html>
  );
}
