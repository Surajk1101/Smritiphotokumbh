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
    <section id="about" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Studio Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Primary Large Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] bg-neutral-900 relative group">
                <img
                  src="/images/instagram_heritage_couple.jpg"
                  alt="Smriti Photo Kumbh - Official Instagram Post (@samriddhi.photo)"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs pointer-events-none drop-shadow-md font-medium">
                  Royal Marriage Ceremony • In-House Wedding Cinematography
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-neutral-900 text-white p-5 rounded-2xl border-2 border-amber-400 shadow-xl max-w-[210px] text-left">
                <div className="text-3xl font-black text-amber-400 font-['Outfit']">15+ Years</div>
                <div className="text-xs font-semibold text-neutral-200 mt-0.5">
                  Preserving Sacred Memories in {shopInfo.city}
                </div>
              </div>

              {/* Floating Award Chip */}
              <div className="absolute -top-4 -left-4 bg-amber-400 text-neutral-950 px-3.5 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Premier Photography Studio</span>
              </div>

            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <span>Our Heritage & Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Outfit'] leading-tight">
              Where True Emotion Meets Modern Cinematic Artistry
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Established in {shopInfo.establishedYear}, <strong className="text-neutral-900">{shopInfo.name} ({shopInfo.hindiName})</strong> was born out of deep dedication to preserving the irreplaceable emotions of families, celebrations, and newlyweds.
            </p>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Whether documenting grand wedding celebrations, capturing multi-generational family milestones, or creating handcrafted custom wall portraits, our mission is to ensure life's most heartfelt moments are captured with artistic reverence, cinematic clarity, and delivered with museum-grade framing.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>Licensed & Professional</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Dedicated master team experienced in both in-studio portrait sessions and outdoor event coverage with courteous discipline.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 mb-1">
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>Master Gear & Labs</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Sony FX cinema rigs, DJI 4K aerial drones, and archival pigment printers for lifetime fade resistance.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
