'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { getUserPointHistory, products, safetyEducations } from '@/data/mockDatabase';
import {
  User, Award, Gift, BookOpen, ShieldCheck, ChevronRight,
  TrendingUp, TrendingDown, Star, Play, CheckCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

type TabType = 'points' | 'shop' | 'education';

export default function MyPage() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<TabType>('points');

  const pointHistory = user ? getUserPointHistory(user.id) : [];

  const tabs = [
    { id: 'points' as const, label: '포인트', icon: Award },
    { id: 'shop' as const, label: '마켓', icon: Gift },
    { id: 'education' as const, label: '안전교육', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen">
      <Header title="마이페이지" />

      <main className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {/* 프로필 카드 */}
        <section className="glass-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-400">{user?.harborName}</p>
              <p className="text-sm text-gray-500">{user?.vesselName} · {user?.vesselNumber}</p>
            </div>
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {user?.points.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">포인트</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user?.totalTrips}</p>
              <p className="text-sm text-gray-400">총 출항</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {user ? ((user.safeTrips / user.totalTrips) * 100).toFixed(0) : 0}%
              </p>
              <p className="text-sm text-gray-400">안전율</p>
            </div>
          </div>
        </section>

        {/* 탭 네비게이션 */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          {activeTab === 'points' && (
            <div className="space-y-4">
              {/* 포인트 요약 */}
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award size={20} className="text-yellow-400" />
                  포인트 적립 방법
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '위험정보 공유', point: '+100P', icon: '📢' },
                    { label: '동료 구조 참여', point: '+1,000P', icon: '🦸' },
                    { label: '무사고 월간', point: '+300P', icon: '🏆' },
                    { label: '안전교육 이수', point: '+500P', icon: '📚' },
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-xl text-center">
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-sm mt-1">{item.label}</p>
                      <p className="text-yellow-400 font-bold">{item.point}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 포인트 내역 */}
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4">포인트 내역</h3>
                <div className="space-y-3">
                  {pointHistory.map((history) => (
                    <div key={history.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          history.type === 'earn' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          {history.type === 'earn' ? (
                            <TrendingUp size={20} className="text-green-400" />
                          ) : (
                            <TrendingDown size={20} className="text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{history.reason}</p>
                          <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(history.createdAt), { addSuffix: true, locale: ko })}
                          </p>
                        </div>
                      </div>
                      <span className={`font-bold ${
                        history.type === 'earn' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {history.type === 'earn' ? '+' : ''}{history.amount.toLocaleString()}P
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="space-y-4">
              {/* 장비 */}
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-cyan-400" />
                  안전 장비
                </h3>
                <div className="space-y-3">
                  {products.filter(p => p.category === 'equipment').map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                        {product.name.includes('구명') ? '🦺' :
                         product.name.includes('GPS') ? '📍' : '🔦'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 line-through text-sm">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                          <span className="text-cyan-400 font-bold">
                            {product.discountedPrice.toLocaleString()}원
                          </span>
                        </div>
                        <p className="text-xs text-yellow-400 mt-1">
                          {product.pointsRequired.toLocaleString()}P 필요
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          -{product.discountPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 보험 */}
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Star size={20} className="text-purple-400" />
                  보험 할인
                </h3>
                <div className="space-y-3">
                  {products.filter(p => p.category === 'insurance').map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="w-16 h-16 bg-purple-900/50 rounded-xl flex items-center justify-center text-2xl">
                        🛡️
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-400">{product.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 line-through text-sm">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                          <span className="text-purple-400 font-bold">
                            {product.discountedPrice.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                          -{product.discountPercent}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <section className="glass-card p-4">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-green-400" />
                  안전 교육 영상
                </h3>
                <div className="space-y-3">
                  {safetyEducations.map((edu) => {
                    const isCompleted = user && edu.completedBy.includes(user.id);
                    return (
                      <div key={edu.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <div className="relative w-20 h-14 bg-gray-700 rounded-lg flex items-center justify-center">
                          <Play size={24} className="text-white/70" />
                          <span className="absolute bottom-1 right-1 text-xs bg-black/50 px-1 rounded">
                            {edu.duration}분
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{edu.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{edu.category}</p>
                          {!isCompleted && (
                            <p className="text-xs text-yellow-400 mt-1">
                              이수 시 +{edu.points}P
                            </p>
                          )}
                        </div>
                        {isCompleted ? (
                          <div className="flex items-center gap-1 text-green-400">
                            <CheckCircle size={20} />
                            <span className="text-sm">이수</span>
                          </div>
                        ) : (
                          <button className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                            시청
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 이수 현황 */}
              <section className="glass-card p-4">
                <h3 className="font-bold mb-3">이수 현황</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeDasharray={`${(3 / 5) * 226} 226`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">3/5</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">안전교육 이수율 60%</p>
                    <p className="text-sm text-gray-400">2개 교육 더 이수하면 추가 보너스!</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* 추가 메뉴 */}
        <section className="glass-card overflow-hidden">
          {[
            { label: '비상연락처 관리', icon: '📞' },
            { label: '건강정보 설정', icon: '💊' },
            { label: '언어 설정', icon: '🌐' },
            { label: '알림 설정', icon: '🔔' },
            { label: '앱 정보', icon: 'ℹ️' },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-500" />
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
