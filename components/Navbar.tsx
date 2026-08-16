import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UserCog, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { config, isEditable } = useSite();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
                 <motion.img
                   whileHover={{ scale: 1.05, rotate: 2 }}
                   transition={{ type: "spring", stiffness: 400, damping: 17 }}
                   src={config.companyInfo.logo}
                   alt={`${config.companyInfo.name} Logo`}
                   width={80}
                   height={80}
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
                   className="text-[#055c40] font-extrabold tracking-[0.2em] whitespace-nowrap uppercase"
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
                color: isCurrent || isHovered ? '#055c40' : '#000000',
              };
              if (idx === 2) {
                customStyle.fontFamily = 'Noto Sans KR, sans-serif';
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
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_2px_8px_rgba(44,211,150,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primaryDark transition-all shadow-lg shadow-primary/30 text-lg font-bold group cursor-pointer"
            >
              <Phone size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              {config.companyInfo.phone}
            </motion.a>
            
            {/* Admin Toggle Link */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to="/admin" aria-label="관리자 페이지" className={`p-2 rounded-full hover:bg-gray-100 transition inline-flex items-center justify-center ${isEditable ? 'text-red-500' : 'text-gray-400'}`}>
                  <UserCog size={24} />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
             <Link to="/admin" aria-label="관리자 페이지" className={`p-2 rounded-full hover:bg-gray-100 transition ${isEditable ? 'text-red-500' : 'text-gray-400'}`}>
                <UserCog size={24} />
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 hover:text-primary p-2 focus:outline-none rounded-xl"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-2xl overflow-hidden left-0 right-0 z-50"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-3 bg-white">
              <div className="divide-y divide-slate-100/90 rounded-2xl overflow-hidden">
                {navLinks.map((link, idx) => (
                  <motion.div
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
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-5 py-3.5 bg-white border-t border-slate-100/80 mt-2">
                 <motion.a 
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.9 }}
                   href={config.companyInfo.blog} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 text-gray-500 hover:bg-[#03C75A] hover:text-white transition-all shadow-sm"
                   title="Naver Blog 1"
                 >
                    <span className="font-bold text-[10px]">BLOG</span>
                 </motion.a>
                 <motion.a 
                   whileHover={{ scale: 1.15 }}
                   whileTap={{ scale: 0.9 }}
                   href={config.companyInfo.blog2} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 text-gray-500 hover:bg-[#03C75A] hover:text-white transition-all shadow-sm"
                   title="Naver Blog 2"
                 >
                    <span className="font-bold text-[10px]">BLOG</span>
                 </motion.a>
               </div>

               <motion.div
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;