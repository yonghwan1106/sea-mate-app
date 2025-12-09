// 위치 정보
export interface Location {
  lat: number;
  lng: number;
  name: string;
}

// 어항 정보
export interface Harbor {
  id: string;
  name: string;
  region: string;
  fisherCount: number;
}

// 선박 정보
export interface Vessel {
  id: string;
  name: string;
  type: string;
  registrationNumber?: string;
}

// 비상연락처
export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

// 사용자 역할
export type UserRole = 'fisher' | 'family' | 'admin' | 'crew';

// 사용자
export interface User {
  id: string;
  name: string;
  phone: string;
  harbor: Harbor;
  vessel?: Vessel;
  age: number;
  healthConditions: string[];
  emergencyContacts: EmergencyContact[];
  points: number;
  role: UserRole;
  avatarUrl?: string;
  language?: 'ko' | 'en' | 'vi';
}

// 위험 유형
export type RiskType = 'wave' | 'wind' | 'rock' | 'equipment' | 'other';

// 위험도
export type Severity = 'low' | 'medium' | 'high' | 'critical';

// 위험정보
export interface RiskReport {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: RiskType;
  severity: Severity;
  location: Location;
  content: string;
  mediaUrls: string[];
  createdAt: string;
  expiresAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

// 체크인 상태
export type CheckinStatus = 'ok' | 'help' | 'missed';

// 체크인 기록
export interface Checkin {
  time: string;
  status: CheckinStatus;
  location?: Location;
}

// 출항 상태
export type TripStatus = 'preparing' | 'sailing' | 'returning' | 'completed' | 'sos' | 'overdue';

// 출항 기록
export interface Trip {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  vesselName: string;
  departureTime: string;
  expectedReturn: string;
  actualReturn?: string | null;
  destination: Location;
  status: TripStatus;
  buddyId?: string;
  buddyName?: string;
  checkins: Checkin[];
}

// 포인트 활동 유형
export type PointActivityType = 'earn' | 'spend';

// 포인트 사유
export type PointReason =
  | 'risk_share'      // 위험정보 공유
  | 'rescue_help'     // 구조 참여
  | 'safety_training' // 안전교육 이수
  | 'safe_return'     // 무사고 귀항
  | 'checkin'         // 체크인
  | 'monthly_safe'    // 월간 무사고
  | 'equipment_buy'   // 장비 구매
  | 'insurance_discount'; // 보험료 할인

// 포인트 기록
export interface PointHistory {
  id: string;
  userId: string;
  amount: number;
  type: PointActivityType;
  reason: PointReason;
  description: string;
  createdAt: string;
}

// 안전등급
export type SafetyLevel = 'good' | 'caution' | 'warning' | 'danger';

// 기상 정보
export interface WeatherData {
  current: {
    temperature: number;
    weather: string;
    waveHeight: number;
    windSpeed: number;
    windDirection: string;
    visibility: string;
    safetyLevel: SafetyLevel;
  };
  forecast: {
    date: string;
    weather: string;
    waveHeight: number;
    windSpeed: number;
    safetyLevel: SafetyLevel;
  }[];
  harbors: Record<string, {
    name: string;
    safetyLevel: SafetyLevel;
    waveHeight: number;
    windSpeed: number;
  }>;
}

// 알림 유형
export type NotificationType =
  | 'checkin_reminder'
  | 'buddy_matched'
  | 'risk_alert'
  | 'sos_alert'
  | 'return_reminder'
  | 'point_earned'
  | 'family_update';

// 알림
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

// 통계 데이터
export interface AdminStats {
  totalUsers: number;
  activeTodayUsers: number;
  currentSailingCount: number;
  todayRiskReports: number;
  todaySosCount: number;
  weeklyTripCount: number;
  monthlySafeReturn: number;
}
