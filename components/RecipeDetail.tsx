
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart, Bookmark, Eye, MoreVertical, Sparkles, UserPlus, ChevronRight } from 'lucide-react';
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
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-bk-purple transition-all font-bold text-sm group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>레시피 목록</span>
        </button>
        <div className="flex items-center gap-2">
           <button className="p-2 text-slate-400 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT: Main Content (Scrollable) */}
        <div className="flex-grow w-full space-y-12 lg:max-w-[calc(100%-380px)]">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <span className="px-3 py-1 bg-bk-purple/5 text-bk-purple text-[10px] font-bold rounded-full border border-bk-purple/10 uppercase tracking-widest">{recipe.category}</span>
               <span className="px-3 py-1 bg-bk-mint/10 text-slate-700 text-[10px] font-bold rounded-full border border-bk-mint/20 uppercase tracking-widest">{recipe.difficulty}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              {recipe.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              {recipe.description}
            </p>
            <div className={`w-full aspect-[21/9] rounded-[2.5rem] ${recipe.gradientClass} shadow-xl shadow-bk-purple/5 flex items-center justify-center relative overflow-hidden group`}>
               <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[2px]"></div>
               <Sparkles size={100} className="text-white/20 relative z-10 transition-transform group-hover:scale-110 duration-700" />
            </div>
          </div>

          {/* Body Steps */}
          <div className="space-y-16">
            {recipe.steps?.map((step) => (
              <div key={step.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-slate-100">0{step.id}</span>
                  <h2 className="text-2xl font-bold text-slate-900">{step.title}</h2>
                </div>
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm leading-relaxed text-slate-700">
                  <p className="text-lg whitespace-pre-wrap leading-relaxed">{step.content}</p>
                  {step.image && (
                    <img src={step.image} className="mt-8 rounded-2xl w-full border border-slate-50 shadow-sm" alt={step.title} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Comments */}
          <div className="pt-20 border-t border-slate-100 space-y-10 pb-20">
             <h3 className="text-2xl font-bold">의견 <span className="text-bk-purple">{recipe.comments}</span></h3>
             <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 flex gap-5 shadow-sm">
                <img src="https://picsum.photos/seed/me/48/48" className="w-12 h-12 rounded-full border-2 border-white shadow-md" alt="Me" />
                <div className="flex-grow space-y-4">
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="작성자에게 격려의 한마디를 남겨주세요."
                    className="w-full bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-300 resize-none pt-2 text-lg"
                    rows={2}
                  />
                  <div className="flex justify-end">
                    <button className="px-8 py-2.5 bk-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-bk-purple/20">등록</button>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: Compact Interaction & Discovery Sidebar (Non-Scroll Focus) */}
        <div className="w-full lg:w-[340px] space-y-5 lg:sticky lg:top-24">
          
          {/* 1. Unified Profile & Interaction Widget */}
          <div className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={recipe.author.avatar} className="w-12 h-12 rounded-2xl border border-slate-100 shadow-sm" alt={recipe.author.name} />
                <div>
                  <div className="text-[15px] font-bold text-slate-900">{recipe.author.name}</div>
                  <div className="text-[10px] text-bk-purple font-bold tracking-wider uppercase opacity-70">Expert Creator</div>
                </div>
              </div>
              <button className="p-2 bg-bk-purple/5 text-bk-purple rounded-xl hover:bg-bk-purple hover:text-white transition-all">
                <UserPlus size={18} />
              </button>
            </div>

            {/* Main Action Buttons: Like, Scrap, Share */}
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl border transition-all ${isLiked ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50/50 border-transparent text-slate-400 hover:border-slate-200'}`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                <span className="text-[11px] font-bold">{recipe.likes + (isLiked ? 1 : 0)}</span>
              </button>
              <button 
                onClick={() => setIsScrapped(!isScrapped)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl border transition-all ${isScrapped ? 'bg-bk-purple/5 border-bk-purple/10 text-bk-purple' : 'bg-slate-50/50 border-transparent text-slate-400 hover:border-slate-200'}`}
              >
                <Bookmark size={20} fill={isScrapped ? "currentColor" : "none"} />
                <span className="text-[11px] font-bold">스크랩</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-slate-50/50 border border-transparent text-slate-400 hover:border-slate-200 transition-all">
                <Share2 size={20} />
                <span className="text-[11px] font-bold">공유</span>
              </button>
            </div>
          </div>

          {/* 2. Compact Discovery Widget (Recommended Workflows) */}
          <div className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-[13px] font-bold text-slate-400 tracking-tight flex items-center gap-2">
                추천 워크플로우 <Sparkles size={14} className="text-bk-orange" />
              </h4>
            </div>
            
            <div className="space-y-6">
              {relatedRecipes.slice(0, 4).map((rel) => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectRecipe(rel)}
                  className="flex gap-4 group cursor-pointer items-center"
                >
                  {/* Visual Thumbnail (Matching provided image style) */}
                  <div className={`w-[72px] h-[72px] rounded-[1.25rem] ${rel.gradientClass} shrink-0 relative overflow-hidden shadow-sm group-hover:scale-105 transition-all duration-500`}>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                    <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white/90 uppercase tracking-tighter">
                      {rel.category}
                    </span>
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-white/10 rounded-full blur-lg"></div>
                  </div>

                  {/* Content Info */}
                  <div className="flex flex-col flex-grow justify-center overflow-hidden">
                    <h5 className="text-[14px] font-bold text-slate-900 leading-[1.3] line-clamp-2 group-hover:text-bk-purple transition-colors">
                      {rel.title}
                    </h5>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between gap-1">
                      <span className="truncate">By {rel.author.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="flex items-center gap-0.5"><Eye size={12}/> {rel.views}</span>
                        <span className="flex items-center gap-0.5"><Heart size={11} className="text-rose-400"/> {rel.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 py-3 text-[12px] font-bold text-slate-400 hover:text-bk-purple transition-colors group">
              <span>더 많은 레시피 보기</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Floating Action Hint / Tip */}
          <div className="px-8 py-4 bg-bk-mint/5 rounded-2xl border border-bk-mint/10">
            <p className="text-[10px] text-bk-mint font-bold leading-relaxed text-center">
              워크플로우가 도움이 되셨나요?<br/>좋아요를 눌러 제작자를 응원해주세요!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
