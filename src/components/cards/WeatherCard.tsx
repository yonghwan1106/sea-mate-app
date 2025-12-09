'use client';

import { Cloud, Wind, Waves, Thermometer, CheckCircle, AlertCircle, AlertTriangle, XCircle } from 'lucide-react';
import { SafetyLevel } from '@/types';
import { getSafetyLevelText } from '@/lib/utils';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  waveHeight: number;
  visibility: string;
  safetyLevel: SafetyLevel;
  advisory?: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

// 안전등급 아이콘 헬퍼
const getSafetyIcon = (level: SafetyLevel) => {
  switch (level) {
    case 'good':
      return <CheckCircle size={18} className="text-white" aria-hidden="true" />;
    case 'caution':
      return <AlertCircle size={18} className="text-white" aria-hidden="true" />;
    case 'warning':
      return <AlertTriangle size={18} className="text-white" aria-hidden="true" />;
    case 'danger':
      return <XCircle size={18} className="text-white" aria-hidden="true" />;
  }
};

// 안전등급 배지 색상
const getSafetyBadgeColor = (level: SafetyLevel) => {
  switch (level) {
    case 'good':
      return 'bg-secondary-500';
    case 'caution':
      return 'bg-warning-500';
    case 'warning':
      return 'bg-accent-500';
    case 'danger':
      return 'bg-danger-500';
  }
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <section className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">오늘의 날씨</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getSafetyBadgeColor(weather.safetyLevel)}`}>
          {getSafetyIcon(weather.safetyLevel)}
          {getSafetyLevelText(weather.safetyLevel)}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <Thermometer size={24} className="mx-auto mb-1 opacity-80" aria-hidden="true" />
          <p className="text-2xl font-bold">{weather.temperature}°</p>
          <p className="text-xs opacity-80">기온</p>
        </div>
        <div>
          <Wind size={24} className="mx-auto mb-1 opacity-80" aria-hidden="true" />
          <p className="text-2xl font-bold">{weather.windSpeed}</p>
          <p className="text-xs opacity-80">m/s</p>
        </div>
        <div>
          <Waves size={24} className="mx-auto mb-1 opacity-80" aria-hidden="true" />
          <p className="text-2xl font-bold">{weather.waveHeight}</p>
          <p className="text-xs opacity-80">m</p>
        </div>
        <div>
          <Cloud size={24} className="mx-auto mb-1 opacity-80" aria-hidden="true" />
          <p className="text-2xl font-bold">{weather.visibility}</p>
          <p className="text-xs opacity-80">km</p>
        </div>
      </div>

      {weather.advisory && (
        <div className="mt-4 bg-white/20 rounded-lg px-3 py-2">
          <p className="text-sm">⚠️ {weather.advisory}</p>
        </div>
      )}
    </section>
  );
}
