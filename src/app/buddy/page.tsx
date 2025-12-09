'use client';

import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { users, getActiveTrips, getTripStatusText, getTripStatusColor } from '@/data/mockDatabase';
import { Users, MapPin, Phone, MessageCircle, Ship, Clock, CheckCircle } from 'lucide-react';

export default function BuddyPage() {
  const { user, currentTrip } = useStore();

  const harborMembers = users.filter(u => u.harborId === user?.harborId);
  const activeTrips = getActiveTrips();

  // 현재 어항의 출항 중인 어민
  const activeFishers = activeTrips.filter(t =>
    harborMembers.some(m => m.id === t.userId)
  );

  // 현재 어항의 대기 중인 어민 (출항 안 함)
  const idleFishers = harborMembers.filter(m =>
    !activeTrips.some(t => t.userId === m.id) && m.isOnline
  );

  return (
    <div className="min-h-screen">
      <Header title="동료 현황" />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* 오늘의 동료 (출항 중인 경우) */}
        {currentTrip?.buddyName && (
          <section className="glass-card p-4 border-2 border-purple-500/50">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-purple-400">
              <Users size={20} />
              오늘의 동료
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl font-bold">
                {currentTrip.buddyName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold">{currentTrip.buddyName}</p>
                <p className="text-sm text-gray-400">같은 시간대 출항</p>
                <p className="text-sm text-cyan-400 mt-1">📍 약 1.2km 거리</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl flex items-center justify-center gap-2 text-purple-300">
                <Phone size={20} />
                전화
              </button>
              <button className="flex-1 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl flex items-center justify-center gap-2 text-cyan-300">
                <MessageCircle size={20} />
                메시지
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              * 서로의 안전을 위해 주기적으로 연락해 주세요
            </p>
          </section>
        )}

        {/* 출항 중인 동료 */}
        <section className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Ship size={20} className="text-cyan-400" />
              출항 중인 동료
            </h3>
            <span className="text-sm text-cyan-400">{activeFishers.length}명</span>
          </div>

          {activeFishers.length > 0 ? (
            <div className="space-y-3">
              {activeFishers.map((trip) => {
                const fisher = harborMembers.find(m => m.id === trip.userId);
                return (
                  <div key={trip.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                        {trip.userName.charAt(0)}
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1a365d] ${getTripStatusColor(trip.status)}`}></span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{trip.userName}</span>
                        <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">
                          {trip.vesselName}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <MapPin size={12} />
                        {trip.destination.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-cyan-400">{getTripStatusText(trip.status)}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(trip.expectedReturn).toLocaleTimeString('ko-KR', {
                          hour: '2-digit', minute: '2-digit'
                        })} 귀항
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              현재 출항 중인 동료가 없습니다
            </p>
          )}
        </section>

        {/* 대기 중인 동료 */}
        <section className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Users size={20} className="text-green-400" />
              온라인 동료
            </h3>
            <span className="text-sm text-green-400">{idleFishers.length}명</span>
          </div>

          {idleFishers.length > 0 ? (
            <div className="grid grid-cols-4 gap-3">
              {idleFishers.map((fisher) => (
                <div key={fisher.id} className="text-center">
                  <div className="relative w-14 h-14 mx-auto">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-lg font-bold">
                      {fisher.name.charAt(0)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#1a365d]"></span>
                  </div>
                  <p className="text-sm mt-2 truncate">{fisher.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              온라인 동료가 없습니다
            </p>
          )}
        </section>

        {/* 동료 안전망 설명 */}
        <section className="glass-card p-4 border border-purple-500/30">
          <h3 className="font-bold mb-3 text-purple-400">💡 동료 안전망이란?</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p>출항 시 자동으로 같은 시간대 출항자와 <strong>동료 매칭</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p><strong>2시간마다 체크인</strong> 알림, 무응답 시 동료에게 알림</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p>SOS 발신 시 <strong>가장 가까운 동료에게 우선 알림</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <p>동료 구조 참여 시 <strong>1,000P 적립</strong></p>
            </div>
          </div>
        </section>

        {/* 무응답 에스컬레이션 안내 */}
        <section className="glass-card p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Clock size={20} className="text-orange-400" />
            무응답 시 자동 알림
          </h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500"></div>

            <div className="space-y-4 pl-10">
              <div className="relative">
                <span className="absolute -left-6 w-3 h-3 bg-yellow-500 rounded-full"></span>
                <p className="font-medium">30분 무응답</p>
                <p className="text-sm text-gray-400">동료 어민에게 알림</p>
              </div>
              <div className="relative">
                <span className="absolute -left-6 w-3 h-3 bg-orange-500 rounded-full"></span>
                <p className="font-medium">1시간 무응답</p>
                <p className="text-sm text-gray-400">가족에게 알림</p>
              </div>
              <div className="relative">
                <span className="absolute -left-6 w-3 h-3 bg-red-500 rounded-full"></span>
                <p className="font-medium">2시간 무응답</p>
                <p className="text-sm text-gray-400">해경 122 자동 통보</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
