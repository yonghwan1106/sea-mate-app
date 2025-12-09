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
  getSeverityText,
} from '@/data/mockDatabase';
import {
  Mic,
  AlertTriangle,
  Ship,
  Users,
  ChevronRight,
  Waves,
  Wind,
  Thermometer,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Award,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function HomePage() {
  const { user, currentTrip, riskReports: storeRiskReports } = useStore();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const activeTrips = getActiveTrips();
  const recentRisks = storeRiskReports.filter(r => r.isActive).slice(0, 3);

  // 안전등급 스타일
  const getSafetyLevelStyle = (level: string) => {
    switch (level) {
      case 'safe': return {
        bg: 'bg-green-500',
        bgLight: 'bg-green-500/20',
        text: '양호',
        textColor: 'text-green-400',
        icon: CheckCircle,
        description: '조업 가능'
      };
      case 'caution': return {
        bg: 'bg-yellow-500',
        bgLight: 'bg-yellow-500/20',
        text: '주의',
        textColor: 'text-yellow-400',
        icon: AlertCircle,
        description: '주의 필요'
      };
      case 'warning': return {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-500/20',
        text: '경고',
        textColor: 'text-orange-400',
        icon: AlertTriangle,
        description: '출항 자제'
      };
      case 'danger': return {
        bg: 'bg-red-500',
        bgLight: 'bg-red-500/20',
        text: '위험',
        textColor: 'text-red-400',
        icon: XCircle,
        description: '출항 금지'
      };
      default: return {
        bg: 'bg-gray-500',
        bgLight: 'bg-gray-500/20',
        text: '확인중',
        textColor: 'text-gray-400',
        icon: AlertCircle,
        description: '정보 수집 중'
      };
    }
  };

  const safetyStyle = getSafetyLevelStyle(weatherInfo.safetyLevel);
  const SafetyIcon = safetyStyle.icon;

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Header />

      {/* 메인 컨텐츠 - 표준 16px 마진, 24px 섹션 간격 */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">

        {/* ===== 오늘의 안전등급 카드 ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-400">오늘의 안전등급</h2>
            <span className="text-xs text-gray-500">{user?.harborName || '통영 강구항'}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* 안전등급 아이콘 */}
            <div className={`w-16 h-16 rounded-2xl ${safetyStyle.bgLight} flex items-center justify-center`}>
              <SafetyIcon size={32} className={safetyStyle.textColor} />
            </div>

            {/* 안전등급 텍스트 */}
            <div className="flex-1">
              <p className={`text-2xl font-bold ${safetyStyle.textColor}`}>{safetyStyle.text}</p>
              <p className="text-sm text-gray-400">{safetyStyle.description}</p>
            </div>

            {/* 날씨 정보 */}
            <div className="text-right text-sm text-gray-400 space-y-1">
              <p className="flex items-center gap-2 justify-end">
                <Waves size={14} className="text-cyan-400" />
                {weatherInfo.waveHeight}m
              </p>
              <p className="flex items-center gap-2 justify-end">
                <Wind size={14} className="text-cyan-400" />
                {weatherInfo.windSpeed}m/s
              </p>
              <p className="flex items-center gap-2 justify-end">
                <Thermometer size={14} className="text-cyan-400" />
                {weatherInfo.temperature}°C
              </p>
            </div>
          </div>
        </section>

        {/* ===== 현재 출항 상태 (출항 중인 경우만) ===== */}
        {currentTrip && (
          <section className="bg-[#1e293b] rounded-2xl p-4 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Ship size={18} className="text-cyan-400" />
                <h3 className="font-semibold text-white">현재 조업 중</h3>
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                {currentTrip.status === 'fishing' ? '조업 중' : '항해 중'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <p className="text-gray-500 text-xs">목적지</p>
                <p className="text-white">{currentTrip.destination.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">예상 귀항</p>
                <p className="text-white">{new Date(currentTrip.expectedReturn).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">동료</p>
                <p className="text-white">{currentTrip.buddyName || '미배정'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">체크인</p>
                <p className="text-white">{currentTrip.checkins.length}회 완료</p>
              </div>
            </div>

            <Link
              href="/trip"
              className="block text-center py-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
            >
              상세보기 →
            </Link>
          </section>
        )}

        {/* ===== 빠른 메뉴 (2x2 그리드) ===== */}
        <section className="grid grid-cols-2 gap-4">
          {/* 위험공유 */}
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`flex flex-col items-center justify-center gap-2 p-6 rounded-2xl transition-all ${
              isVoiceActive
                ? 'bg-orange-500'
                : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500'
            }`}
          >
            <Mic size={28} className="text-white" />
            <span className="font-semibold text-white">위험공유</span>
            <span className="text-xs text-orange-100">음성 입력</span>
          </button>

          {/* SOS 긴급신고 */}
          <Link
            href="/sos"
            className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-red-600 hover:bg-red-500 transition-all relative"
          >
            <div className="absolute inset-0 rounded-2xl border-2 border-red-400 animate-pulse" />
            <Phone size={28} className="text-white relative z-10" />
            <span className="font-bold text-xl text-white relative z-10">SOS</span>
            <span className="text-xs text-red-100 relative z-10">긴급신고</span>
          </Link>

          {/* 출항등록 */}
          <Link
            href="/trip"
            className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 transition-all"
          >
            <Ship size={28} className="text-white" />
            <span className="font-semibold text-white">출항등록</span>
            <span className="text-xs text-cyan-100">안전 출항</span>
          </Link>

          {/* 동료현황 */}
          <Link
            href="/buddy"
            className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-400 hover:to-violet-500 transition-all"
          >
            <Users size={28} className="text-white" />
            <span className="font-semibold text-white">동료현황</span>
            <span className="text-xs text-violet-100">{activeTrips.length}명 출항중</span>
          </Link>
        </section>

        {/* ===== 음성 입력 모달 ===== */}
        {isVoiceActive && (
          <section className="bg-[#1e293b] rounded-2xl p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center animate-pulse">
              <Mic size={40} className="text-orange-400" />
            </div>
            <p className="text-lg font-semibold text-white mb-2">듣고 있습니다...</p>
            <p className="text-sm text-gray-400 mb-6">위험 상황을 말씀해 주세요</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsVoiceActive(false);
                  alert('음성 인식 완료: "동쪽 해역 파도 높아요"\n\n→ 커뮤니티에 공유됩니다.');
                }}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl font-semibold text-white transition-colors"
              >
                공유하기
              </button>
              <button
                onClick={() => setIsVoiceActive(false)}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium text-white transition-colors"
              >
                취소
              </button>
            </div>
          </section>
        )}

        {/* ===== 우리 어항 소식 ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-400" />
              우리 어항 소식
            </h3>
            <Link
              href="/community"
              className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              더보기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRisks.map((risk) => {
              const severityText = getSeverityText(risk.severity);
              return (
                <article
                  key={risk.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#0f172a] hover:bg-[#1a2744] transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{getRiskTypeIcon(risk.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">{risk.userName}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(risk.severity)}`}>
                        {severityText}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">{risk.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(risk.createdAt), { addSuffix: true, locale: ko })} · 좋아요 {risk.likes}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ===== 출항 중인 동료 ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Ship size={18} className="text-cyan-400" />
              출항 중인 동료
            </h3>
            <Link
              href="/buddy"
              className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              {activeTrips.length}명 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeTrips.slice(0, 4).map((trip) => {
              const statusConfig = {
                fishing: { text: '조업중', color: 'text-green-400', icon: '🎣' },
                returning: { text: '귀항중', color: 'text-yellow-400', icon: '🏠' },
                sailing: { text: '항해중', color: 'text-cyan-400', icon: '⛵' },
              };
              const status = statusConfig[trip.status as keyof typeof statusConfig] || statusConfig.sailing;

              return (
                <div
                  key={trip.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0f172a]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {trip.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{trip.userName}</p>
                    <p className={`text-xs ${status.color} flex items-center gap-1`}>
                      <span>{status.icon}</span>
                      {status.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== 내 안전 포인트 ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Award size={18} className="text-yellow-400" />
              내 안전 포인트
            </h3>
            <Link
              href="/mypage"
              className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-1 transition-colors"
            >
              상세보기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="text-center py-2 mb-4">
            <p className="text-3xl font-bold text-yellow-400">
              {user?.points.toLocaleString() || 0}
              <span className="text-xl ml-1">P</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#0f172a] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">총 출항</p>
              <p className="text-lg font-bold text-white">{user?.totalTrips || 0}</p>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">무사고</p>
              <p className="text-lg font-bold text-green-400">{user?.safeTrips || 0}</p>
            </div>
            <div className="bg-[#0f172a] rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">안전율</p>
              <p className="text-lg font-bold text-cyan-400">
                {user ? Math.round((user.safeTrips / user.totalTrips) * 100) : 0}%
              </p>
            </div>
          </div>
        </section>

        {/* ===== AI 안전 비서 ===== */}
        <section className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-2xl p-4 border border-cyan-500/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">🤖</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-cyan-400">AI 안전 비서</p>
                <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded">실시간</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-white">{user?.name || '어민'}</strong>님, 오늘{' '}
                <strong className="text-white">{user?.harborName || '통영 강구항'}</strong> 날씨는{' '}
                <span className={safetyStyle.textColor}>{safetyStyle.text}</span>입니다.
                {currentTrip
                  ? ' 다음 체크인까지 약 2시간 남았습니다. 안전 조업하세요!'
                  : ' 안전한 조업 되세요! 출항 전 장비 점검 잊지 마세요.'}
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
