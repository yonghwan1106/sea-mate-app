'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Ship,
  AlertTriangle,
  Phone,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Activity
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { mockUsers } from '@/data/mockUsers';
import { mockHarbors } from '@/data/mockHarbors';
import { formatRelativeTime } from '@/lib/utils';

export default function AdminDashboardPage() {
  const { trips, riskReports } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'monitoring' | 'users'>('overview');

  // 통계 계산
  const totalUsers = mockUsers.filter((u) => u.role === 'fisher').length;
  const activeTrips = trips.filter((t) => t.status === 'sailing');
  const overdueTrips = trips.filter((t) => t.status === 'overdue');
  const recentRisks = riskReports.slice(0, 5);
  const criticalRisks = riskReports.filter((r) => r.severity === 'critical' || r.severity === 'high');

  // 항구별 통계
  const harborStats = mockHarbors.slice(0, 5).map((harbor) => {
    const harborUsers = mockUsers.filter((u) => u.harbor.id === harbor.id);
    const harborTrips = trips.filter((t) => {
      const user = mockUsers.find((u) => u.id === t.userId);
      return user?.harbor.id === harbor.id && t.status === 'sailing';
    });
    return {
      ...harbor,
      userCount: harborUsers.length,
      activeTrips: harborTrips.length,
    };
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 관리자 헤더 */}
      <div className="bg-navy-500 text-white px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="touch-target">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">관리자 대시보드</h1>
              <p className="text-sm opacity-80">바다동료 모니터링 시스템</p>
            </div>
          </div>

          {/* 탭 */}
          <div className="flex gap-2">
            {[
              { value: 'overview', label: '개요' },
              { value: 'monitoring', label: '실시간 모니터링' },
              { value: 'users', label: '사용자 관리' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'bg-white text-navy-500'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 개요 탭 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 핵심 지표 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">등록 어민</p>
                    <p className="text-2xl font-bold text-navy-500">{totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Ship size={20} className="text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">운항 중</p>
                    <p className="text-2xl font-bold text-secondary-600">{activeTrips.length}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-danger-100 rounded-full flex items-center justify-center">
                    <AlertCircle size={20} className="text-danger-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">귀항 지연</p>
                    <p className="text-2xl font-bold text-danger-600">{overdueTrips.length}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                    <AlertTriangle size={20} className="text-warning-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">위험 경고</p>
                    <p className="text-2xl font-bold text-warning-600">{criticalRisks.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 지연 경고 */}
            {overdueTrips.length > 0 && (
              <div className="card border-2 border-danger-300 bg-danger-50">
                <h3 className="font-semibold text-danger-700 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} />
                  귀항 지연 경고 ({overdueTrips.length}건)
                </h3>
                <div className="space-y-3">
                  {overdueTrips.map((trip) => {
                    const user = mockUsers.find((u) => u.id === trip.userId);
                    return (
                      <div key={trip.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-danger-100 rounded-full flex items-center justify-center">
                            <Ship size={18} className="text-danger-600" />
                          </div>
                          <div>
                            <p className="font-medium text-navy-500">{user?.name}</p>
                            <p className="text-sm text-gray-500">
                              {trip.destination}{trip.vessel ? ` · ${trip.vessel.name}` : ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-danger px-3 py-1 text-sm flex items-center gap-1">
                            <Phone size={14} />
                            연락
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 항구별 현황 */}
            <div className="card">
              <h3 className="font-semibold text-navy-500 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-500" />
                항구별 현황
              </h3>
              <div className="space-y-3">
                {harborStats.map((harbor) => (
                  <div key={harbor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-navy-500">{harbor.name}</p>
                      <p className="text-sm text-gray-500">{harbor.region}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-primary-600">{harbor.userCount}</p>
                        <p className="text-gray-400">등록</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-secondary-600">{harbor.activeTrips}</p>
                        <p className="text-gray-400">운항중</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 최근 위험 정보 */}
            <div className="card">
              <h3 className="font-semibold text-navy-500 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-warning-500" />
                최근 위험 정보
              </h3>
              <div className="space-y-3">
                {recentRisks.map((risk) => (
                  <div key={risk.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      risk.severity === 'critical' ? 'bg-danger-500' :
                      risk.severity === 'high' ? 'bg-accent-500' :
                      risk.severity === 'medium' ? 'bg-warning-500' :
                      'bg-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-navy-500">{risk.title}</p>
                      <p className="text-sm text-gray-500">
                        {risk.location.name} · {formatRelativeTime(risk.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 실시간 모니터링 탭 */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-navy-500 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-secondary-500" />
                실시간 운항 현황
              </h3>
              {activeTrips.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  현재 운항 중인 선박이 없습니다
                </div>
              ) : (
                <div className="space-y-3">
                  {activeTrips.map((trip) => {
                    const user = mockUsers.find((u) => u.id === trip.userId);
                    const lastCheckin = trip.checkins[trip.checkins.length - 1];
                    return (
                      <div key={trip.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                              <Ship size={24} className="text-primary-600" />
                            </div>
                            <div>
                              <p className="font-bold text-navy-500">{user?.name}</p>
                              <p className="text-sm text-gray-500">{trip.vessel?.name || '선박 미지정'}</p>
                            </div>
                          </div>
                          <span className="badge badge-primary">운항 중</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">목적지</p>
                            <p className="font-medium">{trip.destination}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">체크인</p>
                            <p className="font-medium">{trip.checkins.length}회</p>
                          </div>
                          <div>
                            <p className="text-gray-500">마지막 체크인</p>
                            <p className="font-medium">
                              {lastCheckin
                                ? formatRelativeTime(lastCheckin.time)
                                : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">예상 귀항</p>
                            <p className="font-medium">
                              {new Date(trip.expectedReturn).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 지도 플레이스홀더 */}
            <div className="card">
              <h3 className="font-semibold text-navy-500 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-primary-500" />
                위치 현황 (지도)
              </h3>
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>지도 뷰 (데모에서는 표시되지 않음)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 사용자 관리 탭 */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-500">등록 어민 목록</h3>
                <span className="badge badge-primary">{totalUsers}명</span>
              </div>
              <div className="space-y-3">
                {mockUsers
                  .filter((u) => u.role === 'fisher')
                  .map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users size={18} className="text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-navy-500">{user.name}</p>
                          <p className="text-sm text-gray-500">
                            {user.harbor.name}{user.vessel ? ` · ${user.vessel.name}` : ''}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-warning-600">{user.points}P</p>
                        <p className="text-xs text-gray-400">{user.age}세</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
