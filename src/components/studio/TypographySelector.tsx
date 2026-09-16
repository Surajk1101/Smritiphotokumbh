import React from 'react';
import { FontPairId, FONT_PAIR_OPTIONS } from '../../types/typography';
import { Check, Sparkles, Type } from 'lucide-react';

interface TypographySelectorProps {
  currentPair: FontPairId;
  onSelect: (id: FontPairId) => void;
  compact?: boolean;
}

export const TypographySelector: React.FC<TypographySelectorProps> = ({
  currentPair,
  onSelect,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {FONT_PAIR_OPTIONS.map((opt) => {
          const isSelected = currentPair === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E5A93C]/15 border-[#E5A93C] text-white shadow-md shadow-[#E5A93C]/10'
                  : 'bg-[#161922] border-[#262A36] text-[#C5CAD6] hover:border-[#E5A93C]/40 hover:bg-[#1B1F2A]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#E5A93C]" />
                  {opt.name}
                </span>
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-[#E5A93C] text-[#0B0C0E] flex items-center justify-center text-[10px] font-black">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8E95A5] line-clamp-1">{opt.tagline}</p>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Type className="w-4 h-4 text-[#E5A93C]" />
            <span>Select Brand Typography Preset</span>
          </h4>
          <p className="text-xs text-[#8E95A5] mt-0.5">
            Instantly transforms all headings, navigation titles, and body copy across the entire studio.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {FONT_PAIR_OPTIONS.map((opt) => {
          const isSelected = currentPair === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1C202C] to-[#141720] border-[#E5A93C] shadow-lg shadow-[#E5A93C]/15 ring-1 ring-[#E5A93C]/50'
                  : 'bg-[#141720] border-[#262A36] hover:border-[#E5A93C]/40 hover:bg-[#181B26]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 bg-[#E5A93C] text-[#0B0C0E] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider flex items-center gap-1 shadow-sm">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Active Style</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#E5A93C]">
                    {opt.category}
                  </span>
                </div>

                <div className="font-bold text-white text-base group-hover:text-[#E5A93C] transition-colors">
                  {opt.name}
                </div>

                {/* Visual Sample Card */}
                <div className="p-3 rounded-xl bg-[#0B0C0E] border border-[#262A36]/80 my-2 space-y-1">
                  <div
                    className="text-lg text-white font-bold leading-tight"
                    style={{ fontFamily: opt.headlineFont }}
                  >
                    {opt.headlineSample}
                  </div>
                  <div
                    className="text-xs text-[#8E95A5]"
                    style={{ fontFamily: opt.bodyFont }}
                  >
                    Bespoke Wedding Cinematography &amp; Fine-Art Atelier
                  </div>
                </div>

                <p className="text-xs text-[#C5CAD6] leading-relaxed">
                  {opt.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#8E95A5]">
                  <span className="px-2 py-0.5 rounded bg-[#1B1F2A] border border-[#262A36] text-[#C5CAD6]">
                    H: {opt.headlineFont}
                  </span>
                  <span>+</span>
                  <span className="px-2 py-0.5 rounded bg-[#1B1F2A] border border-[#262A36] text-[#C5CAD6]">
                    Body: {opt.bodyFont}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
