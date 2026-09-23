import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  KeyRound,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  X,
  RotateCcw,
  Eye,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  Maximize2,
} from 'lucide-react';
import { DISCIPLINES } from '../../data/programsData';
import { DisciplineId } from '../../types';
import { useDisciplineImages } from '../../context/DisciplineImageContext';
import {
  processImageFile,
  verifyAdminPassword,
  isSessionAuthenticated,
  setSessionAuthenticated,
  setAdminPassword,
} from '../../utils/imageStorage';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { customImages, updateImage, resetImage, hasCustomImage } = useDisciplineImages();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isSessionAuthenticated());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active discipline being managed
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<DisciplineId>('parkour');

  // Staged image for upload/preview
  const [stagedImageData, setStagedImageData] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Password change view toggle
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ success?: string; error?: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync session authentication state
  useEffect(() => {
    setIsAuthenticated(isSessionAuthenticated());
  }, [isOpen]);

  // Clean staged state when switching disciplines
  useEffect(() => {
    setStagedImageData(null);
    setImageUrlInput('');
    setSaveSuccessMsg('');
  }, [selectedDisciplineId]);

  if (!isOpen) return null;

  const currentDiscipline = DISCIPLINES.find((d) => d.id === selectedDisciplineId) || DISCIPLINES[0];
  const activeImageUrl = customImages[selectedDisciplineId] || currentDiscipline.imageUrl;
  const isCustom = hasCustomImage(selectedDisciplineId);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(passwordInput)) {
      setSessionAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect admin password. Please verify your credentials.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setSessionAuthenticated(false);
    setIsAuthenticated(false);
    setPasswordInput('');
    setAuthError('');
    onClose();
  };

  // Handle File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const optimizedDataUrl = await processImageFile(file);
      setStagedImageData(optimizedDataUrl);
      setImageUrlInput('');
      setSaveSuccessMsg('');
    } catch (err: any) {
      alert(err?.message || 'Error processing image.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle Direct URL Staging
  const handleStageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    setStagedImageData(imageUrlInput.trim());
    setSaveSuccessMsg('');
  };

  // Save the staged image
  const handleApplyImage = () => {
    if (!stagedImageData) return;
    updateImage(selectedDisciplineId, stagedImageData);
    setSaveSuccessMsg(`Updated ${currentDiscipline.name} image successfully!`);
    setStagedImageData(null);
    setImageUrlInput('');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Reset image to default
  const handleResetToDefault = () => {
    if (window.confirm(`Reset ${currentDiscipline.name} image back to the studio default?`)) {
      resetImage(selectedDisciplineId);
      setStagedImageData(null);
      setImageUrlInput('');
      setSaveSuccessMsg(`Reset ${currentDiscipline.name} image to studio default.`);
      setTimeout(() => setSaveSuccessMsg(''), 4000);
    }
  };

  // Handle Password Change
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus({});

    if (!verifyAdminPassword(currentPassInput)) {
      setPasswordChangeStatus({ error: 'Current password does not match.' });
      return;
    }

    if (newPassInput.length < 6) {
      setPasswordChangeStatus({ error: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setPasswordChangeStatus({ error: 'New password and confirmation do not match.' });
      return;
    }

    setAdminPassword(newPassInput);
    setPasswordChangeStatus({ success: 'Admin password changed successfully!' });
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordChangeStatus({});
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Background radial highlight */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative w-full max-w-5xl my-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100 z-10 max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 sm:px-8 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              {isAuthenticated ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white font-display">
                  Nesta Movement Admin
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Media Control
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isAuthenticated
                  ? 'Manage high-resolution images for discipline cards'
                  : 'Authorized personnel access only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                title="Change admin passcode"
              >
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Passcode</span>
              </button>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-300 hover:border-rose-800 border border-slate-700/60 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              aria-label="Close Admin Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {!isAuthenticated ? (
            /* =================== LOCKED / AUTHENTICATION SCREEN =================== */
            <div className="max-w-md mx-auto py-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-4 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Protected Admin Area
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Enter your studio admin passcode to manage discipline card photography.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setAuthError('');
                      }}
                      placeholder="Enter studio password..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 pr-12 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition text-xs font-semibold"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition shadow-lg shadow-blue-600/25 active:scale-98 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                <p className="text-[11px] text-slate-500">
                  Initial Master Passcode:{' '}
                  <span className="font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 select-all">
                    nesta@movement2025
                  </span>
                </p>
              </div>
            </div>
          ) : isChangingPassword ? (
            /* =================== PASSWORD SETTINGS =================== */
            <div className="max-w-md mx-auto py-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-blue-400" />
                  <span>Update Admin Passcode</span>
                </h3>
                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    New Passcode (Min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {passwordChangeStatus.error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                    {passwordChangeStatus.error}
                  </div>
                )}

                {passwordChangeStatus.success && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    {passwordChangeStatus.success}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                >
                  Save New Passcode
                </button>
              </form>
            </div>
          ) : (
            /* =================== AUTHENTICATED MEDIA MANAGER =================== */
            <div className="space-y-6">
              {/* Discipline Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DISCIPLINES.map((discipline) => {
                  const isActive = selectedDisciplineId === discipline.id;
                  const hasCustom = hasCustomImage(discipline.id);

                  return (
                    <button
                      key={discipline.id}
                      onClick={() => setSelectedDisciplineId(discipline.id)}
                      className={`relative p-3.5 rounded-2xl text-left transition-all border ${
                        isActive
                          ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs uppercase font-extrabold tracking-wider">
                          {discipline.name}
                        </span>
                        {hasCustom ? (
                          <span
                            className="w-2 h-2 rounded-full bg-emerald-400"
                            title="Custom uploaded image active"
                          />
                        ) : (
                          <span
                            className="w-2 h-2 rounded-full bg-slate-600"
                            title="Studio default image"
                          />
                        )}
                      </div>
                      <span className="text-[11px] block text-slate-400 truncate">
                        {hasCustom ? 'Custom Uploaded' : 'Studio Default'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Success Notification Banner */}
              {saveSuccessMsg && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                  <span className="text-[10px] opacity-80">Visible on live site now</span>
                </div>
              )}

              {/* Main Management Grid: Left = Live Card Preview; Right = Upload & Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Current Active / Staged Preview Card (5 cols) */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {stagedImageData ? 'New Image Preview' : 'Currently Active Card'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        stagedImageData
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isCustom
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {stagedImageData
                        ? 'Unsaved Preview'
                        : isCustom
                        ? 'Custom Active'
                        : 'Default Active'}
                    </span>
                  </div>

                  {/* Card Simulation with Object Contain */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-[340px] bg-slate-950 group flex items-center justify-center">
                    {/* Ambient blurred backdrop to prevent dark empty borders */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 blur-xl scale-110">
                      <img
                        src={stagedImageData || activeImageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <img
                      src={stagedImageData || activeImageUrl}
                      alt={currentDiscipline.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full max-w-full max-h-full object-contain pointer-events-none select-none z-[1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none z-[2]" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-bold text-white shadow backdrop-blur-md">
                        {currentDiscipline.badgeText}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Monthly</span>
                        <div className="text-base font-extrabold text-white font-display">
                          ₹{currentDiscipline.monthlyFee.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Discipline</span>
                        <div className="text-xs font-bold text-blue-300">{currentDiscipline.name}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reset action button */}
                  {isCustom && !stagedImageData && (
                    <button
                      onClick={handleResetToDefault}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reset to Studio Original Image</span>
                    </button>
                  )}
                </div>

                {/* Upload & Staging Controls (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* File Upload Box */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-blue-400" />
                      <h4 className="text-sm font-bold text-white font-display">
                        Upload New Photo for {currentDiscipline.name}
                      </h4>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="discipline-image-uploader"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onDrop={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const file = e.dataTransfer.files?.[0];
                        if (!file) return;
                        try {
                          setIsProcessing(true);
                          const optimizedDataUrl = await processImageFile(file);
                          setStagedImageData(optimizedDataUrl);
                          setImageUrlInput('');
                          setSaveSuccessMsg('');
                        } catch (err: any) {
                          alert(err?.message || 'Error processing dropped image.');
                        } finally {
                          setIsProcessing(false);
                        }
                      }}
                      className="border-2 border-dashed border-slate-800 hover:border-blue-500/60 hover:bg-blue-600/5 rounded-2xl p-6 text-center cursor-pointer transition group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 group-hover:scale-105 border border-blue-500/20 mx-auto flex items-center justify-center mb-3 transition">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                        Click or drag to choose an image
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Supports JPG, PNG, WebP from your device. Automatically optimized for fast loading.
                      </p>
                    </div>

                    {isProcessing && (
                      <div className="text-center text-xs text-blue-400 py-2 animate-pulse flex items-center justify-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span>Optimizing image for high resolution...</span>
                      </div>
                    )}
                  </div>

                  {/* Or Paste Direct Image URL */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-sm font-bold text-white font-display">
                        Or Paste Web Image URL
                      </h4>
                    </div>

                    <form onSubmit={handleStageUrl} className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex-shrink-0"
                      >
                        Preview URL
                      </button>
                    </form>
                  </div>

                  {/* Apply Actions */}
                  {stagedImageData && (
                    <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>Ready to update {currentDiscipline.name} live card</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2.5">
                        <button
                          onClick={handleApplyImage}
                          className="flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-98"
                        >
                          <Check className="w-4 h-4" />
                          <span>Save & Apply to {currentDiscipline.name} Card</span>
                        </button>
                        <button
                          onClick={() => {
                            setStagedImageData(null);
                            setImageUrlInput('');
                          }}
                          className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Photography Guidelines for Studio Admins */}
                  <div className="text-[11px] text-slate-500 space-y-1.5 pt-2">
                    <p className="flex items-center gap-1.5 text-slate-400 font-semibold">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      <span>Best practices for discipline card imagery:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-slate-500 pl-1">
                      <li>Use 3:4 portrait or 4:3 action ratio photos showcasing dynamic movement.</li>
                      <li>Parkour: Airborne vaults, wall runs, or precision rail jumps.</li>
                      <li>Calisthenics: Muscle-ups, ring dips, planches, or bar work.</li>
                      <li>Yoga: Clean postural alignment, spinal extension, or mindful focus.</li>
                      <li>Wing Chun: Centerline guard, wooden dummy drills, or sticky hands.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="px-6 py-4 sm:px-8 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Nesta Movement Media Storage Engine</span>
          </div>

          <button
            onClick={() => {
              onClose();
              const el = document.getElementById('disciplines');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
