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
    <section id="gallery" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>Photo Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
            Our Work &amp; Customer Photos
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse real photos from weddings, family ceremonies, studio portraits, and custom framed prints.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 hover:text-slate-900'
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
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-4/3 cursor-pointer shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300"
            >
              {/* Photo Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${item.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 filter brightness-95`}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag & Zoom icon */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-xs">
                    {item.category}
                  </span>
                  {item.instagramUrl && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-pink-600 text-white shadow-xs">
                      <Instagram className="w-3 h-3" />
                      <span>Instagram</span>
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-800 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-xs">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-semibold">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1 font-['Outfit']">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Hidden SEO Metadata for Google Search Engine Crawling (Hidden from customers) */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Smriti Photo Kumbh provides professional candid wedding photography, candid bride portraits,
            bridal glow shots, pre-wedding photoshoots, haldi and bridal mehendi photography.
            We also specialize in maternity photography, maternity shoot ideas, baby shower and Godh Bharai ceremony coverage,
            newborn baby portraits, cute baby concept photography, Naamkaran naming ceremony, Annaprashan first rice eating ceremony,
            1st birthday party and cake smash sessions, as well as 25th Silver Jubilee and 50th Golden Jubilee milestone wedding anniversary photography.
            Serving Delhi NCR, Noida Sector 18, Greater Noida, Ghaziabad, Indirapuram,
            and destination wedding locations across Uttarakhand including Rishikesh, Jim Corbett,
            Mussoorie, and Triyuginarayan Temple.
          </p>
          <span>
            Search Keywords: candid bride, bride candid, candid wedding photography, bridal moments, indian bride,
            bridal portrait, wedding candid, cinematic wedding, delhi wedding photographer, noida wedding,
            ghaziabad weddings, indirapuram weddings, destination wedding uttarakhand, rishikesh wedding,
            jim corbett wedding, mussoorie wedding, triyuginarayan wedding,
            maternity photography, maternity shoot, baby shower, godh bharai, mom to be, bump to baby, expecting parents,
            motherhood unplugged, godh bharai ceremony, maternity shoot ideas, newborn photography, newborn baby,
            baby shoot, newborn session, cute baby pictures, baby concept photography, little miracle, fresh 48,
            newborn posing, naamkaran ceremony, annaprashan, naming ceremony, first rice eating ceremony,
            baby naming ceremony, annaprashan shoot, indian traditions, baby milestones, cultural ceremony,
            1st birthday, first birthday party, birthday cake smash, 1st birthday shoot, one year old, turning one,
            cake smash session, first birthday theme, baby turns one, 25th anniversary, 50th anniversary,
            silver jubilee, golden jubilee, anniversary photography, vow renewal, couples goals,
            25 years of togetherness, 50 years of love, grand anniversary, milestone photography
          </span>
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
