export interface ShopInfo {
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  hours: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  instagram: string;
  establishedYear: string;
}

export interface YouTubeVideoItem {
  id: string;
  videoId: string;
  title: string;
  category: string;
  description: string;
  duration?: string;
  url: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kumbh & Spiritual' | 'Weddings & Celebrations' | 'Studio Portraits' | 'Frames & Canvas' | 'Haldi & Mehendi' | string;
  imageUrl: string;
  location: string;
  description: string;
  featured?: boolean;
  instagramUrl?: string;
}

export interface StudioService {
  id: string;
  title: string;
  hindiTitle?: string;
  description: string;
  highlights: string[];
  icon: string;
  startingPrice?: string;
  popular?: boolean;
}

export interface StudioPackage {
  id: string;
  name: string;
  tagline: string;
  price?: string;
  originalPrice?: string;
  popular?: boolean;
  features: string[];
  deliverables: string[];
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  occasion: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface PrintSizeOption {
  size: string;
  dimensions: string;
  basePrice?: number;
  description: string;
}

export interface FrameTypeOption {
  type: string;
  name: string;
  multiplier?: number;
  description: string;
}
