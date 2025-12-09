'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, X, MapPin, Users, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';

export default function SOSPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { sosActive, activateSOS, deactivateSOS, addNotification } = useAppStore();

  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 홀드 시작
  const handleHoldStart = () => {
    if (sosTriggered) return;
    setIsHolding(true);
    setHoldProgress(0);

    const startTime = Date.now();
    const holdDuration = 3000; // 3초

    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / holdDuration, 1);
      setHoldProgress(progress * 100);

      if (progress >= 1) {
        clearInterval(holdTimerRef.current!);
        triggerSOS();
      }
    }, 50);
  };

  // 홀드 종료
  const handleHoldEnd = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  // SOS 발동
  const triggerSOS = () => {
    setSosTriggered(true);
    activateSOS();
    setCountdown(5);

    // 카운트다운 시작
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current!);
          // 실제 SOS 신호 전송 (데모)
          sendSOSSignal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // SOS 취소
  const cancelSOS = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
    setSosTriggered(false);
    deactivateSOS();
    setCountdown(5);
  };

  // SOS 신호 전송 (데모)
  const sendSOSSignal = () => {
    addNotification({
      type: 'sos_alert',
      title: 'SOS 발신 완료',
      message: '해경(122)과 동료들에게 긴급 구조 요청이 전송되었습니다.',
      link: '/sos',
    });

    // 5초 후 성공 화면으로 전환
    setTimeout(() => {
      setSosTriggered(false);
      deactivateSOS();
    }, 5000);
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // SOS 발동 화면
  if (sosTriggered && sosActive) {
    return (
      <div className="min-h-screen bg-danger-500 flex flex-col">
        {/* SOS 발동 중 화면 */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-white">
          {countdown > 0 ? (
            <>
              {/* 카운트다운 */}
              <div className="relative mb-8">
                <div className="w-40 h-40 rounded-full border-8 border-white/30 flex items-center justify-center animate-pulse">
                  <span className="text-8xl font-bold">{countdown}</span>
                </div>
                <div className="absolute inset-0 w-40 h-40 rounded-full border-8 border-white animate-pulse-ring" />
              </div>

              <h1 className="text-3xl font-bold mb-4">SOS 발신 중...</h1>
              <p className="text-xl opacity-90 text-center mb-8">
                {countdown}초 후 긴급 구조 요청이 전송됩니다
              </p>

              {/* 취소 버튼 */}
              <button
                onClick={cancelSOS}
                className="w-full max-w-xs bg-white text-danger-500 font-bold py-4 px-8 rounded-2xl text-xl flex items-center justify-center gap-2"
              >
                <X size={24} />
                취소하기
              </button>
            </>
          ) : (
            <>
              {/* 발신 완료 */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} className="text-secondary-500" />
              </div>

              <h1 className="text-3xl font-bold mb-4">SOS 발신 완료</h1>
              <p className="text-xl opacity-90 text-center mb-8">
                해경(122)과 주변 동료들에게<br />
                긴급 구조 요청이 전송되었습니다
              </p>

              {/* 위치 정보 */}
              <div className="w-full max-w-xs bg-white/20 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} />
                  <span className="font-semibold">현재 위치</span>
                </div>
                <p className="text-sm opacity-80">
                  {user?.harbor.name} 근해<br />
                  위도: 34.8825° N, 경도: 128.4319° E
                </p>
              </div>

              {/* 연락처 */}
              <div className="w-full max-w-xs space-y-3">
                <a
                  href="tel:122"
                  className="block w-full bg-white text-danger-500 font-bold py-4 rounded-xl text-center"
                >
                  📞 해경 122 직접 연락
                </a>
                <button
                  onClick={() => router.push('/')}
                  className="block w-full bg-white/20 text-white font-bold py-4 rounded-xl"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 기본 SOS 화면
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* SOS 버튼 */}
        <div className="relative mb-8">
          {/* 배경 링 */}
          <div
            className="absolute inset-0 rounded-full bg-danger-500/30 transition-all duration-100"
            style={{
              transform: `scale(${1 + holdProgress / 100})`,
              opacity: isHolding ? 1 : 0,
            }}
          />

          {/* 프로그레스 링 */}
          <svg
            className="absolute inset-0 -rotate-90"
            width="192"
            height="192"
            viewBox="0 0 192 192"
          >
            <circle
              cx="96"
              cy="96"
              r="90"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            <circle
              cx="96"
              cy="96"
              r="90"
              fill="none"
              stroke="#EF4444"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - holdProgress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>

          {/* 버튼 */}
          <button
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            className={`sos-btn relative z-10 ${isHolding ? 'scale-95' : ''}`}
          >
            <Phone size={48} className="mb-2" />
            <span>SOS</span>
          </button>
        </div>

        {/* 안내 텍스트 */}
        <div className="text-center text-white mb-8">
          <p className="text-xl font-semibold mb-2">
            {isHolding ? '계속 누르세요...' : '3초간 꾹 누르세요'}
          </p>
          <p className="text-gray-400">
            긴급 상황 시 해경(122)과 동료에게<br />
            구조 요청이 전송됩니다
          </p>
        </div>

        {/* 빠른 연락 */}
        <div className="w-full max-w-sm space-y-3">
          <a
            href="tel:122"
            className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold">해경 122</p>
                <p className="text-sm text-gray-400">해양 긴급 구조</p>
              </div>
            </div>
            <span className="text-primary-400">전화</span>
          </a>

          <a
            href="tel:119"
            className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-danger-500 rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-semibold">119</p>
                <p className="text-sm text-gray-400">응급 구조</p>
              </div>
            </div>
            <span className="text-danger-400">전화</span>
          </a>
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="p-6">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-warning-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-semibold text-white mb-1">SOS 발신 시 전송되는 정보</p>
              <ul className="space-y-1">
                <li>• 현재 GPS 위치 (위도/경도)</li>
                <li>• 사용자 정보 (이름, 선박명)</li>
                <li>• 출항 정보 (있는 경우)</li>
                <li>• 등록된 동료 및 가족에게 알림</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
