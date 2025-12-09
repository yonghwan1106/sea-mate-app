'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Ship,
  MapPin,
  Heart,
  Award,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Phone
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { trips, riskReports } = useAppStore();

  // 사용자 통계
  const userTrips = trips.filter((t) => t.userId === user?.id);
  const completedTrips = userTrips.filter((t) => t.status === 'completed').length;
  const userReports = riskReports.filter((r) => r.author.id === user?.id).length;

  const menuItems = [
    {
      icon: Bell,
      label: '알림 설정',
      href: '/notifications',
      desc: '체크인, 위험정보 알림',
    },
    {
      icon: Shield,
      label: '비상 연락처',
      href: '/profile/emergency',
      desc: '가족, 해경 연락처',
    },
    {
      icon: Settings,
      label: '앱 설정',
      href: '/profile/settings',
      desc: '언어, 글자 크기',
    },
    {
      icon: HelpCircle,
      label: '도움말',
      href: '/profile/help',
      desc: '사용법, FAQ',
    },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="touch-target">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-navy-500">내 정보</h1>
      </div>

      {/* 프로필 카드 */}
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-500">{user.name}</h2>
            <p className="text-gray-500">{user.age}세 · {user.role === 'fisher' ? '어민' : '가족'}</p>
            <div className="flex items-center gap-1 text-primary-500 mt-1">
              <Award size={16} />
              <span className="font-medium">{user.points.toLocaleString()}P</span>
            </div>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">소속 항구</p>
              <p className="font-medium text-navy-500">{user.harbor.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Ship size={18} className="text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">선박</p>
              <p className="font-medium text-navy-500">
                {user.vessel.name} ({user.vessel.type})
              </p>
            </div>
          </div>
          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">연락처</p>
                <p className="font-medium text-navy-500">{user.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 건강 정보 */}
      {user.healthConditions && user.healthConditions.length > 0 && (
        <div className="card mb-6">
          <h3 className="font-semibold text-navy-500 mb-3 flex items-center gap-2">
            <Heart size={18} className="text-danger-500" />
            건강 정보
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.healthConditions.map((condition, index) => (
              <span
                key={index}
                className="badge bg-danger-100 text-danger-700"
              >
                {condition}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * 응급 상황 시 구조대에 전달됩니다
          </p>
        </div>
      )}

      {/* 활동 통계 */}
      <div className="card mb-6">
        <h3 className="font-semibold text-navy-500 mb-4">활동 통계</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-500">{completedTrips}</p>
            <p className="text-sm text-gray-500">출항 완료</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning-500">{userReports}</p>
            <p className="text-sm text-gray-500">위험정보 공유</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary-500">
              {Math.floor((user.points || 0) / 500) + 1}
            </p>
            <p className="text-sm text-gray-500">안전 레벨</p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="card-hover flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-navy-500">{item.label}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          );
        })}
      </div>

      {/* 관리자 모드 링크 */}
      <Link
        href="/admin"
        className="block mt-6 text-center text-gray-400 hover:text-primary-500 transition-colors"
      >
        관리자 모드로 전환
      </Link>

      {/* 앱 정보 */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>바다동료 v1.0.0 (데모)</p>
        <p className="mt-1">© 2024 Sea-Mate Team</p>
      </div>
    </div>
  );
}
