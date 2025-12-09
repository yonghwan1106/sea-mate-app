'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, Heart, MessageCircle, Filter, MapPin } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { formatRelativeTime, getRiskTypeText, getSeverityText } from '@/lib/utils';
import { RiskType, Severity } from '@/types';

export default function RiskReportsPage() {
  const { riskReports, toggleLike } = useAppStore();
  const [filterType, setFilterType] = useState<RiskType | 'all'>('all');
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // 필터링된 위험정보
  const filteredReports = riskReports.filter((report) => {
    if (filterType !== 'all' && report.type !== filterType) return false;
    if (filterSeverity !== 'all' && report.severity !== filterSeverity) return false;
    return true;
  });

  const riskTypes: { value: RiskType | 'all'; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'weather', label: '기상' },
    { value: 'sea_condition', label: '해상상태' },
    { value: 'equipment', label: '장비' },
    { value: 'obstacle', label: '장애물' },
    { value: 'other', label: '기타' },
  ];

  const severities: { value: Severity | 'all'; label: string; color: string }[] = [
    { value: 'all', label: '전체', color: 'bg-gray-100 text-gray-700' },
    { value: 'critical', label: '심각', color: 'bg-danger-100 text-danger-700' },
    { value: 'high', label: '높음', color: 'bg-accent-100 text-accent-700' },
    { value: 'medium', label: '보통', color: 'bg-warning-100 text-warning-700' },
    { value: 'low', label: '낮음', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-500">위험정보</h1>
          <p className="text-gray-500">어민들이 공유한 실시간 위험 정보</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-xl transition-colors ${
            showFilters ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* 필터 */}
      {showFilters && (
        <div className="card mb-4 animate-slide-up">
          <h3 className="font-semibold text-navy-500 mb-3">위험 유형</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {riskTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === type.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <h3 className="font-semibold text-navy-500 mb-3">위험 수준</h3>
          <div className="flex flex-wrap gap-2">
            {severities.map((sev) => (
              <button
                key={sev.value}
                onClick={() => setFilterSeverity(sev.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterSeverity === sev.value
                    ? 'bg-primary-500 text-white'
                    : sev.color
                }`}
              >
                {sev.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 위험정보 리스트 */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">해당하는 위험정보가 없습니다</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="card-hover">
              <Link href={`/risk-reports/${report.id}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    report.severity === 'critical' ? 'bg-danger-100' :
                    report.severity === 'high' ? 'bg-accent-100' :
                    report.severity === 'medium' ? 'bg-warning-100' :
                    'bg-gray-100'
                  }`}>
                    <AlertTriangle size={20} className={
                      report.severity === 'critical' ? 'text-danger-600' :
                      report.severity === 'high' ? 'text-accent-600' :
                      report.severity === 'medium' ? 'text-warning-600' :
                      'text-gray-600'
                    } />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${
                        report.severity === 'critical' ? 'badge-danger' :
                        report.severity === 'high' ? 'bg-accent-100 text-accent-700' :
                        report.severity === 'medium' ? 'badge-warning' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getSeverityText(report.severity)}
                      </span>
                      <span className="badge bg-gray-100 text-gray-700">
                        {getRiskTypeText(report.type)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-navy-500 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <MapPin size={14} />
                  <span>{report.location.name}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(report.createdAt)}</span>
                </div>
              </Link>

              {/* 작성자 및 반응 */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{report.author.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(report.id);
                    }}
                    className={`flex items-center gap-1 ${
                      report.isLiked ? 'text-danger-500' : 'text-gray-400'
                    }`}
                  >
                    <Heart size={18} fill={report.isLiked ? 'currentColor' : 'none'} />
                    <span className="text-sm">{report.likes}</span>
                  </button>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageCircle size={18} />
                    <span className="text-sm">{report.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 등록 버튼 (FAB) */}
      <Link
        href="/risk-reports/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 active:scale-95 transition-all"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
