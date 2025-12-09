import { RiskReport } from '@/types';

const now = new Date();

function hoursAgo(hours: number): string {
  const date = new Date(now.getTime() - hours * 60 * 60 * 1000);
  return date.toISOString();
}

function hoursLater(hours: number): string {
  const date = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return date.toISOString();
}

export const mockRiskReports: RiskReport[] = [
  {
    id: 'risk-001',
    userId: 'user-001',
    userName: '김순득',
    type: 'wave',
    severity: 'high',
    location: { lat: 34.8544, lng: 128.4330, name: '통영 동쪽 해역' },
    content: '오늘 아침 동쪽 해역 파도가 많이 높습니다. 1.5m 이상 예상됩니다. 소형 선박 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(2),
    expiresAt: hoursLater(10),
    likes: 15,
    comments: 4,
  },
  {
    id: 'risk-002',
    userId: 'user-003',
    userName: '이철수',
    type: 'equipment',
    severity: 'medium',
    location: { lat: 34.8600, lng: 128.4200, name: '통영 서쪽 해역' },
    content: '서쪽 해역에 그물이 떠다니고 있습니다. 스크류 걸림 주의하세요!',
    mediaUrls: [],
    createdAt: hoursAgo(4),
    expiresAt: hoursLater(8),
    likes: 8,
    comments: 2,
  },
  {
    id: 'risk-003',
    userId: 'user-002',
    userName: '박민수',
    type: 'wind',
    severity: 'high',
    location: { lat: 34.7400, lng: 127.7400, name: '여수 앞바다' },
    content: '오후 2시부터 북서풍이 강해질 예정입니다. 풍속 8m/s 예상. 조업 일찍 마무리하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(1),
    expiresAt: hoursLater(6),
    likes: 22,
    comments: 7,
  },
  {
    id: 'risk-004',
    userId: 'user-004',
    userName: '최영호',
    type: 'rock',
    severity: 'critical',
    location: { lat: 35.1000, lng: 129.0500, name: '부산 기장 해역' },
    content: '기장 해역 새로운 암초 발견! 정확한 위치 사진 첨부합니다. 근처 항해 시 주의 필요.',
    mediaUrls: [],
    createdAt: hoursAgo(6),
    expiresAt: hoursLater(48),
    likes: 45,
    comments: 12,
  },
  {
    id: 'risk-005',
    userId: 'user-007',
    userName: '한정희',
    type: 'other',
    severity: 'low',
    location: { lat: 34.7500, lng: 127.7300, name: '여수 내항 근처' },
    content: '해파리가 많이 보입니다. 그물 작업 시 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(8),
    expiresAt: hoursLater(16),
    likes: 5,
    comments: 1,
  },
  {
    id: 'risk-006',
    userId: 'user-009',
    userName: '윤석만',
    type: 'wave',
    severity: 'medium',
    location: { lat: 35.5000, lng: 129.4000, name: '울산 앞바다' },
    content: '울산 앞바다 너울성 파도 주의. 배멀미 심한 분들 조심하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(3),
    expiresAt: hoursLater(9),
    likes: 11,
    comments: 3,
  },
  {
    id: 'risk-007',
    userId: 'user-010',
    userName: '조용필',
    type: 'equipment',
    severity: 'high',
    location: { lat: 36.0300, lng: 129.3800, name: '포항 북쪽 해역' },
    content: '유실된 부표가 떠다니고 있습니다. 야간 항해 시 충돌 위험!',
    mediaUrls: [],
    createdAt: hoursAgo(5),
    expiresAt: hoursLater(12),
    likes: 18,
    comments: 5,
  },
  {
    id: 'risk-008',
    userId: 'user-012',
    userName: '송창식',
    type: 'wind',
    severity: 'critical',
    location: { lat: 33.5000, lng: 126.5300, name: '제주 북쪽 해역' },
    content: '제주 북쪽 강풍 주의보! 풍속 12m/s 이상. 소형 어선 출항 자제 권고.',
    mediaUrls: [],
    createdAt: hoursAgo(1),
    expiresAt: hoursLater(8),
    likes: 32,
    comments: 9,
  },
  {
    id: 'risk-009',
    userId: 'user-006',
    userName: '정대만',
    type: 'other',
    severity: 'medium',
    location: { lat: 34.8000, lng: 126.3800, name: '목포 외항' },
    content: '대형 화물선 입항 예정. 오후 3시~5시 사이 항로 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(2),
    expiresAt: hoursLater(4),
    likes: 7,
    comments: 2,
  },
  {
    id: 'risk-010',
    userId: 'user-013',
    userName: '나훈아',
    type: 'wave',
    severity: 'medium',
    location: { lat: 38.2000, lng: 128.6000, name: '속초 동쪽 해역' },
    content: '동해안 특유의 파도 주의. 오전 중 조업 권장드립니다.',
    mediaUrls: [],
    createdAt: hoursAgo(7),
    expiresAt: hoursLater(5),
    likes: 9,
    comments: 3,
  },
];

export function getRiskReportsByHarbor(harborId: string): RiskReport[] {
  // 간단히 모든 위험정보 반환 (실제로는 위치 기반 필터링)
  return mockRiskReports;
}

export function getRecentRiskReports(count: number = 5): RiskReport[] {
  return [...mockRiskReports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}
