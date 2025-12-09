import {
  User, Harbor, RiskReport, Trip, PointHistory,
  SOSRequest, WeatherInfo, Notification, SafetyEducation,
  Product, Statistics
} from '@/types';

// ============================================================================
// 어항 데이터
// ============================================================================
export const harbors: Harbor[] = [
  { id: 'h1', name: '통영 강구항', region: '경남 통영시', lat: 34.8544, lng: 128.4331, memberCount: 156 },
  { id: 'h2', name: '여수 국동항', region: '전남 여수시', lat: 34.7604, lng: 127.6622, memberCount: 203 },
  { id: 'h3', name: '목포 북항', region: '전남 목포시', lat: 34.7936, lng: 126.3800, memberCount: 178 },
  { id: 'h4', name: '속초 중앙항', region: '강원 속초시', lat: 38.2070, lng: 128.5918, memberCount: 134 },
  { id: 'h5', name: '제주 한림항', region: '제주 제주시', lat: 33.4125, lng: 126.2653, memberCount: 189 },
  { id: 'h6', name: '부산 기장항', region: '부산 기장군', lat: 35.2441, lng: 129.2186, memberCount: 167 },
  { id: 'h7', name: '인천 연안부두', region: '인천 중구', lat: 37.4563, lng: 126.5952, memberCount: 145 },
  { id: 'h8', name: '포항 구룡포항', region: '경북 포항시', lat: 35.9896, lng: 129.5567, memberCount: 122 },
];

// ============================================================================
// 사용자 데이터 (다양한 페르소나 반영)
// ============================================================================
export const users: User[] = [
  {
    id: 'u1',
    name: '김순득',
    phone: '010-1234-5678',
    age: 68,
    harborId: 'h1',
    harborName: '통영 강구항',
    vesselName: '순득호',
    vesselNumber: '통영1234',
    profileImage: '/avatars/fisher1.png',
    healthConditions: ['고혈압', '당뇨'],
    emergencyContacts: [
      { name: '김영희', phone: '010-9876-5432', relation: '아내' },
      { name: '김철수', phone: '010-5555-1234', relation: '아들' }
    ],
    points: 12500,
    totalTrips: 1847,
    safeTrips: 1845,
    joinedAt: '2024-03-15',
    language: 'ko',
    isOnline: true,
    lastLocation: { lat: 34.8612, lng: 128.4523, updatedAt: '2025-12-09T06:30:00' }
  },
  {
    id: 'u2',
    name: '박영수',
    phone: '010-2345-6789',
    age: 55,
    harborId: 'h1',
    harborName: '통영 강구항',
    vesselName: '영수호',
    vesselNumber: '통영2345',
    profileImage: '/avatars/fisher2.png',
    healthConditions: [],
    emergencyContacts: [
      { name: '박순자', phone: '010-8765-4321', relation: '아내' }
    ],
    points: 8900,
    totalTrips: 956,
    safeTrips: 955,
    joinedAt: '2024-05-20',
    language: 'ko',
    isOnline: true,
    lastLocation: { lat: 34.8701, lng: 128.4612, updatedAt: '2025-12-09T06:45:00' }
  },
  {
    id: 'u3',
    name: '박민수',
    phone: '010-3456-7890',
    age: 42,
    harborId: 'h2',
    harborName: '여수 국동항',
    vesselName: '민수호',
    vesselNumber: '여수3456',
    profileImage: '/avatars/fisher3.png',
    healthConditions: [],
    emergencyContacts: [
      { name: '이수진', phone: '010-7654-3210', relation: '아내' },
      { name: '박지민', phone: '010-4444-5555', relation: '딸' }
    ],
    points: 15600,
    totalTrips: 423,
    safeTrips: 423,
    joinedAt: '2024-01-10',
    language: 'ko',
    isOnline: true,
    lastLocation: { lat: 34.7512, lng: 127.6734, updatedAt: '2025-12-09T05:30:00' }
  },
  {
    id: 'u4',
    name: '응웬 반',
    phone: '010-4567-8901',
    age: 29,
    harborId: 'h1',
    harborName: '통영 강구항',
    vesselName: '순득호 (선원)',
    vesselNumber: '통영1234',
    profileImage: '/avatars/fisher4.png',
    healthConditions: [],
    emergencyContacts: [
      { name: '김순득', phone: '010-1234-5678', relation: '선장' }
    ],
    points: 3200,
    totalTrips: 289,
    safeTrips: 289,
    joinedAt: '2024-08-01',
    language: 'vi',
    isOnline: true,
    lastLocation: { lat: 34.8612, lng: 128.4523, updatedAt: '2025-12-09T06:30:00' }
  },
  {
    id: 'u5',
    name: '이말순',
    phone: '010-5678-9012',
    age: 72,
    harborId: 'h3',
    harborName: '목포 북항',
    vesselName: '말순호',
    vesselNumber: '목포5678',
    profileImage: '/avatars/fisher5.png',
    healthConditions: ['관절염'],
    emergencyContacts: [
      { name: '이영호', phone: '010-6543-2109', relation: '아들' }
    ],
    points: 9800,
    totalTrips: 2156,
    safeTrips: 2153,
    joinedAt: '2024-02-28',
    language: 'ko',
    isOnline: false,
    lastLocation: { lat: 34.7823, lng: 126.3912, updatedAt: '2025-12-08T16:30:00' }
  },
  {
    id: 'u6',
    name: '최동해',
    phone: '010-6789-0123',
    age: 48,
    harborId: 'h4',
    harborName: '속초 중앙항',
    vesselName: '동해호',
    vesselNumber: '속초6789',
    profileImage: '/avatars/fisher6.png',
    healthConditions: [],
    emergencyContacts: [
      { name: '최미영', phone: '010-5432-1098', relation: '아내' }
    ],
    points: 11200,
    totalTrips: 678,
    safeTrips: 677,
    joinedAt: '2024-04-05',
    language: 'ko',
    isOnline: true,
    lastLocation: { lat: 38.2156, lng: 128.6023, updatedAt: '2025-12-09T07:00:00' }
  },
  {
    id: 'u7',
    name: '강제주',
    phone: '010-7890-1234',
    age: 52,
    harborId: 'h5',
    harborName: '제주 한림항',
    vesselName: '제주호',
    vesselNumber: '제주7890',
    profileImage: '/avatars/fisher7.png',
    healthConditions: ['고혈압'],
    emergencyContacts: [
      { name: '강순희', phone: '010-4321-0987', relation: '아내' }
    ],
    points: 7600,
    totalTrips: 534,
    safeTrips: 533,
    joinedAt: '2024-06-15',
    language: 'ko',
    isOnline: true,
    lastLocation: { lat: 33.4234, lng: 126.2789, updatedAt: '2025-12-09T06:15:00' }
  },
  {
    id: 'u8',
    name: '정부산',
    phone: '010-8901-2345',
    age: 61,
    harborId: 'h6',
    harborName: '부산 기장항',
    vesselName: '부산호',
    vesselNumber: '부산8901',
    profileImage: '/avatars/fisher8.png',
    healthConditions: [],
    emergencyContacts: [
      { name: '정명자', phone: '010-3210-9876', relation: '아내' }
    ],
    points: 10400,
    totalTrips: 892,
    safeTrips: 891,
    joinedAt: '2024-03-01',
    language: 'ko',
    isOnline: false,
    lastLocation: { lat: 35.2512, lng: 129.2301, updatedAt: '2025-12-08T18:00:00' }
  },
];

// ============================================================================
// 현재 로그인 사용자 (김순득 어르신)
// ============================================================================
export const currentUser = users[0];

// ============================================================================
// 위험 정보 데이터
// ============================================================================
export const riskReports: RiskReport[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: '김순득',
    userProfileImage: '/avatars/fisher1.png',
    type: 'obstacle',
    severity: 'high',
    content: '동쪽 해역에 떠다니는 그물 발견했어요. 지나갈 때 조심하세요!',
    voiceText: '동쪽 해역에 그물 떠다녀요',
    location: { lat: 34.8701, lng: 128.4812, name: '통영 동쪽 해역' },
    mediaUrls: ['/images/risk1.jpg'],
    likes: 23,
    comments: [
      { id: 'c1', userId: 'u2', userName: '박영수', content: '정보 감사합니다! 조심할게요', createdAt: '2025-12-09T07:15:00' },
      { id: 'c2', userId: 'u3', userName: '박민수', content: '어르신 덕분에 피했습니다 👍', createdAt: '2025-12-09T07:30:00' }
    ],
    createdAt: '2025-12-09T07:00:00',
    expiresAt: '2025-12-09T19:00:00',
    isActive: true
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: '박영수',
    userProfileImage: '/avatars/fisher2.png',
    type: 'wave',
    severity: 'medium',
    content: '남쪽 어장 파도 좀 높아지고 있습니다. 오후에는 더 심해질 것 같아요.',
    location: { lat: 34.8234, lng: 128.4501, name: '통영 남쪽 어장' },
    mediaUrls: [],
    likes: 15,
    comments: [
      { id: 'c3', userId: 'u1', userName: '김순득', content: '알겠어, 일찍 들어와야겠네', createdAt: '2025-12-09T08:20:00' }
    ],
    createdAt: '2025-12-09T08:00:00',
    expiresAt: '2025-12-09T20:00:00',
    isActive: true
  },
  {
    id: 'r3',
    userId: 'u6',
    userName: '최동해',
    userProfileImage: '/avatars/fisher6.png',
    type: 'weather',
    severity: 'high',
    content: '속초 앞바다 안개가 짙습니다. 시야 확보 어려우니 출항 자제하세요.',
    location: { lat: 38.2012, lng: 128.5823, name: '속초 앞바다' },
    mediaUrls: ['/images/risk3.jpg'],
    likes: 31,
    comments: [],
    createdAt: '2025-12-09T05:30:00',
    expiresAt: '2025-12-09T12:00:00',
    isActive: true
  },
  {
    id: 'r4',
    userId: 'u7',
    userName: '강제주',
    userProfileImage: '/avatars/fisher7.png',
    type: 'wind',
    severity: 'critical',
    content: '제주 한림 앞바다 돌풍 주의! 갑자기 바람이 세집니다.',
    location: { lat: 33.4156, lng: 126.2534, name: '제주 한림 앞바다' },
    mediaUrls: [],
    likes: 45,
    comments: [
      { id: 'c4', userId: 'u5', userName: '이말순', content: '우리도 조심해야겠다', createdAt: '2025-12-09T06:45:00' }
    ],
    createdAt: '2025-12-09T06:30:00',
    expiresAt: '2025-12-09T18:30:00',
    isActive: true
  },
  {
    id: 'r5',
    userId: 'u3',
    userName: '박민수',
    userProfileImage: '/avatars/fisher3.png',
    type: 'equipment',
    severity: 'low',
    content: '여수 국동항 급유소 오늘 오후 2시까지 점검으로 운영 중단이라고 합니다.',
    location: { lat: 34.7604, lng: 127.6622, name: '여수 국동항' },
    mediaUrls: [],
    likes: 8,
    comments: [],
    createdAt: '2025-12-09T09:00:00',
    expiresAt: '2025-12-09T14:00:00',
    isActive: true
  },
  {
    id: 'r6',
    userId: 'u5',
    userName: '이말순',
    userProfileImage: '/avatars/fisher5.png',
    type: 'other',
    severity: 'medium',
    content: '목포 북항 서쪽 방파제 보수공사 중입니다. 우회해서 입항하세요.',
    location: { lat: 34.7936, lng: 126.3700, name: '목포 북항 서쪽' },
    mediaUrls: ['/images/risk6.jpg'],
    likes: 12,
    comments: [],
    createdAt: '2025-12-08T16:00:00',
    expiresAt: '2025-12-15T18:00:00',
    isActive: true
  },
];

// ============================================================================
// 출항 기록 데이터
// ============================================================================
export const trips: Trip[] = [
  {
    id: 't1',
    userId: 'u1',
    userName: '김순득',
    userPhone: '010-1234-5678',
    vesselName: '순득호',
    departureTime: '2025-12-09T04:30:00',
    expectedReturn: '2025-12-09T14:00:00',
    destination: { lat: 34.8901, lng: 128.5012, name: '통영 동쪽 어장' },
    currentLocation: { lat: 34.8756, lng: 128.4823, updatedAt: '2025-12-09T09:30:00' },
    status: 'fishing',
    buddyId: 'u2',
    buddyName: '박영수',
    checkins: [
      { id: 'ck1', time: '2025-12-09T06:30:00', status: 'ok', location: { lat: 34.8612, lng: 128.4523 } },
      { id: 'ck2', time: '2025-12-09T08:30:00', status: 'ok', location: { lat: 34.8756, lng: 128.4723 } },
    ],
    notes: '오징어 조업'
  },
  {
    id: 't2',
    userId: 'u2',
    userName: '박영수',
    userPhone: '010-2345-6789',
    vesselName: '영수호',
    departureTime: '2025-12-09T04:45:00',
    expectedReturn: '2025-12-09T15:00:00',
    destination: { lat: 34.8801, lng: 128.4912, name: '통영 남동쪽 어장' },
    currentLocation: { lat: 34.8701, lng: 128.4812, updatedAt: '2025-12-09T09:45:00' },
    status: 'fishing',
    buddyId: 'u1',
    buddyName: '김순득',
    checkins: [
      { id: 'ck3', time: '2025-12-09T06:45:00', status: 'ok', location: { lat: 34.8601, lng: 128.4612 } },
      { id: 'ck4', time: '2025-12-09T08:45:00', status: 'ok', location: { lat: 34.8701, lng: 128.4812 } },
    ],
    notes: '멸치 조업'
  },
  {
    id: 't3',
    userId: 'u3',
    userName: '박민수',
    userPhone: '010-3456-7890',
    vesselName: '민수호',
    departureTime: '2025-12-09T05:00:00',
    expectedReturn: '2025-12-09T13:00:00',
    destination: { lat: 34.7701, lng: 127.6901, name: '여수 앞바다' },
    currentLocation: { lat: 34.7612, lng: 127.6812, updatedAt: '2025-12-09T09:00:00' },
    status: 'returning',
    checkins: [
      { id: 'ck5', time: '2025-12-09T07:00:00', status: 'ok', location: { lat: 34.7512, lng: 127.6734 } },
      { id: 'ck6', time: '2025-12-09T09:00:00', status: 'ok', location: { lat: 34.7612, lng: 127.6812 } },
    ],
    notes: '갈치 조업'
  },
  {
    id: 't4',
    userId: 'u6',
    userName: '최동해',
    userPhone: '010-6789-0123',
    vesselName: '동해호',
    departureTime: '2025-12-09T03:30:00',
    expectedReturn: '2025-12-09T11:00:00',
    destination: { lat: 38.2301, lng: 128.6201, name: '속초 동쪽 어장' },
    currentLocation: { lat: 38.2201, lng: 128.6101, updatedAt: '2025-12-09T09:30:00' },
    status: 'returning',
    checkins: [
      { id: 'ck7', time: '2025-12-09T05:30:00', status: 'ok', location: { lat: 38.2101, lng: 128.6001 } },
      { id: 'ck8', time: '2025-12-09T07:30:00', status: 'ok', location: { lat: 38.2251, lng: 128.6151 } },
      { id: 'ck9', time: '2025-12-09T09:30:00', status: 'ok', location: { lat: 38.2201, lng: 128.6101 } },
    ],
    notes: '오징어 조업'
  },
  {
    id: 't5',
    userId: 'u7',
    userName: '강제주',
    userPhone: '010-7890-1234',
    vesselName: '제주호',
    departureTime: '2025-12-09T05:30:00',
    expectedReturn: '2025-12-09T16:00:00',
    destination: { lat: 33.4401, lng: 126.3001, name: '제주 서쪽 어장' },
    currentLocation: { lat: 33.4301, lng: 126.2901, updatedAt: '2025-12-09T09:30:00' },
    status: 'fishing',
    checkins: [
      { id: 'ck10', time: '2025-12-09T07:30:00', status: 'ok', location: { lat: 33.4201, lng: 126.2801 } },
      { id: 'ck11', time: '2025-12-09T09:30:00', status: 'ok', location: { lat: 33.4301, lng: 126.2901 } },
    ],
    notes: '방어 조업'
  },
];

// ============================================================================
// 포인트 내역 데이터
// ============================================================================
export const pointHistory: PointHistory[] = [
  { id: 'p1', userId: 'u1', amount: 100, type: 'earn', reason: '위험정보 공유', category: 'risk_share', createdAt: '2025-12-09T07:00:00' },
  { id: 'p2', userId: 'u1', amount: 300, type: 'earn', reason: '무사고 월간 달성', category: 'safe_trip', createdAt: '2025-12-01T00:00:00' },
  { id: 'p3', userId: 'u1', amount: 500, type: 'earn', reason: '안전교육 이수', category: 'education', createdAt: '2025-11-28T14:00:00' },
  { id: 'p4', userId: 'u1', amount: 1000, type: 'earn', reason: '동료 어민 구조 참여', category: 'rescue', createdAt: '2025-11-15T10:30:00' },
  { id: 'p5', userId: 'u1', amount: -2000, type: 'spend', reason: '구명조끼 할인 구매', category: 'equipment', createdAt: '2025-11-10T11:00:00' },
  { id: 'p6', userId: 'u1', amount: 100, type: 'earn', reason: '위험정보 공유', category: 'risk_share', createdAt: '2025-11-08T08:00:00' },
  { id: 'p7', userId: 'u1', amount: 100, type: 'earn', reason: '위험정보 공유', category: 'risk_share', createdAt: '2025-11-05T09:30:00' },
  { id: 'p8', userId: 'u1', amount: -5000, type: 'spend', reason: '보험료 할인 적용', category: 'insurance', createdAt: '2025-10-01T09:00:00' },
  { id: 'p9', userId: 'u2', amount: 100, type: 'earn', reason: '위험정보 공유', category: 'risk_share', createdAt: '2025-12-09T08:00:00' },
  { id: 'p10', userId: 'u3', amount: 100, type: 'earn', reason: '위험정보 공유', category: 'risk_share', createdAt: '2025-12-09T09:00:00' },
];

// ============================================================================
// 날씨 정보 데이터
// ============================================================================
export const weatherInfo: WeatherInfo = {
  temperature: 8,
  waveHeight: 0.8,
  windSpeed: 4.2,
  windDirection: '북서',
  visibility: '양호 (10km)',
  tideInfo: '만조 06:23 / 간조 12:45',
  safetyLevel: 'safe',
  updatedAt: '2025-12-09T09:00:00'
};

// ============================================================================
// 알림 데이터
// ============================================================================
export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'checkin',
    title: '체크인 시간입니다',
    message: '안전 확인을 위해 체크인해주세요.',
    isRead: false,
    createdAt: '2025-12-09T10:30:00',
    actionUrl: '/checkin'
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'risk',
    title: '주변 위험 정보',
    message: '박영수님이 남쪽 어장 파도 주의 정보를 공유했습니다.',
    isRead: false,
    createdAt: '2025-12-09T08:00:00',
    actionUrl: '/community'
  },
  {
    id: 'n3',
    userId: 'u1',
    type: 'buddy',
    title: '동료 매칭 완료',
    message: '오늘 출항 동료로 박영수님이 매칭되었습니다.',
    isRead: true,
    createdAt: '2025-12-09T04:30:00',
    actionUrl: '/buddy'
  },
  {
    id: 'n4',
    userId: 'u1',
    type: 'point',
    title: '포인트 적립',
    message: '위험정보 공유로 100P가 적립되었습니다.',
    isRead: true,
    createdAt: '2025-12-09T07:00:00',
    actionUrl: '/mypage'
  },
  {
    id: 'n5',
    userId: 'u1',
    type: 'system',
    title: '안전교육 안내',
    message: '새로운 안전교육 영상이 등록되었습니다. 이수 시 500P 적립!',
    isRead: false,
    createdAt: '2025-12-08T10:00:00',
    actionUrl: '/education'
  },
];

// ============================================================================
// 안전 교육 데이터
// ============================================================================
export const safetyEducations: SafetyEducation[] = [
  {
    id: 'e1',
    title: '구명조끼 올바른 착용법',
    description: '비상 시 생명을 지키는 구명조끼, 제대로 입는 방법을 알아봅니다.',
    videoUrl: '/videos/lifejacket.mp4',
    duration: 5,
    points: 500,
    completedBy: ['u1', 'u2', 'u3'],
    category: '기본안전'
  },
  {
    id: 'e2',
    title: '해상 기상 읽는 법',
    description: '구름과 바람으로 날씨 변화를 예측하는 방법을 배웁니다.',
    videoUrl: '/videos/weather.mp4',
    duration: 8,
    points: 500,
    completedBy: ['u1', 'u3'],
    category: '기상안전'
  },
  {
    id: 'e3',
    title: '응급처치 기초',
    description: '바다에서 발생할 수 있는 응급상황 대처법을 익힙니다.',
    videoUrl: '/videos/firstaid.mp4',
    duration: 10,
    points: 500,
    completedBy: ['u1'],
    category: '응급처치'
  },
  {
    id: 'e4',
    title: '선박 화재 대응',
    description: '선박 화재 시 초기 대응과 대피 방법을 배웁니다.',
    videoUrl: '/videos/fire.mp4',
    duration: 7,
    points: 500,
    completedBy: [],
    category: '화재안전'
  },
  {
    id: 'e5',
    title: 'SOS 신호 및 구조 요청법',
    description: '긴급 상황에서 효과적으로 구조를 요청하는 방법을 알아봅니다.',
    videoUrl: '/videos/sos.mp4',
    duration: 6,
    points: 500,
    completedBy: ['u2'],
    category: '긴급대응'
  },
];

// ============================================================================
// 장비/보험 상품 데이터
// ============================================================================
export const products: Product[] = [
  {
    id: 'prod1',
    name: '자동팽창식 구명조끼',
    description: '물에 닿으면 자동으로 팽창하는 최신형 구명조끼',
    originalPrice: 150000,
    discountedPrice: 105000,
    discountPercent: 30,
    pointsRequired: 2000,
    category: 'equipment',
    imageUrl: '/products/lifejacket.png',
    stock: 50
  },
  {
    id: 'prod2',
    name: '휴대용 GPS 위치발신기',
    description: '소형 방수 GPS, 긴급 시 위치 자동 전송',
    originalPrice: 89000,
    discountedPrice: 62300,
    discountPercent: 30,
    pointsRequired: 1500,
    category: 'equipment',
    imageUrl: '/products/gps.png',
    stock: 30
  },
  {
    id: 'prod3',
    name: '방수 안전등',
    description: 'LED 방수 안전등, 야간 조업 필수품',
    originalPrice: 35000,
    discountedPrice: 24500,
    discountPercent: 30,
    pointsRequired: 800,
    category: 'equipment',
    imageUrl: '/products/light.png',
    stock: 100
  },
  {
    id: 'prod4',
    name: '어선 종합보험 (연간)',
    description: '선체, 선원, 어구 종합 보장',
    originalPrice: 2500000,
    discountedPrice: 2000000,
    discountPercent: 20,
    pointsRequired: 5000,
    category: 'insurance',
    imageUrl: '/products/insurance.png',
    stock: 999
  },
  {
    id: 'prod5',
    name: '개인 상해보험 (연간)',
    description: '조업 중 상해 보장, 입원비/수술비 포함',
    originalPrice: 360000,
    discountedPrice: 288000,
    discountPercent: 20,
    pointsRequired: 3000,
    category: 'insurance',
    imageUrl: '/products/personal_insurance.png',
    stock: 999
  },
];

// ============================================================================
// 통계 데이터
// ============================================================================
export const statistics: Statistics = {
  totalUsers: 3247,
  activeTrips: 156,
  riskReportsToday: 23,
  sosResolved: 12,
  averageResponseTime: 18,
  accidentReduction: 23
};

// ============================================================================
// SOS 요청 데이터 (시뮬레이션용)
// ============================================================================
export const sosRequests: SOSRequest[] = [
  {
    id: 'sos1',
    userId: 'u8',
    userName: '정부산',
    userPhone: '010-8901-2345',
    vesselName: '부산호',
    location: { lat: 35.2612, lng: 129.2401 },
    status: 'rescued',
    createdAt: '2025-12-07T14:23:00',
    responders: [
      { userId: 'u1', userName: '김순득', distance: 2.3, eta: 15, status: 'arrived' }
    ],
    coastGuardNotified: true,
    familyNotified: true
  }
];

// ============================================================================
// 유틸리티 함수들
// ============================================================================

// 현재 사용자의 어항 동료들 가져오기
export function getHarborMembers(harborId: string): User[] {
  return users.filter(u => u.harborId === harborId);
}

// 활성 출항 목록 가져오기
export function getActiveTrips(): Trip[] {
  return trips.filter(t => ['sailing', 'fishing', 'returning'].includes(t.status));
}

// 특정 사용자의 포인트 내역 가져오기
export function getUserPointHistory(userId: string): PointHistory[] {
  return pointHistory.filter(p => p.userId === userId);
}

// 특정 어항의 위험 정보 가져오기
export function getHarborRiskReports(harborId: string): RiskReport[] {
  const harbor = harbors.find(h => h.id === harborId);
  if (!harbor) return [];

  // 간단한 거리 계산 (실제로는 더 정확한 계산 필요)
  return riskReports.filter(r => r.isActive);
}

// 읽지 않은 알림 개수
export function getUnreadNotificationCount(userId: string): number {
  return notifications.filter(n => n.userId === userId && !n.isRead).length;
}

// 안전 등급에 따른 색상
export function getSafetyLevelColor(level: string): string {
  switch (level) {
    case 'safe': return 'text-green-500';
    case 'caution': return 'text-yellow-500';
    case 'warning': return 'text-orange-500';
    case 'danger': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

// 안전 등급에 따른 한글 텍스트
export function getSafetyLevelText(level: string): string {
  switch (level) {
    case 'safe': return '양호';
    case 'caution': return '주의';
    case 'warning': return '경고';
    case 'danger': return '위험';
    default: return '확인중';
  }
}

// 위험 유형에 따른 아이콘
export function getRiskTypeIcon(type: string): string {
  switch (type) {
    case 'wave': return '🌊';
    case 'wind': return '💨';
    case 'obstacle': return '⚠️';
    case 'weather': return '🌫️';
    case 'equipment': return '🔧';
    default: return '📢';
  }
}

// 위험 심각도에 따른 색상
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low': return 'bg-blue-500';
    case 'medium': return 'bg-yellow-500';
    case 'high': return 'bg-orange-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

// 출항 상태에 따른 텍스트
export function getTripStatusText(status: string): string {
  switch (status) {
    case 'preparing': return '출항 준비';
    case 'sailing': return '항해 중';
    case 'fishing': return '조업 중';
    case 'returning': return '귀항 중';
    case 'completed': return '귀항 완료';
    case 'sos': return 'SOS';
    case 'unresponsive': return '무응답';
    default: return '알 수 없음';
  }
}

// 출항 상태에 따른 색상
export function getTripStatusColor(status: string): string {
  switch (status) {
    case 'preparing': return 'bg-gray-500';
    case 'sailing': return 'bg-blue-500';
    case 'fishing': return 'bg-green-500';
    case 'returning': return 'bg-cyan-500';
    case 'completed': return 'bg-gray-400';
    case 'sos': return 'bg-red-500';
    case 'unresponsive': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
}

// ============================================================================
// 접근성 향상 유틸리티 함수
// ============================================================================

// 위험 심각도에 따른 한글 텍스트
export function getSeverityText(severity: string): string {
  switch (severity) {
    case 'low': return '낮음';
    case 'medium': return '보통';
    case 'high': return '높음';
    case 'critical': return '위험';
    default: return '알 수 없음';
  }
}

// 위험 유형에 따른 한글 텍스트
export function getRiskTypeText(type: string): string {
  switch (type) {
    case 'wave': return '높은 파도';
    case 'wind': return '강풍';
    case 'obstacle': return '장애물';
    case 'weather': return '악천후';
    case 'equipment': return '장비 고장';
    default: return '기타 위험';
  }
}

// 안전 등급에 따른 이모지
export function getSafetyLevelEmoji(level: string): string {
  switch (level) {
    case 'safe': return '🟢';
    case 'caution': return '🟡';
    case 'warning': return '🟠';
    case 'danger': return '🔴';
    default: return '⚪';
  }
}

// 날짜 포맷팅 (접근성 고려 - 상대시간 + 절대시간)
export function formatDateAccessible(dateString: string): { relative: string; absolute: string } {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let relative: string;
  if (diffMinutes < 1) {
    relative = '방금 전';
  } else if (diffMinutes < 60) {
    relative = `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    relative = `${diffHours}시간 전`;
  } else if (diffDays < 7) {
    relative = `${diffDays}일 전`;
  } else {
    relative = date.toLocaleDateString('ko-KR');
  }

  const absolute = date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return { relative, absolute };
}
