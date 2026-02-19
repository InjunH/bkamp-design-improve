
import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Code, Smartphone, PenTool, Palette, ChevronDown } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const categories = [
    { name: '전체 카테고리', icon: <LayoutGrid size={16} /> },
    { name: '개발', icon: <Code size={16} /> },
    { name: '실사용기', icon: <Smartphone size={16} /> },
    { name: '기획', icon: <PenTool size={16} /> },
    { name: '디자인', icon: <Palette size={16} /> },
  ];

  return (
    <div className="space-y-6 mb-12">
      {/* Search & Top Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-bk-purple transition-colors" size={20} />
          <input 
            type="text"
            placeholder="어떤 워크플로우가 필요하신가요?"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-bk-purple/5 focus:border-bk-purple outline-none transition-all shadow-sm text-[15px] font-medium placeholder:text-slate-300"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative min-w-[120px]">
            <select 
              value={filters.sort}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 pl-5 pr-10 py-4 rounded-[1.25rem] text-[13px] font-bold text-slate-600 cursor-pointer hover:border-bk-purple transition-all outline-none shadow-sm"
            >
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
              <option value="조회순">조회순</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-[1.25rem] text-[13px] font-bold hover:bg-bk-purple transition-all shadow-lg shadow-slate-900/10 shrink-0">
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">세부 필터</span>
          </button>
        </div>
      </div>

      {/* Modern Category Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onFilterChange('category', cat.name)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-bold whitespace-nowrap transition-all border ${
              filters.category === cat.name
                ? 'bg-bk-purple border-bk-purple text-white shadow-lg shadow-bk-purple/20'
                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className={filters.category === cat.name ? 'text-white' : 'text-slate-400'}>
              {cat.icon}
            </span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Trending Tags */}
      <div className="flex items-center gap-3 px-1 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest shrink-0">Trending</span>
        <div className="flex gap-2">
          {['#Cursor', '#Claude3.7', '#MCP_Server', '#Automation', '#UIUX'].map(tag => (
            <button 
              key={tag}
              className="px-4 py-1.5 bg-white border border-slate-100 text-[12px] font-semibold text-slate-500 rounded-full hover:border-bk-purple hover:text-bk-purple transition-all shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
