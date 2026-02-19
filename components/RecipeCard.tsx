
import React from 'react';
import { Eye, MessageCircle, Heart } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
      {/* Card Header/Gradient */}
      <div className={`${recipe.gradientClass} h-44 p-6 relative flex flex-col justify-between`}>
        <div className="flex gap-2">
          <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-md text-[10px] font-bold">
            {recipe.category}
          </span>
          <span className="bg-bk-mint text-slate-900 px-3 py-1 rounded-md text-[10px] font-bold">
            {recipe.difficulty}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg leading-snug group-hover:translate-x-1 transition-transform duration-300">
          {recipe.title}
        </h3>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={recipe.author.avatar} 
              alt={recipe.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-100"
            />
            <span className="text-xs font-medium text-slate-700">{recipe.author.name}</span>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition-colors">
            <div className="flex items-center gap-1 text-[11px]">
              <Eye size={14} />
              <span>{recipe.views}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <MessageCircle size={14} />
              <span>{recipe.comments}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] group-hover:text-rose-500 transition-colors">
              <Heart size={14} />
              <span>{recipe.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;