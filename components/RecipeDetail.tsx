
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart, Bookmark, Eye, MessageCircle, MoreVertical, MessageSquare, ShieldCheck, ExternalLink, Send, ThumbsUp, Sparkles, UserPlus } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  relatedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, relatedRecipes, onSelectRecipe }) => {
  const [comment, setComment] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipe.id]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-500">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-bk-purple transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">레시피 목록</span>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Admin Status Alert - Compact */}
      <div className="bg-bk-mint/5 border border-bk-mint/10 rounded-2xl p-3 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-bk-mint flex items-center justify-center text-slate-900">
            <ShieldCheck size={16} />
          </div>
          <div className="text-xs font-bold text-slate-700">관리자 승인 레시피</div>
        </div>
        <button className="text-[10px] font-bold text-bk-mint px-3 py-1.5 bg-white border border-bk-mint/20 rounded-lg hover:bg-bk-mint hover:text-white transition-all shadow-sm">
          문의하기
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT: Main Content */}
        <div className="flex-grow w-full space-y-8 lg:max-w-[calc(100%-384px)]">
          {/* Visual Header */}
          <div className="bk-gradient rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden text-white min-h-[360px] flex flex-col justify-end shadow-xl shadow-bk-purple/10">
            <div className="relative z-10">
              <div className="flex gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{recipe.category}</span>
                <span className="bg-bk-mint text-slate-900 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">{recipe.difficulty}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl mb-4 tracking-tight">
                {recipe.title}
              </h1>
              <p className="text-base opacity-90 max-w-lg leading-relaxed line-clamp-2">
                {recipe.description}
              </p>
            </div>
            <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Steps Content */}
          <div className="space-y-10 py-4">
            {recipe.steps ? (
              recipe.steps.map((step) => (
                <div key={step.id} className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bk-purple text-white flex items-center justify-center font-bold text-base shadow-lg shadow-bk-purple/20">
                      {step.id}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{step.title}</h2>
                  </div>
                  
                  <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm leading-relaxed text-slate-700 transition-all hover:shadow-md">
                    <p className="whitespace-pre-wrap mb-6 text-[15px]">{step.content}</p>
                    {step.image && (
                      <div className="rounded-2xl overflow-hidden border border-slate-100">
                        <img src={step.image} alt={step.title} className="w-full h-auto object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 italic text-slate-400">
                상세 단계 내용이 아직 작성되지 않았습니다.
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="pt-10 border-t border-slate-100 space-y-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              의견 <span className="text-bk-purple">{recipe.comments}</span>
            </h3>

            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-bk-purple/10 transition-all flex gap-4">
              <img src="https://picsum.photos/seed/me/40/40" className="w-9 h-9 rounded-full shrink-0 border border-slate-50" alt="Me" />
              <div className="flex-grow space-y-3">
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 남겨주세요..."
                  className="w-full bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-300 resize-none pt-1"
                  rows={2}
                />
                <div className="flex justify-end">
                  <button 
                    disabled={!comment.trim()}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs transition-all ${
                      comment.trim() ? 'bk-gradient text-white shadow-md shadow-bk-purple/20' : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <span>등록</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {recipe.commentsList?.map((c) => (
                <div key={c.id} className="flex gap-4">
                  <img src={c.author.avatar} className="w-9 h-9 rounded-full shrink-0 border border-slate-100" alt={c.author.name} />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-900">{c.author.name}</span>
                      <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Compact Organized Sidebar */}
        <div className="w-full lg:w-80 space-y-5 lg:sticky lg:top-24">
          
          {/* Unified Author & Interaction Card */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={recipe.author.avatar} className="w-11 h-11 rounded-full border border-slate-50 shadow-sm" alt={recipe.author.name} />
                <div>
                  <div className="text-[13px] font-bold text-slate-900">{recipe.author.name}</div>
                  <div className="text-[10px] text-bk-purple font-medium">Expert Creator</div>
                </div>
              </div>
              <button className="p-2 bg-bk-purple/5 text-bk-purple rounded-full hover:bg-bk-purple hover:text-white transition-all">
                <UserPlus size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-xs font-bold">{recipe.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-400 hover:text-bk-purple transition-colors">
                  <Bookmark size={18} />
                  <span className="text-xs font-bold">{recipe.bookmarks || 0}</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-bk-mint transition-colors">
                <Share2 size={18} />
                <span className="text-xs font-bold">공유</span>
              </button>
            </div>
          </div>

          {/* Mini Recommended List */}
          {relatedRecipes.length > 0 && (
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">다음 추천</h4>
                <Sparkles size={12} className="text-bk-orange" />
              </div>
              
              <div className="space-y-4">
                {relatedRecipes.slice(0, 3).map(rel => (
                  <div 
                    key={rel.id} 
                    onClick={() => onSelectRecipe(rel)}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl ${rel.gradientClass} shrink-0 p-1 flex flex-col justify-end text-white overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform`}>
                      <span className="text-[5px] font-bold uppercase relative z-10">{rel.category}</span>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <h5 className="text-[12px] font-bold text-slate-800 leading-tight truncate group-hover:text-bk-purple transition-colors">
                        {rel.title}
                      </h5>
                      <div className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="flex items-center gap-0.5"><Eye size={8}/> {rel.views}</span>
                        <span className="flex items-center gap-0.5"><Heart size={8} className="text-rose-400"/> {rel.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table of Contents - Sleek Navigation */}
          {recipe.steps && (
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white overflow-hidden relative shadow-lg shadow-slate-900/10">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">컨텐츠 목차</h4>
              <nav className="space-y-3 relative z-10">
                {recipe.steps.map(step => (
                  <div key={step.id} className="flex items-start gap-3 group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 rounded-full bg-bk-mint mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></div>
                    <span className="text-xs font-medium leading-tight group-hover:text-bk-mint transition-colors line-clamp-2">
                      {step.title}
                    </span>
                  </div>
                ))}
              </nav>
              <div className="absolute top-[-20px] right-[-20px] opacity-5 text-bk-purple">
                <MessageCircle size={100} />
              </div>
            </div>
          )}
          
          <button 
            onClick={onBack}
            className="w-full py-3.5 text-[11px] font-bold text-slate-500 bg-white border border-slate-100 rounded-2xl hover:text-bk-purple hover:border-bk-purple/20 transition-all shadow-sm"
          >
            목록으로 돌아가기
          </button>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
