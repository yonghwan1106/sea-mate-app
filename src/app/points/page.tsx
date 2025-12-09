'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, TrendingUp, Gift, ChevronRight, Star } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { getPointHistoryByUserId, pointRewards, pointUsage } from '@/data/mockPoints';
import { formatDate } from '@/lib/utils';

export default function PointsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'history' | 'earn' | 'use'>('history');

  const pointHistory = user ? getPointHistoryByUserId(user.id) : [];

  const getReasonIcon = (reason: string) => {
    const icons: Record<string, string> = {
      risk_share: '⚠️',
      rescue_help: '🆘',
      safety_training: '📚',
      safe_return: '🚢',
      checkin: '✅',
      monthly_safe: '🏆',
      equipment_buy: '🦺',
      insurance_discount: '📋',
    };
    return icons[reason] || '💰';
  };

  return (
    <div className="px-4 py-6">
      {/* 헤더 */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="touch-target">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-navy-500">내 포인트</h1>
      </div>

      {/* 포인트 요약 카드 */}
      <div className="card bg-gradient-to-br from-warning-400 to-warning-500 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award size={24} />
            <span className="font-semibold">보유 포인트</span>
          </div>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            Lv.{Math.floor((user?.points || 0) / 500) + 1}
          </span>
        </div>
        <div className="text-4xl font-bold mb-2">
          {user?.points.toLocaleString()}P
        </div>
        <div className="flex items-center gap-2 text-sm opacity-80">
          <TrendingUp size={16} />
          <span>이번 달 +450P 획득</span>
        </div>
      </div>

      {/* 레벨 프로그레스 */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">다음 레벨까지</span>
          <span className="text-sm font-medium text-primary-500">
            {500 - ((user?.points || 0) % 500)}P 남음
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-500"
            style={{ width: `${((user?.points || 0) % 500) / 5}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">
            Lv.{Math.floor((user?.points || 0) / 500) + 1}
          </span>
          <span className="text-xs text-gray-400">
            Lv.{Math.floor((user?.points || 0) / 500) + 2}
          </span>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-6">
        {[
          { value: 'history', label: '적립 내역' },
          { value: 'earn', label: '포인트 획득' },
          { value: 'use', label: '포인트 사용' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as any)}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 적립 내역 탭 */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {pointHistory.length === 0 ? (
            <div className="text-center py-12">
              <Award size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">포인트 내역이 없습니다</p>
            </div>
          ) : (
            pointHistory.map((record) => (
              <div key={record.id} className="card">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    record.type === 'earn' ? 'bg-secondary-100' : 'bg-gray-100'
                  }`}>
                    <span className="text-xl">{getReasonIcon(record.reason)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-500">{record.description}</p>
                    <p className="text-sm text-gray-400">
                      {formatDate(record.createdAt, 'MM.dd HH:mm')}
                    </p>
                  </div>
                  <span className={`font-bold ${
                    record.type === 'earn' ? 'text-secondary-500' : 'text-gray-500'
                  }`}>
                    {record.type === 'earn' ? '+' : ''}{record.amount}P
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 포인트 획득 방법 탭 */}
      {activeTab === 'earn' && (
        <div className="space-y-4">
          <div className="card bg-secondary-50 border border-secondary-200">
            <div className="flex items-center gap-3 mb-3">
              <Star size={24} className="text-secondary-500" />
              <h3 className="font-semibold text-secondary-700">포인트 적립 방법</h3>
            </div>
            <p className="text-sm text-secondary-600">
              안전 활동을 하면 포인트가 적립됩니다. 적립된 포인트로 다양한 혜택을 받으세요!
            </p>
          </div>

          <div className="space-y-3">
            {pointRewards.map((reward) => (
              <div key={reward.reason} className="card-hover">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{getReasonIcon(reward.reason)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-500">{reward.description}</p>
                    <p className="text-sm text-gray-500">안전 활동 참여</p>
                  </div>
                  <span className="font-bold text-secondary-500">+{reward.amount}P</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 포인트 사용 탭 */}
      {activeTab === 'use' && (
        <div className="space-y-4">
          <div className="card bg-primary-50 border border-primary-200">
            <div className="flex items-center gap-3 mb-3">
              <Gift size={24} className="text-primary-500" />
              <h3 className="font-semibold text-primary-700">포인트 혜택</h3>
            </div>
            <p className="text-sm text-primary-600">
              적립된 포인트로 안전장비 할인, 보험료 할인 등 다양한 혜택을 받으세요.
            </p>
          </div>

          <div className="space-y-3">
            {pointUsage.map((item, index) => {
              const canAfford = (user?.points || 0) >= item.points;
              return (
                <div
                  key={index}
                  className={`card ${!canAfford ? 'opacity-50' : 'hover:shadow-lg transition-shadow cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Gift size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-navy-500">{item.name}</p>
                        {item.discount && (
                          <p className="text-sm text-primary-500">
                            {item.discount} 할인
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-warning-600">{item.points.toLocaleString()}P</p>
                      {canAfford ? (
                        <button className="text-sm text-primary-500 flex items-center gap-1">
                          사용하기 <ChevronRight size={14} />
                        </button>
                      ) : (
                        <p className="text-xs text-gray-400">포인트 부족</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
