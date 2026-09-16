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
    <footer className="bg-[#0B0C0E] text-[#C5CAD6] border-t border-[#262A36] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={`${shopInfo.name} Logo`}
                className="w-11 h-11 rounded-xl shadow-md border border-[#262A36] bg-[#161922] p-0.5 shrink-0 object-contain"
              />
              <div>
                <span className="text-lg font-bold text-white font-['Outfit'] block">
                  {shopInfo.name}
                </span>
                <span className="text-[11px] text-[#E5A93C] font-semibold tracking-wide">
                  Fine-Art Photography &amp; Cinematography
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8E95A5] leading-relaxed">
              {shopInfo.tagline}. Dedicated to crafting timeless wedding films, heirloom portraits, and museum-grade framing across Ghaziabad, Noida, and Delhi NCR.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#161922] border border-[#262A36] hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-colors text-[#C5CAD6]"
                title={`Instagram: ${insta.handle}`}
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={shopInfo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#161922] border border-[#262A36] hover:border-red-500 hover:text-red-400 flex items-center justify-center transition-colors text-[#C5CAD6]"
                title="Smriti Photo Kumbh YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#161922] border border-[#262A36] hover:border-emerald-500 hover:text-emerald-400 flex items-center justify-center transition-colors text-[#C5CAD6]"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-8 h-8 rounded-lg bg-[#161922] border border-[#262A36] hover:border-[#E5A93C] hover:text-[#E5A93C] flex items-center justify-center transition-colors text-[#C5CAD6]"
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
            <ul className="space-y-2 text-[#8E95A5]">
              <li><a href="#services" className="hover:text-[#E5A93C] transition-colors">Traditional Studio &amp; Family Portraits</a></li>
              <li><a href="#services" className="hover:text-[#E5A93C] transition-colors">Ganga Maha Aarti &amp; Cultural Photography</a></li>
              <li><a href="#services" className="hover:text-[#E5A93C] transition-colors">4K Cinematic Wedding Films</a></li>
              <li><a href="#services" className="hover:text-[#E5A93C] transition-colors">Licensed Drone Videography</a></li>
              <li><a href="#framing" className="hover:text-[#E5A93C] transition-colors">Antique Gold &amp; Teak Framing</a></li>
              <li><a href="#framing" className="hover:text-[#E5A93C] transition-colors">Ancestral Photo Restoration</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation & YouTube */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-[#8E95A5]">
              <li><a href="#home" className="hover:text-[#E5A93C] transition-colors">Home Showcase</a></li>
              <li><a href="#youtube-showcase" className="hover:text-[#E5A93C] transition-colors">Featured YouTube Video</a></li>
              <li><a href="#gallery" className="hover:text-[#E5A93C] transition-colors">Photo Portfolio Gallery</a></li>
              <li><a href="#packages" className="hover:text-[#E5A93C] transition-colors">Shoot Packages</a></li>
              <li><a href="#about" className="hover:text-[#E5A93C] transition-colors">About Our Studio</a></li>
              <li><a href="#contact" className="hover:text-[#E5A93C] transition-colors">Book Photographer</a></li>
            </ul>
          </div>

          {/* Col 4: Visit & Contact */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">
              Visit Our Shop
            </h4>
            <div className="space-y-2.5 text-[#C5CAD6] text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.state}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E5A93C] transition-colors"
                  title="Open in Google Maps"
                >
                  {shopInfo.address}, {shopInfo.city}, {shopInfo.state}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white">{shopInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href={`mailto:${shopInfo.email}`} className="hover:text-[#E5A93C] transition-colors break-all">
                  {shopInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={insta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-400 text-white font-semibold transition-colors"
                >
                  {insta.handle}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSettings}
                className="text-[11px] text-[#8E95A5] hover:text-[#E5A93C] underline cursor-pointer"
              >
                Customize Studio Info &amp; Numbers
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#262A36] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8E95A5]">
            © {new Date().getFullYear()} {shopInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[#8E95A5] flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for sacred memories
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#161922] hover:bg-[#262A36] text-[#C5CAD6] hover:text-white border border-[#262A36] transition-colors cursor-pointer"
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
