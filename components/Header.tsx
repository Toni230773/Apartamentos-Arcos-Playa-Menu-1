import React, { useState } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { Language, Translation } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  translations: Translation;
  onPrint: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

const Header: React.FC<HeaderProps> = ({ 
  currentLang, 
  onLanguageChange, 
  searchQuery, 
  onSearchChange,
  translations,
  onPrint
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-med-blue text-white shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
             <div className="bg-med-gold p-2 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-med-blue">
                   <path d="M3 21h18"/>
                   <path d="M5 21V7a8 8 0 0 1 14 0v14"/>
                   <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
                </svg>
             </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                ARCOS PLAYA
              </h1>
              <p className="text-xs text-med-gold font-light tracking-widest uppercase hidden sm:block">
                Apartamentos & Restaurante
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden sm:flex flex-1 max-w-lg mx-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-med-gold transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:ring-2 focus:ring-med-gold sm:text-sm transition-all"
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
             {/* Print Button */}
             <button 
                onClick={onPrint} 
                className="hidden lg:flex items-center gap-2 text-sm text-gray-300 hover:text-med-gold transition-colors"
             >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                   <polyline points="7 10 12 15 17 10"/>
                   <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {translations.downloadPdf}
             </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none"
              >
                <Globe className="h-5 w-5" />
                <span className="uppercase">{currentLang}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 text-slate-800">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm hover:bg-med-sand ${
                        currentLang === lang.code ? 'font-bold text-med-blue' : ''
                      }`}
                    >
                      <span className="mr-2 text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Only visible on small screens) */}
        <div className="sm:hidden pb-4">
           <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-med-gold sm:text-sm"
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
