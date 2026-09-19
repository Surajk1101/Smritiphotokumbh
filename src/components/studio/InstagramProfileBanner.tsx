import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Key, Image as ImageIcon } from 'lucide-react';
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

  // Default verified posts from user's actual Instagram account (@samriddhi.photo)
  const defaultPosts = [
    {
      id: 'post-candid-bride-smile',
      image: '/images/instagram_candid_bride_smile.jpg',
      url: 'https://www.instagram.com/p/Ddd_90CAStm/',
      tag: 'Candid Smile',
      title: 'Joyful Candid Bride & Radiant Smile',
      caption: '#candidbride #bridecandid #candidweddingphotography #bridemoments #indianbride #bridalportrait',
      badge: 'Candid Bride',
      aspect: 'aspect-square',
      date: 'Latest Post',
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
    },
    {
      id: 'post-haldi-dance',
      image: '/images/indian_haldi_ceremony.jpg',
      url: 'https://www.instagram.com/p/DdOHbORAanZ/',
      tag: 'Wedding Dance',
      title: 'Joyful Haldi Dance & Celebration',
      caption: '#weddingdance #weddingphotographers #indainwedding #pahadiwedding❤️ #mehndiphotoshoot',
      badge: 'Haldi Dance',
      aspect: 'aspect-[3/2]',
      date: 'Recent Post',
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

  return (
    <section id="instagram-banner" className="relative py-14 bg-[#0B0C0E] text-white overflow-hidden border-b border-[#262A36]">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/10 via-rose-600/10 to-[#E5A93C]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-r from-[#E5A93C]/10 via-orange-600/10 to-rose-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Profile Header Banner */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-[#161922] border border-[#262A36] shadow-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Profile Info Left */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              {/* Instagram Story Gradient Ring with Verified Avatar */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#E5A93C] via-rose-500 to-purple-600 shrink-0 shadow-lg shadow-pink-500/20">
                <div className="p-0.5 rounded-full bg-[#0B0C0E]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#161922] flex items-center justify-center border border-white/20">
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
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* Identity & Bio */}
              <div className="space-y-1.5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight">
                    {shopInfo.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>Official Instagram</span>
                  </span>
                  {hasLiveFeed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Graph API Connected ({liveItems.length} posts)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/30">
                      <span>Verified Feed</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-pink-400">
                    {insta.handle}
                  </span>
                  <span className="text-[#8E95A5]">•</span>
                  <span className="text-xs text-[#8E95A5] font-medium">
                    {shopInfo.city} Photography &amp; Cinematography
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#C5CAD6] max-w-xl">
                  Curated moments and visual vignettes from {insta.handle} — celebrating grand unions, intimate bridal rituals, and timeless portraiture.
                </p>
              </div>
            </div>

            {/* Actions Right */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {shopInfo.instagramAccessToken && (
                <button
                  onClick={handleManualRefresh}
                  disabled={isLoadingLive}
                  title="Refresh Instagram Feed from Meta API"
                  className="p-2.5 rounded-xl bg-[#1B1F2A] hover:bg-[#262A36] text-[#C5CAD6] hover:text-white border border-[#262A36] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingLive ? 'animate-spin text-pink-400' : ''}`} />
                </button>
              )}

              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="px-3 py-2.5 rounded-xl font-bold text-xs text-[#C5CAD6] bg-[#1B1F2A] hover:bg-[#262A36] border border-[#262A36] flex items-center gap-1.5 cursor-pointer hover:text-white"
                  title="Configure Instagram Access Token"
                >
                  <Key className="w-3.5 h-3.5 text-pink-400" />
                  <span>{shopInfo.instagramAccessToken ? 'API Connected' : 'Connect Meta API'}</span>
                </button>
              )}

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
                className="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm text-[#0B0C0E] bg-gradient-to-r from-[#E5A93C] to-[#F3BA54] hover:brightness-110 shadow-md shadow-[#E5A93C]/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Commission Session</span>
              </button>
            </div>

          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6 text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-pink-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hasLiveFeed ? 'Live Instagram Graph API Feed' : 'Verified Instagram Posts'}</span>
            </div>
            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Outfit'] tracking-tight">
              Featured Uploads from <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">{insta.handle}</span>
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
        {hasLiveFeed ? (
          /* Live Graph API Media Feed */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {liveItems.slice(0, 8).map((media) => {
              const displayImg = media.media_type === 'VIDEO' ? (media.thumbnail_url || media.media_url) : media.media_url;
              const cleanCaption = media.caption || 'Photo shoot by @samriddhi.photo';
              const dateStr = media.timestamp ? new Date(media.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
              
              // Extract title and hashtags
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
          /* Default Verified Feed from @samriddhi.photo */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {defaultPosts.map((post) => (
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

            {/* Third Card: Connect card */}
            <div className="bg-[#161922] rounded-3xl border border-[#262A36] p-6 flex flex-col justify-between text-left shadow-xl">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meta Graph API Live Ready</span>
                </div>
                <h4 className="text-xl font-black text-white font-['Outfit']">
                  Auto-Sync Your Instagram
                </h4>
                <p className="text-xs text-[#C5CAD6] leading-relaxed">
                  Connecting your Meta Instagram Graph API token enables your newest studio photographs and original captions to auto-display in real time without manual updates.
                </p>

                <div className="p-4 rounded-2xl bg-[#12141A] border border-[#262A36] space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C5CAD6]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time photo fetching</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C5CAD6]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Original captions &amp; hashtags display</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#C5CAD6]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Instagram post permalinks</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#262A36]">
                {onOpenSettings ? (
                  <button
                    onClick={onOpenSettings}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-md shadow-pink-600/30 flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      <span>Setup Instagram API Token</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
