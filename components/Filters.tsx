
import React from 'react';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const categories = ['전체 카테고리', '개발', '실사용기', '기획', '디자인'];
  const levels = ['전체 난이도', '입문', '중급', '고급'];
  const sorts = ['최신순', '인기순', '조회순'];

  return (
    <div className="space-y-6 mb-10">
      {/* Main Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="검색어를 입력하세요 (예: Cursor, MCP, 데이터...)"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-bk-purple/10 focus:border-bk-purple outline-none transition-all shadow-sm text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { label: filters.category, list: categories, key: 'category' as const },
            { label: filters.difficulty, list: levels, key: 'difficulty' as const },
            { label: filters.sort, list: sorts, key: 'sort' as const },
          ].map((item, idx) => (
            <div key={idx} className="relative group shrink-0">
              <select 
                value={item.label}
                onChange={(e) => onFilterChange(item.key, e.target.value)}
                className="appearance-none bg-white border border-slate-200 px-4 pr-10 py-3 rounded-xl text-sm font-medium text-slate-700 cursor-pointer hover:border-bk-purple transition-colors outline-none shadow-sm"
              >
                {item.list.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          ))}
          
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-bk-purple hover:text-bk-purple transition-colors shrink-0">
            <SlidersHorizontal size={16} />
            <span>상세 필터</span>
          </button>
        </div>
      </div>

      {/* Quick Access Chips */}
      <div className="flex flex-wrap gap-2">
        {['#Cursor', '#Claude', '#Python', '#Automation', '#Productivity', '#React'].map(tag => (
          <button 
            key={tag}
            className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-500 hover:border-bk-purple hover:text-bk-purple transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;