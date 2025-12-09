'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Heart, MessageCircle, Share2, Clock, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { formatRelativeTime, getRiskTypeText, getSeverityText } from '@/lib/utils';

export default function RiskReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { riskReports, toggleLike } = useAppStore();

  const report = riskReports.find((r) => r.id === params.id);

  if (!report) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-navy-500">위험정보</h1>
        </div>
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">위험정보를 찾을 수 없습니다</p>
          <Link href="/risk-reports" className="btn-primary inline-block mt-4">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const severityColors = {
    critical: 'bg-danger-100 text-danger-700 border-danger-200',
    high: 'bg-accent-100 text-accent-700 border-accent-200',
    medium: 'bg-warning-100 text-warning-700 border-warning-200',
    low: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const typeIcons = {
    weather: '🌧️',
    sea_condition: '🌊',
    equipment: '🔧',
    obstacle: '⚠️',
    other: '📌',
  };

  return (
    <div className="pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-navy-500 flex-1">위험정보</h1>
          <button className="touch-target text-gray-600">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="px-4 py-6 space-y-6">
        {/* 위험 수준 배너 */}
        <div className={`p-4 rounded-xl border ${severityColors[report.severity]}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} />
            <div>
              <p className="font-bold text-lg">{getSeverityText(report.severity)} 위험</p>
              <p className="text-sm opacity-80">
                {report.severity === 'critical' && '즉시 대피가 필요합니다'}
                {report.severity === 'high' && '각별한 주의가 필요합니다'}
                {report.severity === 'medium' && '주의를 기울여 주세요'}
                {report.severity === 'low' && '참고 정보입니다'}
              </p>
            </div>
          </div>
        </div>

        {/* 제목 및 유형 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{typeIcons[report.type]}</span>
            <span className="badge bg-gray-100 text-gray-700">
              {getRiskTypeText(report.type)}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-navy-500">{report.title}</h2>
        </div>

        {/* 위치 및 시간 */}
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin size={18} />
            <span>{report.location.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={18} />
            <span>{formatRelativeTime(report.createdAt)}</span>
          </div>
        </div>

        {/* 상세 설명 */}
        <div className="card">
          <h3 className="font-semibold text-navy-500 mb-3">상세 내용</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {report.description}
          </p>
        </div>

        {/* 작성자 정보 */}
        <div className="card">
          <h3 className="font-semibold text-navy-500 mb-3">작성자</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="font-semibold text-navy-500">{report.author.name}</p>
              <p className="text-sm text-gray-500">{report.author.harbor.name}</p>
            </div>
          </div>
        </div>

        {/* 반응 */}
        <div className="flex items-center gap-6 py-4 border-t border-b border-gray-100">
          <button
            onClick={() => toggleLike(report.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              report.isLiked
                ? 'bg-danger-50 text-danger-500'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart size={20} fill={report.isLiked ? 'currentColor' : 'none'} />
            <span className="font-medium">도움됨 {report.likes}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle size={20} />
            <span>댓글 {report.comments}</span>
          </div>
        </div>

        {/* 댓글 섹션 (데모) */}
        <div>
          <h3 className="font-semibold text-navy-500 mb-3">댓글</h3>
          <div className="space-y-4">
            <div className="card bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span>👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-navy-500">박민수</span>
                    <span className="text-xs text-gray-400">30분 전</span>
                  </div>
                  <p className="text-gray-600">좋은 정보 감사합니다. 저도 오늘 그쪽에 가려고 했는데 참고하겠습니다.</p>
                </div>
              </div>
            </div>
            <div className="card bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span>👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-navy-500">이철수</span>
                    <span className="text-xs text-gray-400">1시간 전</span>
                  </div>
                  <p className="text-gray-600">저도 아까 비슷한 상황을 봤어요. 모두 조심하세요!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 입력 (하단 고정) */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className="input flex-1"
          />
          <button className="btn-primary px-4">등록</button>
        </div>
      </div>
    </div>
  );
}
