import { Trip } from '@/types';
import { mockUsers } from './mockUsers';

const now = new Date();

function hoursAgo(hours: number): string {
  const date = new Date(now.getTime() - hours * 60 * 60 * 1000);
  return date.toISOString();
}

function hoursLater(hours: number): string {
  const date = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return date.toISOString();
}

export const mockTrips: Trip[] = [
  // 현재 출항 중
  {
    id: 'trip-001',
    userId: 'user-001',
    userName: '김순득',
    vessel: mockUsers[0].vessel!, // 순득호
    vesselName: '순득호',
    departureTime: hoursAgo(5),
    expectedReturn: hoursLater(4),
    actualReturn: null,
    destination: '통영 앞바다',
    status: 'sailing',
    buddyId: 'user-003',
    buddyName: '이철수',
    checkins: [
      { time: hoursAgo(3), status: 'ok', location: '통영 앞바다' },
      { time: hoursAgo(1), status: 'ok', location: '통영 앞바다' },
    ],
  },
  {
    id: 'trip-002',
    userId: 'user-003',
    userName: '이철수',
    vessel: mockUsers[2].vessel!, // 철수호
    vesselName: '철수호',
    departureTime: hoursAgo(5),
    expectedReturn: hoursLater(4),
    actualReturn: null,
    destination: '통영 앞바다',
    status: 'sailing',
    buddyId: 'user-001',
    buddyName: '김순득',
    checkins: [
      { time: hoursAgo(3), status: 'ok', location: '통영 앞바다' },
      { time: hoursAgo(1), status: 'ok', location: '통영 앞바다' },
    ],
  },
  {
    id: 'trip-003',
    userId: 'user-002',
    userName: '박민수',
    vessel: mockUsers[1].vessel!, // 민수호
    vesselName: '민수호',
    departureTime: hoursAgo(3),
    expectedReturn: hoursLater(6),
    actualReturn: null,
    destination: '여수 앞바다',
    status: 'sailing',
    buddyId: 'user-007',
    buddyName: '한정희',
    checkins: [
      { time: hoursAgo(1), status: 'ok', location: '여수 앞바다' },
    ],
  },
  // 귀항 중
  {
    id: 'trip-004',
    userId: 'user-004',
    userName: '최영호',
    vessel: mockUsers[3].vessel!, // 영호호
    vesselName: '영호호',
    departureTime: hoursAgo(8),
    expectedReturn: hoursAgo(1),
    actualReturn: null,
    destination: '부산 기장 해역',
    status: 'returning',
    buddyId: 'user-015',
    buddyName: '쩐 반 민',
    checkins: [
      { time: hoursAgo(6), status: 'ok', location: '부산 기장 해역' },
      { time: hoursAgo(4), status: 'ok', location: '부산 기장 해역' },
      { time: hoursAgo(2), status: 'ok', location: '부산 기장 해역' },
    ],
  },
  // 시간 초과
  {
    id: 'trip-005',
    userId: 'user-009',
    userName: '윤석만',
    vessel: mockUsers[8].vessel!, // 석만호
    vesselName: '석만호',
    departureTime: hoursAgo(10),
    expectedReturn: hoursAgo(2),
    actualReturn: null,
    destination: '울산 앞바다',
    status: 'overdue',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(8), status: 'ok', location: '울산 앞바다' },
      { time: hoursAgo(6), status: 'ok', location: '울산 앞바다' },
      { time: hoursAgo(4), status: 'missed', location: undefined },
    ],
  },
  // 완료된 출항들
  {
    id: 'trip-006',
    userId: 'user-006',
    userName: '정대만',
    vessel: mockUsers[5].vessel!, // 대만호
    vesselName: '대만호',
    departureTime: hoursAgo(12),
    expectedReturn: hoursAgo(4),
    actualReturn: hoursAgo(4),
    destination: '목포 앞바다',
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(10), status: 'ok', location: '목포 앞바다' },
      { time: hoursAgo(8), status: 'ok', location: '목포 앞바다' },
      { time: hoursAgo(6), status: 'ok', location: '목포 앞바다' },
    ],
  },
  {
    id: 'trip-007',
    userId: 'user-010',
    userName: '조용필',
    vessel: mockUsers[9].vessel!, // 용필호
    vesselName: '용필호',
    departureTime: hoursAgo(14),
    expectedReturn: hoursAgo(6),
    actualReturn: hoursAgo(5),
    destination: '포항 앞바다',
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(12), status: 'ok', location: '포항 앞바다' },
      { time: hoursAgo(10), status: 'ok', location: '포항 앞바다' },
    ],
  },
  {
    id: 'trip-008',
    userId: 'user-012',
    userName: '송창식',
    vessel: mockUsers[11].vessel!, // 창식호
    vesselName: '창식호',
    departureTime: hoursAgo(20),
    expectedReturn: hoursAgo(12),
    actualReturn: hoursAgo(11),
    destination: '제주 앞바다',
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(18), status: 'ok', location: '제주 앞바다' },
      { time: hoursAgo(16), status: 'ok', location: '제주 앞바다' },
      { time: hoursAgo(14), status: 'ok', location: '제주 앞바다' },
    ],
  },
  {
    id: 'trip-009',
    userId: 'user-007',
    userName: '한정희',
    vessel: mockUsers[6].vessel!, // 정희호
    vesselName: '정희호',
    departureTime: hoursAgo(3),
    expectedReturn: hoursLater(5),
    actualReturn: null,
    destination: '여수 앞바다',
    status: 'sailing',
    buddyId: 'user-002',
    buddyName: '박민수',
    checkins: [
      { time: hoursAgo(1), status: 'ok', location: '여수 앞바다' },
    ],
  },
  {
    id: 'trip-010',
    userId: 'user-013',
    userName: '나훈아',
    vessel: mockUsers[12].vessel!, // 훈아호
    vesselName: '훈아호',
    departureTime: hoursAgo(4),
    expectedReturn: hoursLater(3),
    actualReturn: null,
    destination: '속초 앞바다',
    status: 'sailing',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(2), status: 'ok', location: '속초 앞바다' },
    ],
  },
];

export function getTripsByUserId(userId: string): Trip[] {
  return mockTrips.filter(trip => trip.userId === userId);
}

export function getActiveTrips(): Trip[] {
  return mockTrips.filter(trip =>
    trip.status === 'sailing' || trip.status === 'returning' || trip.status === 'overdue'
  );
}

export function getSailingTrips(): Trip[] {
  return mockTrips.filter(trip => trip.status === 'sailing');
}

export function getTripById(tripId: string): Trip | undefined {
  return mockTrips.find(trip => trip.id === tripId);
}
