import React from 'react';

interface NestaLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'navy' | 'auto';
  variant?: 'inline' | 'badge' | 'img';
  showSubtitle?: boolean;
}

export const NestaLogo: React.FC<NestaLogoProps> = ({
  className = 'h-10',
  theme = 'auto',
  variant = 'inline',
  showSubtitle = true,
}) => {
  // Brand official navy color from uploaded logo
  const brandNavy = '#19264E';
  
  const resolvedColor =
    theme === 'light' || theme === 'navy'
      ? brandNavy
      : theme === 'dark'
      ? '#FFFFFF'
      : '#FFFFFF';

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center bg-white rounded-xl shadow-md px-3.5 py-2 select-none border border-slate-200/80 transition-transform ${className}`}
      >
        <span
          className="font-logo font-black text-xl sm:text-2xl leading-none text-[#19264E] tracking-[-0.025em]"
          style={{
            WebkitTextStroke: '1.2px #19264E',
            textRendering: 'geometricPrecision',
          }}
        >
          NESTA
        </span>
        {showSubtitle && (
          <span
            className="font-logo font-bold text-[8px] sm:text-[9px] uppercase leading-tight text-[#19264E] tracking-[0.34em] pl-1 mt-0.5"
            style={{
              WebkitTextStroke: '0.3px #19264E',
              textRendering: 'geometricPrecision',
            }}
          >
            MOVEMENT
          </span>
        )}
      </div>
    );
  }

  if (variant === 'img') {
    const imgSrc = theme === 'dark' ? '/nesta-logo-white.svg' : '/nesta-logo.svg';
    return (
      <img
        src={imgSrc}
        alt="Nesta Movement Logo"
        referrerPolicy="no-referrer"
        className={`object-contain select-none ${className}`}
      />
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Exact Eurostile/Michroma typographic mark matching nesta_edited.png */}
      <span
        className="font-logo font-black text-2xl sm:text-3xl leading-none transition-colors tracking-[-0.025em]"
        style={{
          color: resolvedColor,
          WebkitTextStroke: `1.4px ${resolvedColor}`,
          textRendering: 'geometricPrecision',
        }}
      >
        NESTA
      </span>
      {showSubtitle && (
        <span
          className="font-logo font-bold text-[8.5px] sm:text-[10px] uppercase leading-tight transition-colors tracking-[0.34em] pl-1.5 mt-0.5"
          style={{
            color: resolvedColor,
            WebkitTextStroke: `0.35px ${resolvedColor}`,
            textRendering: 'geometricPrecision',
          }}
        >
          MOVEMENT
        </span>
      )}
    </div>
  );
};
