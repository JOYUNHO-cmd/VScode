import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UserCog, ClipboardCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { m, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { trackEvent } from '../lib/analytics';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { config, isEditable } = useSite();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Collapse the mobile services accordion whenever the whole mobile menu closes
  useEffect(() => {
    if (!isOpen) setMobileServicesOpen(false);
  }, [isOpen]);

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '회사소개', path: '/about' },
    { name: '서비스', path: '/services' },
    { name: '현장시공사례', path: '/portfolio' },
    { name: '견적문의', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  
  // Clean phone number for tel: link (removes hyphens/spaces)
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          {/* Logo & Socials */}
          <div className="flex-shrink-0 flex items-center gap-6">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="flex items-center gap-4 cursor-pointer group"
              title="느티울 홈으로 이동 및 최상단 스크롤"
            >
               {config.companyInfo.logo && (
                 <m.img
                   whileHover={{ scale: 1.05, rotate: 2 }}
                   transition={{ type: "spring", stiffness: 400, damping: 17 }}
                   src={config.companyInfo.logo}
                   alt={`${config.companyInfo.name} Logo`}
                   width={90}
                   height={90}
                   className="h-20"
                 />
               )}
               <div className="flex flex-col items-start justify-center leading-none py-1">
                 <span 
                   className="text-slate-900 font-bold tracking-wide whitespace-nowrap group-hover:text-primary transition-colors duration-200"
                   style={{
                     fontFamily: "'Gowun Batang', serif",
                     fontSize: '42px',
                     lineHeight: '1.05'
                   }}
                 >
                   느티울
                 </span>
                 <span 
                   className="text-[#0b7a54] font-extrabold tracking-[0.2em] whitespace-nowrap uppercase"
                   style={{
                     fontFamily: "'Cinzel', serif",
                     fontSize: '14px',
                     lineHeight: '1',
                     marginTop: '4px'
                   }}
                 >
                   (Neutiul)
                 </span>
               </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link, idx) => {
              const isCurrent = isActive(link.path);
              const isHovered = hoveredIdx === idx;
              const customStyle: React.CSSProperties = {
                fontSize: '25px',
                lineHeight: '32px',
                color: isCurrent || isHovered ? '#0b7a54' : '#000000',
              };
              if (idx === 2) {
                customStyle.fontFamily = 'Noto Sans KR, sans-serif';
              }

              if (link.path === '/services') {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => { setHoveredIdx(idx); setServicesOpen(true); }}
                    onMouseLeave={() => { setHoveredIdx(null); setServicesOpen(false); }}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`relative px-3 py-2 text-lg font-bold transition-all duration-200 inline-flex items-center gap-1 ${
                        isCurrent
                          ? 'text-primaryDark'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                      style={customStyle}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <ChevronDown size={18} className={`relative z-10 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                      {isCurrent && (
                        <m.div
                          layoutId="activeNavUnderline"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_2px_8px_rgba(44,211,150,0.5)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <m.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[420px] z-50"
                        >
                          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 grid grid-cols-2 gap-1">
                            {config.services.map((service) => (
                              <Link
                                key={service.id}
                                to={`/services/${service.id}`}
                                className="px-3 py-2.5 rounded-xl text-[15px] font-semibold text-gray-700 hover:bg-primary/10 hover:text-primaryDark transition-colors"
                              >
                                {service.title}
                              </Link>
                            ))}
                            <div className="col-span-2 mt-1 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 bg-slate-50 text-center select-none">
                              각각의 서비스를 누르면 이동합니다
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-3 py-2 text-lg font-bold transition-all duration-200 ${
                    isCurrent
                      ? 'text-primaryDark'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                  style={customStyle}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isCurrent && (
                    <m.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_2px_8px_rgba(44,211,150,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <m.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={`tel:${cleanPhone}`}
              onClick={() => trackEvent('contact_click', { method: 'phone', location: 'navbar' })}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primaryDark transition-all shadow-lg shadow-primary/30 text-lg font-bold group cursor-pointer"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              {config.companyInfo.phone}
            </m.a>
            
            {/* Admin Toggle Link */}
            <m.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/admin" aria-label="관리자 페이지" className={`p-2 rounded-full hover:bg-gray-100 transition inline-flex items-center justify-center ${isEditable ? 'text-red-500' : 'text-gray-400'}`}>
                  <UserCog size={24} />
              </Link>
            </m.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
             <Link to="/admin" aria-label="관리자 페이지" className={`p-2 rounded-full hover:bg-gray-100 transition ${isEditable ? 'text-red-500' : 'text-gray-400'}`}>
                <UserCog size={24} />
            </Link>
            <m.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative bg-primary text-white p-2.5 focus:outline-none rounded-2xl shadow-lg shadow-primary/35 active:bg-primaryDark transition-colors"
              aria-label="Toggle navigation menu"
            >
              {!isOpen && (
                <span className="absolute -inset-0.5 rounded-2xl bg-primary/40 animate-ping pointer-events-none" />
              )}
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </m.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — plain CSS max-height transition instead of Framer
          Motion's height:'auto' animation. Animating to 'auto' forces
          Framer Motion to re-measure the DOM with JS on every frame (a real
          main-thread cost on the exact tap that INP measures); a CSS
          transition runs on the browser's own engine instead, off the
          interaction's hot path. Stays mounted at all times and is hidden
          via max-height:0 + inert rather than AnimatePresence unmounting
          it, so there's no exit-animation bookkeeping either. */}
      <div
        className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-2xl overflow-hidden left-0 right-0 z-50 transition-[max-height] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundColor: '#ffffff', maxHeight: isOpen ? '1000px' : '0px' }}
        inert={!isOpen}
      >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-3 bg-white">
              <div className="divide-y divide-slate-100/90 rounded-2xl overflow-hidden">
                {navLinks.map((link, idx) => {
                  if (link.path === '/services') {
                    return (
                      <m.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className={`w-full flex items-center justify-center gap-1.5 px-4 py-3.5 text-[17px] font-bold text-center transition-all ${
                              isActive(link.path) || mobileServicesOpen
                                ? 'bg-primary/10 text-primaryDark font-black shadow-sm'
                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                          }`}
                        >
                          {link.name}
                          <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                          className="overflow-hidden bg-slate-50 transition-[max-height] duration-200 ease-out"
                          style={{ maxHeight: mobileServicesOpen ? '600px' : '0px' }}
                          inert={!mobileServicesOpen}
                        >
                            <div className="grid grid-cols-2 gap-1.5 p-2.5">
                              {config.services.map((service) => (
                                <Link
                                  key={service.id}
                                  to={`/services/${service.id}`}
                                  onClick={() => setIsOpen(false)}
                                  className="px-3 py-2.5 rounded-lg text-[13px] font-semibold text-gray-700 text-center bg-white hover:bg-primary/10 hover:text-primaryDark transition-colors"
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                        </div>
                      </m.div>
                    );
                  }

                  return (
                    <m.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3.5 text-[17px] font-bold text-center transition-all ${
                            isActive(link.path)
                              ? 'bg-primary/10 text-primaryDark font-black shadow-sm'
                              : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </m.div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-5 py-3.5 bg-white border-t border-slate-100/80 mt-2">
                 <m.a 
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.9 }}
                   href={config.companyInfo.blog} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 text-gray-500 hover:bg-[#03C75A] hover:text-white transition-all shadow-sm"
                   title="Naver Blog 1"
                 >
                    <span className="font-bold text-[10px]">BLOG</span>
                 </m.a>
                 <m.a 
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.9 }}
                   href={config.companyInfo.blog2} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 text-gray-500 hover:bg-[#03C75A] hover:text-white transition-all shadow-sm"
                   title="Naver Blog 2"
                 >
                    <span className="font-bold text-[10px]">BLOG</span>
                 </m.a>
               </div>

               <m.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center bg-primary text-white py-4 mt-1 text-[17px] font-bold rounded-xl shadow-lg shadow-primary/25 active:bg-primaryDark transition-colors"
                >
                  <ClipboardCheck size={20} className="stroke-[2.5]" />
                  무료 방문 견적
                </Link>
              </m.div>

              {/* Collapse handle — closes the menu, mirrors the fold-out feel */}
              <div className="flex justify-center mt-3">
                <m.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setIsOpen(false)}
                  aria-label="메뉴 접기"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primaryDark shadow-sm hover:bg-primary/15 hover:shadow-md active:bg-primary/20 transition-all"
                >
                  <ChevronUp size={26} className="stroke-[3]" />
                </m.button>
              </div>
            </div>
      </div>
    </nav>
  );
};

export default Navbar;