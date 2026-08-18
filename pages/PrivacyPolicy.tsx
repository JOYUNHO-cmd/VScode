import React from 'react';
import { useSite } from '../context/SiteContext';

const PrivacyPolicy: React.FC = () => {
  const { config } = useSite();

  return (
    <div className="bg-slate-50 text-slate-800 min-h-svh py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">개인정보처리방침</h1>
        <p className="text-slate-500 text-sm md:text-base mb-10 md:mb-14">
          {config.companyInfo.name}종합청소(이하 "회사")는 고객님의 개인정보를 소중히 다루며,
          「개인정보 보호법」 등 관련 법령을 준수합니다. 본 방침은 회사가 운영하는 웹사이트를
          통해 수집하는 개인정보의 처리에 관한 사항을 안내합니다.
        </p>

        <div className="space-y-10 md:space-y-12 text-sm md:text-base leading-relaxed break-keep">
          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">1. 수집하는 개인정보 항목 및 수집 방법</h2>
            <p className="text-slate-600 mb-2">
              회사는 온라인 견적 문의(홈페이지 문의 폼) 이용 시 아래 항목을 수집합니다.
            </p>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>필수 항목: 이름, 연락처(휴대전화번호)</li>
              <li>선택 항목: 희망 서비스 종류, 작업 위치, 평수, 희망 일정, 문의 내용</li>
            </ul>
            <p className="text-slate-600 mt-2">
              전화({config.companyInfo.phone}) 또는 카카오톡 채널로 직접 문의하시는 경우, 상담 과정에서
              통화 내용 또는 대화 내용에 포함된 정보가 수집될 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">2. 개인정보의 수집 및 이용 목적</h2>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>청소 서비스 견적 산정 및 상담 진행</li>
              <li>방문 견적 일정 조율 및 서비스 계약 이행</li>
              <li>문의 및 민원 처리, 처리 결과 안내</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-slate-600">
              회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이
              파기합니다. 다만, 상담·문의 이력은 사후 A/S 및 재문의 대응을 위해 문의일로부터
              3년간 보관 후 파기하며, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한
              기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p className="text-slate-600">
              회사는 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및
              제18조에 해당하는 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">5. 개인정보 처리의 위탁</h2>
            <p className="text-slate-600">
              회사는 원활한 견적 문의 접수를 위해 온라인 폼 서비스(Formspree)를 통해 문의
              내용을 전달받고 있으며, 해당 서비스는 문의 접수 및 전달 목적으로만 이용되고
              별도의 마케팅 목적으로 활용되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">6. 정보주체의 권리와 행사 방법</h2>
            <p className="text-slate-600">
              정보주체는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지를 요청할 수
              있습니다. 아래 연락처로 문의해 주시면 지체 없이 조치하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">7. 개인정보 보호책임자</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 text-slate-600">
              <p>성명: 조윤호 (대표)</p>
              <p>연락처: {config.companyInfo.phone}</p>
              <p>이메일: {config.companyInfo.email}</p>
              <p>주소: {config.companyInfo.address}</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-black text-slate-900 mb-3">8. 개인정보처리방침의 변경</h2>
            <p className="text-slate-600">
              본 방침은 법령, 정책 또는 서비스 변경에 따라 개정될 수 있으며, 변경 시 홈페이지를
              통해 공지합니다.
            </p>
          </section>

          <p className="text-slate-400 text-xs md:text-sm pt-4 border-t border-slate-200">
            공고일자: 2026년 8월 18일 / 시행일자: 2026년 8월 18일
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
