import React from 'react';
import { StudioService, ShopInfo } from '../../types/studio';
import { Waves, HeartHandshake, Camera, Plane, Frame, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface StudioServicesProps {
  services: StudioService[];
  shopInfo: ShopInfo;
  onSelectService: (serviceTitle: string) => void;
}

export const StudioServices: React.FC<StudioServicesProps> = ({
  services,
  shopInfo,
  onSelectService,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Waves':
        return <Waves className="w-6 h-6 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-600" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-amber-600" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-amber-600" />;
      case 'Frame':
        return <Frame className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600" />;
      default:
        return <Camera className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
            Our Photography &amp; Video Services
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need for your wedding, family ceremony, photo shoot, or custom photo framing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-3xl p-7 bg-slate-50/70 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:bg-white hover:-translate-y-1 ${
                service.popular
                  ? 'border-amber-400 shadow-md ring-1 ring-amber-300'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-xs tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div>
                {/* Icon Header */}
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5 shadow-xs">
                  {getIcon(service.icon)}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights list */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200 mb-6">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Action */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Customizable Package
                </span>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
