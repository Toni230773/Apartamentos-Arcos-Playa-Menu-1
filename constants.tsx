import React from 'react';
import { 
  Utensils, Coffee, Wine, IceCream, Pizza, Search, Globe, X, Download, Menu as MenuIcon, 
  Salad, Sandwich, Drumstick, Martini, Citrus, Flame, WheatOff, Leaf, Carrot, Zap, Feather, Candy,
  Croissant
} from 'lucide-react';
import { MenuItem, CategoryTranslation, Translation, Language, ItemTag } from './types';

export const UI_TRANSLATIONS: Record<Language, Translation> = {
  en: {
    title: 'Arcos Playa Menu',
    searchPlaceholder: 'Search for cocktails, dishes...',
    allCategories: 'All',
    price: 'Price',
    ingredients: 'Ingredients',
    close: 'Close',
    downloadPdf: 'Download Menu',
    noResults: 'No items found',
    currency: '€',
    preparation: 'Preparation',
    garnish: 'Garnish',
    intensity: 'Intensity',
    flavor: 'Flavor Profile',
    glassType: 'Glass',
    bartenderNotes: 'Bartender Notes',
    addNotes: 'Add bartender notes...',
    soft: 'Soft',
    medium: 'Medium',
    strong: 'Strong',
    allergens: 'Allergens'
  },
  es: {
    title: 'Menú Arcos Playa',
    searchPlaceholder: 'Buscar cócteles, platos...',
    allCategories: 'Todos',
    price: 'Precio',
    ingredients: 'Ingredientes',
    close: 'Cerrar',
    downloadPdf: 'Descargar Menú',
    noResults: 'No se encontraron artículos',
    currency: '€',
    preparation: 'Preparación',
    garnish: 'Decoración',
    intensity: 'Intensidad',
    flavor: 'Perfil de Sabor',
    glassType: 'Vaso',
    bartenderNotes: 'Notas del Bartender',
    addNotes: 'Añadir notas...',
    soft: 'Suave',
    medium: 'Medio',
    strong: 'Fuerte',
    allergens: 'Alérgenos'
  },
  de: {
    title: 'Arcos Playa Menü',
    searchPlaceholder: 'Cocktails, Gerichte suchen...',
    allCategories: 'Alle',
    price: 'Preis',
    ingredients: 'Zutaten',
    close: 'Schließen',
    downloadPdf: 'Menü herunterladen',
    noResults: 'Keine Artikel gefunden',
    currency: '€',
    preparation: 'Zubereitung',
    garnish: 'Garnitur',
    intensity: 'Intensität',
    flavor: 'Geschmacksprofil',
    glassType: 'Glas',
    bartenderNotes: 'Barkeeper Notizen',
    addNotes: 'Notizen hinzufügen...',
    soft: 'Leicht',
    medium: 'Mittel',
    strong: 'Stark',
    allergens: 'Allergene'
  },
  fr: {
    title: 'Menu Arcos Playa',
    searchPlaceholder: 'Rechercher cocktails, plats...',
    allCategories: 'Tout',
    price: 'Prix',
    ingredients: 'Ingrédients',
    close: 'Fermer',
    downloadPdf: 'Télécharger le menu',
    noResults: 'Aucun article trouvé',
    currency: '€',
    preparation: 'Préparation',
    garnish: 'Garniture',
    intensity: 'Intensité',
    flavor: 'Profil de saveur',
    glassType: 'Verre',
    bartenderNotes: 'Notes du Barman',
    addNotes: 'Ajouter des notes...',
    soft: 'Doux',
    medium: 'Moyen',
    strong: 'Fort',
    allergens: 'Allergènes'
  },
  it: {
    title: 'Menu Arcos Playa',
    searchPlaceholder: 'Cerca cocktail, piatti...',
    allCategories: 'Tutti',
    price: 'Prezzo',
    ingredients: 'Ingredienti',
    close: 'Chiudere',
    downloadPdf: 'Scarica Menu',
    noResults: 'Nessun articolo trovato',
    currency: '€',
    preparation: 'Preparazione',
    garnish: 'Guarnizione',
    intensity: 'Intensità',
    flavor: 'Profilo di sapore',
    glassType: 'Bicchiere',
    bartenderNotes: 'Note del Barista',
    addNotes: 'Aggiungi note...',
    soft: 'Leggero',
    medium: 'Medio',
    strong: 'Forte',
    allergens: 'Allergeni'
  }
};

// --- TAGS HELPER ---
export const TAG_INFO: Record<ItemTag, { icon: React.ReactNode; label: string; color: string }> = {
  spicy: { icon: <Flame size={14} />, label: 'Spicy', color: 'text-red-500' },
  gluten_free: { icon: <WheatOff size={14} />, label: 'Gluten Free', color: 'text-amber-500' },
  vegan: { icon: <Leaf size={14} />, label: 'Vegan', color: 'text-green-500' },
  vegetarian: { icon: <Carrot size={14} />, label: 'Vegetarian', color: 'text-lime-500' },
  sweet: { icon: <Candy size={14} />, label: 'Sweet', color: 'text-pink-400' },
  citrus: { icon: <Citrus size={14} />, label: 'Citrus', color: 'text-yellow-400' },
  strong: { icon: <Zap size={14} />, label: 'Strong', color: 'text-purple-500' },
  low_cal: { icon: <Feather size={14} />, label: 'Low Cal', color: 'text-cyan-400' },
};

export const CATEGORY_NAMES: CategoryTranslation[] = [
  // --- A) BEBIDAS Y CÓCTELES ---
  { id: 'cocktails_classic', en: 'Classic Cocktails', es: 'Cócteles Clásicos', de: 'Klassische Cocktails', fr: 'Cocktails Classiques', it: 'Cocktail Classici' },
  { id: 'cocktails_signature', en: 'Signature Cocktails', es: 'Cócteles de Autor', de: 'Signature Cocktails', fr: 'Cocktails Signature', it: 'Cocktail d\'Autore' },
  { id: 'alcohol_free', en: 'Alcohol Free', es: 'Sin Alcohol', de: 'Alkoholfrei', fr: 'Sans Alcool', it: 'Analcolici' },
  { id: 'smoothies', en: 'Smoothies & Refreshers', es: 'Smoothies y Refrescos', de: 'Smoothies & Erfrischungen', fr: 'Smoothies & Rafraîchissements', it: 'Frullati e Bibite' },
  { id: 'premium_drinks', en: 'Premium Drinks', es: 'Copas Premium', de: 'Premium Drinks', fr: 'Boissons Premium', it: 'Bevande Premium' },
  { id: 'aperitifs', en: 'Aperitifs & More', es: 'Aperitivos y Más', de: 'Aperitifs & Mehr', fr: 'Apéritifs & Plus', it: 'Aperitivi e Altro' },

  // --- B) COMIDA ---
  { id: 'breakfast', en: 'Breakfast', es: 'Desayunos', de: 'Frühstück', fr: 'Petit Déjeuner', it: 'Colazione' },
  { id: 'starters', en: 'Starters', es: 'Entrantes', de: 'Vorspeisen', fr: 'Entrées', it: 'Antipasti' },
  { id: 'salads', en: 'Salads', es: 'Ensaladas', de: 'Salate', fr: 'Salades', it: 'Insalate' },
  { id: 'mains', en: 'Main Courses', es: 'Platos Principales', de: 'Hauptgerichte', fr: 'Plats Principaux', it: 'Piatti Principali' },
  { id: 'burgers', en: 'Burgers & Sandwiches', es: 'Hamburguesas y Sandwiches', de: 'Burger & Sandwiches', fr: 'Burgers & Sandwichs', it: 'Hamburger e Panini' },
  { id: 'meats', en: 'Meats', es: 'Carnes', de: 'Fleischgerichte', fr: 'Viandes', it: 'Carni' },
  { id: 'fish', en: 'Fish & Seafood', es: 'Pescados y Mariscos', de: 'Fisch & Meeresfrüchte', fr: 'Poissons et Fruits de Mer', it: 'Pesce e Frutti di Mare' },
  { id: 'pasta', en: 'Pasta', es: 'Pasta', de: 'Nudeln', fr: 'Pâtes', it: 'Pasta' },
  { id: 'desserts', en: 'Desserts', es: 'Postres', de: 'Desserts', fr: 'Desserts', it: 'Dolci' },
  { id: 'vegetarian', en: 'Vegetarian Options', es: 'Opciones Vegetarianas', de: 'Vegetarische Optionen', fr: 'Options Végétariennes', it: 'Opzioni Vegetariane' },
  { id: 'children', en: 'Children Menu', es: 'Menú Infantil', de: 'Kindermenü', fr: 'Menu Enfant', it: 'Menu Bambini' },
];

// Helper to get category icon
export const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'cocktails_classic': return <Martini size={18} />;
    case 'cocktails_signature': return <Flame size={18} />;
    case 'alcohol_free': return <Wine size={18} className="opacity-50" />;
    case 'smoothies': return <IceCream size={18} />;
    case 'premium_drinks': return <Wine size={18} />;
    case 'aperitifs': return <Wine size={18} />;
    
    case 'breakfast': return <Croissant size={18} />;
    case 'starters': return <Utensils size={18} />;
    case 'salads': return <Salad size={18} />;
    case 'mains': return <Utensils size={18} />;
    case 'burgers': return <Sandwich size={18} />;
    case 'meats': return <Drumstick size={18} />;
    case 'fish': return <Utensils size={18} />;
    case 'pasta': return <Pizza size={18} />;
    case 'desserts': return <IceCream size={18} />;
    case 'vegetarian': return <Carrot size={18} />;
    case 'children': return <IceCream size={18} />;
    default: return <Utensils size={18} />;
  }
};

export const MENU_ITEMS: MenuItem[] = [
  // --- A) COCKTAILS ---
  { 
    id: '60', 
    categoryId: 'cocktails_classic', 
    name: 'Mojito', 
    price: 8.00, 
    imageSeed: 701,
    glassType: 'Highball',
    intensity: 'Medium',
    tags: ['citrus', 'sweet'],
    ingredientsText: {
      es: 'Ron, hierbabuena, azúcar, lima, soda',
      en: 'Rum, mint, sugar, lime, soda',
      de: 'Rum, Minze, Zucker, Limette, Soda',
      fr: 'Rhum, menthe, sucre, citron vert, soda',
      it: 'Rum, menta, zucchero, lime, soda'
    },
    description: {
      en: 'A refreshing Cuban classic.',
      es: 'Un clásico cubano refrescante.'
    }
  },
  { 
    id: '63', 
    categoryId: 'cocktails_classic', 
    name: 'Margarita Fresa', 
    price: 7.50, 
    imageSeed: 704, 
    glassType: 'Margarita', 
    intensity: 'Strong', 
    tags: ['citrus', 'strong'],
    ingredientsText: {
      es: 'Tequila, triple sec, zumo de lima, fresa',
      en: 'Tequila, triple sec, lime juice, strawberry'
    }
  },
  { 
    id: '64', 
    categoryId: 'cocktails_classic', 
    name: 'Caipiriña', 
    price: 6.50, 
    imageSeed: 705, 
    glassType: 'Old Fashioned', 
    intensity: 'Strong',
    tags: ['citrus', 'strong'],
    ingredientsText: {
      es: 'Cachaça, lima, azúcar',
      en: 'Cachaça, lime, sugar'
    }
  },
  { 
    id: '65', 
    categoryId: 'cocktails_signature', 
    name: 'Piña Colada', 
    price: 7.00, 
    imageSeed: 706, 
    glassType: 'Hurricane', 
    intensity: 'Soft',
    tags: ['sweet'],
    ingredientsText: {
      es: 'Ron, crema de coco, zumo de piña',
      en: 'Rum, coconut cream, pineapple juice'
    }
  },
  
  // --- B) FOOD ---
  { 
    id: '200', 
    categoryId: 'salads', 
    name: 'Mediterranean Salad', 
    price: 11.00, 
    imageSeed: 301,
    tags: ['vegetarian', 'gluten_free'],
    ingredientsText: {
      es: 'Lechuga, tomate, pepino, aceitunas, queso feta',
      en: 'Lettuce, tomato, cucumber, olives, feta cheese',
      de: 'Salat, Tomate, Gurke, Oliven, Feta-Käse',
      fr: 'Laitue, tomate, concombre, olives, feta',
      it: 'Lattuga, pomodoro, cetriolo, olive, feta'
    }
  },
  { 
    id: '1', 
    categoryId: 'starters', 
    name: 'Roman squid', 
    price: 7.50, 
    imageSeed: 101,
    tags: [],
    ingredientsText: {
      en: 'Fried squid rings with lemon',
      es: 'Anillas de calamar fritas con limón'
    }
  },
  { 
    id: '2', 
    categoryId: 'starters', 
    name: 'Spicy potatoes', 
    price: 5.50, 
    imageSeed: 102,
    tags: ['spicy', 'vegetarian'],
    ingredientsText: {
       en: 'Fried potatoes with spicy sauce',
       es: 'Patatas fritas con salsa brava'
    }
  },
  {
    id: '40',
    categoryId: 'burgers',
    name: 'Cheese Burger + Chips',
    price: 6.50,
    imageSeed: 501,
    tags: [],
    ingredientsText: {
       en: 'Lettuce, tomato, onion, cheese, beef patty',
       es: 'Lechuga, tomate, cebolla, queso, carne de ternera'
    }
  },
  {
    id: '50',
    categoryId: 'children',
    name: 'Chicken Nuggets',
    price: 5.50,
    imageSeed: 601,
    ingredientsText: {
      en: 'Chicken nuggets with chips',
      es: 'Nuggets de pollo con patatas'
    }
  },
  {
     id: '22',
     categoryId: 'salads',
     name: 'Tuna Salad',
     price: 9.00,
     imageSeed: 303,
     tags: ['low_cal'],
     ingredientsText: {
        en: 'Tomato, tuna, oregano',
        es: 'Tomate, atún, orégano'
     }
  }
];