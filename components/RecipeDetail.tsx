
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart, Bookmark, Eye, Sparkles, UserPlus, ChevronRight, Hash, Clock, BookOpen } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  relatedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, relatedRecipes, onSelectRecipe }) => {
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isScrapped, setIsScrapped] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipe.id]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
      {/* Navigation & Breadcrumb */}
      <nav className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-bk-purple transition-all font-bold text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>전체 리스트로</span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
           <div className="flex items-center gap-1.5"><Eye size={14}/> {recipe.views.toLocaleString()} VIEWS</div>
           <div className="flex items-center gap-1.5"><Clock size={14}/> 12 MIN READ</div>
           <div className="text-slate-200">/</div>
           <div>UPDATED {recipe.createdAt}</div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        
        {/* LEFT: Core Content Section (Thumbnail Removed) */}
        <div className="flex-grow w-full space-y-20 lg:max-w-[calc(100%-400px)]">
          
          {/* Header Typography Section */}
          <div className="space-y-8">
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-bk-purple/5 text-bk-purple text-[10px] font-black rounded-lg border border-bk-purple/10 uppercase tracking-widest">
                 {recipe.category}
               </span>
               <span className={`px-3 py-1 text-[10px] font-black rounded-lg border uppercase tracking-widest ${
                 recipe.difficulty === '고급' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                 recipe.difficulty === '중급' ? 'bg-bk-mint/5 text-bk-mint border-bk-mint/20' : 
                 'bg-slate-50 text-slate-500 border-slate-100'
               }`}>
                 {recipe.difficulty} 난이도
               </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
                {recipe.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-4xl border-l-4 border-slate-100 pl-6">
                {recipe.description}
              </p>
            </div>
          </div>

          {/* Body Steps: Professional Doc Layout */}
          <div className="space-y-24">
            {recipe.steps?.map((step) => (
              <div key={step.id} className="group relative">
                {/* Visual Connector */}
                {step.id !== recipe.steps?.length && (
                  <div className="absolute left-[23px] top-16 bottom-[-80px] w-0.5 bg-slate-50 group-hover:bg-bk-purple/10 transition-colors"></div>
                )}
                
                <div className="flex gap-10">
                  <div className="shrink-0 pt-2 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-xl font-black text-slate-200 group-hover:border-bk-purple group-hover:text-bk-purple transition-all duration-300 shadow-sm">
                      {step.id}
                    </div>
                  </div>

                  <div className="flex-grow space-y-8">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{step.title}</h2>
                    <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <p className="text-lg md:text-xl text-slate-600 whitespace-pre-wrap leading-[1.8] font-medium">
                        {step.content}
                      </p>
                      {step.image && (
                        <div className="mt-10 rounded-3xl overflow-hidden border border-slate-50 shadow-inner">
                          <img src={step.image} className="w-full h-auto object-cover" alt={step.title} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-24 border-t border-slate-100 space-y-12 pb-20">
             <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">의견 나누기 <span className="text-bk-purple/40 ml-1">{recipe.comments}</span></h3>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   Sort by <span className="text-slate-900">Newest First</span> <ChevronRight size={14} className="rotate-90" />
                </div>
             </div>
             
             <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10 flex gap-8 shadow-sm">
                <img src="https://picsum.photos/seed/me/48/48" className="w-14 h-14 rounded-full border-2 border-white shadow-xl grayscale" alt="Me" />
                <div className="flex-grow space-y-6">
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="이 워크플로우를 사용해보셨나요? 경험을 들려주세요."
                    className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-300 resize-none pt-2 text-xl font-medium"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-bk-purple transition-all shadow-xl shadow-slate-900/10">등록하기</button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: High-Utility Discovery Sidebar */}
        <div className="w-full lg:w-[360px] space-y-6 lg:sticky lg:top-10">
          
          {/* 1. Author & Action Hub */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={recipe.author.avatar} className="w-14 h-14 rounded-2xl border border-slate-100 shadow-sm" alt={recipe.author.name} />
                <div>
                  <div className="text-[17px] font-bold text-slate-900">{recipe.author.name}</div>
                  <div className="text-[10px] text-bk-mint font-black tracking-widest uppercase">Verified Expert</div>
                </div>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-bk-purple hover:text-white transition-all border border-transparent hover:border-bk-purple/20">
                <UserPlus size={20} />
              </button>
            </div>

            {/* Tactical Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center justify-center gap-2.5 py-4 rounded-2xl border font-black text-[11px] uppercase tracking-wider transition-all ${isLiked ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'}`}
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span>{recipe.likes + (isLiked ? 1 : 0)} Likes</span>
              </button>
              <button 
                onClick={() => setIsScrapped(!isScrapped)}
                className={`flex items-center justify-center gap-2.5 py-4 rounded-2xl border font-black text-[11px] uppercase tracking-wider transition-all ${isScrapped ? 'bg-bk-purple/5 border-bk-purple/10 text-bk-purple' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'}`}
              >
                <Bookmark size={18} fill={isScrapped ? "currentColor" : "none"} />
                <span>Save Doc</span>
              </button>
            </div>
            
            <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-bk-purple transition-all shadow-xl shadow-slate-900/10">
              <Share2 size={16} />
              <span>워크플로우 링크 공유</span>
            </button>
          </div>

          {/* 2. Document Content (Table of Contents) */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <BookOpen size={14} /> Step Roadmap
            </h4>
            <div className="space-y-4">
              {recipe.steps?.map((step) => (
                <div key={step.id} className="flex gap-4 group cursor-pointer">
                  <span className="text-[11px] font-black text-slate-200 group-hover:text-bk-purple transition-colors pt-0.5">0{step.id}</span>
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors line-clamp-1">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Discovery: Related Docs (No Thumbnails) */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-6">
            <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-widest flex items-center justify-between">
              Discover More
              <Sparkles size={14} className="text-bk-orange opacity-40" />
            </h4>
            
            <div className="space-y-6">
              {relatedRecipes.slice(0, 3).map((rel, idx) => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectRecipe(rel)}
                  className="flex gap-4 group cursor-pointer items-start"
                >
                  <div className="w-6 shrink-0 pt-1">
                     <div className="text-[10px] font-black text-slate-200 group-hover:text-bk-purple transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                     </div>
                  </div>

                  <div className="flex-grow">
                    <h5 className="text-[14px] font-bold text-slate-800 leading-snug group-hover:text-bk-purple transition-colors">
                      {rel.title}
                    </h5>
                    <div className="text-[10px] text-slate-400 mt-1 font-bold flex items-center gap-3 uppercase tracking-tighter">
                      <span>{rel.category}</span>
                      <span className="flex items-center gap-1 opacity-60"><Heart size={10}/> {rel.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 py-4 text-[10px] font-black text-slate-400 hover:text-bk-purple uppercase tracking-widest transition-all group border-t border-slate-50 pt-6">
              <span>전체 라이브러리 보기</span>
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4. Quick Tip Banner */}
          <div className="px-8 py-6 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 flex items-start gap-4">
            <div className="text-bk-mint pt-1 shrink-0">
               <Hash size={18} />
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              <span className="text-white font-bold block mb-1">bkamp Tip:</span> 
              워크플로우의 각 단계는 실제 실행 순서에 따라 작성되었습니다. 오른쪽 아래 버튼을 눌러 피드백을 남겨주세요!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
