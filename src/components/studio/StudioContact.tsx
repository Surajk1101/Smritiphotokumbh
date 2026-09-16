import React, { useState } from 'react';
import { ShopInfo } from '../../types/studio';
import { Phone, MapPin, Clock, Mail, MessageCircle, Send, CheckCircle2, Calendar, User, FileText, ExternalLink, Navigation, Instagram } from 'lucide-react';
import { parseInstagram } from '../../utils/instagram';

interface StudioContactProps {
  shopInfo: ShopInfo;
  initialService?: string;
}

export const StudioContact: React.FC<StudioContactProps> = ({
  shopInfo,
  initialService = 'Cinematic Wedding & Pre-Wedding Film',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const insta = parseInstagram(shopInfo.instagram);

  // Update service if prop changes
  React.useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Save lead to local storage
    const newInquiry = {
      id: Date.now().toString(),
      name,
      phone,
      service,
      date,
      message,
      createdAt: new Date().toLocaleString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('smriti_inquiries') || '[]');
      localStorage.setItem('smriti_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {
      // Ignore localStorage write error
    }

    // Prepare WhatsApp Message
    const formattedText = `*New Booking Request for Smriti Photo Kumbh*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Service Required:* ${service}\n` +
      `*Date of Visit:* ${date || 'Flexible'}\n` +
      `*Details:* ${message || 'Looking for package details and photographer availability.'}`;

    // Open WhatsApp
    const waUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#0B0C0E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/35 text-[#E5A93C] text-xs font-black uppercase tracking-wider shadow-xs">
            <span>Inquiries &amp; Commissions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-white tracking-tight">
            Begin Your Story With {shopInfo.name}
          </h2>
          <p className="text-base sm:text-lg font-semibold text-[#C5CAD6] max-w-2xl mx-auto leading-relaxed">
            Whether preparing for a grand wedding celebration, reserving an in-studio portrait session, or commissioning bespoke archival frames, our team is at your service.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Studio Map */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-7 rounded-3xl bg-[#161922] border border-[#262A36] space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white font-['Outfit'] border-b border-[#262A36] pb-3">
                Studio Contact Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-[#8E95A5]">Shop Location:</div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {shopInfo.address}
                  </div>
                  <div className="text-xs text-[#E5A93C] mt-0.5 font-medium">
                    {shopInfo.city}, {shopInfo.state}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.state}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-lg bg-[#12141A] border border-[#E5A93C]/40 text-[#E5A93C] hover:bg-[#E5A93C] hover:text-[#0B0C0E] transition-all font-semibold text-xs cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8E95A5]">Call Directly:</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <a
                      href="tel:+919718282455"
                      className="text-sm sm:text-base font-bold text-white hover:text-[#E5A93C] transition-colors"
                    >
                      +91 97182 82455
                    </a>
                    <span className="text-[#8E95A5]">•</span>
                    <a
                      href="tel:+919718382455"
                      className="text-sm sm:text-base font-bold text-white hover:text-[#E5A93C] transition-colors"
                    >
                      97183 82455
                    </a>
                  </div>
                  <div className="text-[11px] text-[#E5A93C] mt-0.5 font-medium">
                    Office Desk: <a href="tel:+919718482455" className="underline hover:text-white">9718482455</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8E95A5]">WhatsApp Instant Connect:</div>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                      'Hello Smriti Photo Kumbh! I would like to inquire about photography and framing.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors block mt-0.5"
                  >
                    Chat on WhatsApp ({shopInfo.whatsapp})
                  </a>
                  <span className="text-[11px] text-[#8E95A5]">Fast quotes, photo uploads &amp; sample designs</span>
                </div>
              </div>

              {/* Instagram Official Handle */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#12141A] text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30 shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8E95A5]">Instagram Official Handle:</div>
                  <a
                    href={insta.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-pink-400 hover:text-pink-300 transition-colors inline-flex items-center gap-1.5 mt-0.5"
                  >
                    <span>{insta.handle}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="block text-[11px] text-[#8E95A5]">
                    Latest wedding reels, pre-wedding teasers &amp; behind-the-scenes
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8E95A5]">Email Studio:</div>
                  <a
                    href={`mailto:${shopInfo.email}?subject=Photography%20or%20Framing%20Inquiry`}
                    className="text-sm font-bold text-white hover:text-[#E5A93C] transition-colors block mt-0.5 break-all"
                  >
                    {shopInfo.email}
                  </a>
                  <span className="text-[11px] text-[#8E95A5]">Inquiries, bulk framing orders &amp; wedding briefs</span>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/10 text-[#E5A93C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8E95A5]">Operating Hours:</div>
                  <div className="text-xs text-[#C5CAD6] mt-0.5">
                    {shopInfo.hours}
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Visit & Outdoor Shoot Note */}
            <div className="p-6 rounded-3xl bg-[#161922] border border-[#262A36] text-left space-y-2">
              <span className="text-xs font-bold text-[#E5A93C] uppercase tracking-wider">
                Studio Visit &amp; Outdoor Bookings
              </span>
              <h4 className="text-sm font-bold text-white">
                Visiting our Ghaziabad Studio or Booking On-Location?
              </h4>
              <p className="text-xs text-[#C5CAD6] leading-relaxed">
                Walk in to our studio in Khora Colony, Ghaziabad for studio portraits, passport prints, and handcrafted framing. For outdoor weddings, celebrations, and events, our photography crew travels directly to your venue with professional gear.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#161922] border border-[#262A36] shadow-2xl text-left">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">
                    Thank You, {name}!
                  </h3>
                  <p className="text-sm text-[#C5CAD6] max-w-md mx-auto leading-relaxed">
                    Your inquiry has been submitted and sent to our studio WhatsApp. Our team will review the slot and confirm your session shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-black text-[#0B0C0E] bg-gradient-to-r from-[#E5A93C] to-[#F3BA54] hover:brightness-110 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">
                      Book a Shoot or Request Custom Framing
                    </h3>
                    <p className="text-xs text-[#8E95A5] mt-1">
                      Fill out the details below. We will immediately connect with you on phone/WhatsApp.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#C5CAD6] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-[#12141A] border border-[#262A36] text-white placeholder-[#8E95A5] text-sm focus:border-[#E5A93C] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#C5CAD6] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>WhatsApp / Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#12141A] border border-[#262A36] text-white placeholder-[#8E95A5] text-sm focus:border-[#E5A93C] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Service Selection & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#C5CAD6] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Service Required</span>
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141A] border border-[#262A36] text-white text-sm focus:border-[#E5A93C] focus:outline-hidden cursor-pointer"
                      >
                        <option value="Cinematic Wedding & Pre-Wedding Film">Cinematic Wedding &amp; Pre-Wedding Film</option>
                        <option value="Traditional Studio & Family Portrait">Traditional Studio &amp; Family Portrait</option>
                        <option value="4K Drone Aerial Videography">4K Drone Aerial Videography</option>
                        <option value="Handcrafted Framing & Canvas Order">Handcrafted Framing &amp; Canvas Order</option>
                        <option value="Old Ancestral Photo Restoration">Old Ancestral Photo Restoration</option>
                        <option value="Maternity, Baby & Event Shoots">Maternity, Baby &amp; Event Shoots</option>
                        <option value="Grand Event & Celebration Documentary Package">Grand Event &amp; Celebration Documentary Package</option>
                        <option value="Royal Heritage Wedding Package">Royal Heritage Wedding Package</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#C5CAD6] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>Approximate Date</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#12141A] border border-[#262A36] text-white text-sm focus:border-[#E5A93C] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Message & Special Instructions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#C5CAD6]">
                      Special Requirements / Event &amp; Venue details:
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Wedding celebration, need 2 photographers and 4K drone videographer, plus framed prints."
                      className="w-full px-4 py-3 rounded-xl bg-[#12141A] border border-[#262A36] text-white placeholder-[#8E95A5] text-sm focus:border-[#E5A93C] focus:outline-hidden resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-booking-form"
                    className="w-full py-4 rounded-xl font-black text-sm text-[#0B0C0E] bg-gradient-to-r from-[#E5A93C] to-[#F3BA54] hover:brightness-110 shadow-lg shadow-[#E5A93C]/25 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#0B0C0E]" />
                    <span>Send Booking Request &amp; Connect on WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-center text-[#8E95A5]">
                    We will reply within 15–30 minutes with slot confirmation and local directions.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
