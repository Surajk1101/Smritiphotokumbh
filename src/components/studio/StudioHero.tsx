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
      src: '/images/wedding_stage_descent.jpg',
      label: 'Royal Stage Descent',
      shortLabel: 'Stage Descent',
      title: 'Grand Wedding & Stage Cinematography',
      desc: 'Regal mandap coverage, high-speed shutter portraits, 4K cinema cameras, and timeless candid moments.',
      isInstagramBest: false,
      aspectClass: 'aspect-[3/4]',
    },
    {
      src: '/images/wedding_couple.jpg',
      label: 'Sacred Jaimala Union',
      shortLabel: 'Jaimala Union',
      title: 'Cinematic Wedding & Studio Portraiture',
      desc: 'Intimate varmala garland exchange, floral stage setups, traditional family milestones, and custom archival framing.',
      isInstagramBest: false,
      aspectClass: 'aspect-[16/10]',
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Background Graphic & Atmosphere featuring the Best Instagram Photo */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/wedding_jaimala_gaze.jpg"
          alt="Smriti Photo Kumbh - Best Photography of Instagram @samriddhi.photo"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105 filter blur-[1.5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/25 via-rose-950/15 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Spiritual & Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{shopInfo.hindiName} • Official Photography & Videography Studio</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] font-['Outfit']">
                Capturing Sacred Moments,{' '}
                <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  Preserving Eternal Memories
                </span>
              </h1>
              <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
                Welcome to <strong className="text-white font-semibold">{shopInfo.name}</strong>. From grand cinematic weddings and sacred ceremonies to royal studio portraits, 4K drone videography, and master handcrafted framing.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                id="hero-btn-book-session"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-neutral-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                <Camera className="w-4 h-4 text-neutral-950" />
                <span>Book a Photo Session</span>
              </button>

              <a
                href={shopInfo.youtubeUrl}
                id="hero-btn-watch-film"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>YouTube Film</span>
              </a>

              <a
                href={insta.url}
                id="hero-btn-instagram"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-pink-200 bg-gradient-to-r from-pink-950/40 via-rose-950/40 to-purple-950/40 hover:from-pink-900/60 hover:to-purple-900/60 border border-pink-500/30 backdrop-blur-md hover:scale-[1.02] transition-all flex items-center gap-2 group"
                title={`Follow ${insta.handle} on Instagram`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Instagram className="w-3 h-3" />
                </div>
                <span className="font-bold text-white">{insta.handle}</span>
              </a>

              <button
                onClick={onExploreGallery}
                id="hero-btn-view-gallery"
                className="px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Gallery</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-white">4.9 / 5 Rating</span>
                <span>(500+ Reviews)</span>
              </div>

              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-pink-300 hover:text-pink-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>{insta.handle} (Reels & Teasers)</span>
              </a>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Same-Day Photo Transfer</span>
              </div>

              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>4K Drone & Cinema Cameras</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Featured Card & Direct Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/30 shadow-2xl backdrop-blur-xl">
              <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 flex flex-col group shadow-inner">
                
                {/* Top Bar: Distinction between real Instagram post vs Studio Portfolio */}
                <div className="p-3 bg-neutral-900/90 border-b border-neutral-800/80 flex items-center justify-between gap-2 z-10">
                  {showcasePhotos[activePhotoIdx].isInstagramBest ? (
                    <a
                      href={showcasePhotos[activePhotoIdx].postUrl || insta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-pink-950/50 hover:bg-pink-900/60 px-3 py-1 rounded-full border border-pink-500/40 text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      <span>{insta.handle}</span>
                      <span className="text-pink-400/50">•</span>
                      <span className="text-pink-300 text-[11px]">Instagram Post</span>
                    </a>
                  ) : (
                    <div className="bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-700/60 text-xs font-medium text-neutral-300 flex items-center gap-1.5 shadow-xs">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Studio Gallery</span>
                      <span className="text-neutral-500">•</span>
                      <span className="text-neutral-400 text-[11px]">{showcasePhotos[activePhotoIdx].shortLabel || showcasePhotos[activePhotoIdx].label}</span>
                    </div>
                  )}

                  {/* Photo Switcher Navigation Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? showcasePhotos.length - 1 : prev - 1))}
                      aria-label="Previous photo"
                      className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-amber-400 text-white hover:text-neutral-950 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePhotoIdx((prev) => (prev === showcasePhotos.length - 1 ? 0 : prev + 1))}
                      aria-label="Next photo"
                      className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-amber-400 text-white hover:text-neutral-950 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Photo Display Stage (Cleanly fits photo in full frame without cropping heads or faces) */}
                <div className={`relative w-full ${showcasePhotos[activePhotoIdx].aspectClass || 'aspect-square'} max-h-[580px] bg-neutral-950 overflow-hidden flex items-center justify-center transition-[aspect-ratio] duration-300`}>
                  {/* Subtle blurred ambient backdrop */}
                  <img
                    src={showcasePhotos[activePhotoIdx].src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-30 scale-110 pointer-events-none"
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
                <div className="p-4 sm:p-5 bg-neutral-900/95 border-t border-neutral-800/80 text-left space-y-3">
                  {/* Thumbnail switcher pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {showcasePhotos.map((photo, idx) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                          activePhotoIdx === idx
                            ? 'bg-amber-400 text-neutral-950 shadow-md font-bold'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/60'
                        }`}
                      >
                        {photo.shortLabel || photo.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                        {shopInfo.city} • Professional Studio
                      </span>
                      {showcasePhotos[activePhotoIdx].isInstagramBest && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-400/30">
                          <Instagram className="w-2.5 h-2.5" />
                          <span>Instagram Post</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug font-['Outfit']">
                      {showcasePhotos[activePhotoIdx].title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2">
                      {showcasePhotos[activePhotoIdx].desc}
                    </p>
                  </div>
                  
                  <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-neutral-800/80">
                    {showcasePhotos[activePhotoIdx].isInstagramBest ? (
                      <a
                        href={showcasePhotos[activePhotoIdx].postUrl || insta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 hover:text-pink-200 transition-colors bg-pink-950/50 hover:bg-pink-900/60 px-3 py-1.5 rounded-lg border border-pink-500/30 shadow-xs"
                        title="View official post on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>View Post on Instagram</span>
                      </a>
                    ) : (
                      <a
                        href={insta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-700 shadow-xs"
                        title="Visit @samriddhi.photo on Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Visit {insta.handle}</span>
                      </a>
                    )}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-lg transition-colors shadow-md shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Studio</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Mini Feature Highlights Below Card */}
              <div className="grid grid-cols-3 gap-2 mt-2 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="text-base font-black text-amber-400">15+</div>
                  <div className="text-[10px] text-neutral-400 font-medium">Years Serving</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="text-base font-black text-orange-400">10k+</div>
                  <div className="text-[10px] text-neutral-400 font-medium">Happy Clients</div>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                  <div className="text-base font-black text-amber-300">4K</div>
                  <div className="text-[10px] text-neutral-400 font-medium">Cinematography</div>
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
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-amber-400 transition-colors animate-bounce"
        >
          <span>See our YouTube Video & Work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
