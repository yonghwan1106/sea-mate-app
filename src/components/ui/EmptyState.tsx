'use client';

import { ReactNode } from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state-icon text-gray-400" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// 특정 상황별 빈 상태 프리셋
export function NoRiskReports({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-4xl">📢</span>}
      title="위험정보가 없습니다"
      description="현재 어항에 보고된 위험정보가 없습니다"
      action={onAdd ? { label: '위험정보 공유하기', onClick: onAdd } : undefined}
    />
  );
}

export function NoTrips() {
  return (
    <EmptyState
      icon={<span className="text-4xl">🚢</span>}
      title="출항 기록이 없습니다"
      description="아직 출항 기록이 없습니다"
    />
  );
}

export function NoBuddies() {
  return (
    <EmptyState
      icon={<span className="text-4xl">👥</span>}
      title="출항 중인 동료가 없습니다"
      description="현재 어항에서 출항 중인 동료가 없습니다"
    />
  );
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={<span className="text-4xl">🔔</span>}
      title="알림이 없습니다"
      description="새로운 알림이 없습니다"
    />
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      icon={<span className="text-4xl">🔍</span>}
      title="검색 결과가 없습니다"
      description={`"${query}"에 대한 검색 결과가 없습니다`}
    />
  );
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      icon={<span className="text-4xl">📡</span>}
      title="연결 오류"
      description="네트워크 연결을 확인해주세요"
      action={{ label: '다시 시도', onClick: onRetry }}
    />
  );
}

export default EmptyState;
