import React, { useState } from 'react';
import { Camera, Phone, MapPin, Clock, Youtube, Instagram, MessageCircle, Menu, X, Settings, ArrowRight } from 'lucide-react';
import { ShopInfo } from '../../types/studio';
import { parseInstagram } from '../../utils/instagram';

interface StudioNavbarProps {
  shopInfo: ShopInfo;
  onOpenSettings: () => void;
  onBookClick: () => void;
}

export const StudioNavbar: React.FC<StudioNavbarProps> = ({
  shopInfo,
  onOpenSettings,
  onBookClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const insta = parseInstagram(shopInfo.instagram);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Videos', href: '#youtube-showcase' },
    { label: 'Instagram', href: '#instagram-banner' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Framing', href: '#framing' },
    { label: 'Packages', href: '#packages' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top Notice / Quick Contact Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Location & Hours */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="#contact"
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors truncate max-w-[240px] sm:max-w-md"
              title={`${shopInfo.address}, ${shopInfo.city}`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{shopInfo.address}, {shopInfo.city}</span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <span>{shopInfo.hours}</span>
            </span>
          </div>

          {/* Right: Instant Phone, Instagram & YouTube Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{shopInfo.phone}</span>
            </a>

            <a
              href={insta.url}
              target="_blank"
              rel="noreferrer"
              id="btn-nav-top-instagram"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-amber-500/20 text-pink-300 hover:text-white hover:from-pink-600 hover:to-rose-600 border border-pink-500/30 transition-all font-semibold text-[11px]"
              title={`Instagram: ${insta.handle}`}
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span>{insta.handle}</span>
            </a>

            <a
              href={shopInfo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 transition-all font-medium text-[11px]"
            >
              <Youtube className="w-3 h-3" />
              <span>Watch on YouTube</span>
            </a>

            <button
              onClick={onOpenSettings}
              id="btn-edit-shop-details"
              className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              title="Edit Shop Details"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
          
          {/* Logo Branding */}
          <a href="#home" id="studio-brand-logo" className="flex items-center gap-3 group shrink-0 select-none py-1">
            <img
              src="/logo.svg"
              alt={`${shopInfo.name} Logo`}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform shrink-0 object-cover"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight text-neutral-950 font-['Outfit'] whitespace-nowrap leading-none">
                  {shopInfo.name}
                </span>
                {shopInfo.hindiName && (
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300/80 whitespace-nowrap shadow-2xs">
                    {shopInfo.hindiName}
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-600 font-semibold tracking-tight whitespace-nowrap mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                <span>Professional Photography &amp; 4K Cinematography</span>
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3.5 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs xl:text-sm font-bold text-neutral-700 hover:text-orange-600 hover:bg-neutral-100/70 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                'Namaste Smriti Photo Kumbh! I visited your website and would like to inquire about photography and framing services.'
              )}`}
              target="_blank"
              rel="noreferrer"
              id="btn-nav-whatsapp"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>

            {/* Book a Shoot */}
            <button
              onClick={onBookClick}
              id="btn-nav-book-shoot"
              className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Book Shoot / Prints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Namaste Smriti Photo Kumbh!')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="btn-studio-mobile-toggle"
              className="p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-5 py-5 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-50 hover:text-orange-600"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
            <a
              href={insta.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow {insta.handle} on Instagram</span>
            </a>

            <a
              href={shopInfo.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700"
            >
              <Youtube className="w-4 h-4" />
              <span>Watch YouTube Channel Video</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600"
            >
              <span>Book a Photography Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Studio Settings & Management</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
