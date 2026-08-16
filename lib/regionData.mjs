// lib/regionData.mjs
//
// Local knowledge base for the 17 core service regions. Each entry supplies
// the facts that make a region+service landing page genuinely different
// from another — not just the region name swapped into a template. This is
// what separates a legitimate local-SEO page from a thin "doorway" page.
//
// id: URL slug used in /services/:serviceId/:regionId
// name: display name used in headings/meta
// group: '서울' | '인천' | '경기' — for breadcrumb/JSON-LD grouping
// dongs: 법정동/주요 지구 목록 — used for the "출동 동 안내" section
// landmark: the one or two defining facts about the area (business district,
//   industrial park, etc.) — used to write a non-generic intro paragraph
// blurb: a single sentence characterizing the area's business/office profile

export const REGIONS = [
  { id: 'gangnam', name: '강남구', group: '서울',
    dongs: ['역삼동', '삼성동', '논현동', '대치동', '청담동', '신사동'],
    landmark: '테헤란로를 중심으로 한 IT·금융 기업 본사 밀집지구',
    blurb: '테헤란로를 따라 IT·금융 대기업 본사와 스타트업 사옥이 밀집한 대한민국 대표 업무지구입니다.' },
  { id: 'yeouido', name: '여의도', group: '서울',
    dongs: ['여의도동'],
    landmark: '국회의사당과 증권가가 자리한 금융·정치 중심지',
    blurb: '국회와 대형 증권사·자산운용사가 밀집한 금융 중심지로, 고층 오피스 빌딩 청소 수요가 꾸준합니다.' },
  { id: 'guro-digital', name: '구로디지털단지', group: '서울',
    dongs: ['구로동', '가리봉동'],
    landmark: '구로디지털단지(G밸리) IT·소프트웨어 벤처타운',
    blurb: 'IT·소프트웨어 스타트업과 벤처기업 지식산업센터가 밀집한 서울 서남권 대표 업무단지입니다.' },
  { id: 'gasan-digital', name: '가산디지털단지', group: '서울',
    dongs: ['가산동', '독산동'],
    landmark: '가산디지털단지 지식산업센터 밀집지구',
    blurb: '수많은 지식산업센터와 IT·유통 기업 사옥이 몰려 있는 서울 서남권 대표 업무단지입니다.' },
  { id: 'seongsu', name: '성수동', group: '서울',
    dongs: ['성수동1가', '성수동2가'],
    landmark: '준공업지역에서 IT벤처·디자인 스튜디오 밀집지로 재탄생한 지역',
    blurb: '옛 준공업지역이 IT 스타트업과 디자인 스튜디오 사옥으로 빠르게 재편되며 사무공간 관리 수요가 늘고 있습니다.' },
  { id: 'songdo', name: '송도국제도시', group: '인천',
    dongs: ['송도동'],
    landmark: '송도국제업무단지(IBD)와 인천글로벌캠퍼스',
    blurb: '국제업무단지와 다국적 기업, 대학 캠퍼스가 밀집한 인천의 신성장 거점입니다.' },
  { id: 'cheongna', name: '청라국제도시', group: '인천',
    dongs: ['청라동'],
    landmark: '청라국제업무단지 신축 오피스·상업시설',
    blurb: '신축 오피스와 상업시설이 빠르게 들어서는 인천 서구의 신도시 업무지구입니다.' },
  { id: 'namdong', name: '남동공단', group: '인천',
    dongs: ['남촌동', '논현동', '고잔동'],
    landmark: '남동인더스파크(남동국가산업단지)',
    blurb: '수도권 서남부 최대 규모의 제조업 산업단지로, 공장·사무동 병행 청소 수요가 많은 지역입니다.' },
  { id: 'gunpo', name: '군포시', group: '경기',
    dongs: ['산본동', '당동', '금정동', '부곡동'],
    landmark: '군포첨단산업단지와 산본 신도시',
    blurb: '산본 신도시와 첨단산업단지가 함께 있는 경기 남부 교통 요충지입니다.' },
  { id: 'sanbon', name: '산본', group: '경기',
    dongs: ['산본동', '금정동'],
    landmark: '산본 신도시 상업지구',
    blurb: '군포시의 대표 신도시로 상업지구와 주거단지, 사무공간이 함께 밀집해 있습니다.' },
  { id: 'anyang', name: '안양시', group: '경기',
    dongs: ['평촌동', '관양동', '비산동', '안양동'],
    landmark: '안양 IT밸리와 평촌 스마트스퀘어',
    blurb: '평촌 신도시를 중심으로 관공서와 기업 사옥이 밀집한 경기 서남부 중심 도시입니다.' },
  { id: 'pyeongchon', name: '평촌', group: '경기',
    dongs: ['평촌동', '비산동', '호계동'],
    landmark: '평촌 스마트스퀘어와 범계역 상권',
    blurb: '안양시의 대표 신도시로 학원가와 오피스 상권이 함께 발달한 지역입니다.' },
  { id: 'suwon', name: '수원시', group: '경기',
    dongs: ['영통동', '매탄동', '인계동', '광교동'],
    landmark: '광교테크노밸리와 삼성디지털시티',
    blurb: '광교테크노밸리와 삼성디지털시티를 중심으로 IT·전자 기업이 밀집한 경기 남부 대표 도시입니다.' },
  { id: 'uiwang', name: '의왕시', group: '경기',
    dongs: ['포일동', '오전동', '내손동'],
    landmark: '인덕원 IT밸리와 의왕 ICD(내륙컨테이너기지)',
    blurb: '인덕원역 인근 IT밸리와 물류 기지가 함께 있는 경기 중부 도시입니다.' },
  { id: 'pangyo', name: '판교', group: '경기',
    dongs: ['삼평동', '백현동', '판교동'],
    landmark: '판교테크노밸리',
    blurb: '국내 대표 IT·게임 기업 본사가 밀집한 \'한국의 실리콘밸리\' 업무지구입니다.' },
  { id: 'ansan', name: '안산시', group: '경기',
    dongs: ['원곡동', '고잔동', '성포동', '초지동'],
    landmark: '반월·시화국가산업단지',
    blurb: '반월·시화국가산업단지를 낀 수도권 서남부 대표 산업도시입니다.' },
  { id: 'banwol', name: '반월공단', group: '경기',
    dongs: ['원시동', '목내동', '팔곡동'],
    landmark: '반월국가산업단지',
    blurb: '안산시에 위치한 대규모 제조업 중심 산업단지로, 공장·사무동 병행 관리 수요가 많습니다.' },
];

export function getRegion(id) {
  if (!id) return null;
  const lower = id.toLowerCase();
  return REGIONS.find((r) => r.id === lower) || null;
}
