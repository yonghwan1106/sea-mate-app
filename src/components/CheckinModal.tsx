'use client';

import { useStore } from '@/store/useStore';
import { CheckCircle, X } from 'lucide-react';

export default function CheckinModal() {
  const { showCheckinModal, setShowCheckinModal, checkin, currentTrip } = useStore();

  if (!showCheckinModal || !currentTrip) return null;

  const handleCheckin = () => {
    checkin();
  };

  return (
    <div className="checkin-modal">
      <div className="glass-card p-8 mx-4 max-w-sm w-full text-center">
        <button
          onClick={() => setShowCheckinModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="w-20 h-20 mx-auto mb-6 bg-cyan-500/20 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-cyan-400" />
        </div>

        <h2 className="text-2xl font-bold mb-2">체크인 시간입니다</h2>
        <p className="text-gray-300 mb-6">
          안전 확인을 위해 버튼을 눌러주세요
        </p>

        <div className="text-sm text-gray-400 mb-6">
          <p>현재 위치: {currentTrip.destination.name}</p>
          <p>조업 상태: {currentTrip.status === 'fishing' ? '조업 중' : '항해 중'}</p>
        </div>

        <button
          onClick={handleCheckin}
          className="btn-large w-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center gap-2"
        >
          <CheckCircle size={24} />
          체크인 완료
        </button>

        <p className="text-xs text-gray-500 mt-4">
          * 동료 {currentTrip.buddyName}님에게도 안전 알림이 전송됩니다
        </p>
      </div>
    </div>
  );
}
