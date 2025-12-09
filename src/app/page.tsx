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
  TrendingUp,
  ChevronRight,
  Waves,
  Wind,
  ThermometerSun,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function HomePage() {
  const { user, currentTrip, riskReports: storeRiskReports } = useStore();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const activeTrips = getActiveTrips();
  const recentRisks = storeRiskReports.filter(r => r.isActive).slice(0, 3);

  // 안전등급 스타일 - 색상 + 아이콘 + 텍스트 병행 (색약자 접근성)
  const getSafetyLevelStyle = (level: string) => {
    switch (level) {
      case 'safe': return {
        bg: 'bg-green-500',
        bgLight: 'bg-green-500/20',
        border: 'border-green-500',
        text: '양호',
        textColor: 'text-green-400',
        icon: CheckCircle,
        description: '조업 가능'
      };
      case 'caution': return {
        bg: 'bg-yellow-500',
        bgLight: 'bg-yellow-500/20',
        border: 'border-yellow-500',
        text: '주의',
        textColor: 'text-yellow-400',
        icon: AlertCircle,
        description: '주의 필요'
      };
      case 'warning': return {
        bg: 'bg-orange-500',
        bgLight: 'bg-orange-500/20',
        border: 'border-orange-500',
        text: '경고',
        textColor: 'text-orange-400',
        icon: AlertTriangle,
        description: '출항 자제'
      };
      case 'danger': return {
        bg: 'bg-red-500',
        bgLight: 'bg-red-500/20',
        border: 'border-red-500',
        text: '위험',
        textColor: 'text-red-400',
        icon: XCircle,
        description: '출항 금지'
      };
      default: return {
        bg: 'bg-gray-500',
        bgLight: 'bg-gray-500/20',
        border: 'border-gray-500',
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
    <div className="min-h-screen">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 오늘의 안전등급 - 색상 + 아이콘 + 텍스트 병행 */}
        <section
          className={`safety-card p-6 border-2 ${safetyStyle.border}`}
          role="region"
          aria-label="오늘의 안전등급"
        >
          <h2 className="text-base font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${safetyStyle.bg}`} aria-hidden="true" />
            오늘의 안전등급
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 아이콘 + 색상 배경 */}
              <div className={`w-16 h-16 rounded-2xl ${safetyStyle.bgLight} flex items-center justify-center`}>
                <SafetyIcon size={36} className={safetyStyle.textColor} aria-hidden="true" />
              </div>
              <div>
                <p className={`text-3xl font-bold ${safetyStyle.textColor}`}>
                  {safetyStyle.text}
                </p>
                <p className="text-sm text-gray-300 font-medium">
                  {safetyStyle.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {user?.harborName || '통영 강구항'}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-300 space-y-1">
              <p className="flex items-center gap-2 justify-end">
                <Waves size={16} className="text-cyan-400" aria-hidden="true" />
                <span>파고 <strong>{weatherInfo.waveHeight}m</strong></span>
              </p>
              <p className="flex items-center gap-2 justify-end">
                <Wind size={16} className="text-cyan-400" aria-hidden="true" />
                <span>바람 <strong>{weatherInfo.windSpeed}m/s</strong></span>
              </p>
              <p className="flex items-center gap-2 justify-end">
                <ThermometerSun size={16} className="text-cyan-400" aria-hidden="true" />
                <span><strong>{weatherInfo.temperature}°C</strong></span>
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
              className="mt-3 block text-center py-2 px-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium rounded-lg transition-colors"
            >
              출항 상세보기 →
            </Link>
          </section>
        )}

        {/* 빠른 메뉴 - SOS 강조 */}
        <section className="grid grid-cols-2 gap-4" role="group" aria-label="빠른 메뉴">
          {/* 위험공유 버튼 */}
          <button
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`btn-large flex flex-col items-center justify-center gap-2 h-28 ${
              isVoiceActive
                ? 'bg-orange-500 voice-indicator'
                : 'bg-gradient-to-br from-orange-500 to-orange-600'
            }`}
            aria-label="음성으로 위험 정보 공유하기"
          >
            <Mic size={32} aria-hidden="true" />
            <span className="font-bold">위험공유</span>
            <span className="text-xs opacity-80">음성 입력</span>
          </button>

          {/* SOS 버튼 - 빨간색 강조 */}
          <Link
            href="/sos"
            className="btn-large h-28 flex flex-col items-center justify-center gap-2 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' }}
            aria-label="긴급 SOS 신고"
          >
            <div className="absolute inset-0 border-4 border-red-400 rounded-2xl animate-pulse" />
            <Phone size={32} className="relative z-10 text-white" aria-hidden="true" />
            <span className="text-2xl font-black relative z-10 text-white">SOS</span>
            <span className="text-xs relative z-10 text-red-100">긴급신고</span>
          </Link>

          {/* 출항등록 버튼 */}
          <Link
            href="/trip"
            className="btn-large h-28 bg-gradient-to-br from-cyan-500 to-cyan-600 flex flex-col items-center justify-center gap-2"
            aria-label="출항 등록하기"
          >
            <Ship size={32} aria-hidden="true" />
            <span className="font-bold">출항등록</span>
            <span className="text-xs opacity-80">안전 출항</span>
          </Link>

          {/* 동료현황 버튼 */}
          <Link
            href="/buddy"
            className="btn-large h-28 bg-gradient-to-br from-purple-500 to-purple-600 flex flex-col items-center justify-center gap-2"
            aria-label="동료 현황 보기"
          >
            <Users size={32} aria-hidden="true" />
            <span className="font-bold">동료현황</span>
            <span className="text-xs opacity-80">{activeTrips.length}명 출항중</span>
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

        {/* 우리 어항 소식 - 섹션 제목 강화 */}
        <section className="glass-card p-5" role="region" aria-label="우리 어항 위험정보 소식">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-400" aria-hidden="true" />
              우리 어항 소식
            </h3>
            <Link
              href="/community"
              className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium rounded-lg transition-colors"
            >
              더보기 <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentRisks.map((risk) => {
              const severityText = getSeverityText(risk.severity);
              return (
                <article key={risk.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <span className="text-2xl" aria-hidden="true">{getRiskTypeIcon(risk.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-medium">{risk.userName}</span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(risk.severity)}`}
                        role="status"
                      >
                        {risk.severity === 'critical' && <XCircle size={12} aria-hidden="true" />}
                        {risk.severity === 'high' && <AlertTriangle size={12} aria-hidden="true" />}
                        {risk.severity === 'medium' && <AlertCircle size={12} aria-hidden="true" />}
                        {risk.severity === 'low' && <CheckCircle size={12} aria-hidden="true" />}
                        {severityText}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{risk.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDistanceToNow(new Date(risk.createdAt), { addSuffix: true, locale: ko })}
                      {' · '}
                      좋아요 {risk.likes}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 현재 출항 중인 동료들 - UI 개선 */}
        <section className="glass-card p-5" role="region" aria-label="출항 중인 동료 현황">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Ship size={20} className="text-cyan-400" aria-hidden="true" />
              출항 중인 동료
            </h3>
            <Link
              href="/buddy"
              className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium rounded-lg transition-colors"
            >
              {activeTrips.length}명 <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* 요약 카드 형태로 변경 */}
          <div className="grid grid-cols-2 gap-3">
            {activeTrips.slice(0, 4).map((trip) => {
              const statusConfig = {
                fishing: { text: '조업중', color: 'text-green-400', bg: 'bg-green-500/20', icon: '🎣' },
                returning: { text: '귀항중', color: 'text-yellow-400', bg: 'bg-yellow-500/20', icon: '🏠' },
                sailing: { text: '항해중', color: 'text-cyan-400', bg: 'bg-cyan-500/20', icon: '⛵' },
              };
              const status = statusConfig[trip.status as keyof typeof statusConfig] || statusConfig.sailing;

              return (
                <div
                  key={trip.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {trip.userName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{trip.userName}</p>
                    <p className={`text-xs flex items-center gap-1 mt-1 ${status.color}`}>
                      <span aria-hidden="true">{status.icon}</span>
                      {status.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {activeTrips.length > 4 && (
            <p className="text-xs text-gray-500 text-center mt-3">
              +{activeTrips.length - 4}명이 더 출항 중입니다
            </p>
          )}
        </section>

        {/* 포인트 현황 - 섹션 제목 강화 */}
        <section className="glass-card p-5" role="region" aria-label="내 안전 포인트 현황">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-yellow-400" aria-hidden="true" />
              내 안전 포인트
            </h3>
            <Link
              href="/mypage"
              className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-sm font-medium rounded-lg transition-colors"
            >
              상세보기 <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="flex items-center justify-center py-2">
            <p className="text-4xl font-bold text-yellow-400">
              {user?.points.toLocaleString() || 0}<span className="text-2xl">P</span>
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 text-center text-sm">
            <div className="p-2 rounded-lg bg-white/5">
              <p className="text-gray-400 text-xs mb-1">총 출항</p>
              <p className="font-bold text-lg">{user?.totalTrips || 0}<span className="text-xs text-gray-400">회</span></p>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <p className="text-gray-400 text-xs mb-1">무사고</p>
              <p className="font-bold text-lg text-green-400">{user?.safeTrips || 0}<span className="text-xs text-green-400/70">회</span></p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <p className="text-gray-400 text-xs mb-1">안전율</p>
              <p className="font-bold text-lg text-cyan-400">
                {user ? ((user.safeTrips / user.totalTrips) * 100).toFixed(0) : 0}<span className="text-xs text-cyan-400/70">%</span>
              </p>
            </div>
          </div>
        </section>

        {/* AI 안전 비서 메시지 - 강조 */}
        <section
          className="glass-card p-5 border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
          role="complementary"
          aria-label="AI 안전 비서 안내"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl" aria-hidden="true">🤖</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-cyan-400 mb-1 flex items-center gap-2">
                AI 안전 비서
                <span className="px-2 py-0.5 text-xs bg-cyan-500/20 rounded-full">실시간</span>
              </p>
              <p className="text-sm text-gray-200 leading-relaxed">
                <strong>{user?.name || '어민'}</strong>님, 오늘 <strong>{user?.harborName || '통영 강구항'}</strong> 날씨는 <span className={safetyStyle.textColor}>{safetyStyle.text}</span>입니다.
                {currentTrip
                  ? ` 다음 체크인까지 약 2시간 남았습니다. 안전 조업하세요!`
                  : ' 안전한 조업 되세요! 출항 전 장비 점검 잊지 마세요.'}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
