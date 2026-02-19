
import React from 'react';
import { Bell, Sun, Globe, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-bk-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs italic">bk</span>
          </div>
          <span className="font-bold text-lg tracking-tight">bkamp.ai</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-[15px] font-medium text-slate-600">
          <a href="#" className="hover:text-bk-purple transition-colors">게시판</a>
          <a href="#" className="text-black font-semibold border-b-2 border-bk-purple pt-0.5">레시피</a>
          <a href="#" className="hover:text-bk-purple transition-colors">쇼케이스</a>
          <a href="#" className="hover:text-bk-purple transition-colors">뉴스</a>
          <a href="#" className="text-bk-orange font-semibold hover:opacity-80 transition-opacity">바이브 로그 <span className="text-[10px] align-top ml-0.5">my</span></a>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-500">
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors hover:text-bk-purple"><Bell size={20} /></button>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors hover:text-bk-purple"><Sun size={20} /></button>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors hover:text-bk-purple"><Globe size={20} /></button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <img src="https://picsum.photos/seed/me/32/32" className="w-8 h-8 rounded-full border border-slate-200" alt="Profile" />
          <span className="text-sm font-medium text-slate-700 hidden sm:block">InjunH</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;