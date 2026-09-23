import React from 'react';
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

  // Load saved alignment for this discipline (zoom, pan offset, fit mode)
  const savedAlignment = getAlignmentForDiscipline(disciplineId);
  const zoom = savedAlignment?.zoom ?? 1;
  const panX = savedAlignment?.x ?? 0;
  const panY = savedAlignment?.y ?? 0;
  const fitMode = savedAlignment?.fit ?? 'contain';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[360px] sm:h-[440px] bg-slate-950 select-none flex flex-col justify-between">
      {/* Ambient Blurred Backdrop to avoid harsh empty black bars when fit: contain is used */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 blur-2xl scale-110"
        aria-hidden="true"
      >
        <img
          src={imageUrl}
          alt=""
          className="w-full h-full object-cover object-center brightness-75"
        />
      </div>

      {/* Subtle dark gradient overlay for contrast */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none z-[1]" />

      {/* The Main Contained & Fixed Photo - no drag, no zoom controls */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-[2] pointer-events-none select-none">
        <img
          src={imageUrl}
          alt={`${disciplineName} at Nesta Movement Studio`}
          referrerPolicy="no-referrer"
          draggable={false}
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            objectFit: fitMode,
            transformOrigin: 'center center',
          }}
          className={`w-full h-full max-w-full max-h-full pointer-events-none select-none ${
            fitMode === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        />
      </div>

      {/* Top Bar with Discipline Badge Only */}
      <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
        <span className="inline-block px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-bold text-white shadow-md backdrop-blur-md">
          {badgeText}
        </span>
      </div>

      {/* Bottom Fee Highlight Bar */}
      <div className="relative z-10 m-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            1-Month Fee
          </span>
          <div className="text-xl font-extrabold text-white font-display">
            ₹{monthlyFee.toLocaleString('en-IN')}{' '}
            <span className="text-xs font-normal text-slate-400">/ month</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Allocation
          </span>
          <div className="text-xs font-bold text-blue-300">
            {sessionsPerMonth} Sessions / mo
          </div>
        </div>
      </div>
    </div>
  );
};
