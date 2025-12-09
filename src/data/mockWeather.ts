import { WeatherData } from '@/types';

export const mockWeather: WeatherData = {
  current: {
    temperature: 8,
    weather: '맑음',
    waveHeight: 0.5,
    windSpeed: 3,
    windDirection: '북동',
    visibility: '양호',
    safetyLevel: 'good',
  },
  forecast: [
    { date: '2025-12-09', weather: '맑음', waveHeight: 0.5, windSpeed: 3, safetyLevel: 'good' },
    { date: '2025-12-10', weather: '구름많음', waveHeight: 0.8, windSpeed: 4, safetyLevel: 'good' },
    { date: '2025-12-11', weather: '흐림', waveHeight: 1.2, windSpeed: 6, safetyLevel: 'caution' },
    { date: '2025-12-12', weather: '비', waveHeight: 2.0, windSpeed: 10, safetyLevel: 'warning' },
    { date: '2025-12-13', weather: '흐림', waveHeight: 1.5, windSpeed: 7, safetyLevel: 'caution' },
    { date: '2025-12-14', weather: '맑음', waveHeight: 0.6, windSpeed: 3, safetyLevel: 'good' },
    { date: '2025-12-15', weather: '맑음', waveHeight: 0.4, windSpeed: 2, safetyLevel: 'good' },
  ],
  harbors: {
    'harbor-001': { name: '통영항', safetyLevel: 'good', waveHeight: 0.5, windSpeed: 3 },
    'harbor-002': { name: '여수항', safetyLevel: 'good', waveHeight: 0.4, windSpeed: 2 },
    'harbor-003': { name: '부산항', safetyLevel: 'caution', waveHeight: 1.0, windSpeed: 5 },
    'harbor-004': { name: '목포항', safetyLevel: 'good', waveHeight: 0.6, windSpeed: 3 },
    'harbor-005': { name: '인천항', safetyLevel: 'good', waveHeight: 0.5, windSpeed: 4 },
    'harbor-006': { name: '울산항', safetyLevel: 'caution', waveHeight: 1.2, windSpeed: 6 },
    'harbor-007': { name: '포항항', safetyLevel: 'good', waveHeight: 0.7, windSpeed: 4 },
    'harbor-008': { name: '제주항', safetyLevel: 'warning', waveHeight: 1.8, windSpeed: 8 },
    'harbor-009': { name: '속초항', safetyLevel: 'good', waveHeight: 0.5, windSpeed: 3 },
    'harbor-010': { name: '군산항', safetyLevel: 'good', waveHeight: 0.4, windSpeed: 2 },
  },
};

export function getWeatherByHarbor(harborId: string) {
  return mockWeather.harbors[harborId];
}
