'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import {
  weatherInfo,
  getRiskTypeIcon,
  getSeverityColor,
  getActiveTrips,
} from '@/data/mockDatabase';
import {
  Mic,
  AlertTriangle,
  Ship,
  Users,
  TrendingUp,
  ChevronRight,
  Waves,
  Wind,
  ThermometerSun,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function HomePage() {
  const { user, currentTrip, riskReports: storeRiskReports } = useStore();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const activeTrips = getActiveTrips();
  const recentRisks = storeRiskReports.filter(r => r.isActive).slice(0, 3);

  const getSafetyLevelStyle = (level: string) => {
    switch (level) {
      case 'safe': return { bg: 'bg-green-500', text: '양호', emoji: '🟢' };
      case 'caution': return { bg: 'bg-yellow-500', text: '주의', emoji: '🟡' };
      case 'warning': return { bg: 'bg-orange-500', text: '경고', emoji: '🟠' };
      case 'danger': return { bg: 'bg-red-500', text: '위험', emoji: '🔴' };
      default: return { bg: 'bg-gray-500', text: '확인중', emoji: '⚪' };
    }
  };

  const safetyStyle = getSafetyLevelStyle(weatherInfo.safetyLevel);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* 오늘의 안전등급 */}
        <section className="safety-card p-6">
          <h2 className="text-sm text-gray-400 mb-2">오늘의 안전등급</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{safetyStyle.emoji}</span>
              <div>
                <p className="text-3xl font-bold">{safetyStyle.text}</p>
                <p className="text-sm text-gray-400">
                  {user?.harborName || '통영 강구항'}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-300">
              <p className="flex items-center gap-1 justify-end">
                <Waves size={16} /> 파고 {weatherInfo.waveHeight}m
              </p>
              <p className="flex items-center gap-1 justify-end">
                <Wind size={16} /> 바람 {weatherInfo.windSpeed}m/s
              </p>
              <p className="flex items-center gap-1 justify-end">
                <ThermometerSun size={16} /> {weatherInfo.temperature}°C
              </p>
            </div>
          </div>
        </section>

        {/* 현재 출항 상태 (출항 중인 경우) */}
        {currentTrip && (
          <section className="glass-card p-4 border-2 border-cyan-500/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-cyan-400 flex items-center gap-2">
                <Ship size={20} /> 현재 조업 중
              </h3>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                {currentTrip.status === 'fishing' ? '조업 중' : '항해 중'}
              </span>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>목적지: {currentTrip.destination.name}</p>
              <p>예상 귀항: {new Date(currentTrip.expectedReturn).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</p>
              <p>동료: {currentTrip.buddyName || '미배정'}</p>
              <p>체크인: {currentTrip.checkins.length}회 완료</p>
            </div>
            <Link
              href="/trip"
              className="mt-3 block text-center text-cyan-400 text-sm"
            >
              상세보기 →
            </Link>
          </section>
        )}

        {/* 빠른 메뉴 */}
        <section className="grid grid-cols-2 gap-3">
          {/* 위험공유 버튼 */}
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`btn-large flex flex-col items-center justify-center gap-2 ${
              isVoiceActive
                ? 'bg-orange-500 voice-indicator'
                : 'bg-gradient-to-br from-orange-500 to-orange-600'
            }`}
          >
            <Mic size={32} />
            <span>위험공유</span>
          </button>

          {/* SOS 버튼 */}
          <Link
            href="/sos"
            className="btn-large bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-center gap-2"
          >
            <AlertTriangle size={32} />
            <span>SOS</span>
          </Link>

          {/* 출항등록 버튼 */}
          <Link
            href="/trip"
            className="btn-large bg-gradient-to-br from-cyan-500 to-cyan-600 flex flex-col items-center justify-center gap-2"
          >
            <Ship size={32} />
            <span>출항등록</span>
          </Link>

          {/* 동료현황 버튼 */}
          <Link
            href="/buddy"
            className="btn-large bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col items-center justify-center gap-2"
          >
            <Users size={32} />
            <span>동료현황</span>
          </Link>
        </section>

        {/* 음성 입력 모달 */}
        {isVoiceActive && (
          <section className="glass-card p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center voice-indicator">
              <Mic size={48} className="text-orange-400" />
            </div>
            <p className="text-lg font-bold mb-2">듣고 있습니다...</p>
            <p className="text-sm text-gray-400 mb-4">
              위험 상황을 말씀해 주세요
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsVoiceActive(false);
                  alert('음성 인식 완료: "동쪽 해역 파도 높아요"\n\n→ 커뮤니티에 공유됩니다.');
                }}
                className="flex-1 py-3 bg-orange-500 rounded-xl font-bold"
              >
                공유하기
              </button>
              <button
                onClick={() => setIsVoiceActive(false)}
                className="flex-1 py-3 bg-gray-600 rounded-xl"
              >
                취소
              </button>
            </div>
          </section>
        )}

        {/* 우리 어항 소식 */}
        <section className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              📍 우리 어항 소식
            </h3>
            <Link href="/community" className="text-cyan-400 text-sm flex items-center">
              더보기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRisks.map((risk) => (
              <div key={risk.id} className="flex items-start gap-3 list-item">
                <span className="text-2xl">{getRiskTypeIcon(risk.type)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{risk.userName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getSeverityColor(risk.severity)}`}>
                      {risk.severity === 'critical' ? '위험' : risk.severity === 'high' ? '높음' : risk.severity === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{risk.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(risk.createdAt), { addSuffix: true, locale: ko })}
                    {' · '}
                    좋아요 {risk.likes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 현재 출항 중인 동료들 */}
        <section className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Ship size={20} className="text-cyan-400" />
              출항 중인 동료
            </h3>
            <span className="text-sm text-cyan-400">{activeTrips.length}명</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {activeTrips.slice(0, 5).map((trip) => (
              <div
                key={trip.id}
                className="flex-shrink-0 w-20 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-bold">
                  {trip.userName.charAt(0)}
                </div>
                <p className="text-sm mt-2 truncate">{trip.userName}</p>
                <p className="text-xs text-gray-400">
                  {trip.status === 'fishing' ? '조업중' : trip.status === 'returning' ? '귀항중' : '항해중'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 포인트 현황 */}
        <section className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">내 안전 포인트</p>
              <p className="text-2xl font-bold text-yellow-400">
                {user?.points.toLocaleString() || 0}P
              </p>
            </div>
            <Link
              href="/mypage"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
            >
              <TrendingUp size={16} />
              상세보기
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 text-center text-sm">
            <div>
              <p className="text-gray-400">총 출항</p>
              <p className="font-bold">{user?.totalTrips || 0}회</p>
            </div>
            <div>
              <p className="text-gray-400">무사고</p>
              <p className="font-bold text-green-400">{user?.safeTrips || 0}회</p>
            </div>
            <div>
              <p className="text-gray-400">안전율</p>
              <p className="font-bold text-cyan-400">
                {user ? ((user.safeTrips / user.totalTrips) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </section>

        {/* AI 안전 비서 메시지 */}
        <section className="glass-card p-4 border border-cyan-500/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              🤖
            </div>
            <div>
              <p className="font-bold text-cyan-400 mb-1">AI 안전 비서</p>
              <p className="text-sm text-gray-300">
                {user?.name}님, 오늘 {user?.harborName} 날씨는 양호합니다.
                {currentTrip
                  ? ` 다음 체크인까지 약 2시간 남았습니다.`
                  : ' 안전한 조업 되세요! 출항 전 장비 점검 잊지 마세요.'}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
