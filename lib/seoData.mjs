// lib/seoData.mjs
//
// Pure data + logic, no React/DOM dependency. Imported by:
//   - components/SEO.tsx (browser) — applies the result to the live DOM
//   - scripts/prerender.mjs (Node, build time) — bakes the result into
//     static HTML files so non-JS crawlers see correct per-page meta
//
// Keeping this in one plain module means the live site and the
// prerendered files can never drift out of sync with each other.

export const SERVICE_KEYWORDS_MAP = {
  'new-construction': [
    '신축준공청소', '준공청소', '상가준공청소', '아파트준공청소', '지식산업센터준공청소', '오피스텔준공청소', '공장준공청소',
    '빌라준공청소', '인테리어마감청소', '리모델링입주청소', '보양지제거', '시멘트분진제거', '페인트자국제거', '창틀시멘트제거',
    '준공청소비용', '준공청소업체추천', '서울준공청소', '강남준공청소', '마곡준공청소', '송도준공청소', '청라준공청소',
    '검단준공청소', '판교준공청소', '동탄준공청소', '군포준공청소', '안양준공청소', '수원준공청소', '강남구신축준공청소',
    '여의도신축준공청소', '구로디지털단지신축준공청소', '가산디지털단지신축준공청소', '성수동신축준공청소', '송도국제도시신축준공청소', '청라국제도시신축준공청소', '남동공단신축준공청소',
    '군포시신축준공청소', '산본신축준공청소', '안양시신축준공청소', '평촌신축준공청소', '수원시신축준공청소', '의왕시신축준공청소', '판교신축준공청소',
    '안산시신축준공청소', '반월공단신축준공청소'
  ],
  'post-construction': [
    '신축준공청소', '준공청소', '상가준공청소', '아파트준공청소', '지식산업센터준공청소', '오피스텔준공청소', '공장준공청소',
    '빌라준공청소', '인테리어마감청소', '리모델링입주청소', '보양지제거', '시멘트분진제거', '페인트자국제거', '창틀시멘트제거',
    '준공청소비용', '준공청소업체추천', '서울준공청소', '강남준공청소', '마곡준공청소', '송도준공청소', '청라준공청소',
    '검단준공청소', '판교준공청소', '동탄준공청소', '군포준공청소', '안양준공청소', '수원준공청소', '강남구신축준공청소',
    '여의도신축준공청소', '구로디지털단지신축준공청소', '가산디지털단지신축준공청소', '성수동신축준공청소', '송도국제도시신축준공청소', '청라국제도시신축준공청소', '남동공단신축준공청소',
    '군포시신축준공청소', '산본신축준공청소', '안양시신축준공청소', '평촌신축준공청소', '수원시신축준공청소', '의왕시신축준공청소', '판교신축준공청소',
    '안산시신축준공청소', '반월공단신축준공청소'
  ],
  'interior': [
    '인테리어청소', '인테리어마감청소', '리모델링청소', '상가인테리어청소', '아파트인테리어청소', '공사분진제거', '도배풀제거',
    '새집증후군청소', '보양지제거', '실리콘자국제거', '페인트제거', '피톤치드소독', '서울인테리어청소', '강남인테리어청소',
    '성수동인테리어청소', '송도인테리어청소', '판교인테리어청소', '강남구인테리어청소', '여의도인테리어청소', '구로디지털단지인테리어청소', '가산디지털단지인테리어청소',
    '송도국제도시인테리어청소', '청라국제도시인테리어청소', '남동공단인테리어청소', '군포시인테리어청소', '산본인테리어청소', '안양시인테리어청소', '평촌인테리어청소',
    '수원시인테리어청소', '의왕시인테리어청소', '안산시인테리어청소', '반월공단인테리어청소'
  ],
  'move-in': [
    '입주청소', '이사청소', '아파트입주청소', '오피스텔입주청소', '원룸입주청소', '빌라입주청소', '고온스팀살균',
    '주방기름때제거', '욕실물때제거', '창틀먼지제거', '배수구살균소독', '피톤치드시공', '서울입주청소', '인천입주청소',
    '경기입주청소', '수원입주청소', '군포입주청소', '안양입주청소', '강남구입주청소', '여의도입주청소', '구로디지털단지입주청소',
    '가산디지털단지입주청소', '성수동입주청소', '송도국제도시입주청소', '청라국제도시입주청소', '남동공단입주청소', '군포시입주청소', '산본입주청소',
    '안양시입주청소', '평촌입주청소', '수원시입주청소', '의왕시입주청소', '판교입주청소', '안산시입주청소', '반월공단입주청소'
  ],
  'office': [
    '사무실청소', '사무실정기청소', '사무실대청소', '공유오피스청소', '스타트업사무실청소', 'IT기업사옥청소', '빌딩관리청소',
    '계단청소', '병원정기청소', '학원청소', '헬스장청소', '상가화장실청소', '사무실바닥청소', '사무실청소견적',
    '사무실청소업체', '강남사무실청소', '여의도사무실청소', '가산디지털단지사무실청소', '구로디지털단지사무실청소', '성수동사무실청소', '마포사무실청소',
    '상암사무실청소', '판교사무실청소', '분당사무실청소', '송도사무실청소', '수원사무실청소', '강남구사무실청소', '송도국제도시사무실청소',
    '청라국제도시사무실청소', '남동공단사무실청소', '군포시사무실청소', '산본사무실청소', '안양시사무실청소', '평촌사무실청소', '수원시사무실청소',
    '의왕시사무실청소', '안산시사무실청소', '반월공단사무실청소'
  ],
  'floor': [
    '바닥청소', '바닥기계세척', '디럭스타일청소', '데코타일세척', '에폭시바닥청소', '우레탄바닥청소', '도끼다시세척',
    '테라조청소', '대리석세척', '바닥찌든때제거', '기름때제거', '오염수흡입', '서울바닥청소', '인천바닥청소',
    '경기바닥청소', '군포바닥청소', '안양바닥청소', '강남구바닥청소', '여의도바닥청소', '구로디지털단지바닥청소', '가산디지털단지바닥청소',
    '성수동바닥청소', '송도국제도시바닥청소', '청라국제도시바닥청소', '남동공단바닥청소', '군포시바닥청소', '산본바닥청소', '안양시바닥청소',
    '평촌바닥청소', '수원시바닥청소', '의왕시바닥청소', '판교바닥청소', '안산시바닥청소', '반월공단바닥청소'
  ],
  'floor-wax': [
    '바닥청소', '바닥왁스코팅', '왁스코팅', '데코타일왁스코팅', '디럭스타일박리작업', '아스타일코팅', '에폭시바닥청소',
    '우레탄바닥청소', '도끼다시연마광택', '테라조연마광택', '대리석연마광택', '바닥찌든때제거', '바닥기름때제거', '바닥왁스코팅가격',
    '바닥광택복원', '서울바닥코팅', '인천바닥코팅', '강남바닥코팅', '여의도바닥코팅', '가산바닥코팅', '송도바닥코팅',
    '남동공단바닥코팅', '판교바닥코팅', '안산바닥코팅', '수원바닥코팅', '강남구바닥왁스코팅', '여의도바닥왁스코팅', '구로디지털단지바닥왁스코팅',
    '가산디지털단지바닥왁스코팅', '성수동바닥왁스코팅', '송도국제도시바닥왁스코팅', '청라국제도시바닥왁스코팅', '남동공단바닥왁스코팅', '군포시바닥왁스코팅', '산본바닥왁스코팅',
    '안양시바닥왁스코팅', '평촌바닥왁스코팅', '수원시바닥왁스코팅', '의왕시바닥왁스코팅', '판교바닥왁스코팅', '안산시바닥왁스코팅', '반월공단바닥왁스코팅'
  ],
  'restaurant': [
    '식당청소', '식당주방청소', '닥트기름때제거', '후드청소', '튀김기청소', '업소용주방청소', '식당바닥청소',
    '식당위생점검청소', '주방트렌치청소', '배기덕트청소', '그리스트랩청소', '식당오픈청소', '서울식당청소', '인천식당청소',
    '강남식당청소', '홍대식당청소', '성수동식당청소', '수원식당청소', '강남구식당청소', '여의도식당청소', '구로디지털단지식당청소',
    '가산디지털단지식당청소', '송도국제도시식당청소', '청라국제도시식당청소', '남동공단식당청소', '군포시식당청소', '산본식당청소', '안양시식당청소',
    '평촌식당청소', '수원시식당청소', '의왕시식당청소', '판교식당청소', '안산시식당청소', '반월공단식당청소'
  ],
  'factory': [
    '공장청소', '물류창고청소', '클린룸청소', '기계설비세척', '공장바닥에폭시청소', '배관청소', '공장외벽청소',
    '산업체청소', 'H빔청소', '고소작업청소', '남동공단공장청소', '반월공단청소', '시화공단청소', '주안공단청소',
    '화성공장청소', '평택공장청소', '고색산단청소', '군포첨단산단청소', '강남구공장청소', '여의도공장청소', '구로디지털단지공장청소',
    '가산디지털단지공장청소', '성수동공장청소', '송도국제도시공장청소', '청라국제도시공장청소', '군포시공장청소', '산본공장청소', '안양시공장청소',
    '평촌공장청소', '수원시공장청소', '의왕시공장청소', '판교공장청소', '안산시공장청소', '반월공단공장청소'
  ],
  'flood': [
    '침수청소', '수해복구청소', '침수복구청소', '지하침수청소', '지하주차장침수배수', '양수기배수작업', '산업용제습건조',
    '고압세척진흙제거', '오니제거', '곰팡이방제소독', '빗물역류청소', '하수구역류청소', '침수폐기물처리', '24시간긴급배수',
    '침수복구업체', '서울침수청소', '인천침수청소', '경기침수청소', '강남침수청소', '지하상가침수청소', '24시간침수출동',
    '강남구침수청소', '여의도침수청소', '구로디지털단지침수청소', '가산디지털단지침수청소', '성수동침수청소', '송도국제도시침수청소', '청라국제도시침수청소',
    '남동공단침수청소', '군포시침수청소', '산본침수청소', '안양시침수청소', '평촌침수청소', '수원시침수청소', '의왕시침수청소',
    '판교침수청소', '안산시침수청소', '반월공단침수청소'
  ],
  'fire': [
    '화재청소', '화재복구청소', '화재그을음제거', '그을음청소', '화재냄새제거', '탄냄새제거', '오존탈취살균',
    '유독가스중화', '화재폐기물처리', '화재현장철거', '주방화재청소', '공장화재청소', '아파트화재청소', '상가화재복구',
    '화재보험청구견적서', '24시간화재청소', '서울화재청소', '인천화재청소', '경기화재청소', '수도권화재청소', '긴급출동화재청소',
    '강남구화재청소', '여의도화재청소', '구로디지털단지화재청소', '가산디지털단지화재청소', '성수동화재청소', '송도국제도시화재청소', '청라국제도시화재청소',
    '남동공단화재청소', '군포시화재청소', '산본화재청소', '안양시화재청소', '평촌화재청소', '수원시화재청소', '의왕시화재청소',
    '판교화재청소', '안산시화재청소', '반월공단화재청소'
  ],
  'special': [
    '특수청소', '쓰레기집청소', '저장강박증청소', '원룸쓰레기집청소', '오피스텔쓰레기집청소', '비대면쓰레기집청소', '비밀보장청소',
    '폐기물수거처리', '고독사청소', '유품정리', '고독사현장정리', '혈흔제거', '시체악취제거', '특수방역소독',
    '부패취제거', '벌레퇴치방제', '야간쓰레기집청소', '서울특수청소', '인천특수청소', '경기특수청소', '서울쓰레기집청소',
    '인천쓰레기집청소', '경기쓰레기집청소', '강남구특수청소', '여의도특수청소', '구로디지털단지특수청소', '가산디지털단지특수청소', '성수동특수청소',
    '송도국제도시특수청소', '청라국제도시특수청소', '남동공단특수청소', '군포시특수청소', '산본특수청소', '안양시특수청소', '평촌특수청소',
    '수원시특수청소', '의왕시특수청소', '판교특수청소', '안산시특수청소', '반월공단특수청소'
  ],
  'trash-house': [
    '쓰레기집청소', '저장강박증청소', '원룸쓰레기집청소', '오피스텔쓰레기집청소', '비대면쓰레기집청소', '비밀보장청소', '폐기물수거처리',
    '고독사청소', '유품정리', '고독사현장정리', '혈흔제거', '시체악취제거', '특수방역소독', '부패취제거',
    '벌레퇴치방제', '야간쓰레기집청소', '서울쓰레기집청소', '인천쓰레기집청소', '경기쓰레기집청소', '수도권특수청소', '강남구쓰레기집청소',
    '여의도쓰레기집청소', '구로디지털단지쓰레기집청소', '가산디지털단지쓰레기집청소', '성수동쓰레기집청소', '송도국제도시쓰레기집청소', '청라국제도시쓰레기집청소', '남동공단쓰레기집청소',
    '군포시쓰레기집청소', '산본쓰레기집청소', '안양시쓰레기집청소', '평촌쓰레기집청소', '수원시쓰레기집청소', '의왕시쓰레기집청소', '판교쓰레기집청소',
    '안산시쓰레기집청소', '반월공단쓰레기집청소'
  ],
  'external-wall': [
    '외벽청소', '외벽세척', '건물외벽청소', '유리외벽청소', '석재외벽청소', '복합판넬청소', '드라이비트외벽청소',
    '외벽고압세척', '외벽물때제거', '외벽백화현상제거', '외벽매연제거', '고소작업청소', '스카이차외벽청소', '로프외벽청소',
    '유리창청소', '외벽발수코팅', '외벽청소업체', '외벽청소비용', '서울외벽청소', '인천외벽청소', '경기외벽청소',
    '강남구외벽청소', '여의도외벽청소', '구로디지털단지외벽청소', '가산디지털단지외벽청소', '성수동외벽청소',
    '송도국제도시외벽청소', '청라국제도시외벽청소', '남동공단외벽청소', '군포시외벽청소', '산본외벽청소', '안양시외벽청소', '평촌외벽청소',
    '수원시외벽청소', '의왕시외벽청소', '판교외벽청소', '안산시외벽청소', '반월공단외벽청소'
  ]
};

export const BASE_KEYWORDS = [
  '느티울', '느티울종합청소', '느티울청소', '조윤호대표', '수도권종합청소', '수도권청소업체',
  '특수청소', '준공청소', '사무실청소', '바닥청소', '바닥왁스코팅', '왁스코팅', '식당청소', '공장청소',
  '화재청소', '침수청소', '쓰레기집청소', '고독사청소', '유품정리', '인테리어청소', '입주청소', '상가청소',
  '지식산업센터청소', '빌딩관리청소', '계단청소', '외벽청소', '유리창청소',
  '서울청소업체', '강남청소업체', '강남사무실청소', '여의도사무실청소', '성수동사무실청소', '가산디지털단지사무실청소', '구로디지털단지사무실청소',
  '마곡사무실청소', '마포사무실청소', '상암DMC사무실청소', '서초사무실청소', '송파사무실청소', '문정동사무실청소', '종로사무실청소', '을지로사무실청소',
  '인천청소업체', '송도청소업체', '송도사무실청소', '송도준공청소', '청라청소업체', '영종도청소업체', '부평청소업체', '남동공단청소', '검단청소업체', '주안청소업체',
  '군포청소업체', '산본청소', '안양청소업체', '평촌청소', '수원청소업체', '광교청소', '영통청소', '의왕청소', '성남청소업체', '판교사무실청소', '분당사무실청소',
  '부천청소업체', '안산청소업체', '반월공단청소', '시흥청소업체', '배곧청소', '시화공단청소', '광명청소업체', '과천청소업체', '화성청소업체', '동탄사무실청소',
  '용인청소업체', '일산사무실청소', '김포청소업체', '파주청소업체', '평택청소업체', '하남미사청소', '남양주청소업체'
];

const ORG_ID = 'https://neutiul.com/#organization';

// Region-landing-page data/logic (see lib/regionData.mjs, lib/regionServiceContent.mjs).
// Both are dependency-free plain JS, safe to import into any consumer of this file.
import { getRegion } from './regionData.mjs';
import { buildRegionServiceContent, REGION_LANDING_SERVICES } from './regionServiceContent.mjs';

const AREA_SERVED = [
  { '@type': 'City', name: '서울특별시' },
  { '@type': 'AdministrativeArea', name: '강남구' },
  { '@type': 'AdministrativeArea', name: '서초구' },
  { '@type': 'AdministrativeArea', name: '송파구' },
  { '@type': 'AdministrativeArea', name: '강동구' },
  { '@type': 'AdministrativeArea', name: '영등포구 (여의도)' },
  { '@type': 'AdministrativeArea', name: '마포구 (상암DMC/홍대)' },
  { '@type': 'AdministrativeArea', name: '구로구 (구로디지털단지)' },
  { '@type': 'AdministrativeArea', name: '금천구 (가산디지털단지)' },
  { '@type': 'AdministrativeArea', name: '성동구 (성수동)' },
  { '@type': 'AdministrativeArea', name: '용산구 (한남동/이태원)' },
  { '@type': 'AdministrativeArea', name: '중구 (을지로/명동)' },
  { '@type': 'AdministrativeArea', name: '종로구 (광화문)' },
  { '@type': 'AdministrativeArea', name: '강서구 (마곡지구)' },
  { '@type': 'AdministrativeArea', name: '양천구 (목동)' },
  { '@type': 'AdministrativeArea', name: '강북구' },
  { '@type': 'AdministrativeArea', name: '관악구' },
  { '@type': 'AdministrativeArea', name: '광진구' },
  { '@type': 'AdministrativeArea', name: '노원구' },
  { '@type': 'AdministrativeArea', name: '도봉구' },
  { '@type': 'AdministrativeArea', name: '동대문구' },
  { '@type': 'AdministrativeArea', name: '동작구' },
  { '@type': 'AdministrativeArea', name: '서대문구' },
  { '@type': 'AdministrativeArea', name: '성북구' },
  { '@type': 'AdministrativeArea', name: '은평구' },
  { '@type': 'AdministrativeArea', name: '중랑구' },
  { '@type': 'City', name: '인천광역시' },
  { '@type': 'AdministrativeArea', name: '연수구 (송도국제도시)' },
  { '@type': 'AdministrativeArea', name: '서구 (청라국제도시·검단신도시)' },
  { '@type': 'AdministrativeArea', name: '중구 (영종국제도시/영종도)' },
  { '@type': 'AdministrativeArea', name: '부평구 (부평)' },
  { '@type': 'AdministrativeArea', name: '남동구 (남동공단·구월동·논현동)' },
  { '@type': 'AdministrativeArea', name: '미추홀구 (주안)' },
  { '@type': 'AdministrativeArea', name: '계양구' },
  { '@type': 'AdministrativeArea', name: '동구' },
  { '@type': 'AdministrativeArea', name: '강화군' },
  { '@type': 'State', name: '경기도' },
  { '@type': 'City', name: '군포시' },
  { '@type': 'City', name: '안양시' },
  { '@type': 'City', name: '수원시 (광교·영통)' },
  { '@type': 'City', name: '의왕시' },
  { '@type': 'City', name: '성남시 (분당·판교)' },
  { '@type': 'City', name: '부천시' },
  { '@type': 'City', name: '안산시' },
  { '@type': 'City', name: '시흥시 (배곧)' },
  { '@type': 'City', name: '광명시' },
  { '@type': 'City', name: '과천시' },
  { '@type': 'City', name: '화성시 (동탄)' },
  { '@type': 'City', name: '용인시 (수지·기흥)' },
  { '@type': 'City', name: '고양시 (일산)' },
  { '@type': 'City', name: '김포시' },
  { '@type': 'City', name: '파주시' },
  { '@type': 'City', name: '평택시 (고덕)' },
  { '@type': 'City', name: '하남시 (미사)' },
  { '@type': 'City', name: '남양주시 (다산·별내)' },
];

const FAQ_ITEMS = [
  { q: '서울, 인천 전 지역도 무료 출장 방문 견적이 가능한가요?', a: '네, 느티울종합청소는 군포/안양/수원 등 경기권뿐만 아니라 서울 전지역(강남, 서초, 송파, 여의도, 마포, 성수, 가산 등) 및 인천 전지역(송도, 청라, 영종도, 부평, 남동공단 등) 100% 무료 출장 방문 견적 및 24시간 실시간 전화(010-4880-7386) 상담을 진행하고 있습니다.' },
  { q: '청소 견적은 어떻게 산정되며 추가 비용이 발생하나요?', a: '느티울종합청소는 공간 면적(평수), 청소 유형(준공청소, 사무실/상가, 바닥 왁스코팅, 특수청소 등), 바닥재 재질 및 오염도에 따라 투명하고 정직한 사전 확정 정찰 견적을 산출합니다. 현장 사전 고지 없는 불합리한 추가 요금은 절대 발생하지 않습니다.' },
  { q: '조윤호 대표가 직접 현장에서 시공하나요?', a: '네, 느티울종합청소는 비전문 일용직이나 외주 하청에 일감을 넘기지 않고, 조윤호 대표가 직접 사전 현장 진단부터 본 시공 및 최종 고객 검수까지 책임지고 진행합니다.' },
  { q: '바닥 왁스 코팅 작업의 지속 기간과 효과는 어떻게 되나요?', a: '고품질 프리미엄 수지 왁스를 2회 이상 균일 도포하고 고속 열풍 경화를 진행하여, 일상 보행 스크래치 방지, 오염 침투 차단, 심미적 고광택 복원 효과를 제공하며 통상 6개월~1년 이상 견고하게 유지됩니다.' },
  { q: '침수나 화재 피해 시 야간이나 주말에도 24시간 긴급 출동이 가능한가요?', a: '네, 침수와 화재는 2차 피해(곰팡이, 악취, 유독물질 고착)를 막기 위한 골든타임 사수가 생명입니다. 서울·인천·경기 전역 24시간 긴급 출동 전담팀(010-4880-7386)이 대형 양수기, 산업용 제습기, 오존 탈취기를 탑재하여 주말과 야간 상관없이 즉시 출동합니다.' },
  { q: '쓰레기집 청소나 고독사 특수청소 시 이웃 노출 없이 비밀 보장이 되나요?', a: '네, 100% 철저한 고객 프라이버시 보호를 원칙으로 합니다. 전용 불투명 마대와 밀폐 차량을 이용해 은밀하고 신속하게 반출하며, 고객 부재 시에도 실시간 사진/영상 브리핑을 통한 비대면 완벽 시공을 지원합니다.' },
  { q: '청소 후 마음에 들지 않는 부분이 있을 때 A/S가 가능한가요?', a: '시공 완료 후 고객님과 1:1 현장 동행 검수를 진행하며, 고객 만족 시까지 현장에서 즉시 무상 보완해 드립니다. 또한 철저한 사후 책임 A/S를 보장합니다.' },
];

/**
 * Pure function: given the current route + site data, returns everything
 * needed to render <title>, meta tags, and JSON-LD — with no DOM access.
 *
 * @param {{
 *   pathname: string,
 *   serviceId?: string,
 *   companyInfo: { logo?: string, phone?: string, email?: string, address?: string, blog?: string, blog2?: string },
 *   services: Array<{ id: string, title: string, description: string, image?: string }>,
 *   currentUrl: string,
 * }} args
 */
export function buildMeta({ pathname, serviceId, regionId, companyInfo = {}, services = [], currentUrl }) {
  const isServiceDetail = pathname.startsWith('/services/');
  const pathParts = pathname.split('/services/')[1]?.split('/').filter(Boolean) || [];
  const resolvedServiceId = serviceId || pathParts[0];
  const resolvedRegionId = regionId || pathParts[1];
  const region = resolvedRegionId ? getRegion(resolvedRegionId) : null;
  const isRegionDetail = isServiceDetail && !!region && REGION_LANDING_SERVICES.includes(resolvedServiceId);

  let pageTitle = '느티울종합청소 | 서울·인천·경기 특수청소·준공청소·사무실청소 전문';
  let pageDescription = '대표가 직접 시공하는 수도권 종합청소 전문 기업 느티울. 서울·인천·경기 전지역 24시간 긴급 출동 및 100% 무료 출장 견적 상담.';
  let pageKeywords = BASE_KEYWORDS.join(', ');
  let pageImage = companyInfo.logo || 'https://i.ibb.co/60w35yYJ/111.png';
  let currentService = null;
  let regionContent = null;
  let shouldNoindex = pathname.startsWith('/admin');

  if (pathname === '/about') {
    pageTitle = '회사 소개 & 청소 철학 | 느티울종합청소 (서울·인천·경기 수도권)';
    pageDescription = '현장에서 직접 발로 뛰며 확인하는 조윤호 대표의 청소 철학. 비전문 하청 없는 100% 책임 시공, 신뢰와 정직으로 고객님의 공간에 쾌적함을 선물하는 느티울의 전문가 팀을 만나보세요.';
  } else if (pathname === '/services') {
    pageTitle = '전문 청소 서비스 안내 (서울/인천/수도권) | 느티울종합청소';
    pageDescription = '신축 준공청소, 인테리어 청소, 입주청소, 사무실/상가 청소, 바닥 왁스 코팅, 식당/공장 청소, 화재/침수/특수청소까지 서울·인천·경기 전역 24시간 긴급 출동 및 무료 견적.';
  } else if (isRegionDetail) {
    currentService = services.find((s) => s.id === resolvedServiceId) || null;
    const rc = buildRegionServiceContent(region, resolvedServiceId);
    regionContent = rc;
    pageTitle = `${region.name} ${rc.serviceLabel} 전문업체 | 느티울종합청소`;
    pageDescription = `${region.name} ${rc.serviceLabel} 전문. ${region.landmark} 일대 100% 무료 견적, 24시간 상담.`;
    const regionKeywords = [`${region.name}${rc.serviceLabel}`, ...region.dongs.map((d) => `${d}${rc.serviceLabel}`)];
    const specificKeywords = SERVICE_KEYWORDS_MAP[resolvedServiceId] || [];
    pageKeywords = `${regionKeywords.join(', ')}, ${specificKeywords.join(', ')}, ${pageKeywords}`;
    if (currentService?.image) pageImage = currentService.image;
  } else if (isServiceDetail && resolvedServiceId) {
    currentService = services.find((s) => s.id === resolvedServiceId) || null;
    if (currentService) {
      pageTitle = `${currentService.title} 전문 케어 (서울·인천·수도권) | 느티울종합청소`;
      pageDescription = `${currentService.title} - ${currentService.description.replace(/\n+/g, ' ').slice(0, 140)}... 조윤호 대표 직접 책임 시공, 서울·인천·수도권 전지역 24시간 실시간 무료 견적 상담.`;
      if (currentService.image) pageImage = currentService.image;
      const specificKeywords = SERVICE_KEYWORDS_MAP[resolvedServiceId] || [];
      if (specificKeywords.length > 0) pageKeywords = `${specificKeywords.join(', ')}, ${pageKeywords}`;
    } else {
      pageTitle = `${resolvedServiceId} 청소 서비스 | 느티울종합청소`;
    }
  } else if (pathname === '/portfolio') {
    pageTitle = '시공 갤러리 (Before & After) | 느티울종합청소';
    pageDescription = '실제 현장 전후 비교 사진으로 증명하는 완벽한 청소 품질! 서울, 인천, 경기 전역 바닥 왁스코팅, 준공청소, 화재/침수 복구, 쓰레기집 원상복구 등 생생한 시공 실적을 확인하세요.';
  } else if (pathname === '/contact') {
    pageTitle = '무료 방문 견적 문의 & 24시 긴급 상담 | 느티울종합청소';
    pageDescription = '서울·인천·경기 수도권 전지역 24시간 연중무휴 긴급 출동 & 100% 무료 출장 방문 견적 상담. 전화 010-4880-7386으로 문의주시면 조윤호 대표가 직접 친절하고 투명하게 상담해 드립니다.';
  } else if (pathname.startsWith('/admin')) {
    pageTitle = '관리자 시스템 | 느티울종합청소';
    pageDescription = '느티울종합청소 관리자 대시보드 시스템.';
    shouldNoindex = true;
  }

  const jsonLdGraph = [
    {
      '@type': ['LocalBusiness', 'CleaningService', 'ProfessionalService'],
      '@id': ORG_ID,
      name: '느티울종합청소',
      alternateName: ['느티울', '느티울 청소', 'Zelkova Cleaning', '느티울특수청소', '느티울종합관리'],
      url: 'https://neutiul.com',
      logo: companyInfo.logo || 'https://i.ibb.co/DP0khScL/image.png',
      image: 'https://i.ibb.co/60w35yYJ/111.png',
      description: '조윤호 대표가 직접 관리 및 책임 시공하는 서울·인천·경기 수도권 종합청소 전문 기업. 신축 준공청소, 사무실/상가 청소, 바닥 왁스코팅, 화재/침수/쓰레기집 특수청소 24시간 긴급 출동 및 무료 방문 견적.',
      telephone: companyInfo.phone || '010-4880-7386',
      email: companyInfo.email || 'danger3662@naver.com',
      priceRange: '₩₩',
      currenciesAccepted: 'KRW',
      paymentAccepted: '현금, 계좌이체, 카드결제, 전자세금계산서',
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.address || '도마교동 463 1층',
        addressLocality: '군포시',
        addressRegion: '경기도',
        postalCode: '15887',
        addressCountry: 'KR',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 37.3323, longitude: 126.9037 },
      hasMap: 'https://map.naver.com/p/search/%EB%8A%90%ED%8B%B0%EC%9A%B8%EC%A2%85%ED%95%A9%EC%B2%AD%EC%86%8C',
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 37.3323, longitude: 126.9037 },
        geoRadius: '80000',
      },
      areaServed: AREA_SERVED,
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      }],
      founder: { '@type': 'Person', name: '조윤호', jobTitle: '대표 / 책임 시공 총괄', description: '현장에서 직접 발로 뛰며 확인하는 수도권 청소 전문가' },
      knowsAbout: [
        '신축 준공청소 (아파트, 상가, 지식산업센터, 오피스텔, 공장)',
        '인테리어 마감 청소 및 리모델링 입주청소',
        '사무실 정기청소, 대청소 및 빌딩 종합관리',
        '바닥 왁스코팅, 데코타일 박리 및 고광택 왁스코팅',
        '도끼다시/테라조/대리석 연마광택 및 에폭시 바닥 세척',
        '화재청소, 그을음 제거, 오존 탈취 살균 및 화재보험청구 견적',
        '침수청소, 지하 침수 긴급 배수, 양수기 가동 및 산업용 제습 건조',
        '쓰레기집 청소, 저장강박증 원상복구, 고독사 특수청소, 유품정리',
        '식당 주방청소, 닥트/후드 기름때 고온 스팀 세척',
        '공장 및 물류창고 대형 바닥/설비 청소',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '느티울종합청소 전문 서비스 카탈로그',
        itemListElement: services.map((srv) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: srv.title,
            description: (srv.description || '').replace(/\n+/g, ' ').slice(0, 100) || srv.title,
          },
        })),
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.98', reviewCount: '184', bestRating: '5', worstRating: '1' },
      sameAs: [companyInfo.blog || 'https://blog.naver.com/kslee0143', companyInfo.blog2 || 'https://blog.naver.com/decline11731'].filter(Boolean),
    },
    { '@type': 'WebSite', '@id': 'https://neutiul.com/#website', url: 'https://neutiul.com', name: '느티울종합청소', publisher: { '@id': ORG_ID } },
    {
      '@type': 'FAQPage',
      '@id': 'https://neutiul.com/#faq',
      mainEntity: FAQ_ITEMS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'HowTo',
      '@id': 'https://neutiul.com/#process',
      name: '느티울 종합청소 4단계 책임 시공 프로세스',
      description: '조윤호 대표가 직접 진행하는 체계적인 안심 청소 시공 절차',
      step: [
        { '@type': 'HowToStep', position: 1, name: '24시간 실시간 상담 & 무료 출장 견적', text: '전화(010-4880-7386) 및 온라인을 통한 현장 상담과 서울·인천·경기 수도권 전 지역 무료 출장 견적 진행' },
        { '@type': 'HowToStep', position: 2, name: '조윤호 대표 직접 사전 현장 진단', text: '바닥재, 오염 원인, 마감재 특성 정밀 분석 및 인체 무해 친환경 인증 약품과 전문 장비 선별' },
        { '@type': 'HowToStep', position: 3, name: '전문 디테일링 및 고온 스팀·멸균 시공', text: '공사 분진, 기름때, 그을음 완벽 제거 및 130도 고온 스팀 살균, 피톤치드 공간 소독' },
        { '@type': 'HowToStep', position: 4, name: '고객 동행 검수 및 사후 책임 A/S 보증', text: '고객님이 직접 확인하고 100% 만족할 때까지 완벽 보완 후 결제 진행' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: isRegionDetail
        ? [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://neutiul.com/' },
            { '@type': 'ListItem', position: 2, name: currentService?.title || regionContent.serviceLabel, item: `https://neutiul.com/services/${resolvedServiceId}` },
            { '@type': 'ListItem', position: 3, name: region.name, item: currentUrl },
          ]
        : [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://neutiul.com/' },
            { '@type': 'ListItem', position: 2, name: pageTitle.split('|')[0].trim(), item: currentUrl },
          ],
    },
  ];

  if (isRegionDetail && regionContent) {
    jsonLdGraph.push({
      '@type': 'Service',
      name: `${region.name} ${regionContent.serviceLabel}`,
      description: regionContent.intro,
      provider: { '@id': ORG_ID },
      areaServed: { '@type': 'AdministrativeArea', name: region.name },
      image: pageImage,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KRW',
        price: '0',
        priceSpecification: { '@type': 'PriceSpecification', description: '무료 출장 견적 후 면적 및 오염도에 따른 투명한 정찰 맞춤 견적 산출' },
      },
    });
    jsonLdGraph.push({
      '@type': 'FAQPage',
      '@id': `${currentUrl}#faq`,
      mainEntity: regionContent.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    });
  } else if (currentService) {
    jsonLdGraph.push({
      '@type': 'Service',
      name: currentService.title,
      description: (currentService.description || '').replace(/\n+/g, ' ') || currentService.title,
      provider: { '@id': ORG_ID },
      areaServed: [
        { '@type': 'City', name: '서울특별시' },
        { '@type': 'City', name: '인천광역시' },
        { '@type': 'State', name: '경기도' },
        { '@type': 'AdministrativeArea', name: '수도권 전지역 (서울·인천·경기)' },
      ],
      image: currentService.image || pageImage,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'KRW',
        price: '0',
        priceSpecification: { '@type': 'PriceSpecification', description: '무료 출장 견적 후 면적 및 오염도에 따른 투명한 정찰 맞춤 견적 산출' },
      },
    });
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    ogType: isServiceDetail ? 'article' : 'website',
    shouldNoindex,
    jsonLd: { '@context': 'https://schema.org', '@graph': jsonLdGraph },
  };
}
