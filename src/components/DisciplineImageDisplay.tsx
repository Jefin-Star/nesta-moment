import React, { useState } from 'react';
import { DisciplineId } from '../types';
import { useDisciplineImages } from '../context/DisciplineImageContext';

interface DisciplineImageDisplayProps {
  disciplineId: DisciplineId;
  disciplineName: string;
  imageUrl: string;
  badgeText: string;
  monthlyFee: number;
  sessionsPerMonth: number;
}

export const DisciplineImageDisplay: React.FC<DisciplineImageDisplayProps> = ({
  disciplineId,
  disciplineName,
  imageUrl,
  badgeText,
  monthlyFee,
  sessionsPerMonth,
}) => {
  const { getAlignmentForDiscipline } = useDisciplineImages();
  const [loadFailed, setLoadFailed] = useState(false);

  // Load saved alignment for this discipline (zoom, pan offset, fit mode)
  const savedAlignment = getAlignmentForDiscipline(disciplineId);
  const zoom = savedAlignment?.zoom ?? 1;
  const panX = savedAlignment?.x ?? 0;
  const panY = savedAlignment?.y ?? 0;
  const fitMode = savedAlignment?.fit ?? 'cover';

  // Fallback to verified authentic studio photo if external CDN fails to load
  const imageSrc = loadFailed ? '/340d29bb-86d1-4808-b30f-7921d91256db.jpg' : imageUrl;

  // Discipline-specific accent glowing borders
  const accentBorderColor =
    disciplineId === 'parkour'
      ? 'hover:border-cyan-500/50 shadow-cyan-950/30'
      : disciplineId === 'calisthenics'
      ? 'hover:border-amber-500/50 shadow-amber-950/30'
      : disciplineId === 'yoga'
      ? 'hover:border-emerald-500/50 shadow-emerald-950/30'
      : 'hover:border-rose-500/50 shadow-rose-950/30';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[380px] sm:h-[460px] bg-slate-950 select-none flex flex-col justify-between transition-all duration-300 ${accentBorderColor}`}
    >
      {/* Ambient Blurred Backdrop for seamless visual blending */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 blur-2xl scale-110"
        aria-hidden="true"
      >
        <img
          src={imageSrc}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-75"
        />
      </div>

      {/* Elegant dark vignette gradient overlays to blend seamlessly with dark slate design */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40 pointer-events-none z-[1]" />

      {/* The Main High-Resolution Photo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-[2] pointer-events-none select-none">
        <img
          src={imageSrc}
          alt={`${disciplineName} at Nesta Movement Studio`}
          referrerPolicy="no-referrer"
          onError={() => {
            if (!loadFailed) setLoadFailed(true);
          }}
          draggable={false}
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            objectFit: fitMode,
            transformOrigin: 'center center',
          }}
          className={`w-full h-full max-w-full max-h-full pointer-events-none select-none transition-all duration-500 ${
            fitMode === 'contain' ? 'object-contain' : 'object-cover object-center'
          }`}
        />
      </div>

      {/* Top Bar with Discipline Badge */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
        <span className="inline-block px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs font-bold text-white shadow-lg backdrop-blur-md">
          {badgeText}
        </span>
      </div>

      {/* Bottom Fee Highlight Bar */}
      <div className="relative z-10 m-4 sm:m-5 p-3.5 sm:p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            1-Month Membership Fee
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
            ₹{monthlyFee.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-slate-400">/ month</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Class Allocation
          </span>
          <div className="text-xs sm:text-sm font-bold text-blue-300">
            {sessionsPerMonth} Sessions / mo
          </div>
        </div>
      </div>
    </div>
  );
};
