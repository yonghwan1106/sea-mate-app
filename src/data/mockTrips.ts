import { Trip } from '@/types';

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
    vesselName: '순득호',
    departureTime: hoursAgo(5),
    expectedReturn: hoursLater(4),
    actualReturn: null,
    destination: { lat: 34.8700, lng: 128.4500, name: '통영 앞바다' },
    status: 'sailing',
    buddyId: 'user-003',
    buddyName: '이철수',
    checkins: [
      { time: hoursAgo(3), status: 'ok', location: { lat: 34.8650, lng: 128.4400, name: '통영 앞바다' } },
      { time: hoursAgo(1), status: 'ok', location: { lat: 34.8700, lng: 128.4500, name: '통영 앞바다' } },
    ],
  },
  {
    id: 'trip-002',
    userId: 'user-003',
    userName: '이철수',
    vesselName: '철수호',
    departureTime: hoursAgo(5),
    expectedReturn: hoursLater(4),
    actualReturn: null,
    destination: { lat: 34.8700, lng: 128.4500, name: '통영 앞바다' },
    status: 'sailing',
    buddyId: 'user-001',
    buddyName: '김순득',
    checkins: [
      { time: hoursAgo(3), status: 'ok', location: { lat: 34.8640, lng: 128.4380, name: '통영 앞바다' } },
      { time: hoursAgo(1), status: 'ok', location: { lat: 34.8690, lng: 128.4480, name: '통영 앞바다' } },
    ],
  },
  {
    id: 'trip-003',
    userId: 'user-002',
    userName: '박민수',
    vesselName: '민수호',
    departureTime: hoursAgo(3),
    expectedReturn: hoursLater(6),
    actualReturn: null,
    destination: { lat: 34.7500, lng: 127.7500, name: '여수 앞바다' },
    status: 'sailing',
    buddyId: 'user-007',
    buddyName: '한정희',
    checkins: [
      { time: hoursAgo(1), status: 'ok', location: { lat: 34.7480, lng: 127.7480, name: '여수 앞바다' } },
    ],
  },
  // 귀항 중
  {
    id: 'trip-004',
    userId: 'user-004',
    userName: '최영호',
    vesselName: '영호호',
    departureTime: hoursAgo(8),
    expectedReturn: hoursAgo(1),
    actualReturn: null,
    destination: { lat: 35.1200, lng: 129.0800, name: '부산 기장 해역' },
    status: 'returning',
    buddyId: 'user-015',
    buddyName: '쩐 반 민',
    checkins: [
      { time: hoursAgo(6), status: 'ok', location: { lat: 35.1100, lng: 129.0600, name: '부산 기장 해역' } },
      { time: hoursAgo(4), status: 'ok', location: { lat: 35.1150, lng: 129.0700, name: '부산 기장 해역' } },
      { time: hoursAgo(2), status: 'ok', location: { lat: 35.1180, lng: 129.0750, name: '부산 기장 해역' } },
    ],
  },
  // 시간 초과
  {
    id: 'trip-005',
    userId: 'user-009',
    userName: '윤석만',
    vesselName: '석만호',
    departureTime: hoursAgo(10),
    expectedReturn: hoursAgo(2),
    actualReturn: null,
    destination: { lat: 35.5200, lng: 129.4200, name: '울산 앞바다' },
    status: 'overdue',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(8), status: 'ok', location: { lat: 35.5100, lng: 129.4100, name: '울산 앞바다' } },
      { time: hoursAgo(6), status: 'ok', location: { lat: 35.5150, lng: 129.4150, name: '울산 앞바다' } },
      { time: hoursAgo(4), status: 'missed', location: undefined },
    ],
  },
  // 완료된 출항들
  {
    id: 'trip-006',
    userId: 'user-006',
    userName: '정대만',
    vesselName: '대만호',
    departureTime: hoursAgo(12),
    expectedReturn: hoursAgo(4),
    actualReturn: hoursAgo(4),
    destination: { lat: 34.8100, lng: 126.3900, name: '목포 앞바다' },
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(10), status: 'ok', location: { lat: 34.8050, lng: 126.3850, name: '목포 앞바다' } },
      { time: hoursAgo(8), status: 'ok', location: { lat: 34.8080, lng: 126.3880, name: '목포 앞바다' } },
      { time: hoursAgo(6), status: 'ok', location: { lat: 34.8090, lng: 126.3890, name: '목포 앞바다' } },
    ],
  },
  {
    id: 'trip-007',
    userId: 'user-010',
    userName: '조용필',
    vesselName: '용필호',
    departureTime: hoursAgo(14),
    expectedReturn: hoursAgo(6),
    actualReturn: hoursAgo(5),
    destination: { lat: 36.0400, lng: 129.4000, name: '포항 앞바다' },
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(12), status: 'ok', location: { lat: 36.0350, lng: 129.3950, name: '포항 앞바다' } },
      { time: hoursAgo(10), status: 'ok', location: { lat: 36.0380, lng: 129.3980, name: '포항 앞바다' } },
    ],
  },
  {
    id: 'trip-008',
    userId: 'user-012',
    userName: '송창식',
    vesselName: '창식호',
    departureTime: hoursAgo(20),
    expectedReturn: hoursAgo(12),
    actualReturn: hoursAgo(11),
    destination: { lat: 33.5200, lng: 126.5500, name: '제주 앞바다' },
    status: 'completed',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(18), status: 'ok', location: { lat: 33.5100, lng: 126.5400, name: '제주 앞바다' } },
      { time: hoursAgo(16), status: 'ok', location: { lat: 33.5150, lng: 126.5450, name: '제주 앞바다' } },
      { time: hoursAgo(14), status: 'ok', location: { lat: 33.5180, lng: 126.5480, name: '제주 앞바다' } },
    ],
  },
  {
    id: 'trip-009',
    userId: 'user-007',
    userName: '한정희',
    vesselName: '정희호',
    departureTime: hoursAgo(3),
    expectedReturn: hoursLater(5),
    actualReturn: null,
    destination: { lat: 34.7600, lng: 127.7600, name: '여수 앞바다' },
    status: 'sailing',
    buddyId: 'user-002',
    buddyName: '박민수',
    checkins: [
      { time: hoursAgo(1), status: 'ok', location: { lat: 34.7550, lng: 127.7550, name: '여수 앞바다' } },
    ],
  },
  {
    id: 'trip-010',
    userId: 'user-013',
    userName: '나훈아',
    vesselName: '훈아호',
    departureTime: hoursAgo(4),
    expectedReturn: hoursLater(3),
    actualReturn: null,
    destination: { lat: 38.2100, lng: 128.6200, name: '속초 앞바다' },
    status: 'sailing',
    buddyId: undefined,
    buddyName: undefined,
    checkins: [
      { time: hoursAgo(2), status: 'ok', location: { lat: 38.2050, lng: 128.6100, name: '속초 앞바다' } },
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
