
import React from 'react';
import { Search, SlidersHorizontal, LayoutGrid, Code, Smartphone, PenTool, Palette } from 'lucide-react';
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

  const sorts = ['최신순', '인기순', '조회순'];

  return (
    <div className="space-y-6 mb-10">
      {/* Search & Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="어떤 워크플로우를 찾으시나요?"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl focus:ring-4 focus:ring-bk-purple/5 focus:border-bk-purple outline-none transition-all shadow-sm text-sm"
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative group shrink-0 flex-grow md:flex-grow-0">
            <select 
              value={filters.sort}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full appearance-none bg-white border border-slate-100 px-5 pr-10 py-3.5 rounded-2xl text-xs font-bold text-slate-600 cursor-pointer hover:border-bk-purple transition-colors outline-none shadow-sm"
            >
              {sorts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <button className="flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:border-bk-purple hover:text-bk-purple transition-all shadow-sm shrink-0">
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">필터</span>
          </button>
        </div>
      </div>

      {/* Visual Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onFilterChange('category', cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
              filters.category === cat.name
                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
            }`}
          >
            <span className={filters.category === cat.name ? 'text-bk-mint' : 'text-slate-400'}>
              {cat.icon}
            </span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Quick Access Chips */}
      <div className="flex flex-wrap gap-2 pt-2">
        {['#Cursor', '#Claude', '#Python', '#Automation', '#Productivity'].map(tag => (
          <button 
            key={tag}
            className="px-3 py-1.5 bg-slate-100/50 text-[11px] font-bold text-slate-500 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
