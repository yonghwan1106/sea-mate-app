import { create } from 'zustand';
import { RiskReport, Trip, Notification } from '@/types';
import { mockRiskReports } from '@/data/mockRiskReports';
import { mockTrips } from '@/data/mockTrips';

interface AppState {
  // 위험정보
  riskReports: RiskReport[];
  addRiskReport: (report: Omit<RiskReport, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  toggleLike: (reportId: string) => void;

  // 출항
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'checkins'>) => void;
  updateTripStatus: (tripId: string, status: Trip['status']) => void;
  addCheckin: (tripId: string) => void;

  // 알림
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;

  // SOS
  sosActive: boolean;
  activateSOS: () => void;
  deactivateSOS: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // 위험정보 초기 데이터
  riskReports: mockRiskReports,

  addRiskReport: (report) => {
    const newReport: RiskReport = {
      ...report,
      id: `risk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    set((state) => ({
      riskReports: [newReport, ...state.riskReports],
    }));
  },

  toggleLike: (reportId) => {
    set((state) => ({
      riskReports: state.riskReports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              isLiked: !report.isLiked,
              likes: report.isLiked ? report.likes - 1 : report.likes + 1,
            }
          : report
      ),
    }));
  },

  // 출항 초기 데이터
  trips: mockTrips,

  addTrip: (trip) => {
    const newTrip: Trip = {
      ...trip,
      id: `trip-${Date.now()}`,
      checkins: [],
    };
    set((state) => ({
      trips: [newTrip, ...state.trips],
    }));
  },

  updateTripStatus: (tripId, status) => {
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              status,
              actualReturn: status === 'completed' ? new Date().toISOString() : trip.actualReturn,
            }
          : trip
      ),
    }));
  },

  addCheckin: (tripId) => {
    set((state) => ({
      trips: state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checkins: [
                ...trip.checkins,
                {
                  time: new Date().toISOString(),
                  status: 'ok' as const,
                  location: trip.destination,
                },
              ],
            }
          : trip
      ),
    }));
  },

  // 알림
  notifications: [
    {
      id: 'notif-001',
      type: 'checkin_reminder',
      title: '체크인 알림',
      message: '안전 체크인 시간입니다. 터치해서 체크인하세요!',
      createdAt: new Date().toISOString(),
      isRead: false,
      link: '/trips',
    },
    {
      id: 'notif-002',
      type: 'risk_alert',
      title: '위험 경고',
      message: '김순득님이 동쪽 해역 파도 경고를 공유했습니다.',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      isRead: false,
      link: '/risk-reports',
    },
    {
      id: 'notif-003',
      type: 'buddy_matched',
      title: '동료 매칭',
      message: '이철수님이 오늘의 동료로 매칭되었습니다.',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isRead: true,
      link: '/buddy',
    },
  ],

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },

  markAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, isRead: true })),
    }));
  },

  // SOS
  sosActive: false,

  activateSOS: () => {
    set({ sosActive: true });
    // 3초 후 자동 비활성화 (데모용)
    setTimeout(() => {
      set({ sosActive: false });
    }, 5000);
  },

  deactivateSOS: () => {
    set({ sosActive: false });
  },
}));
