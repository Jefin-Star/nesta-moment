import React, { useState } from 'react';
import { Lock, Unlock, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { verifyAdminPassword, setSessionAuthenticated } from '../utils/imageStorage';

interface AdminQuickUnlockModalProps {
  isOpen: boolean;
  disciplineName: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminQuickUnlockModal: React.FC<AdminQuickUnlockModalProps> = ({
  isOpen,
  disciplineName,
  onSuccess,
  onClose,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPassword(password)) {
      setSessionAuthenticated(true);
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Incorrect admin password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white font-display">
                Admin Media Access
              </h3>
              <p className="text-[11px] text-slate-400">
                Unlock to upload photo for <span className="text-blue-300 font-semibold">{disciplineName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Studio Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-[10px] font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Unlock Upload Tool</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-[10px] text-slate-500">
            Default Passcode:{' '}
            <code className="text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              nesta@movement2025
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};
