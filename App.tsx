
import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Navbar from './components/Navbar';
import RecipeCard from './components/RecipeCard';
import Filters from './components/Filters';
import Sidebar from './components/Sidebar';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import { RECIPES } from './data/mockData';
import { FilterState, Recipe } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<{ type: 'list' | 'create' | 'detail', selectedRecipe?: Recipe }>({
    type: 'list'
  });
  
  const [filters, setFilters] = useState<FilterState>({
    category: '전체 카테고리',
    difficulty: '전체 난이도',
    sort: '최신순',
    search: '',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      const matchCategory = filters.category === '전체 카테고리' || recipe.category === filters.category;
      const matchDifficulty = filters.difficulty === '전체 난이도' || recipe.difficulty === filters.difficulty;
      const matchSearch = recipe.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchCategory && matchDifficulty && matchSearch;
    }).sort((a, b) => {
      if (filters.sort === '최신순') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sort === '인기순') return (b.likes + (b.bookmarks || 0)) - (a.likes + (a.bookmarks || 0));
      if (filters.sort === '조회순') return b.views - a.views;
      return 0;
    });
  }, [filters]);

  // 추천 레시피 추출 (현재 보고 있는 것 제외 최대 5개)
  const relatedRecipes = useMemo(() => {
    if (!viewState.selectedRecipe) return [];
    // 목데이터가 부족할 수 있으므로 순환참조 방지하며 필터링
    return RECIPES
      .filter(r => r.id !== viewState.selectedRecipe?.id)
      .slice(0, 5);
  }, [viewState.selectedRecipe]);

  // View rendering logic
  if (viewState.type === 'create') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <CreateRecipe onBack={() => setViewState({ type: 'list' })} />
      </div>
    );
  }

  if (viewState.type === 'detail' && viewState.selectedRecipe) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <RecipeDetail 
          recipe={viewState.selectedRecipe} 
          onBack={() => setViewState({ type: 'list' })} 
          relatedRecipes={relatedRecipes}
          onSelectRecipe={(recipe) => setViewState({ type: 'detail', selectedRecipe: recipe })}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">레시피</h1>
            <p className="text-slate-500 font-medium">검증된 AI 워크플로우를 내 것으로 만드세요.</p>
          </div>
          <button 
            onClick={() => setViewState({ type: 'create' })}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bk-gradient hover:opacity-90 text-white rounded-xl font-bold text-sm shadow-lg shadow-bk-purple/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={18} strokeWidth={3} />
            <span>레시피 등록하기</span>
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} onClick={() => setViewState({ type: 'detail', selectedRecipe: recipe })} className="cursor-pointer">
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="text-slate-300 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">검색 결과가 없습니다</h3>
                <p className="text-slate-400 text-sm">필터를 변경하거나 다른 키워드로 검색해보세요.</p>
                <button 
                  onClick={() => setFilters({ category: '전체 카테고리', difficulty: '전체 난이도', sort: '최신순', search: '' })}
                  className="mt-6 text-sm font-bold text-bk-purple hover:underline"
                >
                  초기화하기
                </button>
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      </main>

      {/* Floating Action Menu Icon */}
      <div className="fixed bottom-8 left-8 w-12 h-12 bg-bk-purple text-white rounded-full flex items-center justify-center font-bold text-lg shadow-xl shadow-bk-purple/30 cursor-pointer hover:scale-110 transition-transform active:scale-95 z-50">
        N
      </div>
    </div>
  );
};

export default App;
