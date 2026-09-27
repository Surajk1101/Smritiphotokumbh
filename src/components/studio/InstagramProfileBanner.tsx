import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Key, Image as ImageIcon, Film, Play, Video } from 'lucide-react';
import { ShopInfo } from '../../types/studio';
import { parseInstagram } from '../../utils/instagram';
import { fetchInstagramGraphMedia, getCachedInstagramMedia, InstagramMediaItem } from '../../services/instagramService';

interface InstagramProfileBannerProps {
  shopInfo: ShopInfo;
  onBookClick: () => void;
  onOpenSettings?: () => void;
}

export const InstagramProfileBanner: React.FC<InstagramProfileBannerProps> = ({
  shopInfo,
  onBookClick,
  onOpenSettings,
}) => {
  const insta = parseInstagram(shopInfo.instagram);
  const filmsInsta = parseInstagram(shopInfo.instagramFilms || 'https://www.instagram.com/molshreefilms');
  const [accountFilter, setAccountFilter] = useState<'all' | 'samriddhi' | 'molshree'>('all');

  // Default verified posts from user's actual Instagram accounts (@samriddhi.photo & @molshreefilms)
  const defaultPosts = [
    {
      id: 'post-candid-bride-smile',
      image: '/images/instagram_candid_bride_smile.jpg',
      url: 'https://www.instagram.com/p/Ddd_90CAStm/',
      tag: 'Candid Smile',
      title: 'Joyful Candid Bride & Radiant Smile',
      caption: '#candidbride #bridecandid #candidweddingphotography #bridemoments #indianbride #bridalportrait',
      badge: 'Candid Bride',
      aspect: 'aspect-[3/4]',
      date: 'Latest Post',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
    },
    {
      id: 'post-baby-birthday-shoot',
      image: '/images/instagram_post_baby_birthday.jpg',
      url: 'https://www.instagram.com/p/Ddejb4hzHx3/',
      tag: 'Baby Birthday',
      title: 'Baby Birthday & Milestone Shoot',
      caption: 'Birthday shoot \n....\n#birthdayvibes #photography #babyshoot #prebirthdayshoot❤️ @molshreefilms',
      badge: 'Molshree Films',
      aspect: 'aspect-square',
      date: 'Birthday Shoot',
      account: 'molshree' as const,
      accountHandle: filmsInsta.handle,
      isVideo: false,
    },
    {
      id: 'post-ayansh-birthday',
      image: '/images/instagram_post_birthday_dxcb.jpg',
      url: 'https://www.instagram.com/p/DXCbShbkycz/',
      tag: 'Birthday Celebration',
      title: 'Ayansh Birthday Celebration Shoot',
      caption: 'Ayansh birthday celebration \n#birthdayboy #birthdayphotoshoot #photographer @molshreefilms',
      badge: 'Molshree Films',
      aspect: 'aspect-square',
      date: 'Birthday Celebration',
      account: 'molshree' as const,
      accountHandle: filmsInsta.handle,
      isVideo: false,
    },
    {
      id: 'post-haldi-pooja',
      image: '/images/instagram_post_pooja_haldi.jpg',
      url: 'https://www.instagram.com/p/DXMm3_hE3wx/',
      tag: 'Haldi Ceremony',
      title: 'Haldi of Pooja — Bride Shoot & Haldi Ceremony',
      caption: 'Haldi of Pooja\n#brideshoot #haldiceremony #weddingshoot @molshreefilms',
      badge: 'Molshree Films',
      aspect: 'aspect-square',
      date: 'Haldi Shoot',
      account: 'molshree' as const,
      accountHandle: filmsInsta.handle,
      isVideo: false,
    },
    {
      id: 'post-ashmit-bride',
      image: '/images/instagram_post_ashmit_bride.jpg',
      url: 'https://www.instagram.com/p/Ddjvn01zU0r/',
      tag: 'Bridal Moments',
      title: 'Ashmit the Bride — Bridal Moments & Portraiture',
      caption: 'Ashmit the bride: Sometimes it\'s just not an image!! #brideshoot #BridalMoments #weddingphotography #prewedding @molshreefilms',
      badge: 'Molshree Films',
      aspect: 'aspect-square',
      date: 'Latest Post',
      account: 'molshree' as const,
      accountHandle: filmsInsta.handle,
      isVideo: false,
    },
    {
      id: 'post-bride-groom',
      image: '/images/instagram_post_bride_groom.jpg',
      url: 'https://www.instagram.com/p/Dc6Lvk4gcKU/',
      tag: 'Bride & Groom',
      title: 'Two Sides One Story — Bride & Groom Couple Session',
      caption: '#twosidesonestory #standingwithyou #brideandgroom #weddinginspirations #realweddings #couplegoals',
      badge: 'Couple Goals',
      aspect: 'aspect-square',
      date: 'Recent Post',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
    },
    {
      id: 'post-candid-bride',
      image: '/images/instagram_post_candid_bride.webp',
      url: 'https://www.instagram.com/p/Ddd-pyoBiH5/',
      tag: 'Candid Bridal',
      title: 'Radiant Bridal Candid & Makeup Portrait',
      caption: '#marriage #bridalmakeup #weddingphoto #weddingphotography #photoofday',
      badge: 'Candid Portrait',
      aspect: 'aspect-square',
      date: 'Latest Post',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
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
      date: 'Recent Post',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
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
      date: 'Recent Post',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
    },
    {
      id: 'post-heritage-couple',
      image: '/images/instagram_heritage_couple.jpg',
      url: 'https://www.instagram.com/p/DWFHOuQk-_A/',
      tag: 'Royal Couple',
      title: 'Royal Marriage Ceremony & Couple Portraiture',
      caption: '#royalwedding #indianwedding #traditionalattire #heritage @samriddhi.photo',
      badge: 'Royal Couple',
      aspect: 'aspect-[3/4]',
      date: 'Ceremony Shoot',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
    },
    {
      id: 'post-varmala-featured',
      image: '/images/instagram_featured_post.jpg',
      url: 'https://www.instagram.com/p/DWFFe1sE_3F/',
      tag: 'Sacred Varmala',
      title: 'Sacred Varmala & Royal Marriage Ceremony',
      caption: '#varmala #weddingrituals #sacredwedding #emotions @samriddhi.photo',
      badge: 'Marriage Rituals',
      aspect: 'aspect-[3/4]',
      date: 'Ritual Ceremony',
      account: 'samriddhi' as const,
      accountHandle: insta.handle,
      isVideo: false,
    },
  ];

  const [liveItems, setLiveItems] = useState<InstagramMediaItem[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  // Auto-fetch if token exists and sync is enabled
  useEffect(() => {
    // First load cached
    const cached = getCachedInstagramMedia();
    if (cached && cached.length > 0) {
      setLiveItems(cached);
    }

    if (shopInfo.instagramAccessToken && (shopInfo.instagramSyncEnabled ?? true)) {
      setIsLoadingLive(true);
      fetchInstagramGraphMedia(shopInfo.instagramAccessToken, shopInfo.instagramUserId)
        .then((res) => {
          setIsLoadingLive(false);
          if (res.success && res.items.length > 0) {
            setLiveItems(res.items);
            setLiveError(null);
          } else if (res.error) {
            setLiveError(res.error);
          }
        })
        .catch((err) => {
          setIsLoadingLive(false);
          setLiveError(err?.message || 'Sync failed');
        });
    }
  }, [shopInfo.instagramAccessToken, shopInfo.instagramUserId, shopInfo.instagramSyncEnabled]);

  const handleManualRefresh = async () => {
    if (!shopInfo.instagramAccessToken) {
      if (onOpenSettings) onOpenSettings();
      return;
    }
    setIsLoadingLive(true);
    setLiveError(null);
    const res = await fetchInstagramGraphMedia(
      shopInfo.instagramAccessToken,
      shopInfo.instagramUserId,
      true
    );
    setIsLoadingLive(false);
    if (res.success && res.items.length > 0) {
      setLiveItems(res.items);
    } else {
      setLiveError(res.error || 'Failed to refresh');
    }
  };

  const hasLiveFeed = liveItems && liveItems.length > 0;

  const filteredPosts =
    accountFilter === 'all'
      ? defaultPosts
      : defaultPosts.filter((post) => post.account === accountFilter);

  return (
    <section id="instagram-banner" className="relative py-14 bg-[#0B0C0E] text-white overflow-hidden border-b border-[#262A36]">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/10 via-rose-600/10 to-[#E5A93C]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-r from-[#E5A93C]/10 via-orange-600/10 to-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dual Profile Header Banner: Showcasing Both Official Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          
          {/* Account 1: @samriddhi.photo */}
          <div className="relative rounded-3xl p-6 bg-[#161922] border border-[#262A36] shadow-xl hover:border-pink-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-start gap-4">
              {/* Instagram Story Gradient Ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#E5A93C] via-rose-500 to-purple-600 shrink-0 shadow-lg shadow-pink-500/20">
                <div className="p-0.5 rounded-full bg-[#0B0C0E]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#161922] flex items-center justify-center border border-white/20">
                    <img
                      src="/images/logo.png"
                      alt={shopInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/instagram_post_mehndi.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 p-1.5 rounded-full border-2 border-[#0B0C0E] shadow-md">
                  <Instagram className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-1 text-left flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white font-['Outfit'] tracking-tight">
                    {shopInfo.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                    <span>Photography</span>
                  </span>
                </div>

                <a
                  href={insta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>{insta.handle}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <p className="text-xs text-[#C5CAD6] line-clamp-2">
                  Grand wedding rituals, candid bridal emotions, pre-wedding shoots &amp; timeless fine-art portraiture.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#262A36] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#8E95A5] font-medium">Official Photography Account</span>
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                id="btn-instagram-follow-samriddhi"
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/20 flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow {insta.handle}</span>
              </a>
            </div>
          </div>

          {/* Account 2: @molshreefilms */}
          <div className="relative rounded-3xl p-6 bg-[#161922] border border-[#262A36] shadow-xl hover:border-rose-500/30 transition-all flex flex-col justify-between">
            <div className="flex items-start gap-4">
              {/* Instagram Story Gradient Ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-rose-500 via-pink-600 to-amber-500 shrink-0 shadow-lg shadow-rose-500/20">
                <div className="p-0.5 rounded-full bg-[#0B0C0E]">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#161922] flex items-center justify-center border border-white/20">
                    <img
                      src="/images/instagram_post_ashmit_bride.jpg"
                      alt="Molshree Films"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-rose-600 to-amber-500 p-1.5 rounded-full border-2 border-[#0B0C0E] shadow-md">
                  <Film className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Bio & Details */}
              <div className="space-y-1 text-left flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white font-['Outfit'] tracking-tight">
                    Molshree Films
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <Film className="w-2.5 h-2.5 text-rose-400" />
                    <span>Wedding Films &amp; Cinema</span>
                  </span>
                </div>

                <a
                  href={filmsInsta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>{filmsInsta.handle}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <p className="text-xs text-[#C5CAD6] line-clamp-2">
                  4K cinematic wedding teasers, drone aerial cinematography, couple song films &amp; behind-the-scenes.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#262A36] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#8E95A5] font-medium">Official Cinematography Account</span>
              <a
                href={filmsInsta.url}
                target="_blank"
                rel="noreferrer"
                id="btn-instagram-follow-molshree"
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 shadow-md shadow-rose-600/20 flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow {filmsInsta.handle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pink-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hasLiveFeed ? 'Live Instagram Graph API Feed' : 'Verified Instagram Portfolio'}</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
              Featured Highlights &amp; Cinema Feeds
            </h4>
          </div>

          {/* Interactive Account Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setAccountFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                accountFilter === 'all'
                  ? 'bg-gradient-to-r from-amber-500 to-[#F3BA54] text-slate-950 shadow-sm'
                  : 'bg-[#161922] text-[#C5CAD6] hover:bg-[#262A36] border border-[#262A36]'
              }`}
            >
              All Highlights ({defaultPosts.length})
            </button>
            <button
              type="button"
              onClick={() => setAccountFilter('samriddhi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                accountFilter === 'samriddhi'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
                  : 'bg-[#161922] text-[#C5CAD6] hover:bg-[#262A36] border border-[#262A36]'
              }`}
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>{insta.handle} (Photos)</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountFilter('molshree')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                accountFilter === 'molshree'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-sm'
                  : 'bg-[#161922] text-[#C5CAD6] hover:bg-[#262A36] border border-[#262A36]'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>{filmsInsta.handle} (Films)</span>
            </button>
          </div>
        </div>

        {/* Real Posts Grid */}
        {hasLiveFeed ? (
          /* Live Graph API Media Feed */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {liveItems.slice(0, 8).map((media) => {
              const displayImg = media.media_type === 'VIDEO' ? (media.thumbnail_url || media.media_url) : media.media_url;
              const cleanCaption = media.caption || 'Photo shoot by @samriddhi.photo';
              const dateStr = media.timestamp ? new Date(media.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
              
              const lines = cleanCaption.split('\n').filter(Boolean);
              const postTitle = lines[0] || 'Instagram Upload';

              return (
                <div
                  key={media.id}
                  className="bg-[#161922] rounded-3xl border border-[#262A36] overflow-hidden flex flex-col justify-between shadow-xl hover:border-pink-500/40 transition-all duration-300 text-left group"
                >
                  <div className="relative w-full aspect-square bg-[#0B0C0E] overflow-hidden flex items-center justify-center border-b border-[#262A36]">
                    <img
                      src={displayImg}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-30 scale-110 pointer-events-none"
                    />
                    <img
                      src={displayImg}
                      alt={postTitle}
                      className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                      <span className="bg-pink-600/95 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                        <Instagram className="w-3 h-3" />
                        <span>{media.media_type === 'VIDEO' ? 'Reel/Video' : 'Photo'}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-pink-400">{insta.handle}</span>
                        {dateStr && <span className="text-[#8E95A5] text-[10px]">{dateStr}</span>}
                      </div>

                      <h5 className="text-sm font-bold text-white font-['Outfit'] line-clamp-1">
                        {postTitle}
                      </h5>

                      <p className="text-[11px] text-[#C5CAD6] font-mono bg-[#12141A] p-2.5 rounded-xl border border-[#262A36] line-clamp-3">
                        {cleanCaption}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#262A36]">
                      <a
                        href={media.permalink || insta.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/20 flex items-center justify-center gap-2 transition-all"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>View on Instagram</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Default Verified Feed from @samriddhi.photo & @molshreefilms */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#161922] rounded-3xl border border-[#262A36] overflow-hidden flex flex-col justify-between shadow-xl hover:border-pink-500/40 transition-all duration-300 text-left group"
              >
                {/* Photo Display Stage */}
                <div className={`relative w-full ${post.aspect || 'aspect-square'} bg-[#0B0C0E] overflow-hidden flex items-center justify-center border-b border-[#262A36]`}>
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
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                    <span
                      className={`text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-md ${
                        post.account === 'molshree'
                          ? 'bg-gradient-to-r from-rose-600 to-amber-600'
                          : 'bg-pink-600/95'
                      }`}
                    >
                      {post.isVideo ? <Film className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                      <span>{post.badge}</span>
                    </span>
                  </div>
                  {post.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xs border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold ${post.account === 'molshree' ? 'text-rose-400' : 'text-pink-400'}`}>
                        {post.accountHandle}
                      </span>
                      <span className="text-[10px] font-semibold text-[#E5A93C] bg-[#E5A93C]/10 px-2 py-0.5 rounded-full border border-[#E5A93C]/20">
                        {post.tag}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white font-['Outfit'] leading-snug">
                      {post.title}
                    </h5>

                    <p className="text-[11px] text-[#C5CAD6] font-mono bg-[#12141A] p-2.5 rounded-xl border border-[#262A36] line-clamp-2">
                      {post.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#262A36]">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-2 px-3.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all ${
                        post.account === 'molshree'
                          ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:opacity-95 shadow-rose-600/20'
                          : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-pink-600/20'
                      }`}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{post.isVideo ? 'Watch Reel on Instagram' : 'View Post on Instagram'}</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
