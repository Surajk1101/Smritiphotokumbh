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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="btn-close-lightbox"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Container */}
        <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Metadata and Caption Bar */}
        <div className="p-6 bg-neutral-900 border-t border-neutral-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.category}</span>
              </span>
              <span className="text-neutral-500">•</span>
              <span className="inline-flex items-center gap-1 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{item.location}</span>
              </span>
            </div>
            <h3 className="text-xl font-bold font-['Outfit']">{item.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {item.instagramUrl && (
              <a
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-90 flex items-center gap-2 transition-all shadow-sm"
              >
                <Instagram className="w-4 h-4" />
                <span>View on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            )}
            <button
              onClick={() => onInquire(item)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-neutral-950 bg-amber-400 hover:bg-amber-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Book Shoot / Get Framed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
