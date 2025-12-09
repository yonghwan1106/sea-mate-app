'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, Check, AlertTriangle, Ship, Users, Award, Phone } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { formatRelativeTime } from '@/lib/utils';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead } = useAppStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, { icon: any; bg: string; color: string }> = {
      checkin_reminder: { icon: Bell, bg: 'bg-primary-100', color: 'text-primary-600' },
      risk_alert: { icon: AlertTriangle, bg: 'bg-warning-100', color: 'text-warning-600' },
      buddy_matched: { icon: Users, bg: 'bg-secondary-100', color: 'text-secondary-600' },
      trip_start: { icon: Ship, bg: 'bg-primary-100', color: 'text-primary-600' },
      point_earn: { icon: Award, bg: 'bg-warning-100', color: 'text-warning-600' },
      sos_alert: { icon: Phone, bg: 'bg-danger-100', color: 'text-danger-600' },
    };
    return icons[type] || { icon: Bell, bg: 'bg-gray-100', color: 'text-gray-600' };
  };

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="touch-target">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-navy-500">알림</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500">읽지 않은 알림 {unreadCount}개</p>
            )}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary-500 font-medium"
          >
            모두 읽음
          </button>
        )}
      </div>

      {/* 알림 리스트 */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">알림이 없습니다</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { icon: Icon, bg, color } = getNotificationIcon(notification.type);

            return (
              <Link
                key={notification.id}
                href={notification.link || '#'}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
                className={`card block ${!notification.isRead ? 'bg-primary-50 border border-primary-100' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-navy-500">{notification.title}</p>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-primary-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-400">
                      {formatRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
