import React, { useState } from 'react';
import { Play, Camera, Phone, Star, ShieldCheck, Sparkles, Image as ImageIcon, ArrowDown, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { ShopInfo } from '../../types/studio';
import { parseInstagram } from '../../utils/instagram';

interface StudioHeroProps {
  shopInfo: ShopInfo;
  onBookClick: () => void;
  onExploreGallery: () => void;
}

export const StudioHero: React.FC<StudioHeroProps> = ({
  shopInfo,
  onBookClick,
  onExploreGallery,
}) => {
  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');
  const insta = parseInstagram(shopInfo.instagram);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const showcasePhotos = [
    {
      src: '/images/instagram_featured_post.jpg',
      label: 'Instagram Featured Photo',
      shortLabel: 'Featured Post',
      title: 'Royal Marriage Ceremony & Couple Session',
      desc: 'Featured photograph from our official Instagram post (@samriddhi.photo) — authentic wedding celebration, candid couple emotions, and traditional ceremony.',
      postUrl: 'https://www.instagram.com/p/DWFFe1sE_3F/',
      isInstagramBest: true,
      aspectClass: 'aspect-[3/4]',
    },
    {
      src: '/images/wedding_jaimala_gaze.jpg',
      label: 'Sacred Varmala Gaze',
      shortLabel: 'Varmala Gaze',
      title: 'Sacred Varmala & Romantic Wedding Gaze',
      desc: 'Candid capture of newlyweds exchanging radiant smiles and sacred garlands against an illuminated floral mandap.',
      isInstagramBest: false,
      aspectClass: 'aspect-[4/3] sm:aspect-[3/2]',
    },
    {
      src: '/images/wedding_varmala_closeup.jpg',
      label: 'Loving Varmala Smile',
      shortLabel: 'Varmala Smile',
      title: 'Sacred Varmala & Tender Candid Moments',
      desc: 'Intimate bride and groom candid smiles, royal zardozi attire, and vibrant flower wall stages captured in high-resolution.',
      isInstagramBest: false,
      aspectClass: 'aspect-[4/3] sm:aspect-[3/2]',
    },
    {
      src: '/images/instagram_post_ddoe7ip.jpg',
      label: 'Bride & Sister',
      shortLabel: 'Bride Sister',
      title: 'Two Sides One Story — Bride & Sister Portrait',
      desc: 'Authentic wedding photoshoot from our Instagram post (@samriddhi.photo) — bride and sister candid portrait, wedding inspirations, and timeless moments.',
      postUrl: 'https://www.instagram.com/p/DdOE7ipAetG/',
      isInstagramBest: true,
      aspectClass: 'aspect-[3/2]',
    },
    {
      src: '/images/instagram_post_mehndi.jpg',
      label: 'Bridal Mehndi & Henna Art',
      shortLabel: 'Bridal Henna',
      title: 'Bridal Mehndi Art & Henna Photosession',
      desc: 'Authentic mehndi photoshoot from our Instagram post (@samriddhi.photo) — intricate bridal henna art, floral jewelry, and festive celebration.',
      postUrl: 'https://www.instagram.com/p/Dc8c4VZgWBv/',
      isInstagramBest: true,
      aspectClass: 'aspect-square',
    },
    {
      src: '/images/indian_haldi_ceremony.jpg',
      label: 'Haldi Dance Celebration',
      shortLabel: 'Haldi Dance',
      title: 'Joyful Haldi Dance & Wedding Celebration',
      desc: 'Authentic candid celebration from our Instagram post (@samriddhi.photo) — smiling bride in yellow saree with floral jewelry dancing with family.',
      postUrl: 'https://www.instagram.com/p/DdOHbORAanZ/',
      isInstagramBest: true,
      aspectClass: 'aspect-[3/2]',
    },
    {
      src: '/images/instagram_heritage_couple.jpg',
      label: 'Royal Marriage Ceremony',
      shortLabel: 'Royal Couple',
      title: 'Royal Marriage Ceremony & Couple Portraiture',
      desc: 'Authentic royal couple photoshoot from our official Instagram post (@samriddhi.photo) — exquisite bridal lehenga, royal groom sherwani, and heritage wedding memories.',
      postUrl: 'https://www.instagram.com/p/DWFHOuQk-_A/',
      isInstagramBest: true,
      aspectClass: 'aspect-[3/4]',
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b border-slate-200">
      {/* Background Graphic & Atmosphere featuring the Best Instagram Photo */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <img
          src="/images/wedding_jaimala_gaze.jpg"
          alt="Smriti Photo Kumbh - Best Photography of Instagram @samriddhi.photo"
          className="w-full h-full object-cover object-center scale-105 filter blur-[3px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-18 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Professional Photography &amp; Video Studio in {shopInfo.city}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] font-['Outfit'] text-slate-900">
                Capturing Life&apos;s Special Moments into{' '}
                <span className="text-amber-600 inline-block font-black">
                  Beautiful Photos &amp; Films
                </span>
              </h1>
              <div className="space-y-3 max-w-2xl">
                <p className="text-xl sm:text-2xl text-slate-700 font-semibold tracking-tight font-['Outfit'] leading-snug">
                  Wedding Photography • Family Portraits • 4K Drone Video • Custom Photo Framing
                </p>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  <span className="text-amber-800 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-bold">Weddings &amp; Pre-Weddings</span>
                  <span className="text-amber-500">•</span>
                  <span>Haldi &amp; Mehndi</span>
                  <span className="text-amber-500">•</span>
                  <span>Studio Portraits</span>
                  <span className="text-amber-500">•</span>
                  <span>4K Drone Video</span>
                  <span className="text-amber-500">•</span>
                  <span className="text-amber-800 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 font-bold">Custom Photo Framing</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onBookClick}
                id="hero-btn-book-session"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xs hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-slate-950" />
                <span>Book a Shoot</span>
              </button>

              <a
                href={shopInfo.youtubeUrl}
                id="hero-btn-watch-film"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:scale-[1.02] transition-all flex items-center gap-2 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </a>

              <a
                href={insta.url}
                id="hero-btn-instagram"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 hover:scale-[1.02] transition-all flex items-center gap-2 group shadow-xs"
                title={`Follow ${insta.handle} on Instagram`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Instagram className="w-3 h-3" />
                </div>
                <span className="font-bold text-pink-800">{insta.handle}</span>
              </a>

              <button
                onClick={onExploreGallery}
                id="hero-btn-view-gallery"
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-300 transition-colors flex items-center gap-2 shadow-xs"
              >
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>Sample Photos</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">4.9 / 5 Rating</span>
                <span>(500+ Happy Customers)</span>
              </div>

              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-pink-700 hover:text-pink-800 font-medium transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>{insta.handle} (Instagram Photos &amp; Reels)</span>
              </a>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-700">Edited Photos &amp; Quick Previews</span>
              </div>

              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-600" />
                <span className="text-slate-700">4K Cameras &amp; Flying Drone</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Card & Direct Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-2.5 bg-white border border-slate-200 shadow-xl">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex flex-col group shadow-inner">
                
                {/* Top Bar: Distinction between real Instagram post vs Studio Portfolio */}
                <div className="p-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2 z-10">
                  {showcasePhotos[activePhotoIdx].isInstagramBest ? (
                    <a
                      href={showcasePhotos[activePhotoIdx].postUrl || insta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-pink-50 hover:bg-pink-100 px-3 py-1 rounded-full border border-pink-200 text-xs font-semibold text-pink-700 flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      <span>{insta.handle}</span>
                      <span className="text-pink-300">•</span>
                      <span className="text-pink-600 text-[11px]">Instagram Post</span>
                    </a>
                  ) : (
                    <div className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-xs">
                      <Camera className="w-3.5 h-3.5 text-amber-600" />
                      <span>Studio Gallery</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 text-[11px]">{showcasePhotos[activePhotoIdx].shortLabel || showcasePhotos[activePhotoIdx].label}</span>
                    </div>
                  )}

                  {/* Photo Switcher Navigation Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? showcasePhotos.length - 1 : prev - 1))}
                      aria-label="Previous photo"
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-amber-500 text-slate-700 hover:text-slate-950 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIdx((prev) => (prev === showcasePhotos.length - 1 ? 0 : prev + 1))}
                      aria-label="Next photo"
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-amber-500 text-slate-700 hover:text-slate-950 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Photo Display Stage (Cleanly fits photo in full frame without cropping heads or faces) */}
                <div className={`relative w-full ${showcasePhotos[activePhotoIdx].aspectClass || 'aspect-square'} max-h-[580px] bg-slate-950 overflow-hidden flex items-center justify-center transition-[aspect-ratio] duration-300`}>
                  {/* Subtle blurred ambient backdrop */}
                  <img
                    src={showcasePhotos[activePhotoIdx].src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-20 scale-110 pointer-events-none"
                  />
                  {/* Foreground crisp photo fitted 100% properly */}
                  <img
                    key={showcasePhotos[activePhotoIdx].src}
                    src={showcasePhotos[activePhotoIdx].src}
                    alt={`Smriti Photo Kumbh - ${showcasePhotos[activePhotoIdx].title}`}
                    className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card Details Section Below Photo (No overlap on the picture) */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200 text-left space-y-3">
                  {/* Thumbnail switcher pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {showcasePhotos.map((photo, idx) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                          activePhotoIdx === idx
                            ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {photo.shortLabel || photo.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-700 text-xs font-bold uppercase tracking-wider">
                        {shopInfo.city} • Professional Studio
                      </span>
                      {showcasePhotos[activePhotoIdx].isInstagramBest && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
                          <Instagram className="w-2.5 h-2.5" />
                          <span>Instagram Post</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-['Outfit']">
                      {showcasePhotos[activePhotoIdx].title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {showcasePhotos[activePhotoIdx].desc}
                    </p>
                  </div>
                  
                  <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-slate-200">
                    {showcasePhotos[activePhotoIdx].isInstagramBest ? (
                      <a
                        href={showcasePhotos[activePhotoIdx].postUrl || insta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-800 transition-colors bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-lg border border-pink-200 shadow-xs"
                        title="View official post on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        <span>View on Instagram</span>
                      </a>
                    ) : (
                      <a
                        href={insta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                        title="Visit @samriddhi.photo on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        <span>Visit {insta.handle}</span>
                      </a>
                    )}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-3.5 py-1.5 rounded-lg transition-colors shadow-xs shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Studio</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Mini Feature Highlights Below Card */}
              <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-base font-black text-amber-700">15+</div>
                  <div className="text-[10px] text-slate-600 font-medium">Years in Business</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-base font-black text-amber-700">10k+</div>
                  <div className="text-[10px] text-slate-600 font-medium">Happy Families</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-base font-black text-amber-700">4K</div>
                  <div className="text-[10px] text-slate-600 font-medium">Video &amp; Drone</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="text-center pb-6">
        <a
          href="#youtube-showcase"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-amber-700 transition-colors"
        >
          <span>See our YouTube Video &amp; Work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
