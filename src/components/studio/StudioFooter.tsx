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
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={`${shopInfo.name} Logo`}
                className="w-11 h-11 rounded-xl shadow-xs border border-slate-200 bg-white p-0.5 shrink-0 object-contain"
              />
              <div>
                <span className="text-lg font-bold text-slate-900 font-['Outfit'] block">
                  {shopInfo.name}
                </span>
                <span className="text-[11px] text-amber-700 font-semibold tracking-wide">
                  Wedding Photography &amp; Custom Framing
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {shopInfo.tagline}. Dedicated to capturing joyful wedding moments, family portraits, and handcrafted photo framing across Ghaziabad, Noida, and Delhi NCR.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={insta.url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 hover:border-pink-500 hover:text-pink-600 flex items-center justify-center transition-colors text-slate-700"
                title={`Instagram: ${insta.handle}`}
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={shopInfo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 hover:border-red-500 hover:text-red-600 flex items-center justify-center transition-colors text-slate-700"
                title="Smriti Photo Kumbh YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center transition-colors text-slate-700"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`tel:${cleanPhone}`}
                className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 hover:border-amber-500 hover:text-amber-700 flex items-center justify-center transition-colors text-slate-700"
                title="Call Studio"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Outfit']">
              Studio Services
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#services" className="hover:text-amber-700 transition-colors">Wedding &amp; Pre-Wedding Photography</a></li>
              <li><a href="#services" className="hover:text-amber-700 transition-colors">Studio &amp; Family Portraits</a></li>
              <li><a href="#services" className="hover:text-amber-700 transition-colors">4K Drone Aerial Videography</a></li>
              <li><a href="#services" className="hover:text-amber-700 transition-colors">Handcrafted Photo Frames</a></li>
              <li><a href="#framing" className="hover:text-amber-700 transition-colors">Old Photo Repair &amp; Restoration</a></li>
              <li><a href="#packages" className="hover:text-amber-700 transition-colors">Photography Packages</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation & YouTube */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Outfit']">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#home" className="hover:text-amber-700 transition-colors">Home Showcase</a></li>
              <li><a href="#youtube-showcase" className="hover:text-amber-700 transition-colors">Wedding Highlights Film</a></li>
              <li><a href="#gallery" className="hover:text-amber-700 transition-colors">Photo Portfolio Gallery</a></li>
              <li><a href="#packages" className="hover:text-amber-700 transition-colors">Shoot Packages</a></li>
              <li><a href="#about" className="hover:text-amber-700 transition-colors">About Our Studio</a></li>
              <li><a href="#contact" className="hover:text-amber-700 transition-colors">Contact &amp; Booking</a></li>
            </ul>
          </div>

          {/* Col 4: Visit & Contact */}
          <div className="space-y-3 text-left">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-['Outfit']">
              Visit Our Shop
            </h4>
            <div className="space-y-2.5 text-slate-600 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.state}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-700 transition-colors"
                  title="Open in Google Maps"
                >
                  {shopInfo.address}, {shopInfo.city}, {shopInfo.state}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-slate-900 font-medium">{shopInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a href={`mailto:${shopInfo.email}`} className="hover:text-amber-700 transition-colors break-all">
                  {shopInfo.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                <a
                  href={insta.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-600 text-slate-900 font-semibold transition-colors"
                >
                  {insta.handle}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSettings}
                className="text-[11px] text-slate-500 hover:text-amber-700 underline cursor-pointer"
              >
                Customize Studio Info &amp; Numbers
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} {shopInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for unforgettable moments
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
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
