import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ShopInfo } from './types/studio';
import { FontPairId } from './types/typography';
import {
  defaultShopInfo,
  studioServices,
  galleryItems,
  studioPackages,
} from './data/studioData';
import { StudioNavbar } from './components/studio/StudioNavbar';
import { StudioHero } from './components/studio/StudioHero';
import { YouTubeShowcase } from './components/studio/YouTubeShowcase';
import { InstagramProfileBanner } from './components/studio/InstagramProfileBanner';
import { StudioServices } from './components/studio/StudioServices';
import { StudioGallery } from './components/studio/StudioGallery';
import { PrintEstimator } from './components/studio/PrintEstimator';
import { StudioPackages } from './components/studio/StudioPackages';
import { StudioAbout } from './components/studio/StudioAbout';
import { StudioContact } from './components/studio/StudioContact';
import { StudioFooter } from './components/studio/StudioFooter';
import { ShopSettingsModal } from './components/studio/ShopSettingsModal';

export default function App() {
  // Brand typography font pairing (Default: Playfair Display + Inter per user request)
  const [fontPair, setFontPair] = useState<FontPairId>(() => {
    try {
      const saved = localStorage.getItem('smriti_font_pair') as FontPairId;
      if (
        saved &&
        ['playfair-inter', 'cinzel-lato', 'outfit-jakarta'].includes(saved)
      ) {
        return saved;
      }
      return 'playfair-inter';
    } catch {
      return 'playfair-inter';
    }
  });

  // Apply font attribute immediately to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-font', fontPair);
    try {
      localStorage.setItem('smriti_font_pair', fontPair);
    } catch (e) {
      console.warn('Failed to save font pair', e);
    }
  }, [fontPair]);

  // Load shop info from localStorage or use defaults
  const [shopInfo, setShopInfo] = useState<ShopInfo>(() => {
    try {
      const saved = localStorage.getItem('smriti_shop_info_v5') || localStorage.getItem('smriti_shop_info_v4') || localStorage.getItem('smriti_shop_info_v3') || localStorage.getItem('smriti_shop_info_v2') || localStorage.getItem('smriti_shop_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If it was the old placeholder number or address, upgrade to user's real location & phone
        if (parsed.phone?.includes('94520') || parsed.address?.includes('Shop No. 12') || parsed.email?.includes('surajk220299')) {
          return {
            ...parsed,
            phone: defaultShopInfo.phone,
            whatsapp: defaultShopInfo.whatsapp,
            address: defaultShopInfo.address,
            city: defaultShopInfo.city,
            state: defaultShopInfo.state,
            email: defaultShopInfo.email,
            instagram: defaultShopInfo.instagram,
            tagline: defaultShopInfo.tagline,
            youtubeVideoId: defaultShopInfo.youtubeVideoId,
            youtubeUrl: defaultShopInfo.youtubeUrl,
          };
        }
        parsed.tagline = defaultShopInfo.tagline;
        if (!parsed.email || parsed.email.includes('surajk220299')) {
          parsed.email = defaultShopInfo.email;
        }
        if (!parsed.instagram) {
          parsed.instagram = defaultShopInfo.instagram;
        }
        if (!parsed.youtubeVideoId || parsed.youtubeVideoId === '3J2LdMhqS5U') {
          parsed.youtubeVideoId = defaultShopInfo.youtubeVideoId;
          parsed.youtubeUrl = defaultShopInfo.youtubeUrl;
        }
        return parsed;
      }
      return defaultShopInfo;
    } catch {
      return defaultShopInfo;
    }
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedInquiryService, setSelectedInquiryService] = useState('Cinematic Wedding & Pre-Wedding Film');

  // Persist shop details changes
  useEffect(() => {
    try {
      localStorage.setItem('smriti_shop_info_v5', JSON.stringify(shopInfo));
      localStorage.setItem('smriti_shop_info_v4', JSON.stringify(shopInfo));
      localStorage.setItem('smriti_shop_info_v3', JSON.stringify(shopInfo));
      localStorage.setItem('smriti_shop_info_v2', JSON.stringify(shopInfo));
      localStorage.setItem('smriti_shop_info', JSON.stringify(shopInfo));
    } catch (e) {
      console.warn('Failed to save shop info to localStorage', e);
    }
  }, [shopInfo]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClick = (serviceName?: string) => {
    if (serviceName) {
      setSelectedInquiryService(serviceName);
    }
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#C5CAD6] selection:bg-[#E5A93C] selection:text-[#0B0C0E] transition-colors">
      {/* 1. Studio Header & Navigation */}
      <StudioNavbar
        shopInfo={shopInfo}
        onOpenSettings={() => setSettingsOpen(true)}
        onBookClick={() => handleBookClick()}
        fontPair={fontPair}
        onSelectFontPair={setFontPair}
      />

      {/* 2. Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <StudioHero
          shopInfo={shopInfo}
          onBookClick={() => handleBookClick()}
          onExploreGallery={() => scrollToSection('gallery')}
        />

        {/* Featured YouTube Channel Showcase (User's Video) */}
        <YouTubeShowcase
          shopInfo={shopInfo}
          onBookClick={() => handleBookClick('YouTube Video Production Inquiry')}
        />

        {/* Instagram Profile Banner & Best Pictures */}
        <InstagramProfileBanner
          shopInfo={shopInfo}
          onBookClick={() => handleBookClick('Instagram Style Photography Inquiry')}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Studio Services & Capabilities */}
        <StudioServices
          services={studioServices}
          shopInfo={shopInfo}
          onSelectService={(serviceTitle) => handleBookClick(serviceTitle)}
        />

        {/* Curated Portfolio Gallery */}
        <StudioGallery
          items={galleryItems}
          onBookItem={(itemTitle) => handleBookClick(itemTitle)}
        />

        {/* Interactive Framing & Print Estimator */}
        <PrintEstimator
          shopInfo={shopInfo}
          onOrderFrame={(summary) => handleBookClick(summary)}
        />

        {/* Packages & Pricing */}
        <StudioPackages
          packages={studioPackages}
          shopInfo={shopInfo}
          onSelectPackage={(pkgName) => handleBookClick(`Package: ${pkgName}`)}
        />

        {/* About Studio */}
        <StudioAbout
          shopInfo={shopInfo}
        />

        {/* Contact & Direct Booking */}
        <StudioContact
          shopInfo={shopInfo}
          initialService={selectedInquiryService}
        />
      </main>

      {/* 3. Footer */}
      <StudioFooter
        shopInfo={shopInfo}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* 4. Shop Settings & Inquiries Modal */}
      <ShopSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        shopInfo={shopInfo}
        onSave={(updated) => setShopInfo(updated)}
        onRefreshInstagram={() => setShopInfo({ ...shopInfo })}
        fontPair={fontPair}
        onSelectFontPair={setFontPair}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
