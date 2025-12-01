export type Language = 'en' | 'es' | 'de' | 'fr' | 'it';

export interface Translation {
  title: string;
  searchPlaceholder: string;
  allCategories: string;
  price: string;
  ingredients: string;
  close: string;
  downloadPdf: string;
  noResults: string;
  currency: string;
  preparation: string;
  garnish: string;
  intensity: string;
  flavor: string;
  glassType: string;
  bartenderNotes: string;
  addNotes: string;
  soft: string;
  medium: string;
  strong: string;
  allergens: string;
}

export interface CategoryTranslation {
  id: string;
  en: string;
  es: string;
  de: string;
  fr: string;
  it: string;
}

export type MultilingualString = {
  [key in Language]?: string;
};

export type ItemTag = 'spicy' | 'gluten_free' | 'vegan' | 'vegetarian' | 'sweet' | 'citrus' | 'strong' | 'low_cal';

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string; // Display name (can be mixed or primary language)
  
  // Multilingual Fields
  description?: MultilingualString; 
  ingredientsText?: MultilingualString; 
  
  price: number;
  imageSeed: number;
  customImage?: string; 
  
  // Details
  glassType?: string;
  preparationSteps?: string[]; // Keep simple for now, or make multilingual if needed later
  garnish?: string;
  intensity?: 'Soft' | 'Medium' | 'Strong';
  flavorProfile?: string[]; 
  bartenderNotes?: string;
  
  // New Fields
  allergens?: string[];
  tags?: ItemTag[];
}

export interface Category {
  id: string;
  icon: React.ReactNode;
}