import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
}

export function formatDate(dateString: string, format?: string): string {
  const date = new Date(dateString);

  if (!format) {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  }

  // 간단한 포맷 파싱
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getSafetyLevelColor(level: string): string {
  switch (level) {
    case 'good':
      return 'text-secondary-500 bg-secondary-50';
    case 'caution':
      return 'text-warning-600 bg-warning-50';
    case 'warning':
      return 'text-accent-500 bg-accent-50';
    case 'danger':
      return 'text-danger-500 bg-danger-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
}

export function getSafetyLevelText(level: string): string {
  switch (level) {
    case 'good':
      return '양호';
    case 'caution':
      return '주의';
    case 'warning':
      return '경고';
    case 'danger':
      return '위험';
    default:
      return '확인중';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low':
      return 'text-secondary-500 bg-secondary-50 border-secondary-200';
    case 'medium':
      return 'text-warning-600 bg-warning-50 border-warning-200';
    case 'high':
      return 'text-accent-500 bg-accent-50 border-accent-200';
    case 'critical':
      return 'text-danger-500 bg-danger-50 border-danger-200';
    default:
      return 'text-gray-500 bg-gray-50 border-gray-200';
  }
}

export function getSeverityText(severity: string): string {
  switch (severity) {
    case 'low':
      return '낮음';
    case 'medium':
      return '보통';
    case 'high':
      return '높음';
    case 'critical':
      return '위험';
    default:
      return '확인중';
  }
}

export function getRiskTypeIcon(type: string): string {
  switch (type) {
    case 'wave':
      return '🌊';
    case 'wind':
      return '💨';
    case 'rock':
      return '🪨';
    case 'equipment':
      return '⚙️';
    case 'other':
      return '⚠️';
    default:
      return '❓';
  }
}

export function getRiskTypeText(type: string): string {
  switch (type) {
    case 'weather':
      return '기상';
    case 'sea_condition':
      return '해상상태';
    case 'wave':
      return '파도';
    case 'wind':
      return '바람';
    case 'rock':
      return '암초';
    case 'equipment':
      return '장비';
    case 'obstacle':
      return '장애물';
    case 'other':
      return '기타';
    default:
      return '기타';
  }
}

export function getTripStatusColor(status: string): string {
  switch (status) {
    case 'preparing':
      return 'text-gray-500 bg-gray-100';
    case 'sailing':
      return 'text-primary-500 bg-primary-50';
    case 'returning':
      return 'text-secondary-500 bg-secondary-50';
    case 'completed':
      return 'text-secondary-600 bg-secondary-100';
    case 'sos':
      return 'text-danger-500 bg-danger-50';
    case 'overdue':
      return 'text-accent-500 bg-accent-50';
    default:
      return 'text-gray-500 bg-gray-100';
  }
}

export function getTripStatusText(status: string): string {
  switch (status) {
    case 'preparing':
      return '준비중';
    case 'sailing':
      return '출항중';
    case 'returning':
      return '귀항중';
    case 'completed':
      return '귀항완료';
    case 'sos':
      return 'SOS';
    case 'overdue':
      return '시간초과';
    default:
      return '확인중';
  }
}

export function getPointReasonText(reason: string): string {
  switch (reason) {
    case 'risk_share':
      return '위험정보 공유';
    case 'rescue_help':
      return '구조 참여';
    case 'safety_training':
      return '안전교육 이수';
    case 'safe_return':
      return '무사고 귀항';
    case 'checkin':
      return '체크인';
    case 'monthly_safe':
      return '월간 무사고';
    case 'equipment_buy':
      return '장비 구매';
    case 'insurance_discount':
      return '보험료 할인';
    default:
      return '기타';
  }
}
