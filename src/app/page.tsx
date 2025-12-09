'use client';

import Link from 'next/link';
import {
  AlertTriangle,
  Ship,
  Users,
  Phone,
  Cloud,
  Award,
  ChevronRight,
  MapPin,
  Wind,
  Waves,
  Thermometer
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { getWeatherByHarbor } from '@/data/mockWeather';
import { formatRelativeTime, getSafetyLevelText } from '@/lib/utils';

export default function HomePage() {
  const { user } = useAuthStore();
  const { riskReports, trips } = useAppStore();

  // 현재 사용자 항구의 날씨
  const weather = user ? getWeatherByHarbor(user.harbor.id) : null;

  // 최근 위험정보 (상위 3개)
  const recentRisks = riskReports.slice(0, 3);

  // 진행 중인 출항
  const activeTrips = trips.filter((t) => t.status === 'sailing');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* 인사말 & 현재 위치 */}
      <section>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-500">
              안녕하세요, {user.name}님
            </h2>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <MapPin size={16} />
              <span>{user.harbor.name}</span>
            </div>
          </div>
          <Link href="/points" className="flex items-center gap-1 bg-warning-100 text-warning-700 px-3 py-2 rounded-xl">
            <Award size={18} />
            <span className="font-bold">{user.points.toLocaleString()}P</span>
          </Link>
        </div>
      </section>

      {/* 현재 날씨 카드 */}
      {weather && (
        <section className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">오늘의 날씨</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              weather.safetyLevel === 'good' ? 'bg-secondary-500' :
              weather.safetyLevel === 'caution' ? 'bg-warning-500' :
              weather.safetyLevel === 'warning' ? 'bg-accent-500' :
              'bg-danger-500'
            }`}>
              {getSafetyLevelText(weather.safetyLevel)}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <Thermometer size={24} className="mx-auto mb-1 opacity-80" />
              <p className="text-2xl font-bold">{weather.temperature}°</p>
              <p className="text-xs opacity-80">기온</p>
            </div>
            <div>
              <Wind size={24} className="mx-auto mb-1 opacity-80" />
              <p className="text-2xl font-bold">{weather.windSpeed}</p>
              <p className="text-xs opacity-80">m/s</p>
            </div>
            <div>
              <Waves size={24} className="mx-auto mb-1 opacity-80" />
              <p className="text-2xl font-bold">{weather.waveHeight}</p>
              <p className="text-xs opacity-80">m</p>
            </div>
            <div>
              <Cloud size={24} className="mx-auto mb-1 opacity-80" />
              <p className="text-2xl font-bold">{weather.visibility}</p>
              <p className="text-xs opacity-80">km</p>
            </div>
          </div>

          {weather.advisory && (
            <div className="mt-4 bg-white/20 rounded-lg px-3 py-2">
              <p className="text-sm">⚠️ {weather.advisory}</p>
            </div>
          )}
        </section>
      )}

      {/* 빠른 액션 버튼들 */}
      <section>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/risk-reports/new" className="action-btn">
            <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mb-2">
              <AlertTriangle size={24} className="text-warning-600" />
            </div>
            <span className="font-semibold text-navy-500">위험정보 공유</span>
            <span className="text-sm text-gray-500">+100P</span>
          </Link>

          <Link href="/trips/new" className="action-btn">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
              <Ship size={24} className="text-primary-600" />
            </div>
            <span className="font-semibold text-navy-500">출항 등록</span>
            <span className="text-sm text-gray-500">안전 체크인</span>
          </Link>

          <Link href="/buddy" className="action-btn">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-2">
              <Users size={24} className="text-secondary-600" />
            </div>
            <span className="font-semibold text-navy-500">동료 확인</span>
            <span className="text-sm text-gray-500">오늘의 매칭</span>
          </Link>

          <Link href="/sos" className="action-btn border-2 border-danger-200">
            <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center mb-2">
              <Phone size={24} className="text-danger-600" />
            </div>
            <span className="font-semibold text-danger-600">긴급 SOS</span>
            <span className="text-sm text-gray-500">3초 꾹 누르기</span>
          </Link>
        </div>
      </section>

      {/* 진행 중인 출항 */}
      {activeTrips.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-navy-500">진행 중인 출항</h3>
            <Link href="/trips" className="text-primary-500 text-sm flex items-center">
              전체 <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {activeTrips.slice(0, 2).map((trip) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="card-hover flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Ship size={24} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy-500">{trip.destination}</p>
                  <p className="text-sm text-gray-500">
                    {trip.vessel.name} · 체크인 {trip.checkins.length}회
                  </p>
                </div>
                <span className="badge badge-primary">운항 중</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 최근 위험 정보 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-navy-500">최근 위험 정보</h3>
          <Link href="/risk-reports" className="text-primary-500 text-sm flex items-center">
            전체 <ChevronRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentRisks.map((report) => (
            <Link
              key={report.id}
              href={`/risk-reports/${report.id}`}
              className="card-hover"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  report.severity === 'critical' ? 'bg-danger-100' :
                  report.severity === 'high' ? 'bg-accent-100' :
                  report.severity === 'medium' ? 'bg-warning-100' :
                  'bg-gray-100'
                }`}>
                  <AlertTriangle size={20} className={
                    report.severity === 'critical' ? 'text-danger-600' :
                    report.severity === 'high' ? 'text-accent-600' :
                    report.severity === 'medium' ? 'text-warning-600' :
                    'text-gray-600'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-500 truncate">{report.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{report.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{report.author.name}</span>
                    <span>·</span>
                    <span>{formatRelativeTime(report.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 안전 팁 */}
      <section className="card bg-secondary-50 border border-secondary-200">
        <h3 className="font-bold text-secondary-700 mb-2">💡 오늘의 안전 수칙</h3>
        <p className="text-secondary-600">
          출항 전 반드시 기상 정보를 확인하고, 구명조끼를 착용하세요.
          동료와 출항 정보를 공유하면 더 안전합니다.
        </p>
      </section>
    </div>
  );
}
