
import React, { useState } from 'react';
import { ArrowLeft, Plus, Image as ImageIcon, Trash2, Save, Send, ChevronDown } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  content: string;
}

interface CreateRecipeProps {
  onBack: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ onBack }) => {
  const [steps, setSteps] = useState<Step[]>([{ id: 1, title: '', content: '' }]);
  const [meta, setMeta] = useState({
    title: '',
    category: '',
    difficulty: '중급',
    description: ''
  });

  const addStep = () => {
    setSteps([...steps, { id: steps.length + 1, title: '', content: '' }]);
  };

  const removeStep = (id: number) => {
    if (steps.length === 1) return;
    setSteps(steps.filter(s => s.id !== id).map((s, idx) => ({ ...s, id: idx + 1 })));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
      {/* Back Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-bk-purple transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold text-xl">레시피 등록</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT: Main Content (Step Editor) */}
        <div className="flex-grow w-full space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-bk-purple rounded-full"></span>
              레시피 본문 구성
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-bk-purple/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-bk-purple shrink-0 shadow-sm">
                      {step.id}
                    </div>
                    <div className="flex-grow space-y-4">
                      <input 
                        type="text" 
                        placeholder="단계 제목을 입력하세요 (예: 환경 설정하기)"
                        className="w-full bg-transparent border-b border-slate-200 py-2 font-bold text-lg focus:border-bk-purple outline-none transition-colors"
                      />
                      <textarea 
                        placeholder="상세 내용을 입력하세요..."
                        rows={3}
                        className="w-full bg-transparent text-slate-600 text-sm resize-none focus:outline-none"
                      />
                      
                      {/* Image Upload Mockup in Step */}
                      <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-bk-purple/50 hover:text-bk-purple transition-colors cursor-pointer group/upload">
                        <ImageIcon size={24} className="mb-2 group-hover/upload:scale-110 transition-transform" />
                        <span className="text-xs font-medium">단계별 스크린샷이나 이미지를 추가하세요</span>
                      </div>
                    </div>
                    {steps.length > 1 && (
                      <button 
                        onClick={() => removeStep(step.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button 
                onClick={addStep}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:border-bk-purple hover:text-bk-purple hover:bg-bk-purple/5 transition-all"
              >
                <Plus size={20} />
                <span>단계 추가하기</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-white hover:border-bk-purple hover:text-bk-purple transition-colors flex items-center gap-2 bg-slate-50">
              <Save size={18} />
              <span>임시 저장</span>
            </button>
            <button className="px-8 py-3 bk-gradient text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-bk-purple/20">
              <Send size={18} />
              <span>레시피 발행하기</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Global Meta Data Panel */}
        <div className="w-full lg:w-96 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-4 bg-bk-orange rounded-full"></span>
              레시피 정보 설정
            </h3>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">대표 썸네일</label>
              <div className="aspect-[16/9] w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-bk-orange/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-bk-orange group-hover:scale-110 transition-transform">
                  <Plus size={20} />
                </div>
                <div className="mt-3 text-center px-4">
                  <div className="text-xs font-bold text-slate-700">이미지를 드래그하거나 클릭하세요</div>
                  <div className="text-[10px] text-slate-400 mt-1">1200x630px 권장 (최대 5MB)</div>
                </div>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">카테고리</label>
              <div className="relative">
                <select className="w-full appearance-none bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-bk-purple/10 focus:border-bk-purple transition-all">
                  <option value="">카테고리 선택</option>
                  <option value="개발">개발</option>
                  <option value="실사용기">실사용기</option>
                  <option value="기획">기획</option>
                  <option value="디자인">디자인</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">레시피 제목</label>
              <input 
                type="text" 
                placeholder="제목을 입력하세요"
                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-bk-purple/10 focus:border-bk-purple transition-all"
              />
            </div>

            {/* Difficulty Toggle */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">난이도</label>
              <div className="flex p-1 bg-slate-100 rounded-xl">
                {['입문', '중급', '고급'].map((lvl) => (
                  <button 
                    key={lvl}
                    className={`flex-grow py-2 text-xs font-bold rounded-lg transition-all ${
                      meta.difficulty === lvl 
                        ? 'bg-white text-bk-purple shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                    onClick={() => setMeta({ ...meta, difficulty: lvl })}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">간단 설명</label>
              <textarea 
                placeholder="레시피에 대한 핵심 요약을 적어주세요."
                rows={3}
                className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-bk-purple/10 focus:border-bk-purple transition-all resize-none"
              />
            </div>
          </div>
          
          <div className="bg-bk-purple/5 rounded-2xl p-5 border border-bk-purple/10">
            <h4 className="text-xs font-bold text-bk-purple uppercase mb-2">작성 팁</h4>
            <p className="text-[11px] text-bk-purple/70 leading-relaxed">
              독자들은 단계별로 따라하기 쉬운 구조를 좋아합니다. 캡처 이미지와 함께 자세한 프롬프트나 코드를 공유하면 더 많은 하트를 받을 수 있습니다!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateRecipe;