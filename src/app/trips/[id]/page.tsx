'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Ship, Clock, MapPin, Users, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { formatDate, formatRelativeTime } from '@/lib/utils';

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { trips, updateTripStatus, addCheckin } = useAppStore();

  const trip = trips.find((t) => t.id === params.id);

  if (!trip) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-navy-500">출항 정보</h1>
        </div>
        <div className="text-center py-12">
          <Ship size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">출항 정보를 찾을 수 없습니다</p>
          <Link href="/trips" className="btn-primary inline-block mt-4">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
    scheduled: { label: '예정', color: 'bg-gray-100 text-gray-700', bgColor: 'bg-gray-50' },
    preparing: { label: '준비 중', color: 'bg-gray-100 text-gray-700', bgColor: 'bg-gray-50' },
    sailing: { label: '운항 중', color: 'bg-primary-100 text-primary-700', bgColor: 'bg-primary-50' },
    returning: { label: '귀항 중', color: 'bg-secondary-100 text-secondary-700', bgColor: 'bg-secondary-50' },
    completed: { label: '완료', color: 'bg-secondary-100 text-secondary-700', bgColor: 'bg-secondary-50' },
    cancelled: { label: '취소', color: 'bg-gray-100 text-gray-500', bgColor: 'bg-gray-50' },
    sos: { label: 'SOS', color: 'bg-danger-100 text-danger-700', bgColor: 'bg-danger-50' },
    overdue: { label: '지연', color: 'bg-danger-100 text-danger-700', bgColor: 'bg-danger-50' },
  };

  const isActive = trip.status === 'sailing';
  const isOverdue = trip.status === 'overdue';

  return (
    <div className="pb-24">
      {/* 헤더 */}
      <div className={`${statusConfig[trip.status].bgColor} px-4 py-6`}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => router.back()} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-navy-500 flex-1">출항 상세</h1>
          <span className={`badge ${statusConfig[trip.status].color}`}>
            {statusConfig[trip.status].label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Ship size={32} className="text-primary-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-500">{trip.destination}</h2>
            <p className="text-gray-500">{trip.vessel.name}</p>
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="px-4 py-6 space-y-6">
        {/* 지연 경고 */}
        {isOverdue && (
          <div className="card bg-danger-50 border-2 border-danger-200">
            <div className="flex items-center gap-3">
              <AlertCircle size={24} className="text-danger-500" />
              <div>
                <p className="font-bold text-danger-700">귀항 지연 중</p>
                <p className="text-sm text-danger-600">예정 귀항 시간을 초과했습니다</p>
              </div>
            </div>
          </div>
        )}

        {/* 시간 정보 */}
        <div className="card">
          <h3 className="font-semibold text-navy-500 mb-4">일정 정보</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">출항 시간</p>
                <p className="font-semibold text-navy-500">
                  {formatDate(trip.departureTime, 'yyyy년 MM월 dd일 HH:mm')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">예상 귀항</p>
                <p className="font-semibold text-navy-500">
                  {formatDate(trip.expectedReturn, 'yyyy년 MM월 dd일 HH:mm')}
                </p>
              </div>
            </div>
            {trip.actualReturn && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">실제 귀항</p>
                  <p className="font-semibold text-navy-500">
                    {formatDate(trip.actualReturn, 'yyyy년 MM월 dd일 HH:mm')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 승선 정보 */}
        <div className="card">
          <h3 className="font-semibold text-navy-500 mb-4">승선 정보</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">승선 인원</p>
              <p className="font-semibold text-navy-500">{trip.crewCount}명</p>
            </div>
          </div>
        </div>

        {/* 체크인 기록 */}
        <div className="card">
          <h3 className="font-semibold text-navy-500 mb-4">
            체크인 기록 ({trip.checkins.length}회)
          </h3>
          {trip.checkins.length === 0 ? (
            <p className="text-gray-400 text-center py-4">아직 체크인 기록이 없습니다</p>
          ) : (
            <div className="space-y-3">
              {trip.checkins.map((checkin, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-secondary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-500">체크인 #{index + 1}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(checkin.time, 'HH:mm')} · {checkin.location}
                    </p>
                  </div>
                  <span className="text-xs text-secondary-600 bg-secondary-50 px-2 py-1 rounded">
                    {checkin.status === 'ok' ? '정상' : '비상'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 비고 */}
        {trip.notes && (
          <div className="card">
            <h3 className="font-semibold text-navy-500 mb-2">비고</h3>
            <p className="text-gray-600">{trip.notes}</p>
          </div>
        )}
      </div>

      {/* 하단 액션 버튼 */}
      {(isActive || isOverdue) && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-lg mx-auto flex gap-3">
            {isActive && (
              <>
                <button
                  onClick={() => addCheckin(trip.id)}
                  className="flex-1 btn-primary py-3"
                >
                  ✓ 체크인 (+50P)
                </button>
                <button
                  onClick={() => updateTripStatus(trip.id, 'completed')}
                  className="flex-1 btn-secondary py-3"
                >
                  귀항 완료
                </button>
              </>
            )}
            {isOverdue && (
              <>
                <button
                  onClick={() => addCheckin(trip.id)}
                  className="flex-1 btn-danger py-3"
                >
                  안전 확인
                </button>
                <Link href="/sos" className="flex-1">
                  <button className="w-full btn-outline py-3 border-danger-500 text-danger-500 flex items-center justify-center gap-2">
                    <Phone size={18} />
                    SOS 요청
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
