import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const FloatingContactButtons: React.FC = () => {
  const phoneNumber = '01048807386';
  const kakaoUrl = 'https://open.kakao.com/o/srNJGmpg';

  return (
    <div className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col gap-3 select-none pointer-events-auto">
      {/* Dynamic Interactive Animations Style block */}
      <style>{`
        @keyframes phone-ring-float {
          0%, 100% { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(-15deg) scale(1.15); }
          20% { transform: rotate(12deg) scale(1.15); }
          30% { transform: rotate(-12deg) scale(1.15); }
          40% { transform: rotate(10deg) scale(1.15); }
          50% { transform: rotate(-8deg) scale(1.08); }
          60% { transform: rotate(8deg) scale(1.08); }
          70% { transform: rotate(0deg) scale(1.08); }
        }

        @keyframes bubble-bounce-float {
          0%, 100% { transform: scale(1) translateY(0); }
          15% { transform: scale(1.2, 0.8) translateY(0); }
          30% { transform: scale(0.9, 1.1) translateY(-6px); }
          45% { transform: scale(1.08, 0.92) translateY(0); }
          60% { transform: scale(0.98, 1.02) translateY(-1.5px); }
          75% { transform: scale(1) translateY(0); }
        }

        .hover-phone-ring .bg-button-phone {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hover-phone-ring:hover .bg-button-phone {
          background: linear-gradient(135deg, #34d399 0%, #047857 100%);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.5), 0 0 12px rgba(52, 211, 153, 0.3);
          transform: translateY(-4px) scale(1.06);
        }
        .hover-phone-ring:hover .phone-icon-animate {
          animation: phone-ring-float 0.8s ease-in-out infinite;
        }

        .hover-bubble-bounce .bg-button-kakao {
          background: linear-gradient(135deg, #FEE500 0%, #F1D200 100%);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .hover-bubble-bounce:hover .bg-button-kakao {
          background: linear-gradient(135deg, #FFF176 0%, #E5C100 100%);
          box-shadow: 0 10px 25px rgba(254, 229, 0, 0.6), 0 0 12px rgba(255, 235, 59, 0.4);
          transform: translateY(-4px) scale(1.06);
        }
        .hover-bubble-bounce:hover .bubble-icon-animate {
          animation: bubble-bounce-float 0.8s ease-in-out infinite;
        }
      `}</style>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${phoneNumber}`}
        onClick={() => trackEvent('contact_click', { method: 'phone', location: 'floating_button' })}
        className="hover-phone-ring group relative flex items-center justify-end"
        aria-label="전화 문의"
      >
        {/* Main Floating Button */}
        <div className="bg-button-phone flex items-center gap-2.5 text-white px-5 py-3.5 md:px-6 md:py-4 rounded-full shadow-[0_6px_24px_rgba(16,185,129,0.5)] active:scale-95 relative overflow-visible border border-white/20">
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/35 animate-ping pointer-events-none" />
          
          <Phone size={22} className="phone-icon-animate md:w-[24px] md:h-[24px] shrink-0" />
          <span className="text-sm md:text-base lg:text-lg font-black tracking-tight pr-1">
            전화상담
          </span>
        </div>
      </a>

      {/* KakaoTalk Chat Floating Button */}
      <a
        href={kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('contact_click', { method: 'kakao', location: 'floating_button' })}
        className="hover-bubble-bounce group relative flex items-center justify-end"
        aria-label="카카오톡 문의"
      >
        {/* Main Floating Button */}
        <div className="bg-button-kakao flex items-center gap-2.5 text-[#3C1E1E] px-5 py-3.5 md:px-6 md:py-4 rounded-full shadow-[0_6px_24px_rgba(254,229,0,0.55)] active:scale-95 relative overflow-visible border border-black/10">
          {/* Pulsing Outer Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#FEE500]/50 animate-ping pointer-events-none" />
          
          <MessageCircle size={22} className="bubble-icon-animate md:w-[24px] md:h-[24px] fill-[#3C1E1E] shrink-0" />
          <span className="text-sm md:text-base lg:text-lg font-black tracking-tight pr-1">
            카톡문의
          </span>
        </div>
      </a>
    </div>
  );
};

export default FloatingContactButtons;
