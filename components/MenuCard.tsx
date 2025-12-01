import React from 'react';
import { MenuItem, Translation, Language } from '../types';
import { Plus, Wine } from 'lucide-react';
import { TAG_INFO } from '../constants';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
  translations: Translation;
  currentLang: Language; // Added to select correct text
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onClick, translations, currentLang }) => {
  const imageUrl = item.customImage || `https://picsum.photos/seed/${item.imageSeed}/400/300`;

  // Get localized text or fallback to English, then Spanish
  const description = item.description?.[currentLang] || item.description?.['en'] || item.description?.['es'];
  const ingredients = item.ingredientsText?.[currentLang] || item.ingredientsText?.['en'] || item.ingredientsText?.['es'];
  
  // Use ingredients as description if description is missing (as per user examples)
  const displaySafeText = description || ingredients;

  return (
    <div 
      onClick={() => onClick(item)}
      className="group bg-neutral-800 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-bar-gold/10 transition-all duration-300 border border-neutral-700 overflow-hidden cursor-pointer flex flex-col h-full card-break relative"
    >
      {/* Image Area */}
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
             <span className="text-black text-xs font-bold bg-bar-gold px-4 py-1.5 rounded-full uppercase tracking-wider">
                View Details
             </span>
        </div>
        
        {/* Glass Type Badge */}
        {item.glassType && (
           <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm p-1.5 rounded-full text-bar-gold border border-white/10" title={item.glassType}>
              <Wine size={14} />
           </div>
        )}

        {/* Tags Overlay (Top Left) */}
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
             {item.tags.map(tag => {
                const info = TAG_INFO[tag];
                if (!info) return null;
                return (
                  <div key={tag} className="bg-black/70 backdrop-blur-sm p-1.5 rounded-full text-white border border-white/10" title={info.label}>
                     <div className={info.color}>{info.icon}</div>
                  </div>
                );
             })}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-bold text-neutral-100 leading-tight group-hover:text-bar-gold transition-colors">
            {item.name}
          </h3>
          <span className="font-sans text-lg font-bold text-bar-gold whitespace-nowrap ml-2">
            {item.price.toFixed(2)}€
          </span>
        </div>
        
        {displaySafeText && (
          <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-grow font-light">
            {displaySafeText}
          </p>
        )}
        
        <div className="mt-auto pt-4 border-t border-neutral-700 flex justify-between items-center text-xs text-neutral-500 uppercase tracking-wide">
           <span className="no-print group-hover:text-neutral-300 transition-colors">Tap for info</span>
           <div className="flex items-center gap-2">
             {item.intensity && (
                <div className="flex gap-0.5 mr-2">
                   {[1, 2, 3].map(i => {
                      let active = false;
                      if (item.intensity === 'Soft' && i === 1) active = true;
                      if (item.intensity === 'Medium' && i <= 2) active = true;
                      if (item.intensity === 'Strong') active = true;
                      return (
                        <div key={i} className={`w-1 h-3 rounded-full ${active ? 'bg-bar-gold' : 'bg-neutral-700'}`}></div>
                      );
                   })}
                </div>
             )}
             <Plus size={16} className="text-bar-gold group-hover:rotate-90 transition-transform duration-300 no-print" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;