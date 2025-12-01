import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import MenuCard from './components/MenuCard';
import ProductModal from './components/ProductModal';
import { UI_TRANSLATIONS, CATEGORY_NAMES, MENU_ITEMS } from './constants';
import { Language, MenuItem } from './types';
import { Utensils, Wine, Coffee } from 'lucide-react';

function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize items from constant, but keep in state to allow editing
  const [items, setItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const t = UI_TRANSLATIONS[currentLang];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      const query = searchQuery.toLowerCase();
      
      const currentName = item.name.toLowerCase();
      // Search in current language description/ingredients if available, or fallback to english/any
      const currentDesc = (item.description?.[currentLang] || item.description?.['en'] || '').toLowerCase();
      const currentIng = (item.ingredientsText?.[currentLang] || item.ingredientsText?.['en'] || '').toLowerCase();

      const matchesSearch = 
        currentName.includes(query) || 
        currentDesc.includes(query) ||
        currentIng.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery, currentLang]);

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateItem = (updatedItem: MenuItem) => {
    setItems((prevItems) => 
      prevItems.map((item) => item.id === updatedItem.id ? updatedItem : item)
    );
    // Also update the selected item so the modal reflects changes immediately
    setSelectedItem(updatedItem);
  };

  const handleAddItem = (type: 'meal' | 'cocktail' | 'drink') => {
    let categoryId = 'starters';
    let defaultPrice = 10.00;
    let imageSeed = Math.floor(Math.random() * 10000);
    let name = 'New Dish';

    if (type === 'cocktail') {
      categoryId = 'cocktails_classic';
      defaultPrice = 8.00;
      name = 'New Cocktail';
    } else if (type === 'drink') {
      categoryId = 'premium_drinks';
      defaultPrice = 4.00;
      name = 'New Drink';
    } else {
       name = 'New Meal';
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      categoryId,
      name: name,
      price: defaultPrice,
      imageSeed,
      description: {
          en: 'Click to edit description',
          es: 'Clic para editar descripción'
      },
      ingredientsText: {
          en: '',
          es: ''
      },
      tags: []
    };

    setItems([newItem, ...items]);
    setActiveCategory(categoryId); // Switch view to the new category
    setSelectedItem(newItem); // Open modal immediately
  };

  return (
    <div className="min-h-screen bg-neutral-900 pb-20">
      
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        translations={t}
        onPrint={handlePrint}
      />

      <CategoryFilter
        categories={CATEGORY_NAMES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currentLang={currentLang}
        allLabel={t.allCategories}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Admin Toolbar */}
        <div className="mb-8 flex flex-wrap gap-4 no-print justify-center sm:justify-start">
           <button 
              onClick={() => handleAddItem('meal')}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-bar-gold hover:text-black text-white px-5 py-3 rounded-lg font-bold transition-all border border-neutral-700 shadow-lg"
           >
              <Utensils size={18} />
              <span>Add Meal</span>
           </button>
           <button 
              onClick={() => handleAddItem('cocktail')}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-bar-gold hover:text-black text-white px-5 py-3 rounded-lg font-bold transition-all border border-neutral-700 shadow-lg"
           >
              <Wine size={18} />
              <span>Add Cocktail</span>
           </button>
           <button 
              onClick={() => handleAddItem('drink')}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-bar-gold hover:text-black text-white px-5 py-3 rounded-lg font-bold transition-all border border-neutral-700 shadow-lg"
           >
              <Coffee size={18} />
              <span>Add Drink</span>
           </button>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center no-print border-b border-neutral-800 pb-4">
          <h2 className="text-2xl font-serif font-bold text-bar-gold">
            {activeCategory === 'all' 
              ? t.allCategories 
              : CATEGORY_NAMES.find(c => c.id === activeCategory)?.[currentLang]}
          </h2>
          <span className="text-sm text-neutral-400 font-medium bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
            {filteredItems.length} items
          </span>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onClick={setSelectedItem}
                translations={t}
                currentLang={currentLang}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-neutral-800 p-6 rounded-full mb-4 text-bar-gold">
               <span className="text-4xl">🍸</span>
             </div>
            <h3 className="text-xl font-bold text-neutral-300 mb-2">{t.noResults}</h3>
            <p className="text-neutral-500">Try adjusting your search or filter.</p>
          </div>
        )}
      </main>

      {/* Print View Only (Hidden by default, shown on print) */}
      <div className="hidden print-only p-8 bg-white text-black">
         <h1 className="text-3xl font-serif font-bold text-center mb-8">Apartamentos Arcos Playa Menu</h1>
         <div className="space-y-8">
            {CATEGORY_NAMES.map(cat => {
               const catItems = filteredItems.filter(i => i.categoryId === cat.id);
               if (catItems.length === 0) return null;
               return (
                  <div key={cat.id} className="break-inside-avoid">
                     <h2 className="text-xl font-bold border-b border-black pb-2 mb-4 uppercase">{cat[currentLang]}</h2>
                     <div className="grid grid-cols-2 gap-4">
                        {catItems.map(item => (
                           <div key={item.id} className="flex justify-between items-start mb-2 break-inside-avoid">
                              <div className="pr-4">
                                 <div className="font-bold">{item.name}</div>
                                 <div className="text-xs text-gray-600">
                                    {item.description?.[currentLang] || item.description?.['en']}
                                 </div>
                              </div>
                              <div className="font-bold whitespace-nowrap">{item.price.toFixed(2)}€</div>
                           </div>
                        ))}
                     </div>
                  </div>
               )
            })}
         </div>
      </div>

      <ProductModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        translations={t}
        onUpdateItem={handleUpdateItem}
        currentLang={currentLang}
      />

      <footer className="bg-neutral-900 border-t border-neutral-800 mt-auto py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif text-bar-gold font-bold text-lg mb-2">Apartamentos Arcos Playa</p>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;