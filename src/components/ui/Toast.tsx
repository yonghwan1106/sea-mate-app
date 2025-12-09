'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore, ToastType } from '@/store/toastStore';
import { cn } from '@/lib/utils';

const toastConfig: Record<ToastType, { icon: typeof CheckCircle; bgColor: string; textColor: string }> = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-secondary-50 border-secondary-200',
    textColor: 'text-secondary-700',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-danger-50 border-danger-200',
    textColor: 'text-danger-700',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-warning-50 border-warning-200',
    textColor: 'text-warning-700',
  },
  info: {
    icon: Info,
    bgColor: 'bg-primary-50 border-primary-200',
    textColor: 'text-primary-700',
  },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 space-y-2"
      role="region"
      aria-label="알림"
    >
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl border shadow-card animate-slide-up',
              config.bgColor
            )}
            role="alert"
            aria-live="polite"
          >
            <Icon size={20} className={config.textColor} aria-hidden="true" />
            <p className={cn('flex-1 text-sm font-medium', config.textColor)}>
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className={cn(
                'p-1 rounded-lg hover:bg-black/5 transition-colors',
                config.textColor
              )}
              aria-label="알림 닫기"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
