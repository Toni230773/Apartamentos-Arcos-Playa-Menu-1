import React, { useRef, useState, useEffect } from 'react';
import { X, Camera, Download, Edit2, Check, Wine, AlignLeft, Info, List, PlusCircle } from 'lucide-react';
import { MenuItem, Translation, Language, ItemTag } from '../types';
import { CATEGORY_NAMES, TAG_INFO } from '../constants';
import html2canvas from 'html2canvas';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  translations: Translation;
  onUpdateItem: (item: MenuItem) => void;
  currentLang: Language;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose, translations, onUpdateItem, currentLang }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Edit States
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingIngredients, setIsEditingIngredients] = useState(false);
  const [isEditingCat, setIsEditingCat] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);

  // Temp Values
  const [tempPrice, setTempPrice] = useState<string>('');
  const [tempName, setTempName] = useState('');
  const [tempDesc, setTempDesc] = useState('');
  const [tempIngredients, setTempIngredients] = useState('');
  const [tempNotes, setTempNotes] = useState('');
  
  // Get localized text helper
  const getLocalizedText = (obj: any) => obj?.[currentLang] || obj?.['en'] || obj?.['es'] || '';

  // Reset states when item changes
  useEffect(() => {
    if (item) {
        setTempPrice(item.price.toString());
        setTempName(item.name);
        setTempDesc(getLocalizedText(item.description));
        setTempIngredients(getLocalizedText(item.ingredientsText));
        setTempNotes(item.bartenderNotes || '');
        
        setIsEditingPrice(false);
        setIsEditingName(false);
        setIsEditingDesc(false);
        setIsEditingIngredients(false);
        setIsEditingCat(false);
        setIsEditingNotes(false);
        setIsEditingTags(false);
    }
  }, [item, currentLang]);

  if (!isOpen || !item) return null;

  const imageUrl = item.customImage || `https://picsum.photos/seed/${item.imageSeed}/800/600`;

  const handleDownloadJpg = async () => {
    if (!modalRef.current) return;
    try {
      const canvas = await html2canvas(modalRef.current, {
        backgroundColor: '#1a1a1a',
        useCORS: true,
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `${item.name.replace(/\s+/g, '_')}_MenuCard.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Could not generate image. Default images might be blocked by browser security. Try uploading your own photo!");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateItem({ ...item, customImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // -- Save Handlers --
  const savePrice = () => {
    const newPrice = parseFloat(tempPrice);
    if (!isNaN(newPrice)) onUpdateItem({ ...item, price: newPrice });
    setIsEditingPrice(false);
  };

  const saveName = () => {
      if (tempName.trim()) onUpdateItem({ ...item, name: tempName });
      setIsEditingName(false);
  };

  const saveDesc = () => {
      // Update only current language
      const newDesc = { ...(item.description || {}), [currentLang]: tempDesc };
      onUpdateItem({ ...item, description: newDesc });
      setIsEditingDesc(false);
  };
  
  const saveIngredients = () => {
      // Update only current language
      const newIng = { ...(item.ingredientsText || {}), [currentLang]: tempIngredients };
      onUpdateItem({ ...item, ingredientsText: newIng });
      setIsEditingIngredients(false);
  };

  const saveCategory = (catId: string) => {
      onUpdateItem({ ...item, categoryId: catId });
      setIsEditingCat(false);
  };
  
  const saveNotes = () => {
      onUpdateItem({ ...item, bartenderNotes: tempNotes });
      setIsEditingNotes(false);
  };

  const toggleTag = (tag: ItemTag) => {
     const currentTags = item.tags || [];
     let newTags;
     if (currentTags.includes(tag)) {
        newTags = currentTags.filter(t => t !== tag);
     } else {
        newTags = [...currentTags, tag];
     }
     onUpdateItem({ ...item, tags: newTags });
  };

  // -- Helpers --
  const currentCategoryName = CATEGORY_NAMES.find(c => c.id === item.categoryId)?.[currentLang] || 'Unknown';
  
  const renderIntensity = (level?: 'Soft' | 'Medium' | 'Strong') => {
      if (!level) return null;
      const levels = ['Soft', 'Medium', 'Strong'];
      const currentIdx = levels.indexOf(level);
      
      return (
          <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">{translations.intensity}</span>
              <div className="flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                      <div 
                          key={i} 
                          className={`h-2 flex-1 rounded-sm transition-colors ${i <= currentIdx ? 'bg-bar-gold' : 'bg-neutral-800'}`}
                      />
                  ))}
              </div>
              <div className="flex justify-between text-[10px] text-neutral-500 uppercase mt-1">
                  <span>{translations.soft}</span>
                  <span>{translations.strong}</span>
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 no-print overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl bg-neutral-900 sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row max-h-[100vh] sm:max-h-[90vh] border border-neutral-800 overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md p-2 rounded-full text-white transition-colors"
          data-html2canvas-ignore
        >
          <X size={24} />
        </button>

        {/* --- LEFT SIDE: IMAGE --- */}
        <div className="w-full sm:w-2/5 relative shrink-0 h-64 sm:h-auto bg-black">
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-neutral-900" />
          
          {/* Controls */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2" data-html2canvas-ignore>
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="bg-black/60 hover:bg-bar-gold hover:text-black backdrop-blur-md px-3 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors w-fit"
             >
               <Camera size={14} /> Upload
             </button>
             <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
             
             <button 
               onClick={handleDownloadJpg}
               className="bg-black/60 hover:bg-bar-gold hover:text-black backdrop-blur-md px-3 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors w-fit"
             >
               <Download size={14} /> Save JPG
             </button>
          </div>
        </div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="w-full sm:w-3/5 p-6 sm:p-10 overflow-y-auto bg-neutral-900 flex flex-col text-neutral-200">
            
            {/* Header: Cat & Price */}
            <div className="flex justify-between items-start mb-6 border-b border-neutral-800 pb-4">
                 {/* Category */}
                 <div className="flex items-center gap-2">
                    {isEditingCat ? (
                        <div className="flex items-center gap-2" data-html2canvas-ignore>
                            <select 
                                value={item.categoryId}
                                onChange={(e) => saveCategory(e.target.value)}
                                className="bg-neutral-800 text-white text-sm p-1 rounded border border-neutral-600 focus:border-bar-gold outline-none"
                            >
                                {CATEGORY_NAMES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat[currentLang]}</option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <span 
                            onClick={() => setIsEditingCat(true)}
                            className="text-bar-gold uppercase tracking-widest text-xs font-bold cursor-pointer hover:text-white flex items-center gap-2"
                        >
                            {currentCategoryName} <Edit2 size={10} className="opacity-0 group-hover:opacity-100" />
                        </span>
                    )}
                 </div>

                 {/* Price */}
                 <div className="flex items-center gap-2">
                     {isEditingPrice ? (
                        <div className="flex items-center gap-1 bg-black/50 rounded border border-bar-gold/50 px-2" data-html2canvas-ignore>
                           <input 
                              type="number" 
                              step="0.10"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 bg-transparent text-white text-xl font-bold focus:outline-none text-right"
                              autoFocus
                           />
                           <span className="text-bar-gold font-bold">€</span>
                           <button onClick={savePrice} className="text-green-400 hover:text-green-300 ml-1"><Check size={16} /></button>
                        </div>
                      ) : (
                         <div className="text-3xl font-serif font-bold text-bar-gold cursor-pointer" onClick={() => setIsEditingPrice(true)}>
                            {item.price.toFixed(2)}€
                         </div>
                      )}
                 </div>
            </div>

            {/* Title */}
            <div className="mb-4">
                {isEditingName ? (
                    <div className="flex items-center gap-2 mb-2" data-html2canvas-ignore>
                        <input 
                            type="text" 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            className="w-full bg-black/60 text-white text-3xl font-serif font-bold border-b-2 border-bar-gold focus:outline-none py-1"
                            autoFocus
                        />
                        <button onClick={saveName} className="p-2 bg-bar-gold text-black rounded-full hover:bg-white"><Check size={20} /></button>
                    </div>
                ) : (
                    <h1 
                        className="text-4xl sm:text-5xl font-serif font-bold text-white leading-none cursor-pointer hover:text-gray-200" 
                        onClick={() => setIsEditingName(true)}
                    >
                        {item.name}
                    </h1>
                )}
            </div>

            {/* Tags Section */}
            <div className="mb-6 flex flex-wrap gap-2 items-center">
                 {item.tags?.map(tag => {
                     const info = TAG_INFO[tag];
                     if (!info) return null;
                     return (
                         <span key={tag} className={`flex items-center gap-1.5 px-3 py-1 bg-neutral-800 rounded-full text-xs uppercase tracking-wider text-neutral-300 border border-neutral-700 ${isEditingTags ? 'pr-1' : ''}`}>
                             <span className={info.color}>{info.icon}</span> 
                             {info.label}
                             {isEditingTags && <button onClick={() => toggleTag(tag)} className="ml-1 text-red-400"><X size={12}/></button>}
                         </span>
                     );
                 })}
                 
                 <button 
                    onClick={() => setIsEditingTags(!isEditingTags)} 
                    className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-xs uppercase tracking-wider text-bar-gold border border-dashed border-neutral-600 transition-colors"
                    data-html2canvas-ignore
                 >
                     <PlusCircle size={12} /> {isEditingTags ? 'Done' : 'Tags'}
                 </button>
            </div>

            {/* Tag Selection Dropdown (Only when editing tags) */}
            {isEditingTags && (
                <div className="mb-6 p-4 bg-black/30 rounded-lg grid grid-cols-2 gap-2" data-html2canvas-ignore>
                    {Object.entries(TAG_INFO).map(([key, info]) => (
                        <button 
                            key={key}
                            onClick={() => toggleTag(key as ItemTag)}
                            className={`flex items-center gap-2 px-3 py-2 rounded text-xs uppercase font-bold transition-all ${
                                item.tags?.includes(key as ItemTag) 
                                ? 'bg-bar-gold text-black' 
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                            }`}
                        >
                            {info.icon} {info.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Layout Grid for Details */}
            <div className="grid grid-cols-1 gap-8 mb-8">
                
                {/* Description (Multilingual) */}
                <div>
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-neutral-500 uppercase tracking-widest">
                            Info ({currentLang})
                        </h3>
                        {!isEditingDesc && (
                           <button onClick={() => setIsEditingDesc(true)} className="text-neutral-600 hover:text-bar-gold" data-html2canvas-ignore>
                              <Edit2 size={12} />
                           </button>
                        )}
                     </div>
                     {isEditingDesc ? (
                        <div className="flex gap-2" data-html2canvas-ignore>
                           <textarea 
                              value={tempDesc}
                              onChange={(e) => setTempDesc(e.target.value)}
                              className="w-full bg-neutral-800 text-neutral-300 text-sm p-2 rounded"
                           />
                           <button onClick={saveDesc} className="bg-bar-gold text-black p-2 rounded h-fit"><Check size={16}/></button>
                        </div>
                     ) : (
                        <p className="text-neutral-300 font-light text-lg italic">
                           {getLocalizedText(item.description) || "No description available."}
                        </p>
                     )}
                </div>

                {/* Ingredients (Multilingual) */}
                <div>
                     <div className="flex justify-between items-center mb-2 border-b border-neutral-800 pb-2">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-bar-gold uppercase tracking-widest">
                            <List size={14} /> {translations.ingredients} ({currentLang})
                        </h3>
                        {!isEditingIngredients && (
                           <button onClick={() => setIsEditingIngredients(true)} className="text-neutral-600 hover:text-bar-gold" data-html2canvas-ignore>
                              <Edit2 size={12} />
                           </button>
                        )}
                     </div>
                     
                     {isEditingIngredients ? (
                        <div className="flex gap-2" data-html2canvas-ignore>
                           <textarea 
                              value={tempIngredients}
                              onChange={(e) => setTempIngredients(e.target.value)}
                              className="w-full bg-neutral-800 text-neutral-300 text-sm p-2 rounded"
                              rows={4}
                           />
                           <button onClick={saveIngredients} className="bg-bar-gold text-black p-2 rounded h-fit"><Check size={16}/></button>
                        </div>
                     ) : (
                        <p className="text-neutral-300 text-sm leading-relaxed">
                            {getLocalizedText(item.ingredientsText) || "No ingredients listed."}
                        </p>
                     )}
                </div>

                {/* Preparation & Details */}
                <div className="grid grid-cols-2 gap-4">
                    {item.glassType && (
                         <div>
                             <span className="text-xs text-neutral-500 uppercase block mb-1">{translations.glassType}</span>
                             <span className="flex items-center gap-2 text-white"><Wine size={14} /> {item.glassType}</span>
                         </div>
                    )}
                    {renderIntensity(item.intensity)}
                </div>
            </div>

            {/* Bartender Notes (Editable) */}
            <div className="mt-auto bg-neutral-800/50 p-4 rounded-xl border border-neutral-800">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        <Info size={12} /> {translations.bartenderNotes}
                    </h3>
                    {!isEditingNotes && (
                        <button onClick={() => setIsEditingNotes(true)} className="text-neutral-600 hover:text-bar-gold" data-html2canvas-ignore>
                            <Edit2 size={12} />
                        </button>
                    )}
                 </div>
                 
                 {isEditingNotes ? (
                     <div data-html2canvas-ignore>
                         <textarea 
                             value={tempNotes}
                             onChange={(e) => setTempNotes(e.target.value)}
                             className="w-full bg-neutral-900 text-neutral-300 text-sm p-3 rounded border border-neutral-700 focus:border-bar-gold outline-none min-h-[80px]"
                             placeholder={translations.addNotes}
                             autoFocus
                         />
                         <div className="flex justify-end gap-2 mt-2">
                             <button onClick={() => setIsEditingNotes(false)} className="px-3 py-1 text-xs text-neutral-400">Cancel</button>
                             <button onClick={saveNotes} className="px-3 py-1 text-xs bg-bar-gold text-black font-bold rounded">Save</button>
                         </div>
                     </div>
                 ) : (
                     <p className="text-sm text-neutral-400 italic font-light">
                        {item.bartenderNotes || <span className="opacity-30">{translations.addNotes}</span>}
                     </p>
                 )}
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-800" data-html2canvas-ignore>
                <button 
                  onClick={onClose}
                  className="w-full bg-neutral-800 text-neutral-300 py-4 rounded-lg font-bold hover:bg-neutral-700 hover:text-white transition-colors uppercase tracking-widest text-sm"
               >
                  {translations.close}
               </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ProductModal;