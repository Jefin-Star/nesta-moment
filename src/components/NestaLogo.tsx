import React from 'react';

interface NestaLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showSubtitle?: boolean;
}

export const NestaLogo: React.FC<NestaLogoProps> = ({
  className = 'h-10',
  theme = 'auto',
  showSubtitle = true,
}) => {
  // Color configuration: deep navy as in the uploaded logo, or crisp white on dark
  const textColor =
    theme === 'light'
      ? 'text-[#192652]'
      : theme === 'dark'
      ? 'text-white'
      : 'text-white';

  const subColor =
    theme === 'light'
      ? 'text-[#24356e]'
      : theme === 'dark'
      ? 'text-slate-300'
      : 'text-blue-200/80';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Brand typographic mark matching the uploaded official NESTA MOVEMENT logo */}
      <div className="flex items-center tracking-tighter leading-none font-black font-display">
        <span
          className={`text-2xl md:text-3xl font-extrabold tracking-[-0.03em] ${textColor} transition-colors`}
          style={{ letterSpacing: '-0.02em', fontWeight: 900 }}
        >
          NESTA
        </span>
      </div>
      {showSubtitle && (
        <span
          className={`text-[9px] md:text-[10px] uppercase font-bold tracking-[0.32em] -mt-0.5 ${subColor} pl-1`}
          style={{ letterSpacing: '0.34em' }}
        >
          MOVEMENT
        </span>
      )}
    </div>
  );
};
