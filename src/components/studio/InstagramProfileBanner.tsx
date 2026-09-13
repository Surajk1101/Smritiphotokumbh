import React from 'react';
import { Instagram, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ShopInfo } from '../../types/studio';
import { parseInstagram } from '../../utils/instagram';

interface InstagramProfileBannerProps {
  shopInfo: ShopInfo;
  onBookClick: () => void;
}

export const InstagramProfileBanner: React.FC<InstagramProfileBannerProps> = ({
  shopInfo,
  onBookClick,
}) => {
  const insta = parseInstagram(shopInfo.instagram);

  const realPosts = [
    {
      id: 'post-marriage',
      image: '/images/instagram_featured_post.jpg',
      url: 'https://www.instagram.com/p/DWFFe1sE_3F/',
      tag: 'Wedding Photography',
      title: 'Royal Marriage Ceremony & Couple Session',
      caption: '#marriagephotography #photographer #function #photosession #samriddhiphoto',
      badge: 'Ceremony Feature',
      aspect: 'aspect-[3/4]',
    },
    {
      id: 'post-couple-story',
      image: '/images/instagram_post_ddoe7ip.jpg',
      url: 'https://www.instagram.com/p/DdOE7ipAetG/',
      tag: 'Bride Sister',
      title: 'Two Sides One Story — Bride & Sister Portrait',
      caption: '#twosidesonestory #standingwithyou #brideandsister #sistergoals #samriddhiphoto',
      badge: 'Bride & Sister',
      aspect: 'aspect-[3/2]',
    },
    {
      id: 'post-mehndi',
      image: '/images/instagram_post_mehndi.jpg',
      url: 'https://www.instagram.com/p/Dc8c4VZgWBv/',
      tag: 'Mehndi Art Session',
      title: 'Bridal Mehndi Art & Henna Photoshoot',
      caption: '#mehndidesign #mehndiartist #hennaart #mehndilove #trendingmehndi #mehndiphotoshoot',
      badge: 'Bridal Henna',
      aspect: 'aspect-square',
    },
  ];

  return (
    <section id="instagram-banner" className="relative py-14 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/15 via-rose-600/10 to-purple-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-600/15 via-orange-600/10 to-rose-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Profile Header Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-neutral-900/90 to-neutral-950/95 border border-pink-500/20 shadow-2xl backdrop-blur-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Profile Info Left */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              {/* Instagram Story Gradient Ring with Verified Avatar */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0 shadow-lg shadow-pink-500/20">
                <div className="p-0.5 bg-neutral-950 rounded-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-neutral-900 relative">
                    <img
                      src="/images/instagram_featured_post.jpg"
                      alt={shopInfo.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center border-2 border-neutral-950 shadow-xs">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-1.5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                    {shopInfo.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                    <CheckCircle2 className="w-3 h-3 text-pink-400" />
                    <span>Official Profile</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-pink-400">
                    {insta.handle}
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-xs text-neutral-400 font-medium">
                    {shopInfo.city} Photography &amp; Cinematography
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                  Authentic Instagram uploads from {insta.handle} — weddings, sacred rituals, mehndi sessions, and cinematic wedding photography.
                </p>
              </div>
            </div>

            {/* Actions Right */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                id="btn-instagram-banner-follow"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-600/30 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {insta.handle}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                onClick={onBookClick}
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-neutral-900 bg-amber-400 hover:bg-amber-300 hover:scale-[1.02] transition-all cursor-pointer shadow-md"
              >
                <span>Book Shoot</span>
              </button>
            </div>

          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Instagram Posts</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
              Featured Uploads from {insta.handle}
            </h4>
          </div>

          <a
            href={insta.url}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
          >
            <span>View all posts on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Real Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {realPosts.map((post) => (
            <div
              key={post.id}
              className="bg-neutral-900/80 rounded-3xl border border-neutral-800/90 overflow-hidden flex flex-col justify-between shadow-xl hover:border-pink-500/40 transition-all duration-300 text-left group"
            >
              {/* Photo Display Stage (Clean object-contain uncropped full photo) */}
              <div className={`relative w-full ${post.aspect || 'aspect-square'} bg-neutral-950 overflow-hidden flex items-center justify-center border-b border-neutral-800`}>
                {/* Ambient blurred backdrop */}
                <img
                  src={post.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-30 scale-110 pointer-events-none"
                />
                <img
                  src={post.image}
                  alt={post.title}
                  className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 z-20">
                  <span className="bg-pink-600/95 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                    <Instagram className="w-3 h-3" />
                    <span>{post.badge}</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-pink-400">{insta.handle}</span>
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {post.tag}
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-white font-['Outfit'] leading-snug">
                    {post.title}
                  </h5>

                  <p className="text-[11px] text-neutral-300 font-mono bg-neutral-950/70 p-2.5 rounded-xl border border-neutral-800/80 line-clamp-2">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/80">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>View Post on Instagram</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Third Card: Follow & Connect card */}
          <div className="bg-gradient-to-br from-pink-950/25 via-neutral-900 to-neutral-950 rounded-3xl border border-pink-500/25 p-6 flex flex-col justify-between text-left shadow-xl">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Follow Our Journey</span>
              </div>
              <h4 className="text-xl font-black text-white font-['Outfit']">
                Explore Full Gallery on Instagram
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Follow <span className="text-pink-400 font-semibold">{insta.handle}</span> for daily ceremony reels, wedding album previews, client reviews, and direct DM inquiries.
              </p>

              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Daily Stories &amp; Mandap Reels</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Client Testimonials &amp; Tagged Posts</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Instagram DM Booking</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-800">
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/30 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <span>Visit {insta.handle}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
