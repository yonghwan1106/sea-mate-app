import { create } from 'zustand';
import { User, Trip, RiskReport, Notification } from '@/types';
import { currentUser, trips, riskReports, notifications } from '@/data/mockDatabase';

interface AppState {
  // 사용자 상태
  user: User | null;
  setUser: (user: User | null) => void;

  // 현재 출항 상태
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  startTrip: (trip: Trip) => void;
  endTrip: () => void;
  checkin: () => void;

  // 위험 정보
  riskReports: RiskReport[];
  addRiskReport: (report: RiskReport) => void;
  likeRiskReport: (reportId: string) => void;

  // 알림
  notifications: Notification[];
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (notification: Notification) => void;

  // SOS 상태
  sosActive: boolean;
  setSosActive: (active: boolean) => void;
  triggerSOS: () => void;
  cancelSOS: () => void;

  // UI 상태
  isVoiceInputActive: boolean;
  setVoiceInputActive: (active: boolean) => void;
  showCheckinModal: boolean;
  setShowCheckinModal: (show: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // 초기 상태
  user: currentUser,
  currentTrip: trips.find(t => t.userId === currentUser.id && ['sailing', 'fishing', 'returning'].includes(t.status)) || null,
  riskReports: riskReports,
  notifications: notifications,
  sosActive: false,
  isVoiceInputActive: false,
  showCheckinModal: false,

  // 사용자 액션
  setUser: (user) => set({ user }),

  // 출항 액션
  setCurrentTrip: (trip) => set({ currentTrip: trip }),

  startTrip: (trip) => {
    set({ currentTrip: trip });
    // 알림 추가
    const notification: Notification = {
      id: `n_${Date.now()}`,
      userId: trip.userId,
      type: 'buddy',
      title: '출항 등록 완료',
      message: trip.buddyName
        ? `${trip.buddyName}님이 오늘의 동료로 매칭되었습니다.`
        : '안전한 조업 되세요!',
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/buddy'
    };
    get().addNotification(notification);
  },

  endTrip: () => {
    const currentTrip = get().currentTrip;
    if (currentTrip) {
      // 무사 귀항 알림
      const notification: Notification = {
        id: `n_${Date.now()}`,
        userId: currentTrip.userId,
        type: 'point',
        title: '무사 귀항!',
        message: '오늘도 안전하게 귀항하셨습니다. 300P가 적립되었습니다.',
        isRead: false,
        createdAt: new Date().toISOString(),
        actionUrl: '/mypage'
      };
      get().addNotification(notification);
    }
    set({ currentTrip: null });
  },

  checkin: () => {
    const currentTrip = get().currentTrip;
    if (currentTrip) {
      const newCheckin = {
        id: `ck_${Date.now()}`,
        time: new Date().toISOString(),
        status: 'ok' as const,
        location: currentTrip.currentLocation
          ? { lat: currentTrip.currentLocation.lat, lng: currentTrip.currentLocation.lng }
          : undefined
      };
      set({
        currentTrip: {
          ...currentTrip,
          checkins: [...currentTrip.checkins, newCheckin]
        },
        showCheckinModal: false
      });
    }
  },

  // 위험 정보 액션
  addRiskReport: (report) => {
    set((state) => ({
      riskReports: [report, ...state.riskReports]
    }));
    // 포인트 적립 알림
    const notification: Notification = {
      id: `n_${Date.now()}`,
      userId: report.userId,
      type: 'point',
      title: '포인트 적립',
      message: '위험정보 공유로 100P가 적립되었습니다.',
      isRead: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/mypage'
    };
    get().addNotification(notification);
  },

  likeRiskReport: (reportId) => {
    set((state) => ({
      riskReports: state.riskReports.map((r) =>
        r.id === reportId ? { ...r, likes: r.likes + 1 } : r
      )
    }));
  },

  // 알림 액션
  markNotificationAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    }));
  },

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications]
    }));
  },

  // SOS 액션
  setSosActive: (active) => set({ sosActive: active }),

  triggerSOS: () => {
    set({ sosActive: true });
    // 실제로는 여기서 서버에 SOS 요청을 보내고 해경/가족/동료에게 알림
    const user = get().user;
    if (user) {
      const notification: Notification = {
        id: `n_${Date.now()}`,
        userId: user.id,
        type: 'sos',
        title: 'SOS 발신 완료',
        message: '긴급 구조 요청이 발신되었습니다. 해경과 동료에게 알림이 전송되었습니다.',
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      get().addNotification(notification);
    }
  },

  cancelSOS: () => {
    set({ sosActive: false });
    const user = get().user;
    if (user) {
      const notification: Notification = {
        id: `n_${Date.now()}`,
        userId: user.id,
        type: 'system',
        title: 'SOS 취소됨',
        message: 'SOS 요청이 취소되었습니다.',
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      get().addNotification(notification);
    }
  },

  // UI 액션
  setVoiceInputActive: (active) => set({ isVoiceInputActive: active }),
  setShowCheckinModal: (show) => set({ showCheckinModal: show }),
}));
