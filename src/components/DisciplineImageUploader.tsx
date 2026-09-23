import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  X,
  Link as LinkIcon,
  Sparkles,
  Camera,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Move,
} from 'lucide-react';
import { DisciplineInfo } from '../types';
import { processImageFile } from '../utils/imageStorage';
import { useDisciplineImages } from '../context/DisciplineImageContext';

interface DisciplineImageUploaderProps {
  discipline: DisciplineInfo;
  activeImageUrl: string;
  isCustom: boolean;
  onSaveImage: (dataUrl: string) => void;
  onResetImage: () => void;
  onClose: () => void;
}

export const DisciplineImageUploader: React.FC<DisciplineImageUploaderProps> = ({
  discipline,
  activeImageUrl,
  isCustom,
  onSaveImage,
  onResetImage,
  onClose,
}) => {
  const { updateAlignment, getAlignmentForDiscipline } = useDisciplineImages();
  const currentAlignment = getAlignmentForDiscipline(discipline.id);

  const [stagedImage, setStagedImage] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [statusMsg, setStatusMsg] = useState('');
  const [zoom, setZoom] = useState<number>(currentAlignment.zoom || 1);
  const [pan, setPan] = useState<{ x: number; y: number }>({
    x: currentAlignment.x || 0,
    y: currentAlignment.y || 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(file);
      setStagedImage(dataUrl);
      setStatusMsg('');
      setZoom(1);
      setPan({ x: 0, y: 0 });
    } catch (err: any) {
      alert(err?.message || 'Error processing image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setStagedImage(urlInput.trim());
    setStatusMsg('');
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: pan.x,
      initY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;
    setPan({
      x: dragStartRef.current.initX + deltaX,
      y: dragStartRef.current.initY + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    if (!stagedImage) return;
    onSaveImage(stagedImage);
    updateAlignment(discipline.id, {
      zoom,
      x: Math.round(pan.x),
      y: Math.round(pan.y),
      fit: 'contain',
    });
    setStatusMsg(`Applied new image for ${discipline.name}!`);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm(`Reset ${discipline.name} back to original studio image?`)) {
      onResetImage();
      setStagedImage(null);
      setStatusMsg(`Reset ${discipline.name} to studio default.`);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/80 bg-slate-900 shadow-2xl h-[360px] sm:h-[440px] flex flex-col p-4 z-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white uppercase">{discipline.name}</span>
              <span className="text-[10px] text-blue-400 font-semibold px-1.5 py-0.2 rounded bg-blue-500/10">
                {discipline.targetAudience}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">Upload Discipline Card Image</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          title="Close upload mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Upload Body */}
      <div className="flex-1 flex flex-col justify-between py-3 overflow-y-auto">
        {statusMsg ? (
          <div className="my-auto text-center py-8 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-emerald-300">{statusMsg}</p>
          </div>
        ) : stagedImage ? (
          /* Staged Live Preview with Contain & Alignment controls */
          <div className="space-y-3">
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              className="relative h-44 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 select-none flex items-center justify-center"
            >
              {/* Blurred atmospheric backdrop */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 blur-xl scale-110">
                <img src={stagedImage} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Contained image with custom drag & zoom transform */}
              <img
                src={stagedImage}
                alt="Preview"
                draggable={false}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  objectFit: 'contain',
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
                className="w-full h-full max-w-full max-h-full object-contain pointer-events-none select-none z-[1]"
              />

              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-slate-700/80 text-[10px] font-bold text-white z-[2]">
                Fit: Contain (Full Photo)
              </div>
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-slate-700/80 text-[10px] font-mono text-blue-300 z-[2]">
                {Math.round(zoom * 100)}%
              </div>
            </div>

            {/* Quick Zoom & Pan slider bar */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                <Move className="w-3 h-3 text-blue-400" />
                <span className="hidden sm:inline">Drag or</span> Zoom
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <input
                type="range"
                min="0.7"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3.0, z + 0.1))}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                title="Reset alignment"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Apply Image</span>
              </button>
              <button
                onClick={() => setStagedImage(null)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          /* Upload Inputs */
          <div className="space-y-3 my-auto">
            {/* Mode switch */}
            <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-[11px]">
              <button
                onClick={() => setUploadMode('file')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  uploadMode === 'file'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Upload className="w-3 h-3" />
                <span>Device Upload</span>
              </button>
              <button
                onClick={() => setUploadMode('url')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  uploadMode === 'url'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LinkIcon className="w-3 h-3" />
                <span>Web URL</span>
              </button>
            </div>

            {uploadMode === 'file' ? (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleFile(file);
                  }}
                  className="border-2 border-dashed border-slate-700 hover:border-blue-400 hover:bg-blue-600/5 rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                      Click or drag photo here
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Select JPG, PNG, or WebP for {discipline.name}
                    </p>
                  </div>
                </div>

                {isProcessing && (
                  <div className="text-center text-[11px] text-blue-400 mt-2 flex items-center justify-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing photo...</span>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleUrlSubmit} className="space-y-2">
                <input
                  type="url"
                  required
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                >
                  Preview Image URL
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
        {isCustom ? (
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-rose-300 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Default</span>
          </button>
        ) : (
          <span className="text-slate-500 text-[10px]">Using Studio Default Photo</span>
        )}

        <button
          onClick={onClose}
          className="text-blue-400 hover:text-blue-300 font-semibold"
        >
          View Public Card
        </button>
      </div>
    </div>
  );
};
