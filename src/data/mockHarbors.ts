import { Harbor } from '@/types';

export const mockHarbors: Harbor[] = [
  { id: 'harbor-001', name: '통영항', region: '경남', fisherCount: 45 },
  { id: 'harbor-002', name: '여수항', region: '전남', fisherCount: 38 },
  { id: 'harbor-003', name: '부산항', region: '부산', fisherCount: 52 },
  { id: 'harbor-004', name: '목포항', region: '전남', fisherCount: 41 },
  { id: 'harbor-005', name: '인천항', region: '인천', fisherCount: 35 },
  { id: 'harbor-006', name: '울산항', region: '울산', fisherCount: 28 },
  { id: 'harbor-007', name: '포항항', region: '경북', fisherCount: 33 },
  { id: 'harbor-008', name: '제주항', region: '제주', fisherCount: 47 },
  { id: 'harbor-009', name: '속초항', region: '강원', fisherCount: 25 },
  { id: 'harbor-010', name: '군산항', region: '전북', fisherCount: 31 },
];

export function getHarborById(id: string): Harbor | undefined {
  return mockHarbors.find(harbor => harbor.id === id);
}
