import React from 'react';
import { StudioPackage, ShopInfo } from '../../types/studio';
import { Check, Star, ArrowRight, Gift, Sparkles } from 'lucide-react';

interface StudioPackagesProps {
  packages: StudioPackage[];
  shopInfo: ShopInfo;
  onSelectPackage: (packageName: string) => void;
}

export const StudioPackages: React.FC<StudioPackagesProps> = ({
  packages,
  shopInfo,
  onSelectPackage,
}) => {
  return (
    <section id="packages" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Popular Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
            Simple &amp; Clear Studio Packages
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choose the right photography and video package for your event. All packages include full editing, all digital photos, and keepsake albums.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white border-2 border-amber-400 shadow-xl md:-translate-y-2 ring-1 ring-amber-300'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs whitespace-nowrap ${
                    pkg.popular
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold'
                  }`}
                >
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Package Name & Tagline */}
                <div className="text-left mb-6">
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>
                </div>

                {/* Package Status & Inquiries */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    Custom Quote on Request
                  </span>
                  <span className="text-xs text-slate-500 font-medium">All-Inclusive</span>
                </div>

                {/* Included Features */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    What's Included:
                  </div>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Physical Deliverables */}
                {pkg.deliverables.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-slate-200 mb-8">
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      <span>Included Free Gifts &amp; Prints:</span>
                    </div>
                    {pkg.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  pkg.popular
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                }`}
              >
                <span>Book This Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

        {/* Custom Booking Note */}
        <div className="mt-12 text-center text-xs text-slate-600 max-w-xl mx-auto">
          Need a customized package for multi-day events or specific requirements?{' '}
          <a
            href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'Hello! I would like to inquire about booking custom photography and video coverage.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="text-amber-700 underline font-bold hover:text-amber-800"
          >
            Chat with us directly on WhatsApp
          </a>.
        </div>

      </div>
    </section>
  );
};
