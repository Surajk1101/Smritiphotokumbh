import React, { useState } from 'react';
import { printSizeOptions, frameTypeOptions } from '../../data/studioData';
import { ShopInfo } from '../../types/studio';
import { Frame, Check, Sparkles, MessageCircle, Ruler, ShieldAlert, Palette } from 'lucide-react';

interface PrintEstimatorProps {
  shopInfo: ShopInfo;
  onOrderFrame: (summary: string) => void;
}

export const PrintEstimator: React.FC<PrintEstimatorProps> = ({
  shopInfo,
  onOrderFrame,
}) => {
  const [selectedSize, setSelectedSize] = useState(printSizeOptions[1]); // Default 12x18
  const [selectedFrame, setSelectedFrame] = useState(frameTypeOptions[1]); // Default Royal Carved Gold
  const [finish, setFinish] = useState<'Matte Silk' | 'High Gloss' | 'Sparkle Velvet'>('Matte Silk');
  const [previewPhoto, setPreviewPhoto] = useState('/images/wedding_jaimala_gaze.jpg');

  const samplePhotos = [
    { src: '/images/wedding_jaimala_gaze.jpg', label: 'Sacred Varmala Gaze' },
    { src: '/images/wedding_varmala_closeup.jpg', label: 'Varmala Close-up' },
    { src: '/images/instagram_heritage_couple.jpg', label: 'Royal Couple' },
    { src: '/images/instagram_featured_post.jpg', label: 'Royal Ceremony' },
  ];

  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const orderSummaryText = `Custom Frame Inquiry: Size ${selectedSize.dimensions}, Style ${selectedFrame.name}, Finish ${finish}`;

  return (
    <section id="framing" className="py-20 bg-amber-50/40 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/70 border border-amber-300 text-amber-950 text-xs font-bold uppercase tracking-wider">
            <Frame className="w-3.5 h-3.5 text-amber-800" />
            <span>In-House Handcrafted Framing Workshop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-['Outfit']">
            Custom Photo Framing & Canvas Studio
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Have a cherished family photograph, wedding portrait, or ancestral art? Choose your dimensions and frame styling for custom crafting and workshop delivery.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Size, Frame, Finish */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Choose Size */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span>1. Select Photo Size</span>
                </h3>
                <span className="text-xs text-neutral-500 font-medium">Standard & Custom Sizes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {printSizeOptions.map((option) => (
                  <button
                    key={option.size}
                    onClick={() => setSelectedSize(option)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedSize.size === option.size
                        ? 'border-amber-500 bg-amber-50/50 text-neutral-950 font-semibold ring-2 ring-amber-400/20'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{option.dimensions}</div>
                      <div className="text-[11px] text-neutral-500 line-clamp-1">{option.description}</div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 shrink-0 ml-2 bg-amber-100 px-2 py-0.5 rounded-md">
                      Selected
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Frame Molding Type */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Frame className="w-4 h-4 text-amber-600" />
                  <span>2. Choose Frame Molding / Material</span>
                </h3>
                <span className="text-xs text-amber-700 font-semibold">{selectedFrame.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {frameTypeOptions.map((f) => (
                  <button
                    key={f.type}
                    onClick={() => setSelectedFrame(f)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFrame.type === f.type
                        ? 'border-amber-500 bg-amber-50/50 text-neutral-950 font-semibold ring-2 ring-amber-400/20'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-neutral-900">{f.name}</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">{f.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Finish / Lamination */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>3. Protective Surface Finish</span>
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {(['Matte Silk', 'High Gloss', 'Sparkle Velvet'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFinish(item)}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      finish === item
                        ? 'border-amber-500 bg-amber-600 text-white shadow-xs'
                        : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Frame Preview & Specifications */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-800 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Workshop Specifications</span>
                </span>
                <span className="text-[11px] text-neutral-400">Ready in 24–48 Hours</span>
              </div>

              {/* Visual Simulated Frame Box */}
              <div className="space-y-3">
                <div className="relative p-5 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center min-h-[220px]">
                  <div
                    className={`relative p-3 rounded-md transition-all duration-300 shadow-2xl flex items-center justify-center ${
                      selectedFrame.type === 'carved-gold'
                        ? 'bg-gradient-to-tr from-amber-700 via-yellow-500 to-amber-600 border-4 border-amber-300'
                        : selectedFrame.type === 'teak-wood'
                        ? 'bg-amber-900 border-4 border-amber-950'
                        : selectedFrame.type === 'acrylic-glass'
                        ? 'bg-sky-200/20 border-2 border-white/40 backdrop-blur-md'
                        : selectedFrame.type === 'canvas-wrap'
                        ? 'bg-stone-300 border-0 shadow-inner'
                        : 'bg-neutral-900 border-4 border-neutral-800'
                    }`}
                    style={{ width: '82%', aspectRatio: '16/11' }}
                  >
                    <div className="w-full h-full bg-neutral-800 rounded-xs overflow-hidden relative">
                      <img
                        key={previewPhoto}
                        src={previewPhoto}
                        alt="Handcrafted Frame Preview - Wedding Portrait"
                        className="w-full h-full object-cover filter brightness-95"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                        <span className="text-[10px] text-white font-medium">
                          {selectedSize.dimensions} • {selectedFrame.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Switch sample photo for preview */}
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-[11px] text-neutral-400 font-medium">Preview photo:</span>
                  <div className="flex gap-1.5">
                    {samplePhotos.map((photo) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setPreviewPhoto(photo.src)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          previewPhoto === photo.src
                            ? 'bg-amber-400 text-neutral-950 font-bold'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {photo.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frame Specifications Details */}
              <div className="space-y-2.5 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Selected Dimensions:</span>
                  <span className="font-semibold text-white">{selectedSize.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Frame Style:</span>
                  <span className="font-semibold text-white">{selectedFrame.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Lamination Finish:</span>
                  <span className="font-semibold text-white">{finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Protection:</span>
                  <span className="font-semibold text-emerald-400">Anti-Scratch & Fade-Proof Inks</span>
                </div>
                
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-400">Workshop Pricing</div>
                    <div className="text-sm font-bold text-amber-400 font-['Outfit']">
                      Custom Quote on Inquiry
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400">Same-Day Pickup Available</span>
                </div>
              </div>

              {/* Order Actions */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    `Hello Smriti Photo Kumbh! I would like to inquire about: ${orderSummaryText}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  id="btn-order-frame-whatsapp"
                  className="w-full py-3 rounded-xl font-bold text-xs text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire Frame via WhatsApp</span>
                </a>

                <button
                  onClick={() => onOrderFrame(orderSummaryText)}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  <span>Submit Custom Framing Inquiry</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
