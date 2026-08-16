import React from 'react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const { config } = useSite();
  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 md:pt-16 pb-28 md:pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid: Company Info + Links + Services + Contact */}
        {/* Changed from grid-cols-1 to grid-cols-2 for mobile to mimic PC alignment */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 mb-12 md:mb-16 items-start">
          
          {/* Column 1: Company Info */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-3xl font-extrabold text-white leading-tight">
              {config.companyInfo.name}
            </h3>
            <p className="text-gray-400 text-[11px] md:text-base font-medium leading-relaxed whitespace-pre-line break-keep">
              상담부터 청소까지 대표가 직접<br />
              관리하는 신뢰받는 기업.<br /><br className="hidden md:block" />
              고객님의 공간에<br />
              평화와 휴식을 선물합니다.
            </p>
            <div className="flex space-x-2 md:space-x-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={config.companyInfo.blog} 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#03C75A] transition-all" 
                title="Naver Blog 1"
              >
                <span className="font-bold text-[7px] md:text-[9px]">BLOG</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={config.companyInfo.blog2} 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#03C75A] transition-all" 
                title="Naver Blog 2"
              >
                <span className="font-bold text-[7px] md:text-[9px]">BLOG</span>
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 md:space-y-4 text-[11px] md:text-base">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                   <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium text-gray-400"
                  >
                    {item === 'Home' ? '홈' : 
                     item === 'About' ? '회사소개' : 
                     item === 'Services' ? '서비스' : 
                     item === 'Portfolio' ? '포트폴리오' : '견적문의'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="flex flex-col">
             <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Our Services</h4>
             <ul className="space-y-2 md:space-y-4 text-[11px] md:text-base">
               {config.services.slice(0, 5).map(s => (
                 <li key={s.id}>
                   <Link to={`/services/${s.id}`} className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block font-medium text-gray-400 truncate max-w-full">
                     {s.title}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col">
            <h4 className="text-[12px] md:text-lg font-bold text-white mb-4 md:mb-8 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4 md:space-y-6 text-[11px] md:text-base">
              <li className="flex items-start gap-2 md:gap-3">
                <MapPin className="flex-shrink-0 text-primary mt-0.5" size={14} />
                <span className="text-gray-400 font-medium leading-snug break-keep">
                  {config.companyInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-2 md:gap-3">
                <Phone className="flex-shrink-0 text-primary" size={14} />
                <a href={`tel:${cleanPhone}`} className="hover:text-white text-gray-300 font-bold text-[13px] md:text-lg transition-colors">
                  {config.companyInfo.phone}
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-center gap-2 md:gap-3">
                  <Mail className="flex-shrink-0 text-primary" size={14} />
                  <span className="text-gray-500 font-bold uppercase text-[9px] md:text-xs tracking-widest">Email</span>
                </div>
                <a 
                  href={`mailto:${config.companyInfo.email}`} 
                  className="hover:text-white text-gray-300 font-medium pl-5 md:pl-8 text-[11px] md:text-base truncate transition-colors"
                >
                  {config.companyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Regional Service Area Coverage for Local SEO */}
        <div className="border-t border-gray-800/80 pt-8 pb-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h4 className="text-xs md:text-sm font-bold text-gray-200 tracking-wider">
                수도권 전지역 100% 무료 출장 방문 견적 & 24시 긴급 출동 지원
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] md:text-xs">
              <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-medium">서울 전지역 (25개구)</span>
              <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-medium">인천 전지역 (송도·청라·영종·남동)</span>
              <span className="px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-medium">경기 전지역 (군포·안양·수원·판교·화성)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] md:text-xs text-gray-400 leading-relaxed bg-gray-950/60 p-4 md:p-6 rounded-xl border border-gray-800/60">
            <div>
              <p className="text-gray-200 font-bold mb-1.5 flex items-center gap-1.5">
                <span className="text-emerald-400 font-black">●</span> 서울특별시 권역
              </p>
              <p className="text-gray-400 font-normal break-keep">
                강남구(역삼/삼성/논현/대치/청담/수서), 서초구(양재/반포/방배), 송파구(잠실/문정법조타운/가락/위례), 강동구(천호/고덕), 영등포구(여의도/문래/당산), 마포구(상암DMC/홍대/공덕), 구로구(구로디지털단지/G밸리), 금천구(가산디지털단지), 성동구(성수동/IT밸리), 용산구(한남/이태원), 종로구(광화문), 중구(을지로/명동), 강서구(마곡지구/발산), 양천구(목동), 동작구, 관악구, 광진구, 동대문구, 서대문구, 노원구 등 서울 25개 구 전역
              </p>
            </div>
            <div>
              <p className="text-gray-200 font-bold mb-1.5 flex items-center gap-1.5">
                <span className="text-emerald-400 font-black">●</span> 인천광역시 권역
              </p>
              <p className="text-gray-400 font-normal break-keep">
                연수구(송도국제도시/연수동/동춘동), 서구(청라국제도시/검단신도시/루원시티/가좌동), 중구(영종국제도시/영종하늘도시/운서동), 부평구(부평/삼산/산곡/갈산), 남동구(구월동/논현동/남동공단/남동인더스파크), 미추홀구(주안/주안공단/도화동/용현동), 계양구(계산/작전), 동구, 강화군 등 인천 전역
              </p>
            </div>
            <div>
              <p className="text-gray-200 font-bold mb-1.5 flex items-center gap-1.5">
                <span className="text-emerald-400 font-black">●</span> 경기도 권역
              </p>
              <p className="text-gray-400 font-normal break-keep">
                군포시(산본/당동/첨단산단), 안양시(평촌/범계/인덕원/만안), 수원시(광교/영통/인계/고색산단), 성남시(분당/판교테크노밸리), 화성시(동탄신도시/향남/봉담), 부천시(중동/상동/테크노파크), 안산시(반월공단/고잔), 시흥시(배곧/정왕/시화공단/MTV), 광명시(일직/철산), 과천시(지정타), 의왕시(포일/백운), 용인시(수지/기흥), 고양시(일산), 김포시, 파주시, 평택시(고덕), 하남시(미사) 등 경기 전역
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] md:text-sm text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} {config.companyInfo.name}. All rights reserved. | 대표: 조윤호 | 사업자등록번호 및 통신판매업신고 완료
          </p>
          <p className="text-[10px] md:text-xs text-gray-500">
            수도권 전지역 24시간 실시간 상담 & 100% 무료 현장 방문 견적 지원
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;