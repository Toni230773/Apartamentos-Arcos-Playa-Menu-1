import React from 'react';
import { CategoryTranslation, Language } from '../types';
import { getCategoryIcon } from '../constants';

interface CategoryFilterProps {
  categories: CategoryTranslation[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  currentLang: Language;
  allLabel: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  currentLang,
  allLabel,
}) => {
  return (
    <div className="w-full bg-white shadow-sm sticky top-20 z-30 no-print border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex overflow-x-auto py-4 px-4 space-x-2 sm:space-x-4 scrollbar-hide">
          {/* 'All' Button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeCategory === 'all'
                ? 'bg-med-blue text-white border-med-blue shadow-md transform scale-105'
                : 'bg-white text-slate-600 border-gray-200 hover:border-med-gold hover:text-med-blue'
            }`}
          >
            <span>{allLabel}</span>
          </button>

          {/* Category Buttons */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.id
                  ? 'bg-med-blue text-white border-med-blue shadow-md transform scale-105'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-med-gold hover:text-med-blue'
              }`}
            >
              <span className={activeCategory === cat.id ? 'text-med-gold' : 'text-slate-400'}>
                  {getCategoryIcon(cat.id)}
              </span>
              <span>{cat[currentLang]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
