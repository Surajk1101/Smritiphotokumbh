import React from 'react';
import { ShopInfo } from '../../types/studio';
import { Camera, Youtube, Phone, MapPin, Mail, MessageCircle, Heart, ArrowUp, Instagram } from 'lucide-react';
import { parseInstagram } from '../../utils/instagram';

interface StudioFooterProps {
  shopInfo: ShopInfo;
  onOpenSettings: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({
  shopInfo,
  onOpenSettings,
}) => {
  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const insta = parseInstagram(shopInfo.instagram);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt={`${shopInfo.name} Logo`}
                className="w-10 h-10 rounded-xl shadow-md shadow-orange-500/20 shrink-0 object-cover"
              />
              <div>
                <span className="text-lg font-bold text-white font-['Outfit'] block">
                  {shopInfo.name}
                </span>
                <span className="text-[11px] text-amber-400 font-semibold">
                  {shopInfo.hindiName}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              {shopInfo.tagline}. Dedicated to capturing the sacred essence of Kumbh Mela, eternal wedding celebrations, and crafting museum-grade photo frames.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-colors"
                title={`Instagram: ${insta.handle}`}
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={shopInfo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 flex items-center justify-center transition-colors"
                title="Smriti Photo Kumbh YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-amber-400 flex items-center justify-center transition-colors"
                title="Call Studio"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Studio Specialties
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Traditional Studio & Family Portraits</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Ganga Maha Aarti & Cultural Photography</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">4K Cinematic Wedding Films</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Licensed Drone Videography</a></li>
              <li><a href="#framing" className="hover:text-amber-400 transition-colors">Antique Gold & Teak Framing</a></li>
              <li><a href="#framing" className="hover:text-amber-400 transition-colors">Ancestral Photo Restoration</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation & YouTube */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home Showcase</a></li>
              <li><a href="#youtube-showcase" className="hover:text-amber-400 transition-colors">Featured YouTube Video</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Photo Portfolio Gallery</a></li>
              <li><a href="#packages" className="hover:text-amber-400 transition-colors">Shoot Packages</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Our Studio</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Book Photographer</a></li>
            </ul>
          </div>

          {/* Col 4: Visit & Contact */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Visit Our Shop
            </h4>
            <div className="space-y-2.5 text-neutral-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.state}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors"
                  title="Open in Google Maps"
                >
                  {shopInfo.address}, {shopInfo.city}, {shopInfo.state}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white">{shopInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${shopInfo.email}`} className="hover:text-amber-300 transition-colors break-all">
                  {shopInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={insta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 text-neutral-300 font-semibold transition-colors"
                >
                  {insta.handle}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSettings}
                className="text-[11px] text-neutral-500 hover:text-amber-400 underline cursor-pointer"
              >
                Customize Studio Info & Numbers
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} {shopInfo.name} ({shopInfo.hindiName}). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500 flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for sacred memories
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
