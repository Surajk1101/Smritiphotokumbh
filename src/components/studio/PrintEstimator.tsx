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
    { src: '/images/instagram_post_mehndi.jpg', label: 'Bridal Mehndi' },
    { src: '/images/indian_haldi_ceremony.jpg', label: 'Haldi Dance' },
    { src: '/images/wedding_varmala_closeup.jpg', label: 'Varmala Close-up' },
    { src: '/images/instagram_heritage_couple.jpg', label: 'Royal Couple' },
    { src: '/images/instagram_featured_post.jpg', label: 'Royal Ceremony' },
  ];

  const cleanWhatsapp = shopInfo.whatsapp.replace(/[^0-9]/g, '');
  const orderSummaryText = `Custom Frame Inquiry: Size ${selectedSize.dimensions}, Style ${selectedFrame.name}, Finish ${finish}`;

  return (
    <section id="framing" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Frame className="w-3.5 h-3.5 text-amber-600" />
            <span>Custom Photo Framing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Outfit'] tracking-tight">
            Photo Framing &amp; Canvas Prints
          </h2>
          <p className="text-base sm:text-lg font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Turn your favorite memories and family portraits into framed wall art. Choose your frame size, border style, and photo finish.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: Size, Frame, Finish */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Choose Size */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-amber-600" />
                  <span>1. Choose Photo Size</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Standard Sizes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {printSizeOptions.map((option) => (
                  <button
                    key={option.size}
                    onClick={() => setSelectedSize(option)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedSize.size === option.size
                        ? 'border-amber-400 bg-amber-50 text-slate-900 font-semibold ring-1 ring-amber-300 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{option.dimensions}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{option.description}</div>
                    </div>
                    {selectedSize.size === option.size && (
                      <span className="text-[10px] font-bold text-slate-950 shrink-0 ml-2 bg-amber-500 px-2 py-0.5 rounded-md">
                        Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Frame Molding Type */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Frame className="w-4 h-4 text-amber-600" />
                  <span>2. Choose Frame Style</span>
                </h3>
                <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">{selectedFrame.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {frameTypeOptions.map((f) => (
                  <button
                    key={f.type}
                    onClick={() => setSelectedFrame(f)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFrame.type === f.type
                        ? 'border-amber-400 bg-amber-50 text-slate-900 font-semibold ring-1 ring-amber-300 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{f.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{f.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Finish / Lamination */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>3. Choose Photo Surface Finish</span>
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {(['Matte Silk', 'High Gloss', 'Sparkle Velvet'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFinish(item)}
                    className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                      finish === item
                        ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100 bg-white'
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
            <div className="bg-white text-slate-900 rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Preview &amp; Details</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Ready in 24–48 Hours</span>
              </div>

              {/* Visual Simulated Frame Box */}
              <div className="space-y-3">
                <div className="relative p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center min-h-[220px]">
                  <div
                    className={`relative p-3 rounded-md transition-all duration-300 shadow-xl flex items-center justify-center ${
                      selectedFrame.type === 'carved-gold'
                        ? 'bg-gradient-to-tr from-amber-700 via-yellow-500 to-amber-600 border-4 border-amber-300'
                        : selectedFrame.type === 'teak-wood'
                        ? 'bg-amber-950 border-4 border-amber-900'
                        : selectedFrame.type === 'acrylic-glass'
                        ? 'bg-sky-200/50 border-2 border-white/80 backdrop-blur-md'
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
                  <span className="text-[11px] text-slate-500 font-medium">Sample photo:</span>
                  <div className="flex gap-1.5">
                    {samplePhotos.map((photo) => (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setPreviewPhoto(photo.src)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                          previewPhoto === photo.src
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {photo.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Frame Specifications Details */}
              <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Size:</span>
                  <span className="font-semibold text-slate-900">{selectedSize.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Frame Style:</span>
                  <span className="font-semibold text-slate-900">{selectedFrame.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Surface Finish:</span>
                  <span className="font-semibold text-slate-900">{finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Protection:</span>
                  <span className="font-semibold text-emerald-700">Waterproof &amp; Fade-Resistant Inks</span>
                </div>
                
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Price Estimate</div>
                    <div className="text-sm font-bold text-amber-700 font-['Outfit']">
                      Custom Quote on Inquiry
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">Fast Local Delivery</span>
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
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire Frame via WhatsApp</span>
                </a>

                <button
                  onClick={() => onOrderFrame(orderSummaryText)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
                >
                  <span>Submit Framing Inquiry</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
