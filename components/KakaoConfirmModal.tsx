import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

interface KakaoConfirmModalProps {
  kakaoUrl: string;
  location: string;
  onClose: () => void;
}

// Small confirmation step before leaving the site for the KakaoTalk open
// chat room, so a tap on the floating button doesn't feel like an
// unexpected app-switch. Styled to match the site rather than using the
// browser's native confirm() dialog. The conversion event fires only on
// actual confirm (not on opening the modal), so it reflects real
// hand-offs to KakaoTalk rather than button taps that get cancelled.
const KakaoConfirmModal: React.FC<KakaoConfirmModalProps> = ({ kakaoUrl, location, onClose }) => {
  const handleConfirm = () => {
    trackEvent('contact_click', { method: 'kakao', location });
    window.open(kakaoUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs bg-white rounded-3xl shadow-2xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FEE500] flex items-center justify-center shadow-sm">
          <MessageCircle size={26} className="fill-[#3C1E1E] text-[#3C1E1E]" />
        </div>

        <p className="text-slate-900 font-black text-base mb-1.5">카카오톡으로 이동할까요?</p>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 break-keep">
          느티울 카카오톡 채팅방이 새 창으로 열려요.
        </p>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl bg-[#FEE500] text-[#3C1E1E] font-black text-sm hover:bg-[#F1D200] transition-colors"
          >
            이동하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoConfirmModal;
