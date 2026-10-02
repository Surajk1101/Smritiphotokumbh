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
  initialService = 'Wedding Photography & Video',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService);
  const [location, setLocation] = useState('Ghaziabad & Khora Colony');
  const [date, setDate] = useState('');
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const insta = parseInstagram(shopInfo.instagram);
  const filmsInsta = parseInstagram(shopInfo.instagramFilms || 'https://www.instagram.com/molshreefilms');

  // Update service if prop changes
  React.useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');

  const handleBookingSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 1. Image ke according saare input values capture karein
    const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value || (document.getElementById('name') as HTMLInputElement)?.value || name;
    const phoneVal = (document.getElementById('phone') as HTMLInputElement)?.value || phone;
    const serviceVal = (document.getElementById('service') as HTMLSelectElement)?.value || service;
    const locationVal = (document.getElementById('location') as HTMLSelectElement)?.value || location;
    const dateVal = (document.getElementById('date') as HTMLInputElement)?.value || date;
    const requirementsVal = (document.getElementById('requirements') as HTMLTextAreaElement)?.value || requirements;

    if (!fullName.trim() || !phoneVal.trim()) return;

    setIsSubmitting(true);

    const scriptURL = (shopInfo.googleScriptUrl && shopInfo.googleScriptUrl.trim()) || "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; // Yahan step 2 ka URL dalein

    // 2. Google Sheet mai data bhejein
    try {
      if (scriptURL && scriptURL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE" && scriptURL.startsWith('http')) {
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            phone: phoneVal,
            service: serviceVal,
            location: locationVal,
            date: dateVal,
            requirements: requirementsVal
          })
        });
      }
    } catch (error) {
      console.error('Sheet Save Error:', error);
    }

    // Save lead to local storage
    try {
      const newInquiry = {
        id: Date.now().toString(),
        name: fullName,
        fullName,
        phone: phoneVal,
        service: serviceVal,
        location: locationVal,
        date: dateVal,
        message: requirementsVal,
        requirements: requirementsVal,
        createdAt: new Date().toLocaleString(),
      };
      const existing = JSON.parse(localStorage.getItem('smriti_inquiries') || '[]');
      localStorage.setItem('smriti_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {
      // Ignore localStorage write error
    }

    // 3. WhatsApp Redirection karein
    const whatsappNumber = cleanWhatsapp || "919718282455"; // Apna WhatsApp Business Number country code ke sath dalein
    const message = `*New Booking Request*%0A%0A` +
                    `*Name:* ${encodeURIComponent(fullName)}%0A` +
                    `*Phone:* ${encodeURIComponent(phoneVal)}%0A` +
                    `*Service:* ${encodeURIComponent(serviceVal)}%0A` +
                    `*Location:* ${encodeURIComponent(locationVal)}%0A` +
                    `*Date:* ${encodeURIComponent(dateVal || 'Flexible')}%0A` +
                    `*Requirements:* ${encodeURIComponent(requirementsVal || 'General Booking Inquiry')}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>Bookings &amp; Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] text-slate-900 tracking-tight">
            Get In Touch With {shopInfo.name}
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Planning a wedding, need studio portraits, or want custom photo frames? Contact us directly or choose your location and fill out the booking form below.
          </p>

          {/* Locations Quick Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-xs mt-2">
            <span className="font-bold text-amber-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              We Cover:
            </span>
            <span>Ghaziabad • Noida • Indirapuram • Vaishali • Vasundhara • Greater Noida • Delhi NCR</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-rose-700">🏔️ Destination Weddings: Rishikesh • Jim Corbett • Mussoorie • Triyuginarayan • Haridwar</span>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Studio Map */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-7 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] border-b border-slate-200 pb-3">
                Studio Contact Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-500">Shop Location:</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    {shopInfo.address}
                  </div>
                  <div className="text-xs text-amber-700 mt-0.5 font-medium">
                    {shopInfo.city}, {shopInfo.state}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${shopInfo.address}, ${shopInfo.city}, ${shopInfo.state}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 hover:bg-amber-100 transition-all font-semibold text-xs cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">Call Directly:</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <a
                      href="tel:+919718282455"
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-700 transition-colors"
                    >
                      +91 97182 82455
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href="tel:+919718382455"
                      className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-700 transition-colors"
                    >
                      97183 82455
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    Office Desk: <a href="tel:+919718482455" className="underline hover:text-slate-900">9718482455</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">WhatsApp Instant Connect:</div>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                      'Hello Smriti Photo Kumbh! I would like to inquire about photography and framing.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors block mt-0.5"
                  >
                    Chat on WhatsApp ({shopInfo.whatsapp})
                  </a>
                  <span className="text-[11px] text-slate-500">Fast quotes, photo uploads &amp; sample designs</span>
                </div>
              </div>

              {/* Instagram Official Handles */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-200 shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-500">Instagram Official Handles:</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={insta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-pink-700 hover:text-pink-800 transition-colors inline-flex items-center gap-1"
                      title="Follow Photography Account"
                    >
                      <span>{insta.handle}</span>
                      <span className="text-[10px] text-pink-500 font-medium">(Photos)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={filmsInsta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-rose-700 hover:text-rose-800 transition-colors inline-flex items-center gap-1"
                      title="Follow Cinema & Films Account"
                    >
                      <span>{filmsInsta.handle}</span>
                      <span className="text-[10px] text-rose-500 font-medium">(Films)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <span className="block text-[11px] text-slate-500">
                    Latest wedding reels, bridal teasers, pre-wedding films &amp; BTS
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">Email Studio:</div>
                  <a
                    href={`mailto:${shopInfo.email}?subject=Photography%20or%20Framing%20Inquiry`}
                    className="text-sm font-bold text-slate-900 hover:text-amber-700 transition-colors block mt-0.5 break-all"
                  >
                    {shopInfo.email}
                  </a>
                  <span className="text-[11px] text-slate-500">Inquiries, bulk framing orders &amp; wedding briefs</span>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">Operating Hours:</div>
                  <div className="text-xs text-slate-700 mt-0.5 font-medium">
                    {shopInfo.hours}
                  </div>
                </div>
              </div>
            </div>

            {/* Areas & Shoot Locations We Cover Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 text-left space-y-4 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                      Service Locations &amp; Shoot Coverage
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Locations We Cover
                    </h4>
                  </div>
                </div>
              </div>

              {/* Delhi NCR Coverage */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Delhi NCR &amp; Local Cities (Studio &amp; Venue Shoots):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Ghaziabad',
                    'Khora Colony (Studio)',
                    'Noida (Sector 62 & All Sectors)',
                    'Indirapuram',
                    'Vaishali',
                    'Vasundhara',
                    'Greater Noida',
                    'Noida Extension',
                    'Delhi NCR',
                  ].map((loc) => (
                    <span key={loc} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200/90">
                      📍 {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Uttarakhand Destination Weddings */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Uttarakhand Destination Weddings (Full Crew Travel):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Rishikesh (Riverside & Beach)',
                    'Jim Corbett (Jungle Resorts)',
                    'Mussoorie (Hilltop Weddings)',
                    'Triyuginarayan Temple (Sacred Fire)',
                    'Haridwar & Dehradun',
                  ].map((loc) => (
                    <span key={loc} className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-900 text-[11px] font-semibold border border-rose-200">
                      🏔️ {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pan-India & Travel Note */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-[11px] text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 mb-1">
                  ✈️ Studio Visits &amp; Travel Across India:
                </p>
                Walk in to our studio in Khora Colony, Ghaziabad for studio portraits, passport prints, and handcrafted framing. For weddings, celebrations, and outdoor shoots across Delhi NCR, Uttarakhand, or anywhere in India, our crew travels directly to your venue with 4K cameras and drone units.
              </div>
            </div>
          </div>

          {/* Right Column: Direct Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg text-left">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                    Thank You, {name}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been submitted and sent to our studio WhatsApp. Our team will review the slot and confirm your session shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                      Book a Shoot or Request Custom Framing
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out the details below. We will immediately connect with you on phone/WhatsApp.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-600" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-600" />
                        <span>WhatsApp / Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Service Required *</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden cursor-pointer"
                    >
                      <optgroup label="💍 Weddings & Romance">
                        <option value="Wedding Photography & Video">Wedding Photography</option>
                        <option value="Pre-Wedding Photography & Film">Pre-Wedding Photography</option>
                        <option value="Engagement Photography">Engagement Photography</option>
                        <option value="Wedding Reception Photography">Wedding Reception Photography</option>
                        <option value="Anniversary Photo Shoots">Anniversary Photo Shoots</option>
                      </optgroup>
                      <optgroup label="📷 Studio & Milestone Services">
                        <option value="Maternity Photo Shoot">Maternity Photo Shoot</option>
                        <option value="Baby, Kids & Milestone Shoots">Baby, Kids &amp; Milestone Shoots</option>
                        <option value="Family & Studio Portraits">Family &amp; Studio Portraits</option>
                        <option value="4K Drone Aerial Videography">4K Drone Aerial Video</option>
                        <option value="Handcrafted Framing & Canvas Order">Handcrafted Photo Framing</option>
                        <option value="Old Ancestral Photo Restoration">Old Photo Repair &amp; Restoration</option>
                        <option value="Complete Grand Wedding Package">Complete Grand Wedding Package</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Shoot Location & Approximate Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>Event / Shoot Location *</span>
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden cursor-pointer"
                      >
                        <optgroup label="📍 Delhi NCR & Local Cities">
                          <option value="Ghaziabad (City & Khora Colony Studio)">Ghaziabad (Khora Colony Studio & City)</option>
                          <option value="Noida (Sector 62, 18 & All Sectors)">Noida (Sec-62, 18 & All Sectors)</option>
                          <option value="Indirapuram, Vaishali & Vasundhara">Indirapuram, Vaishali &amp; Vasundhara</option>
                          <option value="Greater Noida & Noida Extension">Greater Noida &amp; Noida Extension</option>
                          <option value="Delhi NCR (East, South, Central & NCR)">Delhi NCR (East, South &amp; Central)</option>
                        </optgroup>
                        <optgroup label="🏔️ Uttarakhand Destination Weddings">
                          <option value="Rishikesh (Riverside & Resort Weddings)">Rishikesh, Uttarakhand (Riverside &amp; Beach)</option>
                          <option value="Jim Corbett (Resort & Jungle Weddings)">Jim Corbett, Uttarakhand (Resort Weddings)</option>
                          <option value="Mussoorie (Hilltop & Mountain Weddings)">Mussoorie, Uttarakhand (Hilltop Weddings)</option>
                          <option value="Triyuginarayan Temple (Sacred Vedic Wedding)">Triyuginarayan Temple (Sacred Vedic Wedding)</option>
                          <option value="Haridwar & Dehradun, Uttarakhand">Haridwar &amp; Dehradun, Uttarakhand</option>
                        </optgroup>
                        <optgroup label="📷 Studio & Custom Travel">
                          <option value="In-Studio Visit (Khora Colony, Ghaziabad)">In-Studio Visit (Khora Colony, Ghaziabad)</option>
                          <option value="Other Destination in India (Custom Travel)">Other Destination in India (Custom Travel)</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>Approximate Date</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Message & Special Instructions */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Special Requirements / Event &amp; Venue details:
                    </label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="e.g. Wedding celebration, need 2 photographers and drone video, plus framed albums."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-booking-form"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-black text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md shadow-amber-500/20 hover:scale-[1.005] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-950" />
                    <span>{isSubmitting ? 'Sending Booking Request...' : 'Send Booking Request on WhatsApp'}</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
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
