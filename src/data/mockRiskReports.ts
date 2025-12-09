import { RiskReport } from '@/types';
import { mockUsers, getUserById } from './mockUsers';
import { mockHarbors } from './mockHarbors';

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
    author: mockUsers[0], // 김순득
    type: 'wave',
    severity: 'high',
    location: mockHarbors[0], // 통영항
    title: '동쪽 해역 파도 주의',
    description: '오늘 아침 동쪽 해역 파도가 많이 높습니다. 1.5m 이상 예상됩니다. 소형 선박 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(2),
    expiresAt: hoursLater(10),
    likes: 15,
    comments: 4,
  },
  {
    id: 'risk-002',
    author: mockUsers[2], // 이철수
    type: 'equipment',
    severity: 'medium',
    location: mockHarbors[0], // 통영항
    title: '서쪽 해역 그물 유실',
    description: '서쪽 해역에 그물이 떠다니고 있습니다. 스크류 걸림 주의하세요!',
    mediaUrls: [],
    createdAt: hoursAgo(4),
    expiresAt: hoursLater(8),
    likes: 8,
    comments: 2,
  },
  {
    id: 'risk-003',
    author: mockUsers[1], // 박민수
    type: 'wind',
    severity: 'high',
    location: mockHarbors[1], // 여수항
    title: '오후 북서풍 강해짐',
    description: '오후 2시부터 북서풍이 강해질 예정입니다. 풍속 8m/s 예상. 조업 일찍 마무리하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(1),
    expiresAt: hoursLater(6),
    likes: 22,
    comments: 7,
  },
  {
    id: 'risk-004',
    author: mockUsers[3], // 최영호
    type: 'rock',
    severity: 'critical',
    location: mockHarbors[2], // 부산항
    title: '기장 해역 새로운 암초 발견',
    description: '기장 해역 새로운 암초 발견! 정확한 위치 사진 첨부합니다. 근처 항해 시 주의 필요.',
    mediaUrls: [],
    createdAt: hoursAgo(6),
    expiresAt: hoursLater(48),
    likes: 45,
    comments: 12,
  },
  {
    id: 'risk-005',
    author: mockUsers[6], // 한정희
    type: 'other',
    severity: 'low',
    location: mockHarbors[1], // 여수항
    title: '해파리 대량 출현',
    description: '해파리가 많이 보입니다. 그물 작업 시 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(8),
    expiresAt: hoursLater(16),
    likes: 5,
    comments: 1,
  },
  {
    id: 'risk-006',
    author: mockUsers[8], // 윤석만
    type: 'wave',
    severity: 'medium',
    location: mockHarbors[5], // 울산항
    title: '너울성 파도 주의',
    description: '울산 앞바다 너울성 파도 주의. 배멀미 심한 분들 조심하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(3),
    expiresAt: hoursLater(9),
    likes: 11,
    comments: 3,
  },
  {
    id: 'risk-007',
    author: mockUsers[9], // 조용필
    type: 'equipment',
    severity: 'high',
    location: mockHarbors[6], // 포항항
    title: '유실 부표 떠다님',
    description: '유실된 부표가 떠다니고 있습니다. 야간 항해 시 충돌 위험!',
    mediaUrls: [],
    createdAt: hoursAgo(5),
    expiresAt: hoursLater(12),
    likes: 18,
    comments: 5,
  },
  {
    id: 'risk-008',
    author: mockUsers[11], // 송창식
    type: 'wind',
    severity: 'critical',
    location: mockHarbors[7], // 제주항
    title: '제주 북쪽 강풍 주의보',
    description: '제주 북쪽 강풍 주의보! 풍속 12m/s 이상. 소형 어선 출항 자제 권고.',
    mediaUrls: [],
    createdAt: hoursAgo(1),
    expiresAt: hoursLater(8),
    likes: 32,
    comments: 9,
  },
  {
    id: 'risk-009',
    author: mockUsers[5], // 정대만
    type: 'other',
    severity: 'medium',
    location: mockHarbors[3], // 목포항
    title: '대형 화물선 입항 예정',
    description: '대형 화물선 입항 예정. 오후 3시~5시 사이 항로 주의하세요.',
    mediaUrls: [],
    createdAt: hoursAgo(2),
    expiresAt: hoursLater(4),
    likes: 7,
    comments: 2,
  },
  {
    id: 'risk-010',
    author: mockUsers[12], // 나훈아
    type: 'wave',
    severity: 'medium',
    location: mockHarbors[8], // 속초항
    title: '동해안 파도 주의',
    description: '동해안 특유의 파도 주의. 오전 중 조업 권장드립니다.',
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
