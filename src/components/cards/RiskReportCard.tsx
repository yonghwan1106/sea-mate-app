'use client';

import Link from 'next/link';
import { AlertTriangle, AlertCircle, CheckCircle, Info, Heart, MessageCircle } from 'lucide-react';
import { RiskReport, Severity } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

interface RiskReportCardProps {
  report: RiskReport;
  onToggleLike?: (reportId: string) => void;
  showActions?: boolean;
}

// 위험도 아이콘 헬퍼
const getSeverityIcon = (severity: Severity) => {
  switch (severity) {
    case 'critical':
      return <AlertTriangle size={20} className="text-danger-600" aria-hidden="true" />;
    case 'high':
      return <AlertCircle size={20} className="text-accent-600" aria-hidden="true" />;
    case 'medium':
      return <Info size={20} className="text-warning-600" aria-hidden="true" />;
    case 'low':
    default:
      return <CheckCircle size={20} className="text-gray-600" aria-hidden="true" />;
  }
};

// 위험도 배경색 헬퍼
const getSeverityBgColor = (severity: Severity) => {
  switch (severity) {
    case 'critical':
      return 'bg-danger-100';
    case 'high':
      return 'bg-accent-100';
    case 'medium':
      return 'bg-warning-100';
    case 'low':
    default:
      return 'bg-gray-100';
  }
};

export default function RiskReportCard({ report, onToggleLike, showActions = true }: RiskReportCardProps) {
  return (
    <Link href={`/risk-reports/${report.id}`} className="card-hover block">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getSeverityBgColor(report.severity)}`}>
          {getSeverityIcon(report.severity)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy-500 truncate">{report.title}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{report.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{report.author.name}</span>
              <span>·</span>
              <span>{formatRelativeTime(report.createdAt)}</span>
            </div>
            {showActions && (
              <div className="flex items-center gap-3 text-sm">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleLike?.(report.id);
                  }}
                  className={`flex items-center gap-1 ${
                    report.isLiked ? 'text-danger-500' : 'text-gray-400'
                  }`}
                  aria-label={report.isLiked ? '좋아요 취소' : '좋아요'}
                >
                  <Heart size={16} fill={report.isLiked ? 'currentColor' : 'none'} aria-hidden="true" />
                  <span>{report.likes}</span>
                </button>
                <span className="flex items-center gap-1 text-gray-400">
                  <MessageCircle size={16} aria-hidden="true" />
                  <span>{report.comments}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
