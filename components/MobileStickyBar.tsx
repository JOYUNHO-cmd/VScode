import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const MobileStickyBar: React.FC = () => {
  const phoneNumber = '01048807386';
  const kakaoUrl = 'https://open.kakao.com/o/srNJGmpg';

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex h-16 shadow-[0_-4px_16px_rgba(0,0,0,0.2)] overflow-hidden">
      {/* Shared Animation Keyframes Style block */}
      <style>{`
        @keyframes phone-ring-mobile {
          0%, 100% { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(-12deg) scale(1.1); }
          20% { transform: rotate(10deg) scale(1.1); }
          30% { transform: rotate(-10deg) scale(1.1); }
          40% { transform: rotate(8deg) scale(1.1); }
          50% { transform: rotate(-6deg) scale(1.05); }
          60% { transform: rotate(6deg) scale(1.05); }
          70% { transform: rotate(0deg) scale(1.05); }
        }

        @keyframes bubble-bounce-mobile {
          0%, 100% { transform: scale(1) translateY(0); }
          15% { transform: scale(1.15, 0.85) translateY(0); }
          30% { transform: scale(0.9, 1.1) translateY(-4px); }
          45% { transform: scale(1.05, 0.95) translateY(0); }
          60% { transform: scale(0.98, 1.02) translateY(-1px); }
          75% { transform: scale(1) translateY(0); }
        }

        .mobile-hover-phone {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          transition: all 0.3s ease-in-out;
        }
        .mobile-hover-phone:hover, .mobile-hover-phone:active {
          background: linear-gradient(135deg, #34d399 0%, #047857 100%);
        }
        .mobile-hover-phone:hover .phone-icon-animate, 
        .mobile-hover-phone:active .phone-icon-animate {
          animation: phone-ring-mobile 0.8s ease-in-out infinite;
        }

        .mobile-hover-kakao {
          background: linear-gradient(135deg, #FEE500 0%, #F1D200 100%);
          transition: all 0.3s ease-in-out;
        }
        .mobile-hover-kakao:hover, .mobile-hover-kakao:active {
          background: linear-gradient(135deg, #FFF176 0%, #E5C100 100%);
        }
        .mobile-hover-kakao:hover .bubble-icon-animate, 
        .mobile-hover-kakao:active .bubble-icon-animate {
          animation: bubble-bounce-mobile 0.8s ease-in-out infinite;
        }
      `}</style>

      {/* Phone Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        onClick={() => trackEvent('contact_click', { method: 'phone', location: 'mobile_sticky_bar' })}
        className="mobile-hover-phone flex-1 flex items-center justify-center gap-2 text-white font-black text-base"
      >
        <Phone size={20} className="phone-icon-animate shrink-0" />
        <span>전화상담</span>
      </a>

      {/* KakaoTalk Button */}
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('contact_click', { method: 'kakao', location: 'mobile_sticky_bar' })}
        className="mobile-hover-kakao flex-1 flex items-center justify-center gap-2 text-[#3C1E1E] font-black text-base"
      >
        <MessageCircle size={20} className="bubble-icon-animate fill-[#3C1E1E] shrink-0" />
        <span>카톡문의</span>
      </a>
    </div>
  );
};

export default MobileStickyBar;