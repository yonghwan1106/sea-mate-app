'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { getRiskTypeIcon, getSeverityColor } from '@/data/mockDatabase';
import { Heart, MessageCircle, Share2, Mic, Camera, MapPin, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const riskTypes = [
  { value: 'all', label: '전체' },
  { value: 'wave', label: '🌊 파도' },
  { value: 'wind', label: '💨 바람' },
  { value: 'obstacle', label: '⚠️ 장애물' },
  { value: 'weather', label: '🌫️ 날씨' },
  { value: 'equipment', label: '🔧 시설' },
  { value: 'other', label: '📢 기타' },
];

export default function CommunityPage() {
  const { riskReports, likeRiskReport, addRiskReport, user } = useStore();
  const [selectedType, setSelectedType] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<'wave' | 'wind' | 'obstacle' | 'weather' | 'equipment' | 'other'>('wave');
  const [newPostSeverity, setNewPostSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');

  const filteredReports = riskReports.filter(r => {
    if (!r.isActive) return false;
    if (selectedType === 'all') return true;
    return r.type === selectedType;
  });

  const handleLike = (reportId: string) => {
    likeRiskReport(reportId);
  };

  const handlePost = () => {
    if (!newPostContent.trim() || !user) return;

    const newReport = {
      id: `r_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userProfileImage: user.profileImage,
      type: newPostType,
      severity: newPostSeverity,
      content: newPostContent,
      location: { lat: 34.8612, lng: 128.4523, name: user.harborName + ' 인근' },
      mediaUrls: [],
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      isActive: true,
    };

    addRiskReport(newReport);
    setNewPostContent('');
    setShowNewPostModal(false);
  };

  return (
    <div className="min-h-screen">
      <Header title="커뮤니티" />

      <main className="max-w-lg mx-auto px-4 py-4">
        {/* 필터 */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {riskTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition ${
                selectedType === type.value
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <article key={report.id} className="glass-card p-4 list-item">
              {/* 작성자 정보 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-lg font-bold">
                  {report.userName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{report.userName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getSeverityColor(report.severity)}`}>
                      {report.severity === 'critical' ? '위험' : report.severity === 'high' ? '높음' : report.severity === 'medium' ? '보통' : '낮음'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true, locale: ko })}
                    {' · '}
                    <MapPin size={12} className="inline" /> {report.location.name}
                  </p>
                </div>
                <span className="text-3xl">{getRiskTypeIcon(report.type)}</span>
              </div>

              {/* 내용 */}
              <p className="text-gray-200 mb-3 leading-relaxed">{report.content}</p>

              {/* 이미지 (있는 경우) */}
              {report.mediaUrls.length > 0 && (
                <div className="mb-3 rounded-xl overflow-hidden bg-gray-800 h-48 flex items-center justify-center">
                  <span className="text-gray-500">📷 이미지</span>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex items-center gap-6 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleLike(report.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition"
                >
                  <Heart size={20} />
                  <span>{report.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition">
                  <MessageCircle size={20} />
                  <span>{report.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition">
                  <Share2 size={20} />
                </button>
              </div>

              {/* 댓글 미리보기 */}
              {report.comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                  {report.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="text-sm">
                      <span className="font-medium text-cyan-400">{comment.userName}</span>
                      <span className="text-gray-300 ml-2">{comment.content}</span>
                    </div>
                  ))}
                  {report.comments.length > 2 && (
                    <button className="text-sm text-gray-500">
                      댓글 {report.comments.length - 2}개 더 보기
                    </button>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* 새 글 작성 버튼 */}
        <button
          onClick={() => setShowNewPostModal(true)}
          className="fixed bottom-24 right-4 w-14 h-14 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition touch-feedback"
        >
          <Mic size={24} />
        </button>

        {/* 새 글 작성 모달 */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end">
            <div className="w-full max-w-lg mx-auto bg-[#1a365d] rounded-t-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">위험 정보 공유</h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* 위험 유형 선택 */}
              <div className="flex gap-2 flex-wrap mb-4">
                {riskTypes.slice(1).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setNewPostType(type.value as typeof newPostType)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      newPostType === type.value
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>

              {/* 심각도 선택 */}
              <div className="flex gap-2 mb-4">
                {['low', 'medium', 'high', 'critical'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setNewPostSeverity(sev as typeof newPostSeverity)}
                    className={`flex-1 py-2 rounded-lg text-sm ${
                      newPostSeverity === sev
                        ? getSeverityColor(sev) + ' text-white'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {sev === 'low' ? '낮음' : sev === 'medium' ? '보통' : sev === 'high' ? '높음' : '위험'}
                  </button>
                ))}
              </div>

              {/* 내용 입력 */}
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="위험 상황을 설명해 주세요..."
                className="w-full h-32 bg-white/10 rounded-xl p-4 text-white placeholder-gray-500 resize-none mb-4"
              />

              {/* 부가 기능 */}
              <div className="flex gap-4 mb-4">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Mic size={20} /> 음성
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Camera size={20} /> 사진
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <MapPin size={20} /> 위치
                </button>
              </div>

              {/* 공유 버튼 */}
              <button
                onClick={handlePost}
                disabled={!newPostContent.trim()}
                className="w-full py-4 bg-orange-500 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                공유하기 (+100P)
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
