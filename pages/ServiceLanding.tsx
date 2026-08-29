import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import { 
  Sparkles, CheckCircle, ShieldCheck, Clock, Star, 
  ArrowRight, Phone, Send, ChevronRight, ChevronLeft, ChevronDown,
  Info, Check, ArrowLeft, Image as ImageIcon,
  CheckCircle2, ExternalLink, Lock, DollarSign, Calculator, TrendingUp, EyeOff, AlertTriangle, MessageCircle,
  Award, FileCheck, FileText, Building2
} from 'lucide-react';
import { m } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import { subscribePortfolioItems } from '../lib/firebaseService';
import { PortfolioItem } from '../types';
import ServiceBeforeAfterMarquee from '../components/ServiceBeforeAfterMarquee';
import ReviewsSection from '../components/ReviewsSection';
import CeoMessageSection from '../components/CeoMessageSection';
import FAQSection from '../components/FAQSection';

const certificationsData = [
  { 
    id: 1, 
    title: "청소전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-cleaning-expert.webp" 
  },
  { 
    id: 2, 
    title: "고객상담사 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-customer-service.webp" 
  },
  { 
    id: 3, 
    title: "환경관리전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-environment-management.webp" 
  },
  { 
    id: 4, 
    title: "방역관리사 1급", 
    issuer: "한국방역전문인협회",
    image: "/images/about/cert-pest-control.webp" 
  },
  { 
    id: 5, 
    title: "건물위생관리사 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-building-hygiene.webp" 
  },
  { 
    id: 6, 
    title: "정리수납전문가 1급", 
    issuer: "한국자격검정평가진흥원",
    image: "/images/about/cert-organizing-expert.webp" 
  },
];

const getCategoryMapping = (serviceId: string) => {
  switch (serviceId) {
    case 'new-construction': return '신축 준공청소';
    case 'interior': return '인테리어 청소';
    case 'move-in': return '입주 청소';
    case 'office': return '사무실 청소';
    case 'floor': return '바닥 청소';
    case 'floor-wax': return '바닥 왁스 코팅';
    case 'restaurant': return '식당 청소';
    case 'factory': return '공장 청소';
    case 'flood': return '침수 청소';
    case 'fire': return '화재 청소';
    case 'special': return '특수 청소';
    case 'external-wall': return '외벽 청소';
    default: return '';
  }
};

const naverBlogLinks = [
  {
    title: "안산쓰레기집청소 쥐퇴치업체, 전후 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/223930795266",
    desc: "안산 쓰레기집 쥐 퇴치 및 쓰레기 수거, 소독 살균 종합 세정 과정",
    category: "안산 쓰레기집",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MTJfMTM3/MDAxNzUyMjc3MTMwMDcy.ebdYBxDfJJXwK5YIzV22BGmD7YwVfj6J68TdPth32Owg.hSehogiN-_HaOdnA-PUmmgDb9HVPp1jnkzWtUtwcEWQg.PNG/%BE%C8%BB%EA%BE%B2%B7%B9%B1%E2%C1%FD%C3%BB%BC%D2.png?type=w966"
  },
  {
    title: "안산쓰레기집청소, 쥐로 인한 특수한 오염 제거 과정",
    url: "https://blog.naver.com/kslee0143/223966114653",
    desc: "쥐 배설물 및 특수 오염물 정밀 스팀 살균, 악취 차단 세정 과정",
    category: "특수 오염 제거",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA4MTBfMTky/MDAxNzU0ODIxODI1MTUx.GKNEpI2613L-2F7WuslcZZrFylLLO3cp6EHYMC8wkoUg.6QJC-S37pSTtxhvmcJc5KTH73GGkYw8O4KDeRb8wwqog.PNG/%EC%95%88%EC%82%B0%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91.png?type=w966"
  },
  {
    title: "수원 쓰레기집 청소, 특수했던 니코틴 제거 현장 과정",
    url: "https://blog.naver.com/kslee0143/223981232662",
    desc: "벽면 및 천장 니코틴 노란 묵은때 스팀 박리 및 살균 탈취",
    category: "수원 니코틴 청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA4MjRfMTI1/MDAxNzU1OTg0ODgxMDYz.YBM-mZDlZbfkpJIETFlJFF81Yr02qD4G8fwM7gyy5wAg.fa1G6xkxxXSF6V342dJuJ1M920UD7ocp7rcQ0qiaqFwg.PNG/%BC%F6%BF%F8%BF%F8%B7%EB%B4%CF%C4%DA%C6%BE%C1%A6%B0%C5%C3%BB%BC%D2.png?type=w966"
  },
  {
    title: "안양 원룸 쓰레기집 청소업체, 최적의 방법으로 해결해드려요",
    url: "https://blog.naver.com/decline11731/223781462184",
    desc: "안양 원룸 쓰레기 방치 현장의 신속한 방역 및 폐기물 분리 처리",
    category: "안양 쓰레기집",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAzMDNfOTYg/MDAxNzQwOTQ1NDYwMjc4._z_L1oQMJy8uegc8Sw5OnLrNx47cqWIlKY-glQ7-GQ4g.yh_dmK9qopvf8z-1ZUXLoUY-5e9ksLkG2KDf20QrNukg.PNG/%BE%C8%BE%E7_%BF%F8%B7%EB_%BE%B2%B7%B9%B1%E2%C1%FD.png?type=w966"
  },
  {
    title: "인천 원룸 쓰레기집, 전문업체를 통한 청소사례",
    url: "https://blog.naver.com/decline11731/223792811039",
    desc: "전문 탈취제 및 살균 가포화 처리를 통해 심각한 오염 및 고독사/쓰레기 현장 원상복구",
    category: "인천 전문특수청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAzMTJfMTMy/MDAxNzQxNzA2NzY3ODgx.5IVrXMEyLhrDDc2LuHUyBXWgVVbQf0FZDpFhTlfPsZkg.WZjQjtgIOSJwJn9kfOAsMKRTtlN19KYMC5KSbc6MTWEg.PNG/%EC%9D%B8%EC%B2%9C_%EC%9B%90%EB%A3%B8_%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91.png?type=w966"
  },
  {
    title: "새 출발을 위한 수원 쓰레기집 청소, 과정과 견적 공유해요",
    url: "https://blog.naver.com/decline11731/223835398320",
    desc: "고객님의 편안한 새 출발을 응원하며 체계적인 폐기물 처리 및 살균 탈취 과정 가이드",
    category: "수원 쓰레기집 견적",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA0MTZfNDcg/MDAxNzQ0NzY3MjQyNjQz.pLk55QaCh3o3FCHJ6k457bMon41-KCO_yKLmwKBvb7gg.K-gxx7rMXBOJYSuG-oi0gxxOesFGu4MG9O2D66QTRG4g.PNG/%EC%88%98%EC%9B%90%EC%93%B0%EB%A0%88%EA%B8%B0%EC%A7%91%EC%B2%AD%EC%86%8C.png?type=w966"
  }
];

const floorWaxBlogLinks = [
  {
    title: "에폭시코팅, 바닥 얼룩 기스 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224020368491",
    desc: "에폭시코팅 바닥 세척 및 왁스 코팅 작업",
    category: "에폭시코팅",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA5MjRfMjYy/MDAxNzU4NzAyMTkzMDIy.oY3i965bVg3et8G6DMKrXYq7_a081KarMKJg0o7lMakg.C0YQ7nMO2gLEOcGEzYhnwSHPuDTwkPYodQ5bApFyy08g.PNG/%EC%97%90%ED%8F%AD%EC%8B%9C%EC%BD%94%ED%8C%85.png?type=w966"
  },
  {
    title: "인천 바닥왁스, 청소 후 5회 코팅 과정 공유합니다",
    url: "https://blog.naver.com/decline11731/223840045095",
    desc: "인천 사무실 바닥 왁스 재코팅 상세 과정",
    category: "바닥왁스재코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MTlfMjk5/MDAxNzQ1MDcxOTg3ODEz.mLj4aYb_h2Wift_cixPRd1ckDrarodp7rLgcxYGvQYwg.tfNxmyGSjKgMvi66X8sawNCoBVPZsMg4ug_Br6xzJwcg.PNG/%B9%D9%B4%DA%BF%CE%BD%BA%C0%E7%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "데코타일 바닥왁스코팅, 대형마켓의 화려한 변신",
    url: "https://blog.naver.com/decline11731/223844606446",
    desc: "대형 매장 데코타일 딥클리닝 및 왁스 코팅 현장",
    category: "데코타일 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MjRfNzYg/MDAxNzQ1NDUyMDk0NTcx.EKK_PpeOxFIu0w2qNoGlebDR_lJXC8lkXKCitXAdWJAg.aXVc3ICV61qS60Aglks2xssWRJ7frrEEoAze0o5XkZ0g.PNG/%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "아름다운 퇴장, 왁스박리 후 바닥코팅으로 상가 원상복구",
    url: "https://blog.naver.com/decline11731/223824318110",
    desc: "상가 퇴거 복구를 위한 기존 왁스 박리 작업 및 재시공",
    category: "바닥 왁스박리",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MDZfMjIw/MDAxNzQzOTQ2Mjk4MTgw.dIeA8tIgYSraqXH48-YMFMMaTfRz_DOKXXCCYuoGCzEg.jcOVh6E5IsOMZew0WQnJ5lszJrxsozOPwVTXl19Y7HMg.PNG/%B9%DA%B8%AE_%C8%C4_%B9%D9%B4%DA%BF%CE%BD%BA.png?type=w2"
  },
  {
    title: "용인 교회 왁스코팅, 전문 업체의 바닥 시공 과정 공유합니다.",
    url: "https://blog.naver.com/decline11731/223814685051",
    desc: "용인 교회 대예배실 데코타일 바닥 왁스 작업 현장",
    category: "교회 바닥왁스",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTAzMzBfNjQg/MDAxNzQzMjkwODM2MTkw.Mypf4q0C7hWL9A0KzZOF2YtxAoWja77IfkIjTLckH5sg.YZIE7n993kP9ob79XrtV64SHI4zjaPCQkHSJ8-L33Pwg.PNG/%BF%EB%C0%CE_%B1%B3%C8%B8_%B9%D9%B4%DA%BF%CE%BD%BA.png?type=w2"
  },
  {
    title: "원목마루 나무바닥코팅 작업 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223923456510",
    desc: "원목마루 및 강화마루 전용 코팅제 도포 현장",
    category: "나무바닥코팅",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MDZfMjA1/MDAxNzUxNzU3MTAzNzUy.EYUzhWUIHRdjIglVfqAruJkBiNNNjOdxxilnRLOfrP8g.xDrP83TKDvpEz0Shrnpti8IIj6p9zYEWTY-CpazVA6wg.PNG/%EB%82%98%EB%AC%B4%EB%B0%94%EB%8B%A5%BD%EC%BD%94%ED%8C%85.png?type=w966"
  }
];

const floorBlogLinks = [
  {
    title: "안양 사무실 바닥 왁스코팅, 묵은 오염 청소 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/224302952491",
    desc: "안양 무역센터 사무실 바닥왁스코팅 현장입니다. 기계 청소를 통해 틈새에 고착된 시꺼먼 묵은 때와 얼룩을 전용 세제로 정밀 세정하고 최고급 바닥 왁스코팅을 적용했습니다.",
    category: "데코타일 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDFfMjk3/MDAxNzgwMjgxNTQzNDM1.JD0dVM6sWv3AfgSRiLChmR2cVQVun3xzZAkepOLnSg8g.-xjFbcy8qRXJjVb9q44RX5Aq-v3rGR8W4L-rSOwasJIg.PNG/%BE%C8%BE%E7%BB%E7%B9%AB%BD%C7%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C3.png?type=w2"
  },
  {
    title: "성동구 성수동 바닥 청소, 육각 모자이크 타일 오염 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224303447043",
    desc: "성수동 레스토랑 현장입니다. 이전 여러 청소업체에서도 포기했던 육각 모자이크 타일 깊은 틈새 of 시꺼먼 오염물과 고착 먼지를 완벽하게 복원 세척했습니다.",
    category: "타일 정밀 세정",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDJfMTEg/MDAxNzgwMzU0MzI1MDQz.NOiyi0xGIDTkLBjccQZJ1qTWySkIyiu7RJYfACJd8Agg.3y1GEErievDbBssd3DdjdTDrtDwTR9x7OZo5buINUqAg.PNG/%BC%BA%BC%F6%B5%BF%B9%D9%B4%DA%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강남 콩자갈 청소, 업체의 전문적인 관리 과정 공유",
    url: "https://blog.naver.com/kslee0143/223997542273",
    desc: "강남 고급 양복점 콩자갈 바닥 청소 현장입니다. 자재 틈새에 박힌 미세 유해 분진과 음료 얼룩을 콩자갈 전용 특수 친환경 세제와 석션 기계로 완전히 해결했습니다.",
    category: "콩자갈 특수 청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA5MDZfNTIg/MDAxNzU3MTI4NTY4NDk0.Ej9WFUuFA9WH0fvqdnjnrYQ4aRkyz3-GFEp9bfRFlQYg.QXB7IqqWCPjJrk48wG3BWaM4PSYETi32mbYt0cYgsJ0g.PNG/%C4%E1%C0%DA%B0%A5%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "사무실 복원청소, 바닥본드제거 왁스코팅 과정 공유",
    url: "https://blog.naver.com/kslee0143/223954353145",
    desc: "사무실 이전 공간의 골칫거리인 데코타일 바닥 본드 접착제 끈적임 자국을 전용 용해제와 연마 클리닝 기계를 동원하여 흔적 없이 제거하고 왁스코팅으로 신축 복원했습니다.",
    category: "바닥본드 왁스코팅",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MzFfMjU5/MDAxNzUzOTY5ODM0OTIx.eKNaq_9BhfTMGQ8sZ44hCmFcatw_eHNcYc5YZHw7WqEg.wKcolsaZ5vel2EHcMg2BJqmlCFivNzHZzqW8qHn1XrYg.PNG/%B9%D9%B4%DA%BA%BB%B5%E5%C1%A6%B0%C5.png?type=w2"
  },
  {
    title: "콩자갈 청소, 전문업체가 과정 알려드려요",
    url: "https://blog.naver.com/decline11731/223872265240",
    desc: "콩자갈 바닥 전문 청소 노하우를 바탕으로 한 전후 클리닝 과정입니다. 복잡한 골재 틈새 속에 깊숙이 박힌 물때와 음료 흔적, 미세먼지를 불림 작업 후 말끔하게 스크럽 및 흡입 흡수했습니다.",
    category: "콩자갈 정밀 세척",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA1MjBfMTA1/MDAxNzQ3NzQ4MTgyMDE5.B_jc2hAlbU92KzwzrvDqGP7pIstzRLI8O7j60K62gSkg.oI-v4jIZkwPH3B4x6Ad1vMiMGaOkFGNwLhSkh6tz1p8g.PNG/%C4%E1%C0%DA%B0%A5%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "데코타일 철거 후 바닥본드제거 그 과정 공유할게요",
    url: "https://blog.naver.com/decline11731/224120090281",
    desc: "서울 논현동 빌딩 현장입니다. 바닥 마루 데코타일 철거 후 남아 있는 유독성 접착 본드층을 안전한 친환경 본드 제거제와 강력 전문 장비로 바닥면 손상 없이 정교하게 걷어냈습니다.",
    category: "바닥 본드제거",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTEyMjNfNjMg/MDAxNzY2NDc1MjIxMTY2.sGTiwtyXUbvkzDKRU14jTbHMkXSHSdjcCUlpwPl9Sa0g.YL-5Py5PcxSIi7jfaEPMZb0xG3XA2Ygqt7PkHiNbqmkg.PNG/%B9%D9%B4%DA%BA%BB%B5%E5%C1%A6%B0%C5.png?type=w2"
  }
];

const restaurantBlogLinks = [
  {
    title: "안양 주방 바닥청소, 기름때 제거 과정 공유합니다",
    url: "https://blog.naver.com/decline11731/223770380603",
    desc: "안양 주방 바닥청소 현장입니다. 두껍게 고착화된 미끄러운 주방 기름때와 찌든 먼지를 전문 장비와 기름때 제거제로 완벽히 복원 처리했습니다.",
    category: "주방 바닥청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTAyMjNfMjU5/MDAxNzQwMjcwNDQ5NjIz.CLAp_8Gj0uGDTAQV27ZSGskg9FYHkv2CYg2MuaMb1dog.SJawWpxCFoKXpMVot4HlLQ6fwO4vWh8AX8nlpe5lqj4g.PNG/%C1%D6%B9%E6_%C3%BB%BC%D2_%B9%D9%B4%DA_%B1%E2%B8%A7%B6%A7_%C1%A6%B0%C5.png?type=w966"
  },
  {
    title: "화성 주방청소업체, 식당 상가 음식점 후드등 전문가의 과정 공유해요",
    url: "https://blog.naver.com/decline11731/223816142305",
    desc: "화성 주방청소업체 현장입니다. 식당 상가 음식점의 후드와 환기 시설 내부의 끈적한 유분 기름때를 고온 스팀과 친환경 세제로 복원 세정했습니다.",
    category: "주방 후드청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTAzMzFfMjA0/MDAxNzQzMzc4Nzk3NDY1.1lEPWQhGliLf0PdKZaqUqtu96vuMEAQwgmqrZhfA188g.X1cNmY2H8pdTLiIa9cwkEtSg1ZrYeFPXJdTymLT3JDYg.PNG/%C0%CE%C3%B5_%C1%D6%B9%E6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "방치된 식당 대변신, 수원 주방청소업체의 노하우",
    url: "https://blog.naver.com/decline11731/223851580082",
    desc: "방치되었던 식당 주방과 홀 내부를 수원 주방청소 전문업체의 축적된 기술력과 친환경 약품, 기계 세척을 동원하여 깨끗하고 위생적인 공간으로 대변신시켰습니다.",
    category: "수원 주방청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA0MzBfMTM2/MDAxNzQ2MDE1MTE3NDg4.C-Sb93vD5CprVwEstD0TxiNCibkXUlrKN5KYftrlzuQg.mgTxqBZLBbBUR6Xn0bAOV6Q3XOmL0U6YerM150FbalIg.PNG/%BC%F6%BF%F8%C1%D6%B9%E6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "주방의 놀라운 변화, 인천 후드청소업체가 만들어드려요",
    url: "https://blog.naver.com/decline11731/223854651094",
    desc: "인천 식당 후드 및 덕트 세정 현장입니다. 기름 방울이 떨어지던 심각한 오염 상태의 후드를 고온 스팀 클리닝과 전문 오일 용해제로 깨끗하게 변화시켜 드렸습니다.",
    category: "인천 후드청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA1MDNfMTA0/MDAxNzQ2Mjc5ODkyNTAx.5nvRl-bIKbxwnl6MbAd0YL9oWnVGjLpXsExR8_kU0b4g.M3OwgsC5vJiORO0-evBrDuS3Tiq6qv_aokI_1_82ZRAg.PNG/%EC%9D%B8%EC%B2%9C%ED%9B%84%EB%93%9C%EC%B2%AD%EC%86%8C2.png?type=w800"
  },
  {
    title: "화성 동탄 상가 식당 홀 청소업체, 기름때 제거 깔끔하게",
    url: "https://blog.naver.com/decline11731/223950865815",
    desc: "화성 동탄 식당 상가 홀 청소 현장입니다. 테이블, 가구, 그리고 바닥 전체의 미끄러운 기름 막과 묵은 때들을 꼼꼼하게 중화 클리닝하여 쾌적하게 만들었습니다.",
    category: "식당 홀청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA3MjlfMjA2/MDAxNzUzNzUwMTY1MzY1.-jEHtioS0NWao0CCxjd9pYEk-7XRVl496eh83fsrvckg.rOWrnsVVur5zDu8HzBgj-FTVHiTZUheYR4tK2-KVXIMg.PNG/%C8%AD%BC%BA%B5%BF%C5%BA%BB%F3%B0%A1%BD%C4%B4%E7%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w966"
  },
  {
    title: "안양 해썹청소, HACCP 인증업체가 과정 보여드려요",
    url: "https://blog.naver.com/decline11731/223867869442",
    desc: "HACCP 식품 제조업체 및 단체급식 조리실 청소 현장입니다. 위생 검열 기준에 부합할 수 있도록 철저한 세정, 고온 멸균 소독, 약품 살균을 제공합니다.",
    category: "해썹/위생 세정",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA1MTZfNTUg/MDAxNzQ3MzgxNjUyNzU3.Qzft_Kh9Wk_OEYVxjTvE6ubX-G0wtyoSGcNlixrpTVog.ri8-J1vOZQ30MAYPtUPsIKXFA2bf_BORJ_c6JEFOKcsg.PNG/%C7%D8%BD%E7%C3%BB%BC%D2.png?type=w966"
  }
];

const floodBlogLinks = [
  {
    title: "오수관 터짐으로 생긴 오물과 오수, 인천 침수청소 과정 공유",
    url: "https://blog.naver.com/kslee0143/223940315962",
    desc: "오수관이 터져 지하 또는 건물 내부에 고인 오염된 오수와 오물을 완벽하게 석션 및 세정 처리한 정밀 침수청소 현장입니다. 부유 오물과 찌꺼기를 집중 회수하고 철저한 소독·탈취 작업을 통해 본래의 위생적인 공간으로 신속하게 복구해 드렸습니다.",
    category: "인천 침수청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MjBfNjEg/MDAxNzUyOTgyMDYzOTk1.EQICpbbWHt2dNUownQaYcffQ5EIxf7kyTriDOLaIAPMg.tQcLeuqT0JPOr0xKC969H1Qilt47FpW1z_LCsPJhfVEg.PNG/%EC%98%A4%EB%AC%BC%EC%98%A4%EC%88%98%EC%B9%A8%EC%88%98%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "방치된 인천 건물 지하에서 발생한 침수 청소 과정",
    url: "https://blog.naver.com/kslee0143/224347135366",
    desc: "오랫동안 방치되었던 인천 건물의 지하 주차장 및 보일러실 침수 공간을 배수 펌프와 고성능 스크러버로 고인 물과 펄, 토사를 전부 제거한 침수 복구 현장입니다. 습기와 곰팡이를 억제하고 악취를 예방하기 위한 살균 및 건조 케어까지 꼼꼼하게 시공했습니다.",
    category: "인천 침수청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNjA3MTVfNjIg/MDAxNzg0MDY5NDU0Njcy._s77oz085tO8LZHgS9Z5FvhaJjfobpNwLVAdID2Q1-cg.XPdSSRnXQlIXZxiL-w0UDrpVd90lWTKnWXNHURFYe4Eg.PNG/%EB%8A%90%ED%8B%B0%EC%9A%B8_%EC%B5%9C%EC%A0%81_%EC%8B%9C%EC%9E%91.png?type=w800"
  }
];

const officeBlogLinks = [
  {
    title: "안양 평촌 사무실 청소, 5년 묵은 오염 제거 과정",
    url: "https://blog.naver.com/decline11731/224300392530",
    desc: "안양 평촌 사무실 입주 청소 현장입니다. 5년 동안 묵은 끈끈한 먼지와 사각지대의 오염들을 입주 전에 철저히 진공 청소 및 고온 소독 클리닝해 드렸습니다.",
    category: "사무실 입주청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA1MjlfMjE2/MDAxNzgwMDU0NTAzMjky.cvDk37N3qjEO6uw-TXA9Uy0QCu2ehh-3GMjj-XnquUUg.whTqu3yNCNkL07zpvp_rf63aslzwfXqRl1hjGXggKpwg.PNG/%BE%C8%BE%E7%C6%F2%C3%CC%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강남사무실청소, 전 세입자가 남겨놓은 오염 제거 과정",
    url: "https://blog.naver.com/kslee0143/224204600447",
    desc: "강남 사무실 복원 케어 현장입니다. 이전 입차인이 오랜 기간 사용하며 묵은 때와 찌꺼기로 가득했던 바닥 데코타일을 복원 연마하여 깨끗하게 세정했습니다.",
    category: "사무실 오염제거",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjAzMDRfNCAg/MDAxNzcyNjM0NTU4MDM2.bYmKyi7y681Oemd52fc9W_ia9AESVKpQSXoCVx4a-tYg.jizmXGcN6ncQqVig9xCT2mOtALoIqqu915PJMHB6jV0g.PNG/%B0%AD%B3%B2%BB%E7%B9%AB%BD%C7%C3%BB%BC%D21.png?type=w2"
  },
  {
    title: "용인 사무실 청소업체, 입주 전 마무리 과정 공유",
    url: "https://blog.naver.com/kslee0143/223987105401",
    desc: "용인 사무실 클리닝 현장입니다. 사무실을 이전하여 새로운 공간에 정착하시기 직전, 쾌적하고 티끌 하나 없는 위생적인 업무 공간을 제공해 드렸습니다.",
    category: "용인 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjhfMjY0/MDAxNzU2Mzg4NTI4MDcy.rz92oz2JCoZsQ3jmNm-Yv-CCCerNTvl2fuA5_rDv0EEg.t7NIr75RvIwZ4Eag8UM4j-_6Yzl067NvfSUJfPZdo84g.PNG/%B4%C0%C6%BF_%C3%D6%C0%FB_%BD%C3%C0%DB.png?type=w2"
  },
  {
    title: "수원 사무실 청소, 샷시 관리와 왁스코팅 과정",
    url: "https://blog.naver.com/kslee0143/223983188023",
    desc: "수원 사무실 정밀 청소 및 왁스코팅 현장입니다. 수북이 쌓였던 이물질과 먼지로 막혀 있던 샷시 창틀을 정밀 흡입 클리닝하고, 바닥 수명을 연장해 주는 프리미엄 왁스코팅을 적용했습니다.",
    category: "수원 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjVfMTI5/MDAxNzU2MTIxMjc0MTY3.ZXIvU1ziLEjvEiHizs3pDIr3jCr7-KChLmLcPTn7TY4g.E8XKdAiNphOEf7kAYljyEvLx_F6iijhlvS6_jibOKtog.PNG/%BC%F6%BF%F8%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2%B9%D9%B4%DA%BF%CE%BD%BA%C4%DA%C6%C349.png?type=w2"
  },
  {
    title: "안양 사무실 청소업체, 입주를 위한 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223981001686",
    desc: "안양 만안구/동안구 입주 전문 크리닝입니다. 천장 텍스 먼지 흡입부터 바닥 디테일 세척, 탕비실 물때까지 신축 빌딩 수준으로 완벽한 세정 서비스를 마쳤습니다.",
    category: "안양 사무실청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MjNfMTk3/MDAxNzU1OTU5MjA1NDY1.xMObm81liZSv7HPiwaoJMOCtYwDSyeCj02KglPNEFIAg.cZU6EUEQZF3gGF27a6ceD46eybbuCWMphyafHtgn-r8g.PNG/%BE%C8%BE%E7%BB%E7%B9%AB%BD%C7%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  },
  {
    title: "서울 준공청소, 종로 사무실 인테리어 마무리 과정",
    url: "https://blog.naver.com/kslee0143/223970810302",
    desc: "서울 종로 사무실 준공/인테리어 청소 현장입니다. 유독 분진이 많은 석고 가루와 톱밥, 미세 먼지들을 전용 특수 집진 기기로 정밀 흡입하고 쾌적하게 클리닝했습니다.",
    category: "종로 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA4MTRfMTAz/MDAxNzU1MTY2NDU2ODYy.wF1mazRsi8cESU6hTeTdW0PBMDyJPUsS36pOqkSQrzkg.Jb42nakvwWmOFul6GkRCUkEAsziNovnboUB_YRTXJgEg.PNG/%BC%AD%BF%EF%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  }
];

const constructionBlogLinks = [
  {
    title: "강동구 성수 준공청소, 공장이 팝업스토어가 되던날",
    url: "https://blog.naver.com/kslee0143/224302094656",
    desc: "성수동의 오래된 공장 건물을 핫한 팝업스토어로 완벽 탈바꿈시킨 준공청소 현장입니다. 깊숙한 분진과 먼지, 묵은 오염물들을 완전히 세정하고 위생적인 행사 공간으로 복원했습니다.",
    category: "성수동 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA1MzFfMTIg/MDAxNzgwMjM3NTQ2NDI5.zrdCxA4kKaraI47tAWPg4FrKjEfIi4XDxHh1Ml0atTUg.WrQhB7tOxRW_D0reBXu7q2M51L0a_wbjpO4Fru6r6XEg.PNG/%B0%AD%B5%BF%B1%B8%BC%BA%BC%F6%B5%BF%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "과천 준공청소, 상가 유리창 공사 잔재 제거 과정",
    url: "https://blog.naver.com/kslee0143/223997683194",
    desc: "과천의 높은 상가 준공청소 현장입니다. 4미터 높이의 거대 통유리창과 창틀에 찌든 실리콘, 먼지, 본드 등의 공사 잔재들을 고소 작업 장비와 전문 약품으로 깔끔하고 맑게 클리닝해 드렸습니다.",
    category: "과천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA5MDZfMjU3/MDAxNzU3MTQwNjIwMjU5.dZXioaw5lMBp1Du3ftmm0hXgnSfRDBsMPRXbpTSGG5wg.AEvJtmkha2KsQo3Ezgydawhqu9YHCtCLDE_yF8LItUMg.PNG/%B0%FA%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "강서구 준공청소, 병원 개업을 위한 마무리 과정",
    url: "https://blog.naver.com/decline11731/224195414574",
    desc: "강서구 마곡 병원/의원 준공청소 현장입니다. 병원 개원을 앞두고 인테리어 공사 후 남은 미세한 석고보드 가루, 시멘트 분진, 보양 필름들을 완벽하게 살균 제거하여 쾌적하고 청결한 진료 환경을 마련해 드렸습니다.",
    category: "강서구 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjAyMjVfOCAg/MDAxNzcxOTkzNTIyMTA4.DTgK_mRiIrf3ZxAV5GJ8xoyQ4S8nGR1JVBGpJkfdPqEg.jDj03s8kkkJgkUxAMYZ30dqs_FozWyLuQ-pHblHg-NQg.PNG/%B0%AD%BC%AD%B1%B8%BA%B4%BF%F8%C1%D8%B0%F8%C3%BB%BC%D282.png?type=w2"
  },
  {
    title: "군포 준공청소, 인테리어 의료 공간의 마무리 과정",
    url: "https://blog.naver.com/decline11731/223936269727",
    desc: "군포의 새로운 의료 및 상업 공간 준공 현장입니다. 환자분들이 직접 접하게 될 민감한 공간인 만큼, 눈에 띄는 백시멘트와 실리콘 잔여물 제거는 물론 미세한 공사 유해 먼지까지 고정밀 집진 기기로 완벽 분해 청소했습니다.",
    category: "군포 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MTZfMTkx/MDAxNzUyNjY4OTE1NDI1.nkJvxVO2qKE-rF7DhnJIOLPSJBcNDsB-6vSgE5skB9gg.zE6cAeD2iVdMYhEtTDfiY9TV2gV7alEr4Z5ghLJpf3og.PNG/%B1%BA%C6%F7%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "인천 준공청소업체, 쿠우쿠우 오픈 마무리 과정 공유해요",
    url: "https://blog.naver.com/decline11731/223864598483",
    desc: "인천 쿠우쿠우 패밀리 레스토랑의 초대형 매장 준공청소 현장입니다. 단 하루 만에 대규모 매장 전체의 공사 분진, 주방 유해물질, 미세 먼지들을 완벽히 제거하여 깔끔하고 성공적인 오픈을 완벽 지원해 드렸습니다.",
    category: "인천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA1MTNfMjYz/MDAxNzQ3MTM1NTgyNTAz.msE24ICAdICoFe3wrcpndoGo9l60XLEFgJlu_EAUPvAg.AoNL09p2IPFeSStOk48BNDSdL9Of-NODiOkFlQDsGYQg.PNG/%C0%CE%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  },
  {
    title: "부천 준공청소, 사무실 분진제거와 왁스코팅까지",
    url: "https://blog.naver.com/decline11731/223939225668",
    desc: "부천 사무실 입주 전 대형 준공청소 현장입니다. 전체 층의 리모델링 공사 후 남은 막대한 톱밥, 석고 가루 분진들을 깔끔히 밀어내고, 바닥면 내구성을 지탱해 줄 왁스코팅 시공까지 원스톱으로 처리해 드렸습니다.",
    category: "부천 준공청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MTlfMTIg/MDAxNzUyODgxMzU1NjQx.791luFCwZtGGW_gh56QKy8dHJAZHWyS9ZmLE0kPAaJQg.VOqFsVNKnK0pCwT9J4-f2TtiQs7NuoQlDYUQeWU-aVgg.PNG/%BA%CE%C3%B5%C1%D8%B0%F8%C3%BB%BC%D2.png?type=w2"
  }
];

const interiorBlogLinks = [
  {
    title: "인천 준공청소 인테리어 후 마무리 과정 공유",
    url: "https://blog.naver.com/kslee0143/224112904830",
    desc: "인천 매장의 인테리어 마무리 준공청소 현장입니다. 인테리어 시공 후 구석구석 쌓인 미세한 먼지와 톱밥, 유해 물질들을 정밀 세척하여 쾌적한 영업을 시작하실 수 있도록 가꿔드렸습니다.",
    category: "인천 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTEyMTdfNjcg/MDAxNzY1OTQzOTM1OTgw.Lv4xS18JoaUeOIsfI2VjZU4jgrM4Uph_X6jwBkR5kzkg.LhOn-dsuedwWDu8VZW4TKKRCC4fNCIc74fD_f1pNEYkg.PNG/%EC%9D%B8%EC%B2%9C%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "김포 쿠우쿠우 준공청소, 인테리어 후 마무리 과정",
    url: "https://blog.naver.com/kslee0143/224067639693",
    desc: "김포의 쿠우쿠우 대형 매장 인테리어 청소 현장입니다. 대규모 공간 전체의 미세 분진과 도배 자국, 자재 틈새 먼지들을 완벽하게 케어해 성공적인 매장 오픈을 지원했습니다.",
    category: "김포 인테리어청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTExMDdfMjYg/MDAxNzYyNDcyNjY0Mzk3.WWPrxy1rDLz2ewMRLkCs-1lOHU3SZXBtjUloFVR-dYYg.vi2Kfiw8Exc-hTHomeRRY6UpXmr1Yqr_xYGA2a5NKoog.PNG/%EA%B9%80%ED%8F%AC%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w966"
  },
  {
    title: "용인 수지구 사무실 인테리어 청소 과정 공유",
    url: "https://blog.naver.com/kslee0143/223965254838",
    desc: "용인 수지구 사무실의 새 단장 후 인테리어 청소 현장입니다. 직원들의 건강한 근무 환경과 높은 업무 효율을 위하여 보이지 않는 사각지대의 공사 유해 물질과 먼지들을 완벽하게 제거했습니다.",
    category: "용인 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA4MTBfMjg5/MDAxNzU0Nzc4NjM0Mzg1.JEUwnesSAwbx8Yajv5w1j9iPUZGrDOeCMOEKUcPUTYkg.vF9I4xZQTyOM2HxR0BjQwO16Li8XnRemLp7pWCYycrIg.PNG/%EC%9A%A9%EC%9D%B8%EC%88%98%EC%A7%80%EA%B5%AC%EC%82%AC%EB%AC%B4%EC%8B%A4%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "서초 준공청소, 인테리어 공사 잔재 꼼꼼하게 손봐요",
    url: "https://blog.naver.com/kslee0143/223938852808",
    desc: "서초구 인테리어 준공청소 현장입니다. 타일 틈의 백시멘트 분진, 유리에 묻은 페인트와 본드 잔해, 깊은 틈새 오염까지 꼼꼼하고 말끔히 세정했습니다.",
    category: "서초 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTdfMjY3/MDAxNzUyNzU1MDk3NTg3.ffJFfyOqqaBE_zEq4N2v-LmI43PhJ57WaGo6oJNnYW0g.r--J107Qoicirnp5SdRIsdTPm-kQvmYUdy8X0nNJOykg.PNG/%EC%84%9C%EC%B4%88%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "용인 준공청소, 인테리어 마감처리 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/223936178311",
    desc: "용인 상가의 인테리어 마감 청소 현장입니다. 새로운 출발을 기분 좋게 시작하실 수 있도록 가재도구의 먼지와 주방, 홀 공간 전체의 유해 먼지들을 정밀 클리닝했습니다.",
    category: "용인 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTZfMTcx/MDAxNzUyNjYyMjE3MDQw.cuHeavwAaMzNdCKguaJ_m4JSA6mn3DCgN_nkgekUErQg.AB7foqY-LhSIxdc9krKKGAHE87mMICbSaC954RPIfc4g.PNG/%EC%9A%A9%EC%9D%B8%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "수원 준공청소, 병원 인테리어 후 마무리의 중요성과 이유",
    url: "https://blog.naver.com/kslee0143/223932772517",
    desc: "수원 병원 인테리어 완료 후 마감 청소 현장입니다. 특히 위생이 철저해야 하는 의료 환경에 걸맞게 고성능 집진 세정과 꼼꼼한 마감 제거로 안심하고 진료할 수 있는 건강한 의료 공간을 선사해 드렸습니다.",
    category: "수원 인테리어청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA3MTRfMTc0/MDAxNzUyNDUzODk5NTE5.AvIfvY4jioGJigCcSjEE7_13Z_U8s_iSwWYcG6dVkuog.gyLDjGKlZ2QPOvjDvyTQ2tQFJlwlx6WTxq11_nydoeMg.PNG/%EC%88%98%EC%9B%90%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EC%A4%80%EA%B3%B5%EC%B2%AD%EC%86%8C.png?type=w800"
  }
];

const moveInBlogLinks = [
  {
    title: "원룸 벌레 퇴치, 청소와 방역의 완벽한 만남",
    url: "https://blog.naver.com/decline11731/223840623549",
    desc: "원룸 입주 청소와 함께 진행된 정밀 벌레 퇴치 및 특수 방역 케어 현장입니다. 구석구석 틈새에 숨어있기 쉬운 먼지 제거는 물론 빈틈없는 해충 방제 작업까지 완벽히 마쳐, 입주 첫날부터 안심하고 생활할 수 있는 깨끗하고 안전한 환경을 선사해 드렸습니다.",
    category: "원룸 입주청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA0MjBfNDQg/MDAxNzQ1MTQ2NjU4Mjgy.OXisCfl-g4QuTAEo0oTeB8K44GQWbY6ocESySYGKVuog.F5LGlrwIGHylSRR4eX0pHMtkBgmzYOX2F27DdpD8FBMg.PNG/%EC%9B%90%EB%A3%B8%EB%B2%8C%EB%A0%88%ED%87%B4%EC%B9%98.png?type=w966"
  },
  {
    title: "거주청소업체를 고르는 팁 6가지, 청소업체 대표가 알려드려요",
    url: "https://blog.naver.com/kslee0143/223921023427",
    desc: "입주 및 거주 청소 업체를 선택할 때 반드시 살펴봐야 할 핵심 기준 6가지를 정직하게 공개합니다. 신뢰할 수 있는 전문성과 정성스러운 클리닝 관리 비결까지, 대표가 솔직하고 유용한 선택 팁을 알기 쉽게 정리해 공유해 드립니다.",
    category: "거주청소 정보",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNTA3MDNfMiAg/MDAxNzUxNTUwMDYxMzIz.wuY9p2kNzbIgzg47lkhPRDzcqQv1mp3cn5Bi7LX6KJ8g.iks6XOp7EcxKPzihhjH6Z58Jz4spm7AVWfqhjuD7W1Mg.PNG/%B0%C5%C1%D6%C3%BB%BC%D2%BE%F7%C3%BC.png?type=w2"
  }
];

const factoryBlogLinks = [
  {
    title: "기름때 바닥청소, 왁스코팅으로 봄처럼 산뜻해진 공장 내부 공개해요",
    url: "https://blog.naver.com/decline11731/223826771079",
    desc: "공장 바닥의 묵은 기름때 청소 및 고밀도 왁스코팅 현장입니다. 유성 먼지 및 찌든 기름때를 완벽히 딥클리닝하고 고광택 왁스코팅으로 시설 내구성과 위생을 한 단계 업그레이드해 드렸습니다.",
    category: "공장 바닥청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTA0MDhfMjE2/MDAxNzQ0MTEzOTUyNDg5.mr9TPQNrDmjmrxb-W9QB98iEmDzK9yCnMGQHOkLl1fkg.Z4bG4DXdkVzrQtlfKKaen4r2FIUD_htDIHJNG8S5igIg.PNG/%EA%B3%B5%EC%9E%A5%EB%B0%94%EB%8B%A5%EC%B2%AD%EC%86%8C%EC%99%81%EC%8A%A4%EC%BD%94%ED%8C%85.png?type=w800"
  },
  {
    title: "악세스 플로어 청소, 데이터센터 깔끔하게 만드는 단계별 이야기",
    url: "https://blog.naver.com/decline11731/223770735539",
    desc: "데이터센터 및 산업 시설의 고난이도 악세스 플로어(이중 바닥) 청소 과정입니다. 전자기기 안전을 위한 미세 정전기 방지 먼지 제거와 정밀 기계 클리닝을 통해 안정적이고 청결한 장비실 환경을 조성해 드렸습니다.",
    category: "악세스플로어 청소",
    author: "크린마스터",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyNTAyMjNfMjk3/MDAxNzQwMjg2MjA1NDgy.Nw3aFiYaKpgeTB-unPhuTUQ8akBnrJIGiHMWvj8Qu7wg.GZp2yPUnR_eiE-FAC_huxl7ZibUZLvL9-MczrEstKIAg.PNG/%EC%95%85%EC%84%B8%EC%8A%A4_%ED%94%8C%EB%A1%9C%EC%96%B4_%EC%B2%AD%EC%86%8C.png?type=w800"
  },
  {
    title: "에폭시코팅, 바닥 얼룩 기스 제거 과정 공유해요",
    url: "https://blog.naver.com/kslee0143/224020368491",
    desc: "공장 및 상업 공간의 바닥 얼룩 및 기스 제거, 에폭시 하이브리드 코팅 현장입니다. 수년간 쌓인 바닥 스크래치와 깊은 오염 얼룩을 완벽히 박리·연마한 뒤 보호 코팅막을 씌워 새것과 같은 견고한 바닥을 선사해 드렸습니다.",
    category: "공장 바닥청소",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA5MjRfMjYy/MDAxNzU4NzAyMTkzMDIy.oY3i965bVg3et8G6DMKrXYq7_a081KarMKJg0o7lMakg.C0YQ7nMO2gLEOcGEzYhnwSHPuDTwkPYodQ5bApFyy08g.PNG/%EC%97%90%ED%8F%AD%EC%8B%9C%EC%BD%94%ED%8C%85.png?type=w966"
  }
];

const fireBlogLinks = [
  {
    title: "간접화재청소, 그을림제거 어떻게 진행되는지 알려드려요",
    url: "https://blog.naver.com/decline11731/223890211078",
    desc: "인천 화재 청소 현장입니다. 시꺼먼 그을음 분진과 유독 탄 타르 성분을 자재 무손상 전문 약품으로 정교하게 세정해 내고, 오존 화학 산화 가공을 병행하여 밴 탄내를 완벽 차단 및 특수 복구해 드렸습니다.",
    category: "화재 그을음 복원",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNTA2MDZfMjg3/MDAxNzQ5MTU3OTA5MTI2.WRGck-YH3hoctr9CfqU91KctP74Ssh-rEUOQyXtre0sg.oZx6p0TA7v48xToMIxznZSQVSFJhjUGfc6hHOWlEDMog.PNG/%EA%B0%84%EC%A0%91%ED%99%94%EC%9E%AC%EC%B2%AD%EC%86%8C.png?type=w966"
  },
  {
    title: "인천 화재청소 공장 피해 복구 과정 공유합니다",
    url: "https://blog.naver.com/kslee0143/224150367937",
    desc: "갑작스러운 화재로 인해 유독물질과 끈적한 그을음 타르로 가득 찬 실내를 디테일한 친환경 특수 약품 처리 및 고온 스팀, 기계 세척을 동원하여 완전 제거하고 매캐한 연기 냄새를 말끔히 해결했습니다.",
    category: "화재 탄내 제거",
    author: "크린마스터",
    image: "https://postfiles.pstatic.net/MjAyNjAxMTdfMzQg/MDAxNzY4NjYwMTk4NDM3.nlCpe5nDpabuMeVwMGzlHLvhJ4jgG5RwiNK9Dz363Dwg.TjxuwpufukGec1qS36MO06yyRB2ntAQovNlF9opAyjMg.PNG/%C0%CE%C3%B5%C8%AD%C0%E7%C3%BB%BC%D2.png?type=w966"
  }
];

const externalWallBlogLinks = [
  {
    title: "성동구 성수동 외벽 청소, 테라코타 타일 메지 제거 과정",
    url: "https://blog.naver.com/kslee0143/224311103623",
    desc: "성동구 성수동 현장의 외벽 청소 이야기입니다. 테라코타 타일 사이의 찌든 메지와 오염 물질들을 자재 손상 없는 맞춤 약품과 고압 세척으로 말끔하게 제거하고 본래의 고급스러운 외관을 복원해 드렸습니다.",
    category: "성수동 외벽청소",
    author: "크린마스터",
    image: "https://blogthumb.pstatic.net/MjAyNjA2MDlfMTIy/MDAxNzgxMDEyOTIxOTk5.AqfJrNAE4WRVj9XuWwQsCd6VHI1gVDXaWCQrqAWxg2Ug.jhxao7BKgoS-s-Vuv4G-nZsx1F8YeWWfbn_GsSEzR7sg.PNG/%BC%BA%BC%F6%B5%BF%BF%DC%BA%AE%C3%BB%BC%D2.png?type=w2"
  }
];

const ServiceLanding: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { config } = useSite();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const detailsRef = useRef<HTMLDivElement>(null);
  const beforeAfterRef = useRef<HTMLDivElement>(null);

  // Find the current service based on the URL parameter
  const service = config.services.find(s => s.id === serviceId);

  // Scroll to top when serviceId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Fetch portfolios dynamically from Firestore/local fallback
  useEffect(() => {
    const unsubscribe = subscribePortfolioItems((items) => {
      setPortfolioItems(items as PortfolioItem[]);
      setIsPortfolioLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!service) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <Info size={48} className="text-slate-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">원하시는 서비스를 찾을 수 없습니다</h2>
        <p className="text-slate-500 mb-6 font-medium">잘못된 경로이거나 존재하지 않는 서비스입니다.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primaryDark transition-all shadow-md">
          홈으로 가기
        </Link>
      </div>
    );
  }

  // Handle Formspree submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqeqoorz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        trackEvent('generate_lead', { method: 'contact_form', location: 'service_landing', service_type: formData.get('service_type') });
        alert('문의가 성공적으로 전달되었습니다! 기재해주신 번호로 신속히 연락해 드리겠습니다.');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('idle');
        alert('전송에 실패했습니다. 다시 시도해 주시거나 전화(010-4880-7386)로 연락 주세요.');
      }
    } catch (error) {
      setFormStatus('idle');
      alert('네트워크 에러가 발생하였습니다. 대표번호로 직접 전전화를 주시면 즉시 상담 드립니다!');
    }
  };

  // Filter portfolio cases matching this specific service
  const targetCategory = getCategoryMapping(serviceId || '');
  const filteredPortfolios = portfolioItems.filter(item => item.category === targetCategory);

  const cleanPhone = config.companyInfo.phone.replace(/[^0-9]/g, '');

  return (
    <div className="bg-slate-50 text-slate-800 min-h-svh">
      
      {/* Dynamic Immersive Premium Hero Header */}
      <section className="relative min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] py-10 sm:py-14 md:py-18 flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Background Responsive Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-70 scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Layered Advanced Gradients & Film Grain */}
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-slate-950/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-400/5" />
          <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* Decorative Floating Particle Lights */}
        <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none z-10">
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-primary rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-emerald-300 rounded-full blur-[120px]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center mt-2 sm:mt-4 md:mt-2 flex flex-col items-center justify-center">
          
          {/* Subtitle Accent */}
          <h2 className="text-slate-400 text-xs sm:text-sm md:text-[23.25px] md:leading-[30px] font-bold tracking-tight uppercase mb-2 md:mb-4.5 break-keep leading-snug">
            상담부터 마감까지
            <br />
            대표가 책임지고 직접 관리하는
          </h2>

          {/* Main Display Title */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.2] tracking-tight drop-shadow-2xl">
            {service.title}
          </h1>

          {/* Slogan Descriptive paragraph */}
          <div className="text-slate-200 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium tracking-tight break-keep leading-relaxed opacity-95 px-4 flex flex-col gap-3 sm:gap-4">
            <p className="md:text-[25.25px] md:font-normal">보여주기식 청소는 절대 하지 않습니다.</p>
          </div>

          {/* Navigation/Call to actions in Hero */}
          <div className="flex flex-wrap gap-3.5 justify-center mt-7 sm:mt-9">
            <button 
              onClick={() => beforeAfterRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-primary text-white text-sm sm:text-base font-extrabold rounded-xl hover:bg-primaryDark transition-all duration-300 shadow-xl shadow-primary/20 transform hover:-translate-y-0.5 active:scale-95"
            >
              청소 사례 확인하기
            </button>
            <button 
              onClick={() => detailsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-white/10 text-white border border-white/30 backdrop-blur-md text-sm sm:text-base font-extrabold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
            >
              상세 작업범위 보기
            </button>
          </div>
        </div>

        {/* Elegant Wave Subdivider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-20 translate-y-[2px]">
          <svg className="relative block w-full h-8 sm:h-12 md:h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.58V0Z" transform="rotate(180 600 60)" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      <div ref={beforeAfterRef}>
        <ServiceBeforeAfterMarquee serviceId={serviceId || ''} />
      </div>

      {/* Dynamic Filtered Portfolios Specific to This Service Only */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 bg-slate-50">
        {serviceId !== 'special' && serviceId !== 'floor-wax' && serviceId !== 'floor' && serviceId !== 'restaurant' && serviceId !== 'office' && serviceId !== 'new-construction' && serviceId !== 'interior' && serviceId !== 'move-in' && serviceId !== 'factory' && serviceId !== 'flood' && serviceId !== 'fire' && serviceId !== 'external-wall' && (
          <div className="flex flex-col items-center justify-center text-center gap-6 mb-10 md:mb-16">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-[17px] sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight break-keep">
                위에 보여드린 사진들은 실제 작업한 현장의 일부 사진입니다.
              </h3>
              <div className="flex flex-col items-center mt-3">
                <p className="text-primary font-extrabold text-[17.5px] leading-[19px] sm:text-base md:text-[26.25px] tracking-tight">
                  전체 작업 과정들이 궁금하시다면??
                </p>
                <div className="flex flex-col items-center mt-2">
                  <m.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="flex flex-col items-center -space-y-3.5 text-primary"
                  >
                    <ChevronDown className="w-8 h-8 sm:w-11 sm:h-11 stroke-[3.5]" />
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 stroke-[3.5]" />
                  </m.div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eye-catching Naver Blog links grid - for all supported services */}
        {(serviceId === 'special' || serviceId === 'floor-wax' || serviceId === 'floor' || serviceId === 'restaurant' || serviceId === 'office' || serviceId === 'new-construction' || serviceId === 'interior' || serviceId === 'move-in' || serviceId === 'factory' || serviceId === 'flood' || serviceId === 'fire' || serviceId === 'external-wall') && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 border-2 border-[#03C75A]/25 text-center relative overflow-hidden shadow-[0_8px_30px_rgba(3,199,90,0.04)]">
              {/* Vibrant top brand green bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#03C75A]" />
              <h3 className="text-[17px] sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight break-keep mb-3">
                위에 보여드린 사진들은 실제 작업한 현장의 일부 사진입니다.
              </h3>
              <div className="flex flex-col items-center justify-center">
                <p className="text-primary font-extrabold text-[17.5px] leading-[19px] sm:text-base md:text-[26.25px] tracking-tight">
                  전체 작업 과정들이 궁금하시다면??
                </p>
                <div className="flex flex-col items-center mt-2">
                  <m.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="flex flex-col items-center -space-y-3.5 text-primary"
                  >
                    <ChevronDown className="w-8 h-8 sm:w-11 sm:h-11 stroke-[3.5]" />
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 stroke-[3.5]" />
                  </m.div>
                </div>
              </div>
            </div>

            {(() => {
              const activeBlogs = (
                serviceId === 'special' ? naverBlogLinks :
                serviceId === 'floor-wax' ? floorWaxBlogLinks :
                serviceId === 'floor' ? floorBlogLinks :
                serviceId === 'restaurant' ? restaurantBlogLinks :
                serviceId === 'office' ? officeBlogLinks :
                serviceId === 'new-construction' ? constructionBlogLinks :
                serviceId === 'interior' ? interiorBlogLinks :
                serviceId === 'move-in' ? moveInBlogLinks :
                serviceId === 'factory' ? factoryBlogLinks :
                serviceId === 'flood' ? floodBlogLinks :
                serviceId === 'external-wall' ? externalWallBlogLinks :
                fireBlogLinks
              );

              return (
                <div className={`grid gap-3 sm:gap-6 lg:gap-8 ${
                  activeBlogs.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : activeBlogs.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                    : "grid-cols-2 md:grid-cols-3"
                }`}>
                  {activeBlogs.map((blog, idx) => (
                    <a
                      key={idx}
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#03C75A] hover:scale-[1.01] shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_rgba(3,199,90,0.1)] transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative aspect-[4/3] overflow-hidden w-full bg-slate-100 border-b border-slate-100">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80';
                          }}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#03C75A] text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded sm:rounded shadow-md z-10 flex items-center gap-1">
                          <span className="w-1 h-1 bg-white rounded-full animate-ping" />
                          블로그 현장기
                        </span>
                      </div>

                      {/* Body - Only simple title */}
                      <div className="p-3.5 sm:p-5">
                        <h5 className="text-[13px] sm:text-[16px] font-extrabold text-slate-900 group-hover:text-[#03C75A] transition-colors duration-200 line-clamp-2 leading-snug break-keep">
                          {blog.title}
                        </h5>
                      </div>
                    </a>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </section>

      <ReviewsSection />

      <CeoMessageSection />

      {/* Professional Certifications Status Section (전문 자격증 보유 현황) */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[31.75px] md:text-5xl font-extrabold text-slate-900 mb-6">전문 자격증 보유 현황</h2>
            <p className="text-slate-500 text-[11px] font-bold leading-[18px] sm:text-[15px] md:text-xl sm:font-medium sm:leading-relaxed max-w-3xl mx-auto break-keep">
              느티울은 검증된 전문 자격을 갖춘 대표가 직접 시공합니다.<br />
              전문성과 기술력을 바탕으로 신뢰할 수 있는 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-1 md:px-0">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg group-hover:border-primary/50 group-hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-0 w-full px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                     <p className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider">{cert.issuer}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-5 text-center px-1">
                  <h4 className="text-xs sm:text-base md:text-[17px] font-bold text-slate-800 mb-1 group-hover:text-primaryDark transition-colors leading-tight break-keep">
                    {cert.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Cleaning Tile Diagnostic & Solution Section (바닥청소/왁스 전용 타일 오염 솔루션 안내) */}
      {(serviceId === 'floor' || serviceId === 'floor-wax') && (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 text-slate-900 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Main Header */}
            <div className="text-center mb-10 sm:mb-14">
              <h3 className="text-lg sm:text-3xl md:text-[38px] md:leading-[50px] font-extrabold text-slate-900 tracking-tight leading-snug">
                <span className="block sm:inline">닦아도 닦아도 지저분해지는 이유,</span>{" "}
                <span className="block sm:inline">알고 나면 해결이 보입니다</span>
              </h3>
            </div>

            {/* Intro & Core Problem Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-10 md:mb-12 space-y-6 sm:space-y-8">
              <p className="text-slate-800 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-bold tracking-tight sm:tracking-normal">
                <span className="block sm:inline text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap sm:whitespace-normal">아무리 쓸고 닦아도 어느순간 바닥이 얼룩지고</span>{" "}
                <span className="block sm:inline text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap sm:whitespace-normal">오염이 번져가는 현상을 겪으셨을 것입니다.</span>
              </p>
              
              <div className="p-6 sm:p-8 md:p-9 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="text-emerald-950 font-extrabold text-base sm:text-lg md:text-xl">
                    이유는 간단합니다.
                  </h4>
                </div>
                <p className="text-slate-800 text-xs sm:text-base leading-relaxed font-medium space-y-0.5 sm:space-y-0">
                  <span className="block sm:inline">타일 표면에는 눈에 보이지 않는</span>{" "}
                  <span className="block sm:inline">미세한 기공과 패턴이 있어,</span>{" "}
                  <span className="block sm:inline">오염물이 표면이 아니라</span>{" "}
                  <span className="block sm:inline"><strong className="text-emerald-700 underline decoration-emerald-400 decoration-2 underline-offset-4 font-bold">그 속으로 스며들기 때문</strong>입니다.</span>{" "}
                  <span className="block sm:inline">그리고 여기서 잘못된 청소방식이</span>{" "}
                  <span className="block sm:inline">오염을 오히려 악화시킵니다.</span>
                </p>
              </div>
            </div>

            {/* Why Normal Cleaning Fails */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-2.5 mb-6 sm:mb-8 justify-center sm:justify-start">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h4 className="text-[16.5px] leading-[22px] sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  왜 일반 청소로는 해결되지 않을까요?
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ①
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 leading-snug">
                      <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">타일(기공,패턴)속에 굳어버린 오염,</span>{" "}
                      <span className="block sm:inline whitespace-nowrap sm:whitespace-normal">단순한 세정으로 해결 불가</span>
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      오염이 깊이 스며들어 경화되면, 표면만 닦는 세정으로는 절대 제거되지 않습니다.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ②
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 leading-snug whitespace-nowrap sm:whitespace-normal tracking-tight sm:tracking-normal">
                      억지로 오염을 닦아내면 오히려 확산
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      세제로 때를 불려도 그대로 닦아내면, 불려진 오염수가 옆으로 퍼지면서 다시 스며듭니다. 결국 얼룩의 위치만 이동할 뿐, 근본적으로는 사라지지 않습니다.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 mb-3.5">
                      원인 ③
                    </span>
                    <h5 className="text-slate-900 font-extrabold text-[15.5px] sm:text-base md:text-lg mb-2.5 break-keep leading-snug">
                      잔류 세제로 인한 2차 오염
                    </h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed break-keep font-normal">
                      세제 사용 후 충분히 헹구지 않으면 잔류 세제가 남아 끈적임, 광택 저하, 먼지 흡착을 유발하고 오염이 반복되는 악순환이 시작됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </section>
      )}

      {/* 5th Section: Special Cleaning Pricing & Transparency Guide (특수청소/쓰레기집 비용 및 투명 견적 안내) */}
      {serviceId === 'special' && (
        <section className="py-16 md:py-24 bg-slate-50/80 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
          {/* Background Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Header Badge & Title */}
            <div className="text-center mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug break-keep">
                투명하고 합리적인 <br className="block sm:hidden" /><span className="text-emerald-600">맞춤 비용 산정 가이드</span>
              </h3>
              <p className="text-slate-600 text-xs sm:text-base md:text-lg mt-3 font-medium leading-relaxed max-w-3xl mx-auto break-keep">
                과잉 청구나 무단 추가금 우려 없이, <br className="block sm:hidden" />정직하고 세심한 기준으로 가격을 제시합니다.
              </p>
            </div>

            {/* Top Important Notice Banner */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 sm:p-7 mb-10 md:mb-12 shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex-1">
                <h4 className="text-emerald-950 font-extrabold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center justify-center sm:justify-start gap-2">
                  <span>정확한 비용은 현장 기준으로 <br className="block sm:hidden" />세심하게 산정됩니다</span>
                </h4>
                <p className="text-slate-800 text-[11px] xs:text-xs sm:text-sm md:text-base leading-relaxed sm:leading-loose tracking-tighter sm:tracking-normal font-medium">
                  <span className="block sm:inline">쓰레기 적치량 · 오염도 · 투입 인원 · 작업 시간</span>{" "}
                  <span className="block sm:inline">층수 및 엘리베이터 동선 등에 따라 맞춤 견적이</span>{" "}
                  <span className="block sm:inline">산정되며, 사진 전송 시 <strong className="text-emerald-700 font-bold">10분 이내에 빠르게</strong></span>{" "}
                  <span className="block sm:inline"><strong className="text-emerald-700 font-bold">비대면 예상 견적</strong>을 바로 안내드립니다.</span>
                </p>
              </div>
            </div>

            {/* Main Grid: Left Table & Right Chart Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 md:mb-16">
              
              {/* Left Column: Average Price Table (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 sm:mb-6 border-b border-slate-200/80 pb-3 sm:pb-4 text-center sm:text-left">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug text-center sm:text-left">
                      쓰레기집 &amp; 특수청소 <br className="block sm:hidden" />평균 비용 안내
                    </h4>
                  </div>

                  {/* Mobile Card View (block sm:hidden) */}
                  <div className="block sm:hidden space-y-3">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900">원룸 · 소형</span>
                        <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          30만 원 ~
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        쓰레기 적치량 및 오염 수준에 따라 유연하게 책정
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900">빌라 · 아파트</span>
                        <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          70만 원 ~
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        작업 인원 · 소요 시간 · 층수 및 운반 동선 반영
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                        <span className="text-sm font-extrabold text-slate-900 leading-tight">
                          심각한<br />특수 현장
                        </span>
                        <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200 text-right leading-tight">
                          맞춤 상담 후<br />현장 실사 견적
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed break-keep font-medium">
                        고독사 · 부패 · 분뇨 · 해충 박멸 및 특수 탈취 소독 포함
                      </p>
                    </div>
                  </div>

                  {/* Desktop Table View (hidden sm:block) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200/80 text-slate-500 font-bold">
                          <th className="pb-3 px-2 w-1/4">구분</th>
                          <th className="pb-3 px-2 w-1/3 text-emerald-700">평균 비용 범위</th>
                          <th className="pb-3 px-2">산정 및 주요 작업 설명</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 text-slate-800">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            원룸 · 소형
                          </td>
                          <td className="py-4 px-2 font-extrabold text-emerald-700 text-sm sm:text-base">
                            30만 원 ~
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            쓰레기 적치량 및 오염 수준에 따라 유연하게 책정
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            빌라 · 아파트
                          </td>
                          <td className="py-4 px-2 font-extrabold text-emerald-700 text-sm sm:text-base">
                            70만 원 ~
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            작업 인원 · 소요 시간 · 층수 및 운반 동선 반영
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-2 font-bold text-slate-900">
                            심각한 특수 현장
                          </td>
                          <td className="py-4 px-2 font-extrabold text-amber-700 text-xs sm:text-sm">
                            현장 맞춤 상담 후 견적
                          </td>
                          <td className="py-4 px-2 text-xs sm:text-sm text-slate-600 leading-normal">
                            고독사 · 부패 · 분뇨 · 해충 박멸 및 특수 탈취 소독 포함
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80 text-slate-500 text-[11px] sm:text-xs leading-relaxed">
                  * 정확한 금액은 폐기물의 최종 무게(톤) 및 특수 약품/소독 범위에 따라 사전 상의 후 확정됩니다.
                </div>
              </div>

              {/* Right Column: Estimated Price Distribution Chart & Transparency Guarantee (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      합리적인 가성비 견적
                    </h4>
                  </div>

                  <p className="text-[12.5px] sm:text-sm text-slate-600 mb-6 leading-relaxed">
                    폐기물량, 오염도, 청소 범위를 기준으로<br />
                    불필요한 거품 없이 합리적이고 정직하게<br />
                    책정하여 고객님께 말씀드립니다.
                  </p>

                  {/* Visual Bar Chart / Range Indicator */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">최저 시작 비용 (부분/경미)</span>
                        <span className="text-emerald-700">25만 원 ~</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">평균 작업 비용 (표준 원/투룸)</span>
                        <span className="text-emerald-700">85만 원 선</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-emerald-700 rounded-full" style={{ width: '55%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-extrabold mb-1.5">
                        <span className="text-slate-700">고가/중증 특수현장 (대형/고난도)</span>
                        <span className="text-amber-700">200만 원 ~</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                  사진으로 먼저 상담받으시면 불필요한 작업 항목을 제외하고 꼭 필요한 부분만 예산에 맞춰 진행해 드립니다.
                </div>

              </div>

            </div>

          </div>
        </section>
      )}

      {/* Structured Detailed Job Scope Content with custom Noto Sans Layout */}
      <section ref={detailsRef} className="py-16 md:py-24 bg-slate-50/60 border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-xl sm:text-4xl md:text-[41.5px] md:leading-[54px] font-extrabold text-slate-900 tracking-tight leading-snug">
              <span className="block sm:inline">{service.title}</span>{" "}
              <span className="block sm:inline text-emerald-700">작업 범위 및 정밀 프로세스</span>
            </h3>
            <p className="text-slate-600 text-[13px] sm:text-base md:text-lg mt-3 font-medium leading-relaxed max-w-2xl mx-auto break-keep">
              <span className="block sm:inline">체계적인 단계별 클리닝과 대표 직접 검수로</span>{" "}
              <span className="block sm:inline">완성하는 프리미엄 서비스입니다.</span>
            </p>
          </div>



          {/* Work details Step Cards Grid */}
          {service.details && service.details.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {service.details.map((detail, index) => {
                const parts = detail.split(':');
                const stepNum = String(index + 1).padStart(2, '0');
                let title = '';
                let desc = detail.trim();

                if (parts.length > 1) {
                  title = parts[0].replace(/^(1|2|3|4|5|6|7|8|9|0)+단계\s*/, '').replace(/:\s*$/, '').trim();
                  desc = parts.slice(1).join(':').trim();
                }

                return (
                  <div 
                    key={index} 
                    className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Subtle top accent bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/70 tracking-wider">
                          STEP {stepNum}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      </div>

                      {title && (
                        <h4 className="text-slate-900 font-extrabold text-base sm:text-lg md:text-xl mb-2 group-hover:text-emerald-700 transition-colors break-keep">
                          {title}
                        </h4>
                      )}
                      
                      <p className="text-slate-600 text-xs sm:text-sm md:text-[18px] md:leading-[25px] md:font-bold leading-relaxed break-keep font-medium">
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="col-span-2 text-center py-10 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-400 font-medium">상세 작업 프로세스가 곧 업데이트 될 예정입니다.</p>
            </div>
          )}

          {/* Bottom Trust Guarantee Banner */}
          <div className="mt-8 sm:mt-12 bg-emerald-50/80 rounded-2xl p-5 sm:p-6 border border-emerald-200/70 text-center flex items-center justify-center gap-3 text-emerald-900 text-xs sm:text-sm font-bold break-keep">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>모든 청소 작업은 사전 현장 진단 후 진행되며, 작업 완료 후 고객님과 함께 현장을 직접 검수하여 마감합니다.</span>
          </div>

        </div>
      </section>

      {/* Main Multi-Bento Core Values Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h3 className="text-[17px] min-[360px]:text-xl min-[410px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight whitespace-nowrap">
            느티울이 약속하는 3대 작업 원칙
          </h3>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">대표 직접 성실 관리</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                하청이나 외주팀에 일을<br />
                넘겨주는 행위는 절대 없습니다.
              </p>
              <p>
                상담 과정부터 실제 세척,<br />
                그리고 최종 점검까지!
              </p>
              <p>
                대표인 제가 직접 관리 감독하며<br />
                디테일을 마감합니다.
              </p>
            </div>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.12 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Star className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">추가없는 투명한 견적 약속</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                애매한 견적서, 숨겨진 추가비용<br />
                저희와 거리가 먼 얘기입니다.
              </p>
              <p>
                현장을 직접 확인하고<br />
                작업 범위와 단가를 근거로 제시
              </p>
              <p>
                투명하게 금액을 공개하고<br />
                고객님께 의뢰를 제시합니다.
              </p>
            </div>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.19 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-6 md:p-10 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
            </div>
            <h4 className="text-[17px] min-[360px]:text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-4 tracking-tight whitespace-nowrap">100% 고객 만족 정직 시공</h4>
            <div className="text-slate-500 text-xs sm:text-[13px] md:text-sm leading-relaxed font-semibold text-center space-y-4">
              <p>
                고객님이 현장을 함께 확인하시고<br />
                만족할 때까지 책임을 다합니다.
              </p>
              <p>
                투명하고 양심적인 비용 대비<br />
                완벽한 시공 퀄리티로 작업하여,
              </p>
              <p>
                감동적인 공간으로 되돌려드립니다.
              </p>
            </div>
          </m.div>

        </div>
      </section>

      <FAQSection ctaPhone={cleanPhone} />

      {/* Embedded Real, Seamless Consultation Contact Formspree Area (No placeholders) */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          
          <m.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-[2rem] border border-white/10 shadow-xl shadow-black/20 p-6 sm:p-12 md:p-16 relative"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="text-center mb-10">
              <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 leading-tight">
                {service.title}
                <br />
                무료 견적 신청
              </h3>
              <p className="text-slate-300 text-[11.5px] xs:text-[13.5px] sm:text-base md:text-[18px] font-bold leading-normal xs:leading-relaxed sm:leading-loose break-keep px-2 sm:px-4 opacity-95">
                필요 조건만 적어 접수해주시면, 빠르게<br />
                합리적인 비용으로 마스터 플랜을 구성해<br />
                친절하게 안내드리겠습니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10 text-left">
              {/* Invisible hidden parameters to pass the actual service context to Formspree */}
              <input type="hidden" name="service_type" value={`${service.title} (개별랜딩 특별견적)`} />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">성함 또는 단체명 <span className="text-red-500 font-bold">*</span></label>
                  <input name="name" required type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="성함 기재" />
                </div>
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">연락처 <span className="text-red-500 font-bold">*</span></label>
                  <input name="phone" required type="tel" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 010-0000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">시공 예정일 (희망 일정)</label>
                  <input name="date" type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 11월 중순 또는 일정 협의" />
                </div>
                <div>
                   <label className="block text-xs sm:text-sm font-bold text-white mb-2 font-black">현장 위치 / 예상 평수</label>
                  <input name="area_size" type="text" className="w-full px-4.5 py-3 sm:py-4 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-slate-400 focus:border-slate-500 outline-none transition bg-white text-slate-900 placeholder-slate-400" placeholder="예: 군포 도마교동 / 25평" />
                </div>
              </div>

              <div>
                 <label className="block text-xs sm:text-sm font-bold text-white mb-2">추가 문의 및 현장 요청사항 <span className="text-red-500 font-bold">*</span></label>
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  className="w-full px-4.5 py-3.5 text-xs sm:text-base rounded-xl border border-slate-700 focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition bg-white text-slate-900 placeholder-slate-400 resize-none leading-relaxed" 
                  placeholder="예: 실리콘 그을음 제거 필수, 인테리어 수납 마감 먼지 케어 요청, 찌든기름때 제거 등 희망하시는 세심한 요구조건을 자유롭게 적어주세요."
                ></textarea>
              </div>

              <div className="flex items-start gap-2.5">
                <input id="privacy-consent-service" name="privacy_consent" type="checkbox" required className="mt-1 w-4 h-4 accent-primary shrink-0" />
                <label htmlFor="privacy-consent-service" className="text-xs md:text-sm text-slate-300 leading-relaxed break-keep">
                  (필수) 견적 상담을 위한 개인정보 수집·이용에 동의합니다.{' '}
                  <Link to="/privacy" target="_blank" rel="noreferrer" className="underline text-slate-200 hover:text-primary">개인정보처리방침 보기</Link>
                </label>
              </div>

              <div className="pt-2">
                <m.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={formStatus === 'submitting'}
                  type="submit"
                  className="w-full bg-primary text-white text-[15px] xs:text-[16px] sm:text-xl md:text-[22px] font-black py-4 sm:py-[22px] md:py-[24px] px-4 rounded-xl sm:rounded-2xl hover:bg-[#1fa178] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:bg-slate-700 disabled:text-slate-500 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/45 whitespace-nowrap"
                >
                  {formStatus === 'submitting' ? (
                     <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        작업전송 처리중...
                     </span>
                  ) : (
                     <>무료 상세 견적 신청 및 문의 전송 <Send className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" /></>
                  )}
                </m.button>
              </div>
            </form>
          </m.div>

          <div className="text-center mt-12 mb-4">
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-800 hover:text-primary transition-all font-extrabold text-base sm:text-lg md:text-[21px] border-b-2 border-slate-300/60 hover:border-primary pb-1">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" /> 다른 청소 전체 서비스 둘러보기
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ServiceLanding;
