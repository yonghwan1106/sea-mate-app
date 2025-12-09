'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { AlertTriangle, AlertCircle, AlertOctagon, Info, CheckCircle } from 'lucide-react';

export type BadgeSeverity = 'low' | 'medium' | 'high' | 'critical';
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  severity?: BadgeSeverity;
  variant?: BadgeVariant;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

const severityConfig = {
  low: {
    className: 'badge-low',
    icon: Info,
    text: '낮음',
  },
  medium: {
    className: 'badge-medium',
    icon: AlertCircle,
    text: '보통',
  },
  high: {
    className: 'badge-high',
    icon: AlertTriangle,
    text: '높음',
  },
  critical: {
    className: 'badge-critical',
    icon: AlertOctagon,
    text: '위험',
  },
};

const variantStyles = {
  default: 'bg-white/20 text-white',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-orange-500/20 text-orange-400',
  danger: 'bg-red-500/20 text-red-400',
  info: 'bg-cyan-500/20 text-cyan-400',
  purple: 'bg-purple-500/20 text-purple-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  severity,
  variant,
  showIcon = true,
  size = 'sm',
  className = '',
  children,
  ...props
}: BadgeProps) {
  // severity가 있으면 severity 기반 스타일 사용
  if (severity) {
    const config = severityConfig[severity];
    const Icon = config.icon;

    return (
      <span
        className={`badge ${config.className} ${sizeStyles[size]} ${className}`}
        role="status"
        aria-label={`심각도: ${config.text}`}
        {...props}
      >
        {showIcon && <Icon size={size === 'sm' ? 12 : 14} aria-hidden="true" />}
        {children || config.text}
      </span>
    );
  }

  // variant 기반 스타일
  return (
    <span
      className={`badge ${variantStyles[variant || 'default']} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

// 상태 배지 (온라인/오프라인/출항중 등)
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'online' | 'offline' | 'sailing' | 'fishing' | 'returning' | 'sos';
}

const statusConfig = {
  online: { className: 'bg-green-500', text: '온라인' },
  offline: { className: 'bg-gray-500', text: '오프라인' },
  sailing: { className: 'bg-cyan-500', text: '항해중' },
  fishing: { className: 'bg-blue-500', text: '조업중' },
  returning: { className: 'bg-purple-500', text: '귀항중' },
  sos: { className: 'bg-red-500 animate-pulse', text: 'SOS' },
};

export function StatusBadge({ status, className = '', ...props }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-white ${config.className} ${className}`}
      role="status"
      aria-label={config.text}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
      {config.text}
    </span>
  );
}

// 온라인 인디케이터 (아바타 옆에 사용)
export interface OnlineIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  isOnline: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const indicatorSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function OnlineIndicator({ isOnline, size = 'md', className = '', ...props }: OnlineIndicatorProps) {
  return (
    <span
      className={`
        ${indicatorSizes[size]}
        rounded-full border-2 border-[#1a365d]
        ${isOnline ? 'bg-green-400' : 'bg-gray-500'}
        ${className}
      `}
      role="status"
      aria-label={isOnline ? '온라인' : '오프라인'}
      {...props}
    />
  );
}

export default Badge;
