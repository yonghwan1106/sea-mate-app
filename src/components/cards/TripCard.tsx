'use client';

import Link from 'next/link';
import { Ship, Clock, AlertCircle, Calendar, CheckCircle2 } from 'lucide-react';
import { Trip, TripStatus } from '@/types';
import { formatRelativeTime, formatDate } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
  onCheckin?: (tripId: string) => void;
  onComplete?: (tripId: string) => void;
  showActions?: boolean;
}

const statusConfig: Record<TripStatus, { label: string; color: string; icon: typeof Ship }> = {
  scheduled: { label: '예정', color: 'bg-gray-100 text-gray-700', icon: Calendar },
  preparing: { label: '준비 중', color: 'bg-warning-100 text-warning-700', icon: Clock },
  sailing: { label: '운항 중', color: 'bg-primary-100 text-primary-700', icon: Ship },
  returning: { label: '귀항 중', color: 'bg-secondary-100 text-secondary-700', icon: Ship },
  completed: { label: '완료', color: 'bg-secondary-100 text-secondary-700', icon: CheckCircle2 },
  cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', icon: AlertCircle },
  sos: { label: 'SOS', color: 'bg-danger-100 text-danger-700', icon: AlertCircle },
  overdue: { label: '지연', color: 'bg-danger-100 text-danger-700', icon: AlertCircle },
};

export default function TripCard({ trip, onCheckin, onComplete, showActions = true }: TripCardProps) {
  const isActive = trip.status === 'sailing';
  const isOverdue = trip.status === 'overdue';

  return (
    <div className={`card ${isOverdue ? 'border-2 border-danger-300 bg-danger-50' : ''}`}>
      {/* 상태 및 기본 정보 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isActive ? 'bg-primary-100' : isOverdue ? 'bg-danger-100' : 'bg-gray-100'
          }`}>
            <Ship size={24} className={
              isActive ? 'text-primary-600' : isOverdue ? 'text-danger-600' : 'text-gray-600'
            } aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-navy-500">{trip.destination}</h3>
            <p className="text-sm text-gray-500">{trip.vessel?.name || '선박 미지정'}</p>
          </div>
        </div>
        <span className={`badge ${statusConfig[trip.status].color}`}>
          {statusConfig[trip.status].label}
        </span>
      </div>

      {/* 출항/귀항 시간 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-gray-400" aria-hidden="true" />
          <div>
            <p className="text-gray-500">출항</p>
            <p className="font-medium text-navy-500">
              {formatDate(trip.departureTime, 'MM.dd HH:mm')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="text-gray-400" aria-hidden="true" />
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
            <AlertCircle size={20} aria-hidden="true" />
            <div>
              <p className="font-semibold">귀항 지연 중</p>
              <p className="text-sm">예정 시간을 초과했습니다. 안전 확인이 필요합니다.</p>
            </div>
          </div>
        </div>
      )}

      {/* 액션 버튼 */}
      {showActions && isActive && onCheckin && onComplete && (
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onCheckin(trip.id)}
            className="flex-1 btn-primary py-3"
          >
            ✓ 체크인 (+50P)
          </button>
          <button
            onClick={() => onComplete(trip.id)}
            className="flex-1 btn-secondary py-3"
          >
            귀항 완료 (+300P)
          </button>
        </div>
      )}

      {showActions && isOverdue && onCheckin && (
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onCheckin(trip.id)}
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
}
