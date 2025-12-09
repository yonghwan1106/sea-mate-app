'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Camera, AlertTriangle, Check } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useAppStore } from '@/store/appStore';
import { RiskType, Severity } from '@/types';
import { mockHarbors } from '@/data/mockHarbors';

export default function NewRiskReportPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { addRiskReport, addNotification } = useAppStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<RiskType>('weather');
  const [severity, setSeverity] = useState<Severity>('medium');
  const [locationId, setLocationId] = useState(user?.harbor.id || 'harbor-001');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const riskTypes: { value: RiskType; label: string; icon: string }[] = [
    { value: 'weather', label: '기상', icon: '🌧️' },
    { value: 'sea_condition', label: '해상상태', icon: '🌊' },
    { value: 'equipment', label: '장비고장', icon: '🔧' },
    { value: 'obstacle', label: '장애물', icon: '⚠️' },
    { value: 'other', label: '기타', icon: '📌' },
  ];

  const severities: { value: Severity; label: string; color: string; desc: string }[] = [
    { value: 'low', label: '낮음', color: 'bg-gray-100 border-gray-300 text-gray-700', desc: '참고용 정보' },
    { value: 'medium', label: '보통', color: 'bg-warning-100 border-warning-300 text-warning-700', desc: '주의 필요' },
    { value: 'high', label: '높음', color: 'bg-accent-100 border-accent-300 text-accent-700', desc: '위험 경고' },
    { value: 'critical', label: '심각', color: 'bg-danger-100 border-danger-300 text-danger-700', desc: '즉시 대피' },
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !user) return;

    setIsSubmitting(true);

    // 위험정보 등록
    const selectedLocation = mockHarbors.find((h) => h.id === locationId) || mockHarbors[0];

    addRiskReport({
      title: title.trim(),
      description: description.trim(),
      type,
      severity,
      location: selectedLocation,
      author: user,
    });

    // 포인트 알림
    addNotification({
      type: 'point_earn',
      title: '포인트 적립',
      message: '위험정보 공유로 100포인트가 적립되었습니다!',
      link: '/points',
    });

    // 성공 표시
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/risk-reports');
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-6 animate-slide-up">
          <Check size={40} className="text-secondary-500" />
        </div>
        <h2 className="text-2xl font-bold text-navy-500 mb-2">등록 완료!</h2>
        <p className="text-gray-500 text-center">
          위험정보 공유 감사합니다.<br />
          100포인트가 적립되었습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/risk-reports" className="touch-target">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-navy-500">위험정보 공유</h1>
          <p className="text-sm text-gray-500">어민들과 위험 정보를 나눠주세요</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 위험 유형 선택 */}
        <div>
          <label className="label">위험 유형</label>
          <div className="grid grid-cols-5 gap-2">
            {riskTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  type === t.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className={`text-xs font-medium ${
                  type === t.value ? 'text-primary-600' : 'text-gray-600'
                }`}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 위험 수준 */}
        <div>
          <label className="label">위험 수준</label>
          <div className="grid grid-cols-2 gap-3">
            {severities.map((s) => (
              <button
                key={s.value}
                onClick={() => setSeverity(s.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  severity === s.value
                    ? `${s.color} border-current`
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={18} className={severity === s.value ? '' : 'text-gray-400'} />
                  <span className="font-semibold">{s.label}</span>
                </div>
                <p className="text-sm opacity-80">{s.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div>
          <label className="label">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 동쪽 해역 강풍 주의"
            className="input-lg"
            maxLength={50}
          />
          <p className="text-sm text-gray-400 mt-1">{title.length}/50</p>
        </div>

        {/* 상세 설명 */}
        <div>
          <label className="label">상세 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="위험 상황을 자세히 설명해주세요..."
            className="input-lg min-h-[120px] resize-none"
            maxLength={500}
          />
          <p className="text-sm text-gray-400 mt-1">{description.length}/500</p>
        </div>

        {/* 위치 */}
        <div>
          <label className="label">
            <MapPin size={16} className="inline mr-1" />
            위치
          </label>
          <select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            className="input-lg"
          >
            {mockHarbors.map((harbor) => (
              <option key={harbor.id} value={harbor.id}>
                {harbor.name} ({harbor.region})
              </option>
            ))}
          </select>
        </div>

        {/* 사진 추가 (데모) */}
        <div>
          <label className="label">
            <Camera size={16} className="inline mr-1" />
            사진 첨부 (선택)
          </label>
          <button className="w-full p-8 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors">
            <Camera size={32} className="mx-auto mb-2" />
            <span>터치하여 사진 추가</span>
          </button>
          <p className="text-xs text-gray-400 mt-1">* 데모 버전에서는 사진 기능이 제한됩니다</p>
        </div>

        {/* 포인트 안내 */}
        <div className="card bg-warning-50 border border-warning-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🎉</span>
            </div>
            <div>
              <p className="font-semibold text-warning-700">위험정보 공유 보상</p>
              <p className="text-sm text-warning-600">등록 시 100포인트 적립!</p>
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || isSubmitting}
          className="btn-primary w-full text-lg py-4"
        >
          {isSubmitting ? '등록 중...' : '위험정보 공유하기'}
        </button>
      </div>
    </div>
  );
}
