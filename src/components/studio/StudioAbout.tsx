import React from 'react';
import { ShopInfo } from '../../types/studio';
import { Camera, Award, ShieldCheck, Heart, MapPin, Users } from 'lucide-react';

interface StudioAboutProps {
  shopInfo: ShopInfo;
}

export const StudioAbout: React.FC<StudioAboutProps> = ({
  shopInfo,
}) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Studio Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Primary Large Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-200 aspect-[3/4] bg-slate-100 relative group">
                <img
                  src="/images/instagram_heritage_couple.jpg"
                  alt="Smriti Photo Kumbh - Official Instagram Post (@samriddhi.photo)"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs pointer-events-none drop-shadow-md font-medium">
                  Traditional Wedding Ceremony • Photography &amp; Video by Smriti Photo Kumbh
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white text-slate-900 p-5 rounded-2xl border-2 border-amber-400 shadow-xl max-w-[210px] text-left">
                <div className="text-3xl font-black text-amber-600 font-['Outfit']">15+ Years</div>
                <div className="text-xs font-semibold text-slate-600 mt-0.5">
                  Preserving precious memories in {shopInfo.city}
                </div>
              </div>

              {/* Floating Award Chip */}
              <div className="absolute -top-4 -left-4 bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-950" />
                <span>Trusted Local Studio</span>
              </div>

            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span>About Our Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] leading-tight tracking-tight">
              Capturing Your Family Moments For Over 15 Years
            </h2>

            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed">
              Founded in {shopInfo.establishedYear}, <strong className="text-slate-900 font-bold">{shopInfo.name}</strong> has been trusted by families across {shopInfo.city} to photograph weddings, ceremonies, birthdays, and special milestones.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We believe great photography should be relaxed, natural, and timeless. Whether you are planning a grand wedding or want a beautiful framed portrait for your living room, our team is here to give you memories you will love looking back on.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Experienced Photographers</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Friendly, patient photographers who know how to capture genuine smiles, candid emotions, and important family rituals comfortably.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>Modern Gear &amp; Quick Delivery</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipped with full-frame cameras, 4K video drones, and our own local printing shop for fast turnaround on frames and albums.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
