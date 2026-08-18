import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import KakaoConfirmModal from './KakaoConfirmModal';

// Side-mounted floating contact buttons for mobile — replaces the old
// full-width bottom bar. Stays fixed to the bottom-right corner while
// scrolling (like the desktop FloatingContactButtons) instead of the
// bottom, and stays visually "alive" on its own — a gentle float bob plus
// a periodic icon "ring"/"bounce" burst — since touch devices have no
// hover state to trigger the desktop version's hover animation. All
// motion is plain CSS transform/opacity (GPU-composited, no JS per
// frame), and is disabled under prefers-reduced-motion.
const MobileStickyBar: React.FC = () => {
  const phoneNumber = '01048807386';
  const kakaoUrl = 'https://open.kakao.com/o/srNJGmpg';
  const [showKakaoConfirm, setShowKakaoConfirm] = useState(false);

  return (
    <div className="md:hidden fixed right-3 bottom-6 z-50 flex flex-col gap-2.5 select-none pointer-events-auto">
      <style>{`
        @keyframes side-phone-ring {
          0%, 82%, 100% { transform: rotate(0deg) scale(1); }
          85% { transform: rotate(-14deg) scale(1.12); }
          88% { transform: rotate(12deg) scale(1.12); }
          91% { transform: rotate(-10deg) scale(1.08); }
          94% { transform: rotate(8deg) scale(1.05); }
          97% { transform: rotate(0deg) scale(1); }
        }
        @keyframes side-bubble-bounce {
          0%, 78%, 100% { transform: scale(1) translateY(0); }
          81% { transform: scale(1.18, 0.85) translateY(0); }
          85% { transform: scale(0.9, 1.12) translateY(-4px); }
          89% { transform: scale(1.06, 0.96) translateY(0); }
          93% { transform: scale(1) translateY(0); }
        }
        .side-fab-phone {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        .side-fab-kakao {
          background: linear-gradient(135deg, #FEE500 0%, #F1D200 100%);
        }
        .side-phone-icon {
          animation: side-phone-ring 4.5s ease-in-out infinite;
        }
        .side-bubble-icon {
          animation: side-bubble-bounce 4.5s ease-in-out infinite;
          animation-delay: 2.1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .side-phone-icon, .side-bubble-icon {
            animation: none !important;
          }
        }
      `}</style>

      {/* Phone Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        onClick={() => trackEvent('contact_click', { method: 'phone', location: 'mobile_sticky_bar' })}
        aria-label="전화 문의"
        className="animate-float relative flex items-center justify-center"
      >
        <div className="side-fab-phone relative w-11 h-11 rounded-full flex items-center justify-center text-white shadow-[0_4px_14px_rgba(16,185,129,0.5)] border border-white/25 active:scale-95 transition-transform">
          <span className="absolute -inset-0.5 rounded-full bg-emerald-500/35 animate-ping pointer-events-none" />
          <Phone size={18} className="side-phone-icon shrink-0" />
        </div>
      </a>

      {/* KakaoTalk Button */}
      <a
        href={kakaoUrl}
        aria-label="카카오톡 문의"
        className="animate-float relative flex items-center justify-center"
        style={{ animationDelay: '-2s' }}
        onClick={(e) => {
          e.preventDefault();
          setShowKakaoConfirm(true);
        }}
      >
        <div className="side-fab-kakao relative w-11 h-11 rounded-full flex items-center justify-center text-[#3C1E1E] shadow-[0_4px_14px_rgba(254,229,0,0.55)] border border-black/10 active:scale-95 transition-transform">
          <span className="absolute -inset-0.5 rounded-full bg-[#FEE500]/50 animate-ping pointer-events-none" />
          <MessageCircle size={17} className="side-bubble-icon fill-[#3C1E1E] shrink-0" />
        </div>
      </a>

      {showKakaoConfirm && (
        <KakaoConfirmModal
          kakaoUrl={kakaoUrl}
          location="mobile_sticky_bar"
          onClose={() => setShowKakaoConfirm(false)}
        />
      )}
    </div>
  );
};

export default MobileStickyBar;
