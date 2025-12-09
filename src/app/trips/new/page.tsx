'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Ship, MapPin, Clock, Users, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { useToastStore } from '@/store/toastStore';
import { mockUsers } from '@/data/mockUsers';
import { cn } from '@/lib/utils';

export default function NewTripPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addTrip, addNotification } = useAppStore();
  const { addToast } = useToastStore();

  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [expectedReturnDate, setExpectedReturnDate] = useState('');
  const [expectedReturnTime, setExpectedReturnTime] = useState('');
  const [crewCount, setCrewCount] = useState(1);
  const [buddyId, setBuddyId] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 동료 목록 (현재 사용자 제외)
  const availableBuddies = mockUsers.filter(
    (u) => u.role === 'fisher' && u.id !== user?.id
  );

  // 입력 검증
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!destination.trim()) {
      newErrors.destination = '목적지를 입력해주세요';
    }
    if (!departureDate) {
      newErrors.departureDate = '출항 날짜를 선택해주세요';
    }
    if (!departureTime) {
      newErrors.departureTime = '출항 시간을 선택해주세요';
    }

    // 귀항 일시가 출항 일시보다 이전인지 검증
    if (departureDate && departureTime && expectedReturnDate && expectedReturnTime) {
      const departure = new Date(`${departureDate}T${departureTime}`);
      const returnDt = new Date(`${expectedReturnDate}T${expectedReturnTime}`);
      if (returnDt <= departure) {
        newErrors.expectedReturn = '예상 귀항 시간은 출항 시간 이후여야 합니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (!validateForm()) {
      addToast({ type: 'error', message: '입력 정보를 확인해주세요' });
      return;
    }

    setIsSubmitting(true);

    const departureDateTime = new Date(`${departureDate}T${departureTime}`);
    const returnDateTime = expectedReturnDate && expectedReturnTime
      ? new Date(`${expectedReturnDate}T${expectedReturnTime}`)
      : new Date(departureDateTime.getTime() + 8 * 60 * 60 * 1000); // 기본 8시간 후

    addTrip({
      userId: user.id,
      vessel: user.vessel,
      destination: destination.trim(),
      departureTime: departureDateTime.toISOString(),
      expectedReturn: returnDateTime.toISOString(),
      status: 'scheduled',
      crewCount,
      buddyId: buddyId || undefined,
      notes: notes.trim() || undefined,
    });

    // 알림
    addNotification({
      type: 'trip_start',
      title: '출항 등록 완료',
      message: `${destination} 출항이 등록되었습니다.`,
      link: '/trips',
    });

    // 동료에게 알림 (데모)
    if (buddyId) {
      const buddy = availableBuddies.find((b) => b.id === buddyId);
      addNotification({
        type: 'buddy_matched',
        title: '동료 매칭',
        message: `${buddy?.name}님에게 출항 정보가 공유되었습니다.`,
        link: '/buddy',
      });
    }

    addToast({ type: 'success', message: '출항이 등록되었습니다!' });
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/trips');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-6 animate-slide-up">
          <Check size={40} className="text-secondary-500" />
        </div>
        <h2 className="text-2xl font-bold text-navy-500 mb-2">출항 등록 완료!</h2>
        <p className="text-gray-500 text-center">
          안전한 조업 되세요.<br />
          체크인을 잊지 마세요!
        </p>
      </div>
    );
  }

  // 오늘 날짜 (최소값으로 사용)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/trips" className="touch-target">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-navy-500">출항 등록</h1>
          <p className="text-sm text-gray-500">안전한 조업을 위해 출항 정보를 등록하세요</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 선박 정보 (자동) */}
        {user && (
          <div className="card bg-primary-50 border border-primary-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Ship size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-primary-600">내 선박</p>
                <p className="font-bold text-navy-500">{user.vessel?.name || '선박 미지정'}</p>
                <p className="text-sm text-gray-500">{user.harbor.name} 소속</p>
              </div>
            </div>
          </div>
        )}

        {/* 목적지 */}
        <div>
          <label className="label">
            <MapPin size={16} className="inline mr-1" />
            목적지 / 조업 해역
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              if (errors.destination) setErrors((prev) => ({ ...prev, destination: '' }));
            }}
            placeholder="예: 거제도 동쪽 해역"
            className={cn('input-lg', errors.destination && 'input-error')}
            aria-invalid={!!errors.destination}
            aria-describedby={errors.destination ? 'destination-error' : undefined}
          />
          {errors.destination && (
            <p id="destination-error" className="error-message">{errors.destination}</p>
          )}
        </div>

        {/* 출항 일시 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <Clock size={16} className="inline mr-1" />
              출항 날짜
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => {
                setDepartureDate(e.target.value);
                if (errors.departureDate) setErrors((prev) => ({ ...prev, departureDate: '' }));
              }}
              min={today}
              className={cn('input-lg', errors.departureDate && 'input-error')}
              aria-invalid={!!errors.departureDate}
            />
            {errors.departureDate && (
              <p className="error-message">{errors.departureDate}</p>
            )}
          </div>
          <div>
            <label className="label">출항 시간</label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => {
                setDepartureTime(e.target.value);
                if (errors.departureTime) setErrors((prev) => ({ ...prev, departureTime: '' }));
              }}
              className={cn('input-lg', errors.departureTime && 'input-error')}
              aria-invalid={!!errors.departureTime}
            />
            {errors.departureTime && (
              <p className="error-message">{errors.departureTime}</p>
            )}
          </div>
        </div>

        {/* 예상 귀항 일시 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">예상 귀항 날짜</label>
            <input
              type="date"
              value={expectedReturnDate}
              onChange={(e) => {
                setExpectedReturnDate(e.target.value);
                if (errors.expectedReturn) setErrors((prev) => ({ ...prev, expectedReturn: '' }));
              }}
              min={departureDate || today}
              className={cn('input-lg', errors.expectedReturn && 'input-error')}
            />
          </div>
          <div>
            <label className="label">예상 귀항 시간</label>
            <input
              type="time"
              value={expectedReturnTime}
              onChange={(e) => {
                setExpectedReturnTime(e.target.value);
                if (errors.expectedReturn) setErrors((prev) => ({ ...prev, expectedReturn: '' }));
              }}
              className={cn('input-lg', errors.expectedReturn && 'input-error')}
            />
          </div>
        </div>
        {errors.expectedReturn && (
          <p className="error-message -mt-4">{errors.expectedReturn}</p>
        )}

        {/* 승선 인원 */}
        <div>
          <label className="label">
            <Users size={16} className="inline mr-1" />
            승선 인원
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCrewCount(Math.max(1, crewCount - 1))}
              className="w-12 h-12 bg-gray-100 rounded-xl text-xl font-bold text-gray-600"
            >
              -
            </button>
            <span className="text-2xl font-bold text-navy-500 w-12 text-center">
              {crewCount}
            </span>
            <button
              onClick={() => setCrewCount(Math.min(10, crewCount + 1))}
              className="w-12 h-12 bg-gray-100 rounded-xl text-xl font-bold text-gray-600"
            >
              +
            </button>
            <span className="text-gray-500">명</span>
          </div>
        </div>

        {/* 동료 지정 */}
        <div>
          <label className="label">
            <Users size={16} className="inline mr-1" />
            오늘의 동료 (선택)
          </label>
          <select
            value={buddyId}
            onChange={(e) => setBuddyId(e.target.value)}
            className="input-lg"
          >
            <option value="">동료 선택...</option>
            {availableBuddies.map((buddy) => (
              <option key={buddy.id} value={buddy.id}>
                {buddy.name} ({buddy.harbor.name})
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-400 mt-1">
            동료를 지정하면 상대방에게 알림이 갑니다
          </p>
        </div>

        {/* 비고 */}
        <div>
          <label className="label">비고 (선택)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="특이사항이 있으면 입력하세요..."
            className="input-lg min-h-[80px] resize-none"
          />
        </div>

        {/* 안전 안내 */}
        <div className="card bg-secondary-50 border border-secondary-200">
          <h3 className="font-bold text-secondary-700 mb-2">💡 안전 체크인 안내</h3>
          <ul className="text-sm text-secondary-600 space-y-1">
            <li>• 출항 후 2시간마다 체크인을 해주세요</li>
            <li>• 체크인 시 50포인트 적립</li>
            <li>• 무사 귀항 시 300포인트 적립</li>
            <li>• 체크인이 없으면 동료와 가족에게 알림이 갑니다</li>
          </ul>
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!destination.trim() || !departureDate || !departureTime || isSubmitting}
          className="btn-primary w-full text-lg py-4"
        >
          {isSubmitting ? '등록 중...' : '출항 등록하기'}
        </button>
      </div>
    </div>
  );
}
