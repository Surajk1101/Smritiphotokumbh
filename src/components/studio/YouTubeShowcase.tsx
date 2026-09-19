import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, Share2, Check, Video, Sparkles, Award, Film, PlayCircle } from 'lucide-react';
import { ShopInfo, YouTubeVideoItem } from '../../types/studio';
import { studioYouTubeVideos } from '../../data/studioData';

interface YouTubeShowcaseProps {
  shopInfo: ShopInfo;
  onBookClick: () => void;
}

export const YouTubeShowcase: React.FC<YouTubeShowcaseProps> = ({
  shopInfo,
  onBookClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Combine predefined videos with any custom shopInfo video without duplicates
  const playlist: YouTubeVideoItem[] = React.useMemo(() => {
    const list: YouTubeVideoItem[] = [];
    const seenIds = new Set<string>();

    const addIfUnique = (item: YouTubeVideoItem) => {
      if (item.videoId && !seenIds.has(item.videoId)) {
        seenIds.add(item.videoId);
        list.push(item);
      }
    };

    // Add predefined studio videos first
    studioYouTubeVideos.forEach(addIfUnique);

    // If shopInfo has a custom video not in the predefined list, add it as well
    if (shopInfo.youtubeVideoId && !seenIds.has(shopInfo.youtubeVideoId)) {
      addIfUnique({
        id: 'custom-shop-video',
        videoId: shopInfo.youtubeVideoId,
        title: `${shopInfo.name} — Featured Video`,
        category: 'Official Production',
        duration: '4K Ultra HD',
        url: shopInfo.youtubeUrl,
        description: `Official cinematography production by ${shopInfo.name}.`,
        featured: true,
      });
    }

    return list;
  }, [shopInfo.youtubeVideoId, shopInfo.youtubeUrl, shopInfo.name]);

  // Default to the first video (which is the new requested wedding cinema video: tsjfpKFTP5g)
  const [activeVideoId, setActiveVideoId] = useState<string>(
    shopInfo.youtubeVideoId || playlist[0]?.videoId || 'tsjfpKFTP5g'
  );

  const activeVideo = playlist.find((v) => v.videoId === activeVideoId) || playlist[0];
  const currentVideoId = activeVideo?.videoId || 'tsjfpKFTP5g';
  const currentVideoUrl = activeVideo?.url || `https://youtu.be/${currentVideoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`;

  const handleSelectVideo = (vidId: string) => {
    setActiveVideoId(vidId);
    setIsPlaying(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentVideoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const videoHighlights = [
    { title: 'Ultra HD 4K Quality', desc: 'Clear and sharp video filmed with high-end modern full-frame cameras.' },
    { title: 'Flying Drone Shots', desc: "Bird's-eye views of your wedding venue, guest arrival, and celebrations." },
    { title: 'Natural Color Editing', desc: 'True-to-life skin tones and vibrant, festive colors that look natural.' },
    { title: 'Crisp Sound Recording', desc: 'Clean wireless mics that clearly record rituals, vows, and family speeches.' },
  ];

  return (
    <section id="youtube-showcase" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-100/60 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold tracking-wide uppercase shadow-xs">
            <Youtube className="w-4 h-4 fill-current text-red-600" />
            <span>YouTube Video Highlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Outfit'] text-slate-900">
            Watch Our Wedding &amp; Event Films
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
            Real weddings and events filmed in Ultra HD 4K by <strong className="text-amber-700 font-bold">{shopInfo.name}</strong>.
          </p>

          {/* Interactive Video Switcher Tabs (Only if multiple distinct videos exist) */}
          {playlist.length > 1 && (
            <div className="pt-4 flex flex-wrap justify-center gap-2.5">
              {playlist.map((video) => {
                const isSelected = video.videoId === currentVideoId;
                return (
                  <button
                    key={video.id}
                    onClick={() => handleSelectVideo(video.videoId)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-xs border border-red-600'
                        : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    <PlayCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-red-600'}`} />
                    <span className="truncate max-w-[220px] sm:max-w-xs">{video.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold ${
                      isSelected ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {video.duration || '4K'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Video Cinema Stage */}
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl">
            
            {/* Top Bar of the Player */}
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-3 h-3 rounded-full bg-red-400 shrink-0 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 inline-block" />
                <span className="ml-2 text-xs font-semibold text-slate-800 truncate">
                  {activeVideo?.title || `${shopInfo.name} Film`}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                  title="Share video link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <a
                  href={currentVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open YouTube</span>
                </a>
              </div>
            </div>

            {/* Video Player Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center">
              {isPlaying ? (
                <iframe
                  src={embedUrl}
                  title={activeVideo?.title || "Smriti Photo Kumbh YouTube Video"}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                  {/* Video Thumbnail using high quality YouTube thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`;
                    }}
                    alt={activeVideo?.title || "Smriti Photo Kumbh Video Thumbnail"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Centered Large Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300 cursor-pointer">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                    </div>
                    <div className="text-center px-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-black/75 text-amber-300 text-xs font-bold border border-amber-300/30 mb-1">
                        Click to Play in 4K
                      </span>
                      <p className="text-sm font-semibold text-white drop-shadow-sm">
                        {activeVideo?.title}
                      </p>
                    </div>
                  </div>

                  {/* Video duration & badge preview */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                      <Video className="w-3.5 h-3.5 text-amber-400" />
                      <span>{activeVideo?.category || 'Produced by Smriti Photo Kumbh Studio'}</span>
                    </div>
                    <div className="bg-red-600 text-white font-bold px-2.5 py-1 rounded text-[11px] tracking-wide">
                      4K UHD
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Footer Details */}
            <div className="p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {activeVideo?.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    <Award className="w-3 h-3 text-amber-600" />
                    <span>Featured Film</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 max-w-2xl">
                  {activeVideo?.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={currentVideoUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="btn-subscribe-youtube"
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-700 flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Watch on YouTube</span>
                </a>

                <button
                  onClick={onBookClick}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <span>Book Similar Shoot</span>
                </button>
              </div>
            </div>

          </div>

          {/* Playlist Gallery Cards (Only shown if multiple distinct videos exist) */}
          {playlist.length > 1 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Film className="w-4 h-4 text-amber-600" />
                  <span>Featured Videos Playlist ({playlist.length})</span>
                </div>
                <span className="text-xs text-slate-500">Click any video to play above</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlist.map((video) => {
                  const isSelected = video.videoId === currentVideoId;
                  return (
                    <div
                      key={video.id}
                      onClick={() => handleSelectVideo(video.videoId)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3.5 items-center group ${
                        isSelected
                          ? 'bg-red-50/60 border-red-400 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {/* Thumbnail preview */}
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                        <img
                          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            isSelected ? 'bg-red-600' : 'bg-black/70'
                          }`}>
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-white">
                          4K
                        </span>
                      </div>

                      {/* Meta info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {video.category}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              Now Playing
                            </span>
                          )}
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-red-700 transition-colors">
                          {video.title}
                        </h5>
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Technical and Video Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {videoHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors text-left shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
