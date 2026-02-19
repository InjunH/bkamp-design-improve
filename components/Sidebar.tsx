
import React from 'react';
import { TrendingUp, Award, ExternalLink, Mail, Edit3, ChevronRight } from 'lucide-react';
import { SIDEBAR_ITEMS } from '../data/mockData';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full lg:w-80 space-y-6 h-fit lg:sticky lg:top-24">
      {/* Create Recipe CTA Card */}
      <button className="w-full bg-white border-2 border-bk-purple/10 hover:border-bk-purple/30 rounded-2xl p-5 text-left transition-all group flex items-center justify-between shadow-sm hover:shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-bk-purple/5 flex items-center justify-center text-bk-purple group-hover:scale-110 transition-transform">
            <Edit3 size={24} />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">나만의 레시피 공유</div>
            <div className="text-[11px] text-slate-500 mt-0.5">워크플로우를 공유하고 포인트를 받으세요</div>
          </div>
        </div>
        <ChevronRight size={18} className="text-slate-300 group-hover:text-bk-purple transition-colors" />
      </button>

      {/* User Status / Quick Stats */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-50 shadow-sm">
             <img src="https://picsum.photos/seed/me/48/48" className="w-full h-full object-cover" alt="Me" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">InjunH 님</div>
            <div className="text-xs text-bk-purple font-medium">레벨 12 • 732 XP</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100/50">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">내 레시피</div>
            <div className="text-lg font-bold text-slate-800 tracking-tight">12</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100/50">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">획득 하트</div>
            <div className="text-lg font-bold text-bk-orange tracking-tight">142</div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-bk-orange" />
          <h4 className="font-bold text-slate-800 tracking-tight">급상승 키워드</h4>
        </div>
        <ul className="space-y-4">
          {SIDEBAR_ITEMS.trending.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-xs font-bold text-bk-purple/30 group-hover:text-bk-purple transition-colors">{idx + 1}</span>
              <span className="text-sm text-slate-600 group-hover:text-bk-purple transition-colors flex-grow font-medium">{item}</span>
              <ExternalLink size={14} className="text-slate-200 group-hover:text-bk-purple opacity-0 group-hover:opacity-100 transition-all" />
            </li>
          ))}
        </ul>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-bk-purple" />
          <h4 className="font-bold text-slate-800 tracking-tight">이달의 기여자</h4>
        </div>
        <div className="space-y-4">
          {SIDEBAR_ITEMS.contributors.map((user, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="relative">
                <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-50 shadow-sm" alt={user.name} />
                {idx === 0 && <span className="absolute -top-1 -right-1 text-[8px] bg-bk-orange text-white w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">1</span>}
              </div>
              <div className="flex-grow">
                <div className="text-xs font-bold text-slate-800">{user.name}</div>
                <div className="text-[10px] text-slate-400">{user.points.toLocaleString()} pts</div>
              </div>
              <button className="text-[10px] font-bold text-bk-purple bg-bk-purple/5 px-2.5 py-1 rounded-md hover:bg-bk-purple hover:text-white transition-all">팔로우</button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter / CTA */}
      <div className="bk-gradient rounded-2xl p-6 text-white overflow-hidden relative shadow-lg shadow-bk-purple/20">
        <div className="relative z-10">
          <h4 className="font-bold text-lg mb-2">AI 뉴스레터 구독</h4>
          <p className="text-white/70 text-xs mb-4">새로운 레시피와 AI 트렌드를 메일로 보내드려요.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-xs flex-grow focus:outline-none focus:ring-1 focus:ring-white/50 placeholder:text-white/40" 
            />
            <button className="bg-white text-bk-purple rounded-lg p-2 hover:bg-bk-mint hover:text-slate-900 transition-colors">
              <Mail size={16} />
            </button>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </aside>
  );
};

export default Sidebar;