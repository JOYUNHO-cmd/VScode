import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RefreshCw, 
  LayoutDashboard, 
  Type, 
  Image as ImageIcon, 
  Settings, 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Check,
  Loader2,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { 
  addPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem,
  updateCompanyInfoDoc,
  subscribePortfolioItems
} from '../lib/firebaseService';
import { PortfolioItem } from '../types';
import ImageUploader from '../components/ImageUploader';

const AdminDashboardInner: React.FC = () => {
  const { user, isAdmin, loading: authLoading, loginWithCredentials, logout, login: loginWithGoogle } = useAuth();
  const { config, updateCompanyInfo } = useSite();
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'portfolio'>('general');
  const navigate = useNavigate();

  // Login Credentials state
  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    
    const success = await loginWithCredentials(adminId, adminPw);
    if (!success) {
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
    setIsLoggingIn(false);
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setLoginError(err.message || 'Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Portfolio State
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState<Partial<PortfolioItem>>({
    title: '',
    category: '',
    beforeImage: '',
    afterImage: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [savingItem, setSavingItem] = useState(false);

  // General Info State
  const [localInfo, setLocalInfo] = useState(config.companyInfo);

  useEffect(() => {
    setLocalInfo(config.companyInfo);
  }, [config.companyInfo]);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = subscribePortfolioItems((items) => {
        setPortfolioItems(items as PortfolioItem[]);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const handleSaveGeneral = async () => {
    try {
      // Save to Firestore first
      await updateCompanyInfoDoc(localInfo);
      // Update local context state
      updateCompanyInfo(localInfo);
      alert('설정이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error(error);
      alert('저장 실패: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingItem(true);
    try {
      if (editingItemId) {
        await updatePortfolioItem(editingItemId, itemForm);
        setEditingItemId(null);
      } else {
        await addPortfolioItem(itemForm);
        setIsAddingPortfolio(false);
      }
      setItemForm({
        title: '',
        category: '',
        beforeImage: '',
        afterImage: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSavingItem(false);
    }
  };

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItemId(item.id);
    setItemForm(item);
    setIsAddingPortfolio(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deletePortfolioItem(id);
      } catch (error) {
        console.error(error);
        alert('삭제 실패');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">관리자 권한 확인 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="text-primary w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center text-gray-900 mb-1 tracking-tight">느티울종합청소 관리자</h2>
          <p className="text-gray-500 text-center mb-8 text-sm font-medium">자체 계정 아이디와 비밀번호로 로그인하세요.</p>
          
          <form onSubmit={handleCredentialLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">관리자 아이디</label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="아이디를 입력하세요 (기본: admin)"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none text-sm transition-all text-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">비밀번호</label>
              <input
                type="password"
                required
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none text-sm transition-all text-gray-800"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-500 font-bold bg-red-50 p-3 rounded-xl flex items-center gap-2">
                <span>⚠️</span> {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primaryDark transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 text-sm mt-6"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  로그인 중...
                </>
              ) : (
                '관리자 로그인'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-bold">또는 (추천)</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isLoggingIn}
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 border border-gray-300 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61a5.62 5.62 0 0 1-2.44 3.71v3.08h3.94c2.31-2.13 3.63-5.27 3.63-8.64z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.94-3.08c-1.12.75-2.54 1.21-4.02 1.21-3.11 0-5.74-2.11-6.68-4.96H1.21v3.15C3.18 21.88 7.39 24 12 24z"/>
              <path fill="#FBBC05" d="M5.32 14.26a7.24 7.24 0 0 1 0-4.52V6.59H1.21a11.94 11.94 0 0 0 0 10.82l4.11-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.39 0 3.18 2.12 1.21 6.59l4.11 3.15c.94-2.85 3.57-4.96 6.68-4.96z"/>
            </svg>
            구글 계정으로 로그인 (실시간 데이터 연동)
          </button>

          <div className="mt-8 pt-6 border-t border-gray-100 bg-gray-50/50 -mx-8 -mb-10 px-8 py-6 rounded-b-3xl">
             <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
               ※ 네이버/구글 로그인 중단으로 인하여 404 및 연동 오류를 해결하기 위해 <b>자체 ID/Password 로그인 시스템</b>으로 즉각 교체되었습니다.
             </p>
          </div>
        </div>
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center">
           <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <X className="text-red-500 w-8 h-8" />
              </div>
           </div>
           <h2 className="text-2xl font-black text-gray-900 mb-4">접근 권한 없음</h2>
           <p className="text-gray-600 mb-8 font-medium">관리자 계정이 아닙니다.<br />계정 ID: {user.email}</p>
           <button onClick={logout} className="text-primary font-bold hover:underline">로그아웃</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">Admin CMS</h2>
          <p className="text-xs text-gray-500">느티울종합청소 관리자</p>
        </div>
        <nav className="p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={18} /> 기본 설정
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={18} /> 서비스 관리
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'portfolio' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Briefcase size={18} /> 현장 기록 관리
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-gray-100">
           <div className="flex items-center gap-3 px-4 py-2 mb-4">
              <img src={user.photoURL || ''} className="w-8 h-8 rounded-full" alt="User" />
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{user.displayName}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
           </div>
           <button onClick={logout} className="w-full text-red-500 text-sm font-medium hover:bg-red-50 py-2 rounded">로그아웃</button>
           <button onClick={() => navigate('/')} className="w-full text-gray-600 text-sm font-medium hover:bg-gray-50 py-2 rounded mt-2">사이트 바로가기</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            {activeTab === 'general' ? '사이트 기본 정보 수정' : 
             activeTab === 'services' ? '서비스 콘텐츠 관리' : 
             '현장 시공 기록 추천 연동 관리'}
          </h1>
          {activeTab === 'general' && (
            <button onClick={handleSaveGeneral} className="bg-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-primaryDark transition-all shadow-lg shadow-primary/20">
              <Save size={18} /> 저장하기
            </button>
          )}
          {activeTab === 'portfolio' && !isAddingPortfolio && (
            <button 
              onClick={() => {
                setEditingItemId(null);
                setItemForm({ title: '', category: '', beforeImage: '', afterImage: '', description: '', date: new Date().toISOString().split('T')[0] });
                setIsAddingPortfolio(true);
              }}
              className="bg-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-primaryDark transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={18} /> 새 추천 현장 등록
            </button>
          )}
        </header>

        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">업체명</label>
                <input 
                  value={localInfo.name} 
                  onChange={(e) => setLocalInfo({...localInfo, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">대표 전화번호</label>
                <input 
                  value={localInfo.phone} 
                  onChange={(e) => setLocalInfo({...localInfo, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">로고 이미지 (URL)</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input 
                      value={localInfo.logo} 
                      onChange={(e) => setLocalInfo({...localInfo, logo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm text-gray-600 transition-all"
                      placeholder="https://... or data:image/..."
                    />
                  </div>
                  <div className="w-12 h-12 bg-gray-50 border rounded-xl flex items-center justify-center overflow-hidden">
                    {localInfo.logo && <img src={localInfo.logo} alt="Preview" className="w-full h-full object-contain" />}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">메인 슬로건</label>
                <input 
                  value={localInfo.slogan} 
                  onChange={(e) => setLocalInfo({...localInfo, slogan: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">업체 설명 (About)</label>
                <textarea 
                  rows={4}
                  value={localInfo.description} 
                  onChange={(e) => setLocalInfo({...localInfo, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {isAddingPortfolio ? (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in max-w-4xl mx-auto">
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                   <h2 className="text-xl font-black tracking-tight">{editingItemId ? '추천 시공 사례 수정' : '새 추천 시공 사례 등록'}</h2>
                   <button onClick={() => setIsAddingPortfolio(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                      <X size={24} />
                   </button>
                </div>
                <form onSubmit={handlePortfolioSubmit} className="p-8 space-y-6">
                  {/* Informational banner */}
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm p-4 rounded-xl leading-relaxed space-y-1">
                    <p className="font-bold">💡 현장 시공 기록지 연동 안내</p>
                    <p>
                      기존의 비포&애프터 비교 앨범형 대신, 대표님이 <b>현장 공식 시공 기록지에 작성하신 글 주소</b>를 등록하는 연동형 시스템입니다.
                      사용자가 사이트에서 클릭하면 대표님의 상세 시공 일지 게시글로 안전하게 바로 이동합니다!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-2">게시글 제목</label>
                       <input 
                         required
                         value={itemForm.title}
                         onChange={e => setItemForm({...itemForm, title: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none"
                         placeholder="예: [준공청소] 마포구 신축 오피스 빌딩 준공 대청소 현장 기록"
                       />
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">시공 카테고리</label>
                       <select 
                         required
                         value={itemForm.category}
                         onChange={e => setItemForm({...itemForm, category: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none"
                       >
                         <option value="">카테고리 선택</option>
                         <option value="화재청소">화재청소</option>
                         <option value="침수청소">침수청소</option>
                         <option value="입주청소">입주청소</option>
                         <option value="공장청소">공장청소</option>
                         <option value="주방청소">주방청소</option>
                         <option value="후드청소">후드청소</option>
                         <option value="인테리어청소">인테리어청소</option>
                         <option value="바닥청소">바닥청소</option>
                         <option value="외벽청소">외벽청소</option>
                         <option value="준공청소">준공청소</option>
                         <option value="사무실청소">사무실청소</option>
                         <option value="관공서청소">관공서청소</option>
                         <option value="특수청소">특수청소</option>
                         <option value="바닥코팅">바닥코팅</option>
                       </select>
                    </div>

                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">현장 시공일자</label>
                       <input 
                         type="date"
                         value={itemForm.date}
                         onChange={e => setItemForm({...itemForm, date: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none"
                       />
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-2">연결할 상세 시공 기록지 개별 글 주소 (URL)</label>
                       <input 
                         required
                         type="url"
                         value={itemForm.afterImage}
                         onChange={e => setItemForm({...itemForm, afterImage: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none text-sm font-mono text-emerald-800 bg-[#fafdfb]"
                         placeholder="예: https://blog.naver.com/kslee0143/223284920202"
                       />
                       <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                         <span>✔️</span> 공식 시공 기록지 앱 또는 PC 브라우저에서 '오른쪽 상단 점 3개 &gt; 링크 복사' 또는 '주소복사' 하여 입력하세요.
                       </p>
                    </div>

                    <ImageUploader 
                       label="대표 썸네일 이미지 업로드 (카드 가로형 사진)" 
                       value={itemForm.beforeImage || ''} 
                       onChange={(val) => setItemForm(prev => ({ ...prev, beforeImage: val }))}
                       id="before-image"
                    />

                    <div className="md:col-span-2">
                       <label className="block text-sm font-bold text-gray-700 mb-2">시공 주요 성과 핵심 요약 (상세 설명)</label>
                       <textarea 
                         required
                         rows={4}
                         value={itemForm.description}
                         onChange={e => setItemForm({...itemForm, description: e.target.value})}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary transition-all outline-none text-sm"
                         placeholder="작업의 주요 스펙과 성과를 짧고 가독성 좋게 적어주세요. (예: 100평 대형 식당 기름때 제거 및 후드 정밀 고압 청소 완벽 시공!)"
                       />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button 
                       type="button" 
                       onClick={() => setIsAddingPortfolio(false)}
                       className="flex-1 py-4 border border-gray-200 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                     >
                       취소
                     </button>
                     <button 
                       disabled={savingItem}
                       className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primaryDark transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                     >
                       {savingItem ? <Loader2 className="animate-spin animate-infinite" /> : <Save size={20} />}
                       {editingItemId ? '수정 사항 저장' : '새 추천 글 등록 완료'}
                     </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioItems.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-video bg-gray-50">
                          <img 
                            src={item.beforeImage || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                             <button onClick={() => handleEditItem(item)} className="bg-white text-gray-900 p-3 rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110" title="수정하기">
                               <Edit2 size={20} />
                             </button>
                             <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all transform hover:scale-110" title="삭제하기">
                               <Trash2 size={20} />
                             </button>
                          </div>
                          <span className="absolute top-2 left-2 bg-emerald-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">추천글</span>
                        </div>
                        <div className="p-5">
                           <div className="flex justify-between items-start mb-2">
                             <span className="text-[10px] font-black text-primary px-2 py-0.5 bg-primary/10 rounded-full">{item.category}</span>
                             <span className="text-[10px] text-gray-400 font-mono">{item.date}</span>
                           </div>
                           <h3 className="font-bold text-gray-900 line-clamp-2 tracking-tight leading-snug mb-2">{item.title}</h3>
                           <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="px-5 pb-5 pt-2 border-t border-gray-50">
                         <a 
                           href={item.afterImage} 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full text-center block text-[11px] font-bold py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 hover:text-emerald-800 transition-colors truncate px-2 font-mono"
                         >
                           링크 테스트: {item.afterImage ? item.afterImage.substring(0,35) + "..." : "미지정"}
                         </a>
                      </div>
                    </div>
                  ))}
                </div>
                {portfolioItems.length === 0 && (
                   <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-100 max-w-xl mx-auto">
                      <p className="text-gray-400 font-bold text-lg mb-2">등록된 추천 현장시공사례 기록이 없습니다.</p>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6">상세 현장 시공 기록지 링크를 등록하여 사이트 '추천 시공 사례' 탭에 고급스럽게 노출시켜 보세요!</p>
                      <button 
                        onClick={() => {
                          setEditingItemId(null);
                          setItemForm({ title: '', category: '', beforeImage: '', afterImage: '', description: '', date: new Date().toISOString().split('T')[0] });
                          setIsAddingPortfolio(true);
                        }}
                        className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primaryDark transition-all"
                      >
                        첫 추천 현장시공사례 등록하기
                      </button>
                   </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// AuthProvider (and the firebase/auth SDK it pulls in) is only needed here,
// so it's scoped to this lazy-loaded chunk instead of App.tsx's global tree —
// keeps ~firebase/auth's weight out of every public visitor's initial bundle.
const AdminDashboard: React.FC = () => (
  <AuthProvider>
    <AdminDashboardInner />
  </AuthProvider>
);

export default AdminDashboard;
