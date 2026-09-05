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
// landmark: a short place-name phrase, reused verbatim across every FAQ
//   answer and the meta description — keep this one short, not narrative
// story: the area's development history or industrial character, written so
//   it always resolves into a concrete cleaning-relevant consequence (older
//   buildings, dense renovation cycles, industrial-grade dirt, brand-new
//   construction) — never trivia for its own sake. This is what the intro
//   paragraph is actually built from.

export const REGIONS = [
  { id: 'gangnam', name: '강남구', group: '서울',
    dongs: ['역삼동', '삼성동', '논현동', '대치동', '청담동', '신사동'],
    landmark: '테헤란로를 중심으로 한 IT·금융 기업 본사 밀집지구',
    story: '1970~80년대 영동 개발로 조성된 이후 벤처 붐을 거치며 사옥 이전과 리모델링이 유독 잦은 동네로 자리잡아, 입주·퇴거 전후의 신속한 정비 수요가 끊이지 않습니다.' },
  { id: 'yeouido', name: '여의도', group: '서울',
    dongs: ['여의도동'],
    landmark: '국회의사당과 증권가가 자리한 금융·정치 중심지',
    story: '1970년대 한강 개발과 함께 조성된 계획도시로, 국내 최초의 초고층 빌딩들이 지금도 그대로 운영 중이라 준공 수십 년 차 건물 특유의 정밀한 유지관리가 필요한 지역입니다.' },
  { id: 'guro-digital', name: '구로디지털단지', group: '서울',
    dongs: ['구로동', '가리봉동'],
    landmark: '구로디지털단지(G밸리) IT·소프트웨어 벤처타운',
    story: '1960~70년대 한국 최초의 국가산업단지였던 옛 구로공단이 2000년대 이후 지식산업센터로 탈바꿈한 곳으로, 좁고 밀집한 사무공간이 많아 정기적인 관리가 특히 중요한 지역입니다.' },
  { id: 'gasan-digital', name: '가산디지털단지', group: '서울',
    dongs: ['가산동', '독산동'],
    landmark: '가산디지털단지 지식산업센터 밀집지구',
    story: '구로공단의 확장판으로 조성돼 제조업 공장 부지가 지식산업센터로 바뀐 지역이라, 온라인 쇼핑몰·물류 스타트업 사옥이 빽빽이 들어차 회전율 높은 입주·이전 청소 수요가 많습니다.' },
  { id: 'seongsu', name: '성수동', group: '서울',
    dongs: ['성수동1가', '성수동2가'],
    landmark: '준공업지역에서 IT벤처·디자인 스튜디오 밀집지로 재탄생한 지역',
    story: '1960~70년대 수제화·인쇄 공장들이 모여 있던 준공업지역이 최근 카페와 디자인 스튜디오로 빠르게 리모델링되며, 노후 건물을 새 용도로 바꾸는 공사 후 청소 수요가 특히 많은 지역입니다.' },
  { id: 'songdo', name: '송도국제도시', group: '인천',
    dongs: ['송도동'],
    landmark: '송도국제업무단지(IBD)와 인천글로벌캠퍼스',
    story: '2003년 경제자유구역으로 지정되며 갯벌을 매립해 조성한 계획도시로, 지금도 신축 오피스·주거단지가 꾸준히 들어서 준공 직후 첫 입주 청소 수요가 이어지는 지역입니다.' },
  { id: 'cheongna', name: '청라국제도시', group: '인천',
    dongs: ['청라동'],
    landmark: '청라국제업무단지 신축 오피스·상업시설',
    story: '송도와 함께 인천경제자유구역으로 지정된 매립 신도시로, 최근 대형 상업시설과 업무타운이 잇따라 개장하며 신축 시설의 준공·개점 청소 수요가 빠르게 늘고 있습니다.' },
  { id: 'namdong', name: '남동공단', group: '인천',
    dongs: ['남촌동', '논현동', '고잔동'],
    landmark: '남동인더스파크(남동국가산업단지)',
    story: '1980년대 조성된 수도권 서남부 최대 규모의 국가산업단지로, 다양한 제조 설비가 밀집해 기계 분진과 기름때 등 산업 현장 특유의 오염 관리가 중요한 지역입니다.' },
  { id: 'gunpo', name: '군포시', group: '경기',
    dongs: ['산본동', '당동', '금정동', '부곡동'],
    landmark: '군포첨단산업단지와 산본 신도시',
    story: '반월·시화산업단지와 맞닿은 위성도시로, 1기 신도시인 산본과 군포첨단산업단지가 함께 있어 신도시 아파트와 산업단지 사업장의 청소 수요가 두루 발생합니다.' },
  { id: 'sanbon', name: '산본', group: '경기',
    dongs: ['산본동', '금정동'],
    landmark: '산본 신도시 상업지구',
    story: '1989년부터 조성된 1기 신도시로, 입주한 지 30년이 넘은 아파트 단지가 많아 노후 배관·마감재 특유의 하자를 감안한 입주·리모델링 청소 수요가 꾸준합니다.' },
  { id: 'anyang', name: '안양시', group: '경기',
    dongs: ['평촌동', '관양동', '비산동', '안양동'],
    landmark: '안양 IT밸리와 평촌 스마트스퀘어',
    story: '근대에는 방직·제사 공장이 모여 있던 산업도시였다가 평촌 1기 신도시 개발로 주거·업무 기능이 더해진 곳으로, 옛 시가지와 신도시 오피스가 공존해 관리 수요의 폭이 넓습니다.' },
  { id: 'pyeongchon', name: '평촌', group: '경기',
    dongs: ['평촌동', '비산동', '호계동'],
    landmark: '평촌 스마트스퀘어와 범계역 상권',
    story: '1990년대 초 조성된 안양의 1기 신도시로, 범계역 학원가와 오피스 상권이 밀집해 있어 야간·주말에도 지장 없이 진행하는 정기 청소 수요가 많은 지역입니다.' },
  { id: 'suwon', name: '수원시', group: '경기',
    dongs: ['영통동', '매탄동', '인계동', '광교동'],
    landmark: '광교테크노밸리와 삼성디지털시티',
    story: '조선시대 축성된 수원화성이 남아 있는 역사도시이자 삼성디지털시티와 광교테크노밸리가 자리한 첨단산업도시로, 구도심 상권과 신도심 사옥의 관리 수요가 함께 발생합니다.' },
  { id: 'uiwang', name: '의왕시', group: '경기',
    dongs: ['포일동', '오전동', '내손동'],
    landmark: '인덕원 IT밸리와 의왕 ICD(내륙컨테이너기지)',
    story: '인덕원역 인근 IT밸리와 수도권 내륙컨테이너기지(의왕ICD)를 함께 갖춘 물류·업무 거점으로, 사무공간과 물류창고를 오가며 진행하는 관리 수요가 특징적인 지역입니다.' },
  { id: 'pangyo', name: '판교', group: '경기',
    dongs: ['삼평동', '백현동', '판교동'],
    landmark: '판교테크노밸리',
    story: '2000년대 조성된 \'한국의 실리콘밸리\'로, 국내 대표 IT·게임 기업 본사가 밀집해 신축 사옥이 많은 만큼 잦은 인테리어 변경과 그에 따른 정밀 청소 수요가 이어집니다.' },
  { id: 'ansan', name: '안산시', group: '경기',
    dongs: ['원곡동', '고잔동', '성포동', '초지동'],
    landmark: '반월·시화국가산업단지',
    story: '1970~80년대 조성된 반월·시화국가산업단지를 낀 수도권 서남부 대표 산업도시로, 다양한 제조업체와 기숙사가 밀집해 공장 설비와 생활공간을 함께 관리하는 수요가 많습니다.' },
  { id: 'banwol', name: '반월공단', group: '경기',
    dongs: ['원시동', '목내동', '팔곡동'],
    landmark: '반월국가산업단지',
    story: '안산시에 자리한 대규모 국가산업단지로, 자동차부품·금속가공 등 중소 제조업체가 밀집해 있어 기름때와 분진이 누적되기 쉬운 만큼 정기적인 설비·바닥 관리가 특히 중요합니다.' },
  { id: 'hwaseong', name: '화성시', group: '경기',
    dongs: ['병점동', '남양읍', '향남읍', '봉담읍'],
    landmark: '향남·발안산업단지와 남양읍 기아 화성공장',
    story: '전통적인 농업 지역이던 서남부 일대에 자동차·부품 공장이 잇따라 들어서고 최근에는 병점·봉담 택지지구까지 개발되며, 공장 설비 청소와 신축 아파트 입주청소 수요가 함께 늘고 있는 지역입니다.' },
  { id: 'dongtan', name: '동탄신도시', group: '경기',
    dongs: ['동탄1동', '동탄2동', '동탄3동', '반송동'],
    landmark: '동탄테크노밸리와 동탄역 복합환승센터',
    story: '2000년대 이후 1·2기로 나뉘어 조성된 수도권 남부 최대 규모 신도시로, 지금도 아파트·상가 신축이 이어지고 있어 준공청소와 입주청소 수요가 수도권에서 손꼽히게 많은 지역입니다.' },
  { id: 'osan', name: '오산시', group: '경기',
    dongs: ['오산동', '세교동', '원동', '내삼미동'],
    landmark: '세교신도시와 오산세교일반산업단지',
    story: '경부선 철도와 함께 성장한 교통 요지에 세교 택지지구가 조성되며 인구가 빠르게 늘어난 곳으로, 신축 아파트 입주청소와 인근 산업단지 사업장 관리 수요가 동시에 발생하는 지역입니다.' },
  { id: 'pyeongtaek', name: '평택시', group: '경기',
    dongs: ['비전동', '동삭동', '고덕동', '서정동'],
    landmark: '고덕국제신도시와 삼성전자 평택캠퍼스',
    story: '삼성전자 반도체 공장과 주한미군 기지 이전을 계기로 고덕국제신도시가 조성되며 전국에서 인구 유입이 가장 빠른 도시 중 하나가 된 곳으로, 신축 오피스텔·아파트의 준공·입주청소 수요가 폭발적으로 늘고 있습니다.' },
  { id: 'anseong', name: '안성시', group: '경기',
    dongs: ['공도읍', '아양동', '봉산동', '옥산동'],
    landmark: '공도공단과 안성맞춤랜드',
    story: '예로부터 유기와 장인 공방으로 이름난 고장이 최근 공도읍 택지지구 개발과 물류·제조 공장 이전으로 새로운 성장기를 맞은 지역으로, 신축 입주청소와 산업단지 설비 관리 수요를 함께 다룹니다.' },
  { id: 'siheung', name: '시흥시', group: '경기',
    dongs: ['정왕동', '배곧동', '대야동', '은행동'],
    landmark: '시화국가산업단지와 배곧신도시',
    story: '반월공단과 이어지는 시화국가산업단지의 제조 기반에 최근 배곧신도시 개발이 더해지며, 공장 설비 청소와 신축 아파트 입주청소를 함께 필요로 하는 산업·주거 복합 지역입니다.' },
  { id: 'gwacheon', name: '과천시', group: '경기',
    dongs: ['부림동', '별양동', '중앙동', '갈현동'],
    landmark: '정부과천청사와 과천지식정보타운',
    story: '정부과천청사를 중심으로 조성된 행정도시가 최근 과천지식정보타운 개발로 새 아파트단지와 사업장이 들어서며, 오래된 관공서 주변 건물의 정기 관리와 신축 단지 입주청소가 함께 이뤄지는 지역입니다.' },
  { id: 'gwangmyeong', name: '광명시', group: '경기',
    dongs: ['철산동', '하안동', '광명동', '소하동'],
    landmark: '광명역세권과 광명시흥테크노밸리',
    story: 'KTX광명역 개통 이후 역세권 개발이 빠르게 이뤄지고 광명시흥테크노밸리 조성까지 겹치며 신축 오피스와 아파트가 계속 들어서는 곳으로, 준공청소와 사무실 정기 관리 수요가 함께 늘고 있는 지역입니다.' },
  { id: 'bucheon', name: '부천시', group: '경기',
    dongs: ['중동', '상동', '심곡동', '오정동'],
    landmark: '부천테크노파크와 상동영상문화단지',
    story: '1980년대 대규모 신시가지 개발로 조성된 중동·상동 신도시와 오정동 일대 공장지대가 함께 있는 곳으로, 입주한 지 오래된 아파트의 리모델링 청소와 산업단지 설비 관리 수요가 두루 발생합니다.' },
  { id: 'seongnam', name: '성남시', group: '경기',
    dongs: ['수정구', '중원구', '분당구', '위례동'],
    landmark: '판교테크노밸리와 위례신도시',
    story: '구시가지인 수정·중원구와 1기 신도시 분당, 최근 개발된 위례신도시까지 개발 시기가 전혀 다른 지역들이 한 도시 안에 공존해, 노후 건물 리모델링 청소부터 신축 단지 입주청소까지 폭넓은 수요를 다룹니다.' },
  { id: 'yongin', name: '용인시', group: '경기',
    dongs: ['기흥구', '처인구', '수지구', '동백동'],
    landmark: '용인반도체클러스터(원삼)와 에버랜드',
    story: '수지·기흥의 대규모 택지지구 개발에 이어 처인구 원삼면에 세계 최대 규모 반도체 클러스터 조성이 진행 중인 곳으로, 아파트 입주청소 수요와 함께 앞으로 산업단지 관련 수요가 크게 늘어날 지역입니다.' },
  { id: 'suji', name: '수지구', group: '경기',
    dongs: ['풍덕천동', '죽전동', '동천동', '상현동'],
    landmark: '수지구청과 죽전역 상권',
    story: '1990년대부터 용인의 대표 베드타운으로 개발돼 아파트 단지가 촘촘히 들어선 지역으로, 입주 연차가 쌓인 단지들의 리모델링·이사철 입주청소 수요가 꾸준히 발생하는 곳입니다.' },
  { id: 'gwangju-gg', name: '광주시', group: '경기',
    dongs: ['경안동', '오포읍', '태전동', '초월읍'],
    landmark: '곤지암리조트와 오포신도시',
    story: '서울 접근성이 좋아진 오포·태전 택지지구를 중심으로 아파트 단지가 빠르게 늘고 있는 지역으로, 신축 단지 입주청소와 전원주택·창고형 시설 관리 수요를 함께 다룹니다.' },
  { id: 'hanam', name: '하남시', group: '경기',
    dongs: ['미사동', '창우동', '덕풍동', '풍산동'],
    landmark: '미사강변도시와 스타필드 하남',
    story: '한강변을 따라 조성된 미사강변도시로 서울 강동권 생활권에 편입되며 아파트 공급이 집중된 지역으로, 신축 단지 준공·입주청소 수요가 수도권에서도 손꼽히게 활발한 곳입니다.' },
  { id: 'icheon', name: '이천시', group: '경기',
    dongs: ['창전동', '부발읍', '신둔면', '증포동'],
    landmark: 'SK하이닉스 이천캠퍼스와 이천도자기마을',
    story: '전통 도자기 산지로 이름난 곳이 SK하이닉스 반도체 공장 유치로 산업도시 성격이 더해진 지역으로, 반도체 관련 사업장 관리와 부발읍 신축 아파트 입주청소 수요를 함께 다룹니다.' },
  { id: 'yeoju', name: '여주시', group: '경기',
    dongs: ['여주읍', '가남읍', '세종대왕면'],
    landmark: '여주프리미엄아울렛과 남한강 유원지',
    story: '남한강을 낀 전원도시로 프리미엄 아울렛과 관광 시설이 들어서며 상업·숙박시설 수요가 늘어난 지역으로, 매장 개점청소와 인근 전원주택 관리 수요를 폭넓게 다룹니다.' },
  { id: 'goyang', name: '고양시', group: '경기',
    dongs: ['일산동구', '일산서구', '덕양구', '화정동'],
    landmark: '일산킨텍스(KINTEX)와 일산신도시',
    story: '1기 신도시로 조성된 일산과 삼송·원흥 등 덕양구 택지지구가 함께 있는 곳으로, 입주 30년 차를 넘어선 일산 아파트의 리모델링 청소와 신규 택지지구의 입주청소 수요가 공존하는 지역입니다.' },
  { id: 'uijeongbu', name: '의정부시', group: '경기',
    dongs: ['의정부동', '호원동', '민락동', '녹양동'],
    landmark: '의정부경전철과 미군 반환공여지 개발지구',
    story: '오랜 기간 주한미군 기지가 자리했던 곳들이 최근 반환공여지 개발로 새 아파트단지와 상업시설로 바뀌고 있는 지역으로, 노후 상권 정비와 신축 단지 입주청소 수요가 함께 늘고 있습니다.' },
  { id: 'namyangju', name: '남양주시', group: '경기',
    dongs: ['다산동', '별내동', '화도읍', '진접읍'],
    landmark: '다산신도시와 별내신도시',
    story: '서울 동북부 배후 주거지로 다산·별내 두 신도시가 잇따라 개발되며 최근 몇 년 새 아파트 공급이 집중된 지역으로, 신축 단지 준공·입주청소 수요가 매우 활발한 곳입니다.' },
  { id: 'guri', name: '구리시', group: '경기',
    dongs: ['인창동', '수택동', '갈매동', '교문동'],
    landmark: '구리한강공원과 갈매지구',
    story: '서울과 맞닿은 작은 면적에 갈매지구 택지 개발이 더해지며 신축 아파트가 늘어난 곳으로, 좁은 생활권 안에서 입주청소와 상가·사무실 정기 관리 수요가 밀도 있게 발생하는 지역입니다.' },
  { id: 'paju', name: '파주시', group: '경기',
    dongs: ['운정동', '금촌동', '문산읍', '조리읍'],
    landmark: '파주출판문화정보산업단지와 LG디스플레이 파주캠퍼스',
    story: '출판단지와 LG디스플레이 공장을 낀 산업 기반 위에 운정신도시 개발이 겹치며 인구가 빠르게 늘어난 곳으로, 사업장 정기 관리와 신축 아파트 입주청소 수요를 함께 다룹니다.' },
  { id: 'yangju', name: '양주시', group: '경기',
    dongs: ['옥정동', '회천동', '덕정동', '고암동'],
    landmark: '옥정신도시와 양주테크노밸리',
    story: '섬유·가구 공장이 모여 있던 지역에 옥정·회천 신도시가 조성되며 새 아파트단지가 빠르게 늘어난 곳으로, 신축 단지 입주청소와 기존 산업단지 설비 관리 수요를 함께 다룹니다.' },
  { id: 'dongducheon', name: '동두천시', group: '경기',
    dongs: ['생연동', '지행동', '보산동', '송내동'],
    landmark: '동두천 미군기지 반환공여지와 소요산',
    story: '오랜 기간 주한미군 기지가 지역 경제의 중심이었던 곳이 최근 기지 반환과 함께 상권·주거지 재정비가 진행 중인 지역으로, 노후 건물 정비와 신규 개발지 관리 수요가 함께 발생합니다.' },
  { id: 'pocheon', name: '포천시', group: '경기',
    dongs: ['신읍동', '소흘읍', '군내면', '가산면'],
    landmark: '산정호수와 포천일동막걸리마을',
    story: '군부대와 관광지가 함께 자리한 경기 북부 지역으로, 공장·창고형 시설의 설비 관리와 펜션·숙박시설의 특수청소 수요를 함께 다루는 지역입니다.' },
  { id: 'gapyeong', name: '가평군', group: '경기',
    dongs: ['가평읍', '청평면', '설악면', '조종면'],
    landmark: '남이섬과 자라섬',
    story: '수도권 대표 관광·리조트 지역으로 펜션과 카페가 밀집해 있어, 성수기 사이 신속한 객실 회전 청소와 겨울철 장기 공실 특수청소 수요가 특징적인 지역입니다.' },
  { id: 'yangpyeong', name: '양평군', group: '경기',
    dongs: ['양평읍', '옥천면', '강상면', '강하면'],
    landmark: '두물머리와 양평 전원주택단지',
    story: '한강 상류를 낀 전원주택·타운하우스 개발이 활발한 지역으로, 신축 전원주택 입주청소와 계절적으로 비워지는 별장형 주택의 관리 수요가 특징적인 곳입니다.' },
  { id: 'yeoncheon', name: '연천군', group: '경기',
    dongs: ['연천읍', '전곡읍', '청산면'],
    landmark: '전곡선사유적지와 한탄강',
    story: '군부대가 밀집한 최북단 지역으로, 부대 인근 시설물 관리와 한탄강 유원지 주변 숙박시설 청소 수요를 다루는 지역입니다.' },
  { id: 'gimpo', name: '김포시', group: '경기',
    dongs: ['장기동', '구래동', '걸포동', '풍무동'],
    landmark: '한강신도시와 김포골드라인',
    story: '한강신도시 개발로 짧은 기간에 대규모 아파트 공급이 집중된 지역으로, 준공 직후 입주청소부터 김포한강물류단지 사업장 관리까지 신축·산업 수요가 함께 늘고 있는 곳입니다.' },
];

export function getRegion(id) {
  if (!id) return null;
  const lower = id.toLowerCase();
  return REGIONS.find((r) => r.id === lower) || null;
}

// The region's colloquial short name, with the admin-unit suffix stripped
// (수원시 -> 수원, 송도국제도시 -> 송도) so it matches how the place is
// actually written in portfolio photo titles. Deliberately region-name-only,
// not dong-name-based: dong names collide across unrelated regions (e.g.
// 논현동 exists in both 강남구 and 남동공단; 당동 shortened to "당" matched
// "강당"/"식당"/"분당" anywhere in a title) and would misattribute another
// area's photos as this region's proof.
export function regionCoreTerm(region) {
  return region.name.replace(/(국제도시|디지털단지|첨단산업단지|공단|시|구)$/, '');
}

// Word-boundary match (token *starts with* the term, not "contains it
// anywhere") — plain substring matching lets short terms like "남동" match
// inside unrelated words such as "한남동".
export function titleMatchesRegion(title, term) {
  return title.split(/\s+/).some((token) => token.startsWith(term));
}

// Find which of the 17 core regions (if any) a free-text title is about —
// used both to surface region-specific proof photos on a region landing
// page, and to bake the region into a photo's filename at import time.
export function matchRegion(title) {
  return REGIONS.find((r) => titleMatchesRegion(title, regionCoreTerm(r))) || null;
}
