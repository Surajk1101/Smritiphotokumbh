import React from 'react';
import { GalleryItem } from '../../types/studio';
import { X, MapPin, Tag, Share2, Camera, Instagram, ExternalLink } from 'lucide-react';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onInquire: (item: GalleryItem) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  onClose,
  onInquire,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="btn-close-lightbox"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Container */}
        <div className="relative max-h-[70vh] bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Metadata and Caption Bar */}
        <div className="p-6 bg-white border-t border-slate-200 text-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.category}</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>{item.location}</span>
              </span>
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {item.instagramUrl && (
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-700 flex items-center gap-2 transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>View on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            )}
            <button
              onClick={() => onInquire(item)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-500 hover:bg-amber-400 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>Book Shoot / Order Frame</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
