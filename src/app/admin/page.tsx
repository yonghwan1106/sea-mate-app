'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  statistics, users, harbors, getActiveTrips,
  riskReports, getTripStatusText, getTripStatusColor,
  getRiskTypeIcon, getSeverityColor
} from '@/data/mockDatabase';
import {
  Users, Ship, AlertTriangle, CheckCircle, TrendingDown,
  Clock, MapPin, Activity, Bell, BarChart3, Home
} from 'lucide-react';

export default function AdminPage() {
  const [selectedHarbor, setSelectedHarbor] = useState('all');

  const activeTrips = getActiveTrips();
  const activeRisks = riskReports.filter(r => r.isActive);

  const filteredTrips = selectedHarbor === 'all'
    ? activeTrips
    : activeTrips.filter(t => {
        const user = users.find(u => u.id === t.userId);
        return user?.harborId === selectedHarbor;
      });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 헤더 */}
      <header className="bg-[#1a365d] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">
              <span className="text-cyan-400">바다동료</span> 관제센터
            </h1>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              실시간
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white">
              <Home size={20} />
              앱으로
            </Link>
            <button className="relative p-2 rounded-full hover:bg-white/10">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statistics.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-400">총 가입자</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Ship size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeTrips.length}</p>
                <p className="text-sm text-gray-400">현재 출항</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeRisks.length}</p>
                <p className="text-sm text-gray-400">활성 위험정보</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle size={24} className="text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statistics.sosResolved}</p>
                <p className="text-sm text-gray-400">SOS 해결</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Clock size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statistics.averageResponseTime}분</p>
                <p className="text-sm text-gray-400">평균 대응시간</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <TrendingDown size={24} className="text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">-{statistics.accidentReduction}%</p>
                <p className="text-sm text-gray-400">사고 감소율</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 실시간 출항 현황 */}
          <div className="lg:col-span-2 glass-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Ship size={20} className="text-cyan-400" />
                실시간 출항 현황
              </h2>
              <select
                value={selectedHarbor}
                onChange={(e) => setSelectedHarbor(e.target.value)}
                className="bg-white/10 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">전체 어항</option>
                {harbors.map((harbor) => (
                  <option key={harbor.id} value={harbor.id}>{harbor.name}</option>
                ))}
              </select>
            </div>

            {/* 지도 대체 (실제로는 Mapbox/Google Maps 사용) */}
            <div className="bg-gray-800 rounded-xl h-64 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-900/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Activity size={48} className="text-cyan-400 mx-auto mb-2 animate-pulse" />
                    <p className="text-gray-400">실시간 위치 모니터링</p>
                    <p className="text-sm text-gray-500">{filteredTrips.length}척 출항 중</p>
                  </div>
                </div>

                {/* 가상의 마커들 */}
                {filteredTrips.map((trip, index) => (
                  <div
                    key={trip.id}
                    className="absolute w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"
                    style={{
                      left: `${20 + (index * 15) % 60}%`,
                      top: `${30 + (index * 20) % 40}%`,
                    }}
                    title={trip.userName}
                  />
                ))}
              </div>
            </div>

            {/* 출항 목록 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="text-left py-2 px-2">어민</th>
                    <th className="text-left py-2 px-2">선박</th>
                    <th className="text-left py-2 px-2">목적지</th>
                    <th className="text-left py-2 px-2">상태</th>
                    <th className="text-left py-2 px-2">체크인</th>
                    <th className="text-left py-2 px-2">예상 귀항</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrips.map((trip) => (
                    <tr key={trip.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                            {trip.userName.charAt(0)}
                          </div>
                          <span>{trip.userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{trip.vesselName}</td>
                      <td className="py-3 px-2 text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {trip.destination.name}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getTripStatusColor(trip.status)}`}>
                          {getTripStatusText(trip.status)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span className="text-green-400">{trip.checkins.length}회</span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">
                        {new Date(trip.expectedReturn).toLocaleTimeString('ko-KR', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-4">
            {/* 활성 위험정보 */}
            <div className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-400" />
                활성 위험정보
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {activeRisks.slice(0, 5).map((risk) => (
                  <div key={risk.id} className="p-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{getRiskTypeIcon(risk.type)}</span>
                      <span className="font-medium">{risk.userName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{risk.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {risk.location.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 어항별 현황 */}
            <div className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-purple-400" />
                어항별 현황
              </h3>
              <div className="space-y-3">
                {harbors.slice(0, 5).map((harbor) => {
                  const harborTrips = activeTrips.filter(t => {
                    const user = users.find(u => u.id === t.userId);
                    return user?.harborId === harbor.id;
                  });
                  const percentage = (harborTrips.length / harbor.memberCount) * 100;

                  return (
                    <div key={harbor.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{harbor.name}</span>
                        <span className="text-gray-400">
                          {harborTrips.length}/{harbor.memberCount}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 최근 SOS 알림 */}
            <div className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-red-400">
                <Bell size={20} />
                최근 SOS 알림
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="font-medium">정부산</span>
                    <span className="text-xs text-green-400">해결됨</span>
                  </div>
                  <p className="text-xs text-gray-400">12월 7일 14:23 발생</p>
                  <p className="text-xs text-gray-500">동료 김순득 님이 구조 지원</p>
                </div>
                <p className="text-center text-gray-500 text-sm">
                  현재 활성 SOS 없음
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 통계 */}
        <div className="mt-6 glass-card p-4">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-cyan-400" />
            월간 성과
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-green-400">98.7%</p>
              <p className="text-sm text-gray-400">무사고율</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">1,234</p>
              <p className="text-sm text-gray-400">위험정보 공유</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400">156</p>
              <p className="text-sm text-gray-400">동료 매칭</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">2.3억</p>
              <p className="text-sm text-gray-400">예상 절감액</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
