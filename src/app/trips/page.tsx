'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Ship, Clock, CheckCircle2, AlertCircle, MapPin, Calendar } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useAuthStore } from '@/store/authStore';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { TripStatus } from '@/types';

export default function TripsPage() {
  const { user } = useAuthStore();
  const { trips, updateTripStatus, addCheckin } = useAppStore();
  const [filter, setFilter] = useState<TripStatus | 'all'>('all');

  // 현재 사용자의 출항만 필터링 (데모에서는 전체 표시)
  const filteredTrips = trips.filter((trip) => {
    if (filter !== 'all' && trip.status !== filter) return false;
    return true;
  });

  const statusConfig = {
    scheduled: { label: '예정', color: 'bg-gray-100 text-gray-700', icon: Calendar },
    sailing: { label: '운항 중', color: 'bg-primary-100 text-primary-700', icon: Ship },
    completed: { label: '완료', color: 'bg-secondary-100 text-secondary-700', icon: CheckCircle2 },
    cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', icon: AlertCircle },
    overdue: { label: '지연', color: 'bg-danger-100 text-danger-700', icon: AlertCircle },
  };

  const handleCheckin = (tripId: string) => {
    addCheckin(tripId);
  };

  const handleComplete = (tripId: string) => {
    updateTripStatus(tripId, 'completed');
  };

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-500">출항 관리</h1>
        <p className="text-gray-500">안전한 조업을 위한 출항 기록</p>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {[
          { value: 'all', label: '전체' },
          { value: 'sailing', label: '운항 중' },
          { value: 'scheduled', label: '예정' },
          { value: 'completed', label: '완료' },
          { value: 'overdue', label: '지연' },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value as TripStatus | 'all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === item.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 출항 리스트 */}
      <div className="space-y-4">
        {filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <Ship size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">해당하는 출항 기록이 없습니다</p>
          </div>
        ) : (
          filteredTrips.map((trip) => {
            const StatusIcon = statusConfig[trip.status].icon;
            const isActive = trip.status === 'sailing';
            const isOverdue = trip.status === 'overdue';

            return (
              <div
                key={trip.id}
                className={`card ${isOverdue ? 'border-2 border-danger-300 bg-danger-50' : ''}`}
              >
                {/* 상태 및 기본 정보 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-primary-100' : isOverdue ? 'bg-danger-100' : 'bg-gray-100'
                    }`}>
                      <Ship size={24} className={
                        isActive ? 'text-primary-600' : isOverdue ? 'text-danger-600' : 'text-gray-600'
                      } />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-500">{trip.destination}</h3>
                      <p className="text-sm text-gray-500">{trip.vessel.name}</p>
                    </div>
                  </div>
                  <span className={`badge ${statusConfig[trip.status].color}`}>
                    {statusConfig[trip.status].label}
                  </span>
                </div>

                {/* 출항/귀항 시간 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <div>
                      <p className="text-gray-500">출항</p>
                      <p className="font-medium text-navy-500">
                        {formatDate(trip.departureTime, 'MM.dd HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <div>
                      <p className="text-gray-500">예상 귀항</p>
                      <p className="font-medium text-navy-500">
                        {formatDate(trip.expectedReturn, 'MM.dd HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 체크인 현황 */}
                {isActive && (
                  <div className="bg-primary-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-primary-600">체크인 현황</p>
                        <p className="font-bold text-primary-700">{trip.checkins.length}회 완료</p>
                      </div>
                      {trip.checkins.length > 0 && (
                        <p className="text-xs text-primary-500">
                          마지막: {formatRelativeTime(trip.checkins[trip.checkins.length - 1].time)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* 지연 경고 */}
                {isOverdue && (
                  <div className="bg-danger-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-danger-700">
                      <AlertCircle size={20} />
                      <div>
                        <p className="font-semibold">귀항 지연 중</p>
                        <p className="text-sm">예정 시간을 초과했습니다. 안전 확인이 필요합니다.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 액션 버튼 */}
                {isActive && (
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleCheckin(trip.id)}
                      className="flex-1 btn-primary py-3"
                    >
                      ✓ 체크인 (+50P)
                    </button>
                    <button
                      onClick={() => handleComplete(trip.id)}
                      className="flex-1 btn-secondary py-3"
                    >
                      귀항 완료 (+300P)
                    </button>
                  </div>
                )}

                {isOverdue && (
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleCheckin(trip.id)}
                      className="flex-1 btn-danger py-3"
                    >
                      안전 확인 체크인
                    </button>
                    <Link href="/sos" className="flex-1 btn-outline py-3 text-center border-danger-500 text-danger-500">
                      SOS 요청
                    </Link>
                  </div>
                )}

                {/* 상세 보기 링크 */}
                <Link
                  href={`/trips/${trip.id}`}
                  className="block text-center text-sm text-primary-500 mt-4 hover:underline"
                >
                  상세 보기
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* 출항 등록 버튼 (FAB) */}
      <Link
        href="/trips/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
