// 사용자 타입
export interface User {
  id: string;
  name: string;
  phone: string;
  age: number;
  harborId: string;
  harborName: string;
  vesselName: string;
  vesselNumber: string;
  profileImage: string;
  healthConditions: string[];
  emergencyContacts: EmergencyContact[];
  points: number;
  totalTrips: number;
  safeTrips: number;
  joinedAt: string;
  language: 'ko' | 'en' | 'vi';
  isOnline: boolean;
  lastLocation?: {
    lat: number;
    lng: number;
    updatedAt: string;
  };
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

// 어항 정보
export interface Harbor {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  memberCount: number;
}

// 위험 정보
export interface RiskReport {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  type: 'wave' | 'wind' | 'obstacle' | 'weather' | 'equipment' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  content: string;
  voiceText?: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  mediaUrls: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// 출항 기록
export interface Trip {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  vesselName: string;
  departureTime: string;
  expectedReturn: string;
  actualReturn?: string;
  destination: {
    lat: number;
    lng: number;
    name: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
    updatedAt: string;
  };
  status: 'preparing' | 'sailing' | 'fishing' | 'returning' | 'completed' | 'sos' | 'unresponsive';
  buddyId?: string;
  buddyName?: string;
  checkins: Checkin[];
  notes?: string;
}

export interface Checkin {
  id: string;
  time: string;
  status: 'ok' | 'pending' | 'missed';
  location?: {
    lat: number;
    lng: number;
  };
}

// 포인트 내역
export interface PointHistory {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  reason: string;
  category: 'risk_share' | 'rescue' | 'safe_trip' | 'education' | 'equipment' | 'insurance';
  createdAt: string;
}

// SOS 요청
export interface SOSRequest {
  id: string;
  userId: string;
visually: string;
  userPhone: string;
  vesselName: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'responding' | 'rescued' | 'cancelled';
  createdAt: string;
  responders: Responder[];
  coastGuardNotified: boolean;
  familyNotified: boolean;
}

export interface Responder {
  userId: string;
  userName: string;
  distance: number;
  eta: number;
  status: 'notified' | 'responding' | 'arrived';
}

// 날씨 정보
export interface WeatherInfo {
  temperature: number;
  waveHeight: number;
  windSpeed: number;
  windDirection: string;
  visibility: string;
  tideInfo: string;
  safetyLevel: 'safe' | 'caution' | 'warning' | 'danger';
  updatedAt: string;
}

// 알림
export interface Notification {
  id: string;
  userId: string;
  type: 'checkin' | 'risk' | 'sos' | 'buddy' | 'point' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// 안전 교육
export interface SafetyEducation {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  points: number;
  completedBy: string[];
  category: string;
}

// 장비/보험 상품
export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  pointsRequired: number;
  category: 'equipment' | 'insurance';
  imageUrl: string;
  stock: number;
}

// 통계
export interface Statistics {
  totalUsers: number;
  activeTrips: number;
  riskReportsToday: number;
  sosResolved: number;
  averageResponseTime: number;
  accidentReduction: number;
}
