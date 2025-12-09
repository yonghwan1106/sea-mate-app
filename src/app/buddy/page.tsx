'use client';

import { useState } from 'react';
import { Users, Phone, MessageCircle, MapPin, Ship, Clock, Heart, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { mockUsers } from '@/data/mockUsers';
import { formatRelativeTime } from '@/lib/utils';

export default function BuddyPage() {
  const { user } = useAuthStore();
  const { trips } = useAppStore();
  const [activeTab, setActiveTab] = useState<'today' | 'network' | 'family'>('today');

  // 다른 어민들 (현재 사용자 제외)
  const otherFishers = mockUsers.filter(
    (u) => u.role === 'fisher' && u.id !== user?.id
  );

  // 같은 항구의 어민들
  const sameBuddies = otherFishers.filter(
    (u) => u.harbor.id === user?.harbor.id
  );

  // 가족 멤버
  const familyMembers = mockUsers.filter(
    (u) => u.role === 'family'
  );

  // 현재 운항 중인 어민들
  const sailingFishers = trips
    .filter((t) => t.status === 'sailing')
    .map((t) => {
      const fisher = mockUsers.find((u) => u.id === t.userId);
      return { trip: t, fisher };
    })
    .filter((item) => item.fisher && item.fisher.id !== user?.id);

  // 오늘의 동료 (데모: 같은 항구 중 랜덤)
  const todayBuddy = sameBuddies[0];

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-500">동료 안전망</h1>
        <p className="text-gray-500">서로를 지켜주는 어민 커뮤니티</p>
      </div>

      {/* 오늘의 동료 카드 */}
      {todayBuddy && (
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">오늘의 동료</h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              매칭됨
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-xl font-bold">{todayBuddy.name}</p>
              <p className="text-sm opacity-80">{todayBuddy.harbor.name}</p>
              <p className="text-sm opacity-80">{todayBuddy.vessel.name}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Phone size={18} />
              <span>연락</span>
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <MessageCircle size={18} />
              <span>메시지</span>
            </button>
          </div>
        </div>
      )}

      {/* 탭 */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'today', label: '실시간 현황' },
          { value: 'network', label: '내 안전망' },
          { value: 'family', label: '가족' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as any)}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 실시간 현황 탭 */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          {/* 운항 중인 동료 */}
          <div>
            <h3 className="font-semibold text-navy-500 mb-3 flex items-center gap-2">
              <Ship size={18} className="text-primary-500" />
              운항 중인 동료 ({sailingFishers.length}명)
            </h3>
            {sailingFishers.length === 0 ? (
              <div className="card text-center py-8">
                <Ship size={40} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">현재 운항 중인 동료가 없습니다</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sailingFishers.map(({ trip, fisher }) => (
                  <div key={trip.id} className="card">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy-500">{fisher?.name}</p>
                        <p className="text-sm text-gray-500">{trip.vessel.name}</p>
                      </div>
                      <span className="badge badge-primary">운항 중</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-gray-600">{trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-gray-400" />
                        <span className="text-gray-600">
                          체크인 {trip.checkins.length}회
                          {trip.checkins.length > 0 && (
                            <span className="text-gray-400">
                              {' '}(마지막: {formatRelativeTime(trip.checkins[trip.checkins.length - 1].time)})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 지연 경고 */}
          {trips.filter((t) => t.status === 'overdue').length > 0 && (
            <div>
              <h3 className="font-semibold text-danger-600 mb-3 flex items-center gap-2">
                <AlertCircle size={18} />
                귀항 지연 ({trips.filter((t) => t.status === 'overdue').length}건)
              </h3>
              {trips
                .filter((t) => t.status === 'overdue')
                .map((trip) => {
                  const fisher = mockUsers.find((u) => u.id === trip.userId);
                  return (
                    <div key={trip.id} className="card border-2 border-danger-200 bg-danger-50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-danger-100 rounded-full flex items-center justify-center">
                          <AlertCircle size={24} className="text-danger-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-danger-700">{fisher?.name}</p>
                          <p className="text-sm text-danger-600">{trip.destination}</p>
                        </div>
                        <button className="btn-danger px-4 py-2 flex items-center gap-1">
                          <Phone size={16} />
                          연락
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* 내 안전망 탭 */}
      {activeTab === 'network' && (
        <div className="space-y-4">
          <div className="card bg-secondary-50 border border-secondary-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-secondary-600" />
              </div>
              <div>
                <p className="font-semibold text-secondary-700">같은 항구 동료</p>
                <p className="text-sm text-secondary-600">{sameBuddies.length}명이 함께합니다</p>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-navy-500 flex items-center gap-2">
            <MapPin size={18} className="text-primary-500" />
            {user?.harbor.name} 어민
          </h3>

          <div className="space-y-3">
            {sameBuddies.map((buddy) => (
              <div key={buddy.id} className="card-hover">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-500">{buddy.name}</p>
                    <p className="text-sm text-gray-500">{buddy.vessel.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <Phone size={18} />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 다른 항구 어민 */}
          <h3 className="font-semibold text-navy-500 flex items-center gap-2 pt-4">
            <Users size={18} className="text-gray-500" />
            주변 항구 어민
          </h3>

          <div className="space-y-3">
            {otherFishers
              .filter((u) => u.harbor.id !== user?.harbor.id)
              .slice(0, 5)
              .map((fisher) => (
                <div key={fisher.id} className="card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-500">{fisher.name}</p>
                      <p className="text-sm text-gray-500">{fisher.harbor.name} · {fisher.vessel.name}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 가족 탭 */}
      {activeTab === 'family' && (
        <div className="space-y-4">
          <div className="card bg-warning-50 border border-warning-200">
            <h3 className="font-semibold text-warning-700 mb-2">👨‍👩‍👧 가족 알림 설정</h3>
            <p className="text-sm text-warning-600">
              체크인이 없거나 귀항이 지연되면 가족에게 자동으로 알림이 갑니다.
            </p>
          </div>

          <h3 className="font-semibold text-navy-500">등록된 가족</h3>

          <div className="space-y-3">
            {familyMembers.slice(0, 3).map((family) => (
              <div key={family.id} className="card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-500">{family.name}</p>
                    <p className="text-sm text-gray-500">{family.role === 'family' ? '가족' : ''}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                      <Phone size={18} />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>

                {/* 알림 설정 */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">체크인 미응답 알림</span>
                    <div className="w-12 h-6 bg-secondary-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 가족 추가 */}
          <button className="w-full card border-2 border-dashed border-gray-300 text-gray-500 hover:border-primary-300 hover:text-primary-500 transition-colors">
            <div className="py-4 text-center">
              <span className="text-2xl block mb-2">+</span>
              <span>가족 추가하기</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
