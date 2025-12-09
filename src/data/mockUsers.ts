import { User } from '@/types';
import { mockHarbors } from './mockHarbors';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: '김순득',
    phone: '010-1234-5678',
    harbor: mockHarbors[0], // 통영항
    vessel: { id: 'vessel-001', name: '순득호', type: '어선' },
    age: 68,
    healthConditions: ['고혈압', '당뇨'],
    emergencyContacts: [
      { name: '김영희', relation: '배우자', phone: '010-9876-5432' },
      { name: '김철수', relation: '아들', phone: '010-1111-2222' },
    ],
    points: 1250,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-002',
    name: '박민수',
    phone: '010-2345-6789',
    harbor: mockHarbors[1], // 여수항
    vessel: { id: 'vessel-002', name: '민수호', type: '어선' },
    age: 42,
    healthConditions: [],
    emergencyContacts: [
      { name: '박수진', relation: '배우자', phone: '010-8765-4321' },
    ],
    points: 890,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-003',
    name: '이철수',
    phone: '010-3456-7890',
    harbor: mockHarbors[0], // 통영항
    vessel: { id: 'vessel-003', name: '철수호', type: '어선' },
    age: 55,
    healthConditions: ['고혈압'],
    emergencyContacts: [
      { name: '이미영', relation: '배우자', phone: '010-7654-3210' },
    ],
    points: 2100,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-004',
    name: '최영호',
    phone: '010-4567-8901',
    harbor: mockHarbors[2], // 부산항
    vessel: { id: 'vessel-004', name: '영호호', type: '어선' },
    age: 72,
    healthConditions: ['관절염'],
    emergencyContacts: [
      { name: '최순자', relation: '배우자', phone: '010-6543-2109' },
    ],
    points: 3500,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-005',
    name: '응웬 반',
    phone: '010-5678-9012',
    harbor: mockHarbors[0], // 통영항
    vessel: undefined, // 선원
    age: 29,
    healthConditions: [],
    emergencyContacts: [
      { name: '응웬 티', relation: '배우자', phone: '+84-123-456-789' },
    ],
    points: 450,
    role: 'crew',
    language: 'vi',
  },
  {
    id: 'user-006',
    name: '정대만',
    phone: '010-6789-0123',
    harbor: mockHarbors[3], // 목포항
    vessel: { id: 'vessel-005', name: '대만호', type: '어선' },
    age: 38,
    healthConditions: [],
    emergencyContacts: [
      { name: '정미라', relation: '배우자', phone: '010-5432-1098' },
    ],
    points: 780,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-007',
    name: '한정희',
    phone: '010-7890-1234',
    harbor: mockHarbors[1], // 여수항
    vessel: { id: 'vessel-006', name: '정희호', type: '어선' },
    age: 61,
    healthConditions: ['당뇨'],
    emergencyContacts: [
      { name: '한미숙', relation: '딸', phone: '010-4321-0987' },
    ],
    points: 1890,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-008',
    name: '강민철',
    phone: '010-8901-2345',
    harbor: mockHarbors[4], // 인천항
    vessel: { id: 'vessel-007', name: '민철호', type: '어선' },
    age: 45,
    healthConditions: [],
    emergencyContacts: [
      { name: '강수연', relation: '배우자', phone: '010-3210-9876' },
    ],
    points: 560,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-009',
    name: '윤석만',
    phone: '010-9012-3456',
    harbor: mockHarbors[5], // 울산항
    vessel: { id: 'vessel-008', name: '석만호', type: '어선' },
    age: 67,
    healthConditions: ['고혈압', '당뇨'],
    emergencyContacts: [
      { name: '윤정숙', relation: '배우자', phone: '010-2109-8765' },
    ],
    points: 2340,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-010',
    name: '조용필',
    phone: '010-0123-4567',
    harbor: mockHarbors[6], // 포항항
    vessel: { id: 'vessel-009', name: '용필호', type: '어선' },
    age: 58,
    healthConditions: [],
    emergencyContacts: [
      { name: '조미자', relation: '배우자', phone: '010-1098-7654' },
    ],
    points: 1120,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-011',
    name: '김영희',
    phone: '010-9876-5432',
    harbor: mockHarbors[0], // 통영항
    vessel: undefined,
    age: 45,
    healthConditions: [],
    emergencyContacts: [
      { name: '김순득', relation: '남편', phone: '010-1234-5678' },
    ],
    points: 200,
    role: 'family',
    language: 'ko',
  },
  {
    id: 'user-012',
    name: '송창식',
    phone: '010-1122-3344',
    harbor: mockHarbors[7], // 제주항
    vessel: { id: 'vessel-010', name: '창식호', type: '어선' },
    age: 63,
    healthConditions: ['고혈압'],
    emergencyContacts: [
      { name: '송미희', relation: '배우자', phone: '010-5566-7788' },
    ],
    points: 1560,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-013',
    name: '나훈아',
    phone: '010-2233-4455',
    harbor: mockHarbors[8], // 속초항
    vessel: { id: 'vessel-011', name: '훈아호', type: '어선' },
    age: 59,
    healthConditions: [],
    emergencyContacts: [
      { name: '나정미', relation: '딸', phone: '010-6677-8899' },
    ],
    points: 980,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-014',
    name: '설운도',
    phone: '010-3344-5566',
    harbor: mockHarbors[9], // 군산항
    vessel: { id: 'vessel-012', name: '운도호', type: '어선' },
    age: 52,
    healthConditions: [],
    emergencyContacts: [
      { name: '설수미', relation: '배우자', phone: '010-7788-9900' },
    ],
    points: 670,
    role: 'fisher',
    language: 'ko',
  },
  {
    id: 'user-015',
    name: '쩐 반 민',
    phone: '010-4455-6677',
    harbor: mockHarbors[2], // 부산항
    vessel: undefined,
    age: 32,
    healthConditions: [],
    emergencyContacts: [
      { name: '쩐 티 란', relation: '배우자', phone: '+84-987-654-321' },
    ],
    points: 320,
    role: 'crew',
    language: 'vi',
  },
  {
    id: 'admin-001',
    name: '관리자',
    phone: '010-0000-0000',
    harbor: mockHarbors[0],
    vessel: undefined,
    age: 35,
    healthConditions: [],
    emergencyContacts: [],
    points: 0,
    role: 'admin',
    language: 'ko',
  },
];

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getUsersByHarbor(harborId: string): User[] {
  return mockUsers.filter(user => user.harbor.id === harborId && user.role === 'fisher');
}

export function getFisherUsers(): User[] {
  return mockUsers.filter(user => user.role === 'fisher' || user.role === 'crew');
}
