'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { AlertTriangle, Phone, MapPin, Users, Ship, X, CheckCircle } from 'lucide-react';

export default function SOSPage() {
  const router = useRouter();
  const { user, sosActive, triggerSOS, cancelSOS, currentTrip } = useStore();
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(sosActive);
  const [responseTime, setResponseTime] = useState(0);

  // SOS 버튼 길게 누르기 핸들러
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isHolding && !sosTriggered) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            setIsHolding(false);
            triggerSOS();
            setSosTriggered(true);
            return 100;
          }
          return prev + 3.33; // 3초에 100%
        });
      }, 100);
    } else if (!isHolding) {
      setHoldProgress(0);
    }

    return () => clearInterval(interval);
  }, [isHolding, sosTriggered, triggerSOS]);

  // SOS 활성화 후 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (sosTriggered) {
      interval = setInterval(() => {
        setResponseTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sosTriggered]);

  const handleCancel = () => {
    cancelSOS();
    setSosTriggered(false);
    setResponseTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen">
      <Header title="긴급 SOS" />

      <main className="max-w-lg mx-auto px-4 py-8">
        {!sosTriggered ? (
          // SOS 대기 화면
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-red-400 mb-2">긴급 구조 요청</h1>
              <p className="text-gray-400">
                위급한 상황에서 아래 버튼을 3초간 길게 누르세요
              </p>
            </div>

            {/* SOS 버튼 */}
            <div className="relative inline-block mb-8">
              {/* 프로그레스 링 */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.2)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray={`${holdProgress * 3.52} 352`}
                  className="transition-all duration-100"
                />
              </svg>

              <button
                onMouseDown={() => setIsHolding(true)}
                onMouseUp={() => setIsHolding(false)}
                onMouseLeave={() => setIsHolding(false)}
                onTouchStart={() => setIsHolding(true)}
                onTouchEnd={() => setIsHolding(false)}
                className="sos-button flex flex-col items-center justify-center text-white relative z-10"
              >
                <AlertTriangle size={48} />
                <span className="text-lg font-bold mt-1">SOS</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              {isHolding
                ? `${Math.ceil((100 - holdProgress) / 33.3)}초 더 누르세요...`
                : '3초간 길게 누르면 구조 요청이 발신됩니다'}
            </p>

            {/* 현재 위치 정보 */}
            <div className="glass-card p-4 mb-4 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-cyan-400" />
                현재 위치
              </h3>
              <p className="text-gray-300">
                {currentTrip
                  ? currentTrip.destination.name
                  : user?.harborName || '통영 강구항'} 인근
              </p>
              <p className="text-sm text-gray-500 mt-1">
                GPS: {currentTrip?.currentLocation
                  ? `${currentTrip.currentLocation.lat.toFixed(4)}, ${currentTrip.currentLocation.lng.toFixed(4)}`
                  : '34.8612, 128.4523'}
              </p>
            </div>

            {/* 긴급 연락처 */}
            <div className="glass-card p-4 text-left">
              <h3 className="font-bold mb-3">긴급 연락처</h3>
              <div className="space-y-3">
                <a
                  href="tel:122"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">해양경찰</p>
                      <p className="text-sm text-gray-400">122</p>
                    </div>
                  </div>
                  <span className="text-cyan-400">전화</span>
                </a>
                <a
                  href="tel:119"
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Phone size={20} className="text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">소방서/응급</p>
                      <p className="text-sm text-gray-400">119</p>
                    </div>
                  </div>
                  <span className="text-cyan-400">전화</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          // SOS 활성화 화면
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-red-400 mb-2">
                SOS 발신 중
              </h1>
              <p className="text-4xl font-mono font-bold text-white mb-2">
                {formatTime(responseTime)}
              </p>
              <p className="text-gray-400">구조 요청이 전송되었습니다</p>
            </div>

            {/* 진행 상황 */}
            <div className="glass-card p-4 mb-4 text-left space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">위치 정보 전송</p>
                  <p className="text-sm text-gray-400">GPS 좌표가 전송되었습니다</p>
                </div>
                <span className="text-green-400 text-sm">완료</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">동료 어민 알림</p>
                  <p className="text-sm text-gray-400">인근 3명에게 전송됨</p>
                </div>
                <span className="text-green-400 text-sm">완료</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">가족 알림</p>
                  <p className="text-sm text-gray-400">{user?.emergencyContacts[0]?.name || '김영희'}님에게 전송됨</p>
                </div>
                <span className="text-green-400 text-sm">완료</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Ship size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">해경 122 연동</p>
                  <p className="text-sm text-gray-400">출동 준비 중...</p>
                </div>
                <span className="text-blue-400 text-sm">진행중</span>
              </div>
            </div>

            {/* 응답 중인 동료 */}
            <div className="glass-card p-4 mb-4 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Users size={20} className="text-cyan-400" />
                응답 중인 동료
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
                      박
                    </div>
                    <div>
                      <p className="font-medium">박영수</p>
                      <p className="text-sm text-gray-400">영수호</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-medium">1.2km</p>
                    <p className="text-sm text-gray-400">~8분</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center font-bold">
                      이
                    </div>
                    <div>
                      <p className="font-medium">이철호</p>
                      <p className="text-sm text-gray-400">철호호</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-medium">2.5km</p>
                    <p className="text-sm text-gray-400">~15분</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 취소 버튼 */}
            <button
              onClick={handleCancel}
              className="w-full py-4 bg-gray-600 hover:bg-gray-700 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <X size={20} />
              SOS 취소
            </button>
            <p className="text-xs text-gray-500 mt-2">
              * 오발신인 경우에만 취소해 주세요
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
