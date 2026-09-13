import React, { useState } from 'react';
import { GalleryItem } from '../../types/studio';
import { GalleryLightbox } from './GalleryLightbox';
import { ZoomIn, MapPin, Tag, Instagram } from 'lucide-react';

interface StudioGalleryProps {
  items: GalleryItem[];
  onBookItem: (title: string) => void;
}

export const StudioGallery: React.FC<StudioGalleryProps> = ({
  items,
  onBookItem,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const availableCategories = ['All', ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <span>Visual Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Outfit']">
            Masterpiece Gallery & Moments
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            A glimpse into the sacred rituals, joyful wedding unions, and hand-finished portrait frames captured by our studio team.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-neutral-900 text-amber-300 shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-950 aspect-4/3 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Photo Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Tag & Zoom icon */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-neutral-900/80 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
                    {item.category}
                  </span>
                  {item.instagramUrl && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-gradient-to-r from-pink-600/90 to-rose-600/90 text-white border border-pink-400/40 shadow-xs backdrop-blur-xs">
                      <Instagram className="w-3 h-3" />
                      <span>Post</span>
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                  <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1 font-['Outfit']">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onInquire={(item) => {
          setSelectedItem(null);
          onBookItem(`Photo Inquiry: ${item.title}`);
        }}
      />
    </section>
  );
};
