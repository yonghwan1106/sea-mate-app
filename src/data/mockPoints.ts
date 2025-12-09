import { PointHistory } from '@/types';

const now = new Date();

function daysAgo(days: number): string {
  const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

export const mockPointHistory: PointHistory[] = [
  // 김순득 (user-001) 포인트 기록
  {
    id: 'point-001',
    userId: 'user-001',
    amount: 100,
    type: 'earn',
    reason: 'risk_share',
    description: '위험정보 공유 - 동쪽 해역 파도 경고',
    createdAt: daysAgo(0),
  },
  {
    id: 'point-002',
    userId: 'user-001',
    amount: 50,
    type: 'earn',
    reason: 'checkin',
    description: '안전 체크인 완료',
    createdAt: daysAgo(0),
  },
  {
    id: 'point-003',
    userId: 'user-001',
    amount: 300,
    type: 'earn',
    reason: 'safe_return',
    description: '무사고 귀항',
    createdAt: daysAgo(1),
  },
  {
    id: 'point-004',
    userId: 'user-001',
    amount: 1000,
    type: 'earn',
    reason: 'rescue_help',
    description: '동료 구조 참여 - 윤석만님 지원',
    createdAt: daysAgo(3),
  },
  {
    id: 'point-005',
    userId: 'user-001',
    amount: -500,
    type: 'spend',
    reason: 'equipment_buy',
    description: '안전장비 할인권 사용 - 구명조끼',
    createdAt: daysAgo(5),
  },
  {
    id: 'point-006',
    userId: 'user-001',
    amount: 300,
    type: 'earn',
    reason: 'monthly_safe',
    description: '11월 무사고 보너스',
    createdAt: daysAgo(10),
  },

  // 박민수 (user-002) 포인트 기록
  {
    id: 'point-007',
    userId: 'user-002',
    amount: 100,
    type: 'earn',
    reason: 'risk_share',
    description: '위험정보 공유 - 바람 경고',
    createdAt: daysAgo(0),
  },
  {
    id: 'point-008',
    userId: 'user-002',
    amount: 500,
    type: 'earn',
    reason: 'safety_training',
    description: '안전교육 이수 - 해상 응급처치',
    createdAt: daysAgo(7),
  },
  {
    id: 'point-009',
    userId: 'user-002',
    amount: 300,
    type: 'earn',
    reason: 'safe_return',
    description: '무사고 귀항',
    createdAt: daysAgo(1),
  },

  // 이철수 (user-003) 포인트 기록
  {
    id: 'point-010',
    userId: 'user-003',
    amount: 100,
    type: 'earn',
    reason: 'risk_share',
    description: '위험정보 공유 - 그물 경고',
    createdAt: daysAgo(0),
  },
  {
    id: 'point-011',
    userId: 'user-003',
    amount: 1000,
    type: 'earn',
    reason: 'rescue_help',
    description: '동료 구조 참여',
    createdAt: daysAgo(5),
  },
  {
    id: 'point-012',
    userId: 'user-003',
    amount: -1000,
    type: 'spend',
    reason: 'insurance_discount',
    description: '어선보험료 할인 적용',
    createdAt: daysAgo(15),
  },
];

export function getPointHistoryByUserId(userId: string): PointHistory[] {
  return mockPointHistory
    .filter(record => record.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getTotalPoints(userId: string): number {
  return mockPointHistory
    .filter(record => record.userId === userId)
    .reduce((total, record) => total + record.amount, 0);
}

export const pointRewards = [
  { reason: 'risk_share', amount: 100, description: '위험정보 공유' },
  { reason: 'rescue_help', amount: 1000, description: '동료 구조 참여' },
  { reason: 'safety_training', amount: 500, description: '안전교육 이수' },
  { reason: 'safe_return', amount: 300, description: '무사고 귀항' },
  { reason: 'checkin', amount: 50, description: '체크인' },
  { reason: 'monthly_safe', amount: 300, description: '월간 무사고 보너스' },
];

export const pointUsage = [
  { name: '구명조끼 할인', points: 500, discount: '30%' },
  { name: 'GPS 장비 할인', points: 1000, discount: '20%' },
  { name: '어선보험료 할인', points: 2000, discount: '5%' },
  { name: '주유권 5만원', points: 1500, discount: '' },
  { name: '어구 구매권 3만원', points: 1000, discount: '' },
];
