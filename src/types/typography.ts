export type FontPairId =
  | 'cormorant-montserrat'
  | 'playfair-inter'
  | 'cinzel-lato'
  | 'outfit-jakarta';

export interface FontPairOption {
  id: FontPairId;
  name: string;
  headlineFont: string;
  bodyFont: string;
  tagline: string;
  category: string;
  headlineSample: string;
  description: string;
}

export const FONT_PAIR_OPTIONS: FontPairOption[] = [
  {
    id: 'cormorant-montserrat',
    name: 'Cormorant Garamond + Montserrat',
    headlineFont: 'Cormorant Garamond',
    bodyFont: 'Montserrat',
    tagline: 'Fine-Art Atelier & Editorial Luxury (Default)',
    category: 'Haute Couture & Fine-Art',
    headlineSample: 'Timeless Masterpieces',
    description: 'A poetic, high-fashion aesthetic pairing lyrical Renaissance serifs with crisp, balanced geometric sans.',
  },
  {
    id: 'playfair-inter',
    name: 'Playfair Display + Inter',
    headlineFont: 'Playfair Display',
    bodyFont: 'Inter',
    tagline: 'Classic Haute Elegance & Modern Editorial',
    category: 'Vogue & Luxury Editorial',
    headlineSample: 'Visual Poetry & Elegance',
    description: 'High-contrast editorial serif headers paired with ultra-clean, Swiss-style neutral precision.',
  },
  {
    id: 'cinzel-lato',
    name: 'Cinzel + Lato',
    headlineFont: 'Cinzel',
    bodyFont: 'Lato',
    tagline: 'Royal Heritage & Sacred Inscriptions',
    category: 'Regal Inscriptions & Heritage',
    headlineSample: 'Sacred Rituals & Splendor',
    description: 'Majestic classical Roman stone-cut capitals grounded by a warm, legible humanist body typeface.',
  },
  {
    id: 'outfit-jakarta',
    name: 'Outfit + Plus Jakarta Sans',
    headlineFont: 'Outfit',
    bodyFont: 'Plus Jakarta Sans',
    tagline: 'Modern Geometric & Contemporary Studio',
    category: 'Modern Studio Precision',
    headlineSample: 'Contemporary Storytelling',
    description: 'Bold, architectural geometric headlines with fluid, tech-forward sans readability.',
  },
];
