'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { users, harbors } from '@/data/mockDatabase';
import {
  Ship, MapPin, Clock, Users, CheckCircle, Navigation,
  Anchor, ArrowRight, Calendar, AlertCircle
} from 'lucide-react';

export default function TripPage() {
  const { user, currentTrip, startTrip, endTrip, setShowCheckinModal } = useStore();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [destination, setDestination] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [notes, setNotes] = useState('');

  const harborMembers = users.filter(u => u.harborId === user?.harborId && u.id !== user?.id);

  const handleStartTrip = () => {
    if (!destination || !expectedReturn || !user) return;

    const today = new Date();
    const [hours, minutes] = expectedReturn.split(':');
    const returnDate = new Date(today);
    returnDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    // 랜덤 동료 매칭
    const randomBuddy = harborMembers[Math.floor(Math.random() * harborMembers.length)];

    const newTrip = {
      id: `t_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      vesselName: user.vesselName,
      departureTime: new Date().toISOString(),
      expectedReturn: returnDate.toISOString(),
      destination: {
        lat: 34.87 + Math.random() * 0.05,
        lng: 128.45 + Math.random() * 0.05,
        name: destination,
      },
      currentLocation: {
        lat: 34.8612,
        lng: 128.4523,
        updatedAt: new Date().toISOString(),
      },
      status: 'sailing' as const,
      buddyId: randomBuddy?.id,
      buddyName: randomBuddy?.name,
      checkins: [],
      notes,
    };

    startTrip(newTrip);
    setShowRegisterModal(false);
    setDestination('');
    setExpectedReturn('');
    setNotes('');
  };

  const handleEndTrip = () => {
    if (confirm('귀항을 완료하시겠습니까?')) {
      endTrip();
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="출항 관리" />

      <main className="max-w-lg mx-auto px-4 py-4">
        {currentTrip ? (
          // 현재 출항 중인 경우
          <div className="space-y-4">
            {/* 출항 상태 카드 */}
            <section className="glass-card p-6 border-2 border-cyan-500/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                  <Ship size={24} /> 출항 중
                </h2>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  {currentTrip.status === 'fishing' ? '조업 중' :
                   currentTrip.status === 'returning' ? '귀항 중' : '항해 중'}
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <Navigation size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">목적지</p>
                    <p className="font-medium">{currentTrip.destination.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">출항 시간</p>
                    <p className="font-medium">
                      {new Date(currentTrip.departureTime).toLocaleTimeString('ko-KR', {
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Anchor size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">예상 귀항</p>
                    <p className="font-medium">
                      {new Date(currentTrip.expectedReturn).toLocaleTimeString('ko-KR', {
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">오늘의 동료</p>
                    <p className="font-medium text-cyan-400">{currentTrip.buddyName || '미배정'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 체크인 현황 */}
            <section className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-400" />
                체크인 현황
              </h3>

              <div className="space-y-3">
                {currentTrip.checkins.map((checkin, index) => (
                  <div key={checkin.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">체크인 완료</p>
                      <p className="text-sm text-gray-500">
                        {new Date(checkin.time).toLocaleTimeString('ko-KR', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                ))}

                {/* 다음 체크인 */}
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {currentTrip.checkins.length + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">다음 체크인</p>
                    <p className="text-sm text-gray-500">약 2시간 후</p>
                  </div>
                  <Clock size={20} className="text-gray-500" />
                </div>
              </div>

              <button
                onClick={() => setShowCheckinModal(true)}
                className="w-full mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold"
              >
                지금 체크인하기
              </button>
            </section>

            {/* 동료 정보 */}
            {currentTrip.buddyName && (
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Users size={20} className="text-purple-400" />
                  오늘의 동료
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl font-bold">
                    {currentTrip.buddyName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-bold">{currentTrip.buddyName}</p>
                    <p className="text-sm text-gray-400">서로의 안전을 지켜주세요</p>
                    <p className="text-sm text-cyan-400 mt-1">📍 약 1.2km 거리</p>
                  </div>
                </div>
              </section>
            )}

            {/* 귀항 버튼 */}
            <button
              onClick={handleEndTrip}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Anchor size={24} />
              귀항 완료
            </button>
          </div>
        ) : (
          // 출항 전
          <div className="space-y-4">
            {/* 출항 등록 카드 */}
            <section className="glass-card p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Ship size={40} className="text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold mb-2">출항을 등록하세요</h2>
              <p className="text-gray-400 mb-6">
                출항 등록 시 동료가 자동 매칭되고<br />
                안전 모니터링이 시작됩니다
              </p>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <Ship size={24} />
                출항 등록하기
              </button>
            </section>

            {/* 오늘의 체크리스트 */}
            <section className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-400" />
                출항 전 체크리스트
              </h3>
              <div className="space-y-3">
                {[
                  '구명조끼 확인',
                  '통신장비 확인',
                  '기상정보 확인',
                  '연료 충분 확인',
                  '비상식량/식수 확인',
                ].map((item, index) => (
                  <label key={index} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-500 bg-transparent text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* AI 안전 비서 */}
            <section className="glass-card p-4 border border-cyan-500/30">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div>
                  <p className="font-bold text-cyan-400 mb-1">AI 안전 비서</p>
                  <p className="text-sm text-gray-300">
                    {user?.name}님, 오늘 기상 상태가 양호합니다.
                    하지만 오후에 파도가 높아질 수 있으니 일찍 귀항하시는 것을 권장드립니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 최근 출항 기록 */}
            <section className="glass-card p-4">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-gray-400" />
                최근 출항 기록
              </h3>
              <div className="space-y-3">
                {[
                  { date: '12월 8일', dest: '통영 동쪽 어장', duration: '9시간', status: '무사고' },
                  { date: '12월 7일', dest: '통영 남쪽 어장', duration: '8시간', status: '무사고' },
                  { date: '12월 5일', dest: '거제 근해', duration: '10시간', status: '무사고' },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-medium">{record.dest}</p>
                      <p className="text-sm text-gray-500">{record.date} · {record.duration}</p>
                    </div>
                    <span className="text-sm text-green-400">{record.status}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 출항 등록 모달 */}
        {showRegisterModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-lg mx-auto bg-[#1a365d] rounded-t-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">출항 등록</h2>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* 목적지 */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <MapPin size={16} className="inline mr-1" />
                    목적지
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="예: 통영 동쪽 어장"
                    className="w-full py-3 px-4 bg-white/10 rounded-xl text-white placeholder-gray-500"
                  />
                </div>

                {/* 예상 귀항 시간 */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Clock size={16} className="inline mr-1" />
                    예상 귀항 시간
                  </label>
                  <input
                    type="time"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    className="w-full py-3 px-4 bg-white/10 rounded-xl text-white"
                  />
                </div>

                {/* 메모 */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    메모 (선택)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="예: 오징어 조업"
                    className="w-full py-3 px-4 bg-white/10 rounded-xl text-white placeholder-gray-500"
                  />
                </div>

                {/* 동료 자동 매칭 안내 */}
                <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                  <p className="text-sm text-purple-300 flex items-center gap-2">
                    <Users size={16} />
                    비슷한 시간대 출항자와 자동으로 동료 매칭됩니다
                  </p>
                </div>

                {/* 등록 버튼 */}
                <button
                  onClick={handleStartTrip}
                  disabled={!destination || !expectedReturn}
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Ship size={24} />
                  출항 등록
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
