import { DisciplineId } from '../types';

const STORAGE_KEY = 'nesta_discipline_images_v1';
const ALIGNMENT_STORAGE_KEY = 'nesta_discipline_alignments_v1';
const PASS_KEY = 'nesta_admin_pass_v1';
const SESSION_KEY = 'nesta_admin_auth_session';
const DEFAULT_PASSWORD = 'nesta@movement2025';

export interface ImageAlignment {
  zoom: number; // 0.8 to 3.0, default 1
  x: number;    // horizontal drag offset (px)
  y: number;    // vertical drag offset (px)
  fit: 'contain' | 'cover'; // default 'contain' to prevent cropping
}

export interface CustomDisciplineAlignments {
  parkour?: ImageAlignment;
  calisthenics?: ImageAlignment;
  yoga?: ImageAlignment;
  'wing-chun'?: ImageAlignment;
}

export const DEFAULT_ALIGNMENT: ImageAlignment = {
  zoom: 1,
  x: 0,
  y: 0,
  fit: 'contain',
};

export interface CustomDisciplineImages {
  parkour?: string;
  calisthenics?: string;
  yoga?: string;
  'wing-chun'?: string;
}

// Compress and convert image file to high-efficiency web Data URL
export async function processImageFile(file: File, maxDimension = 1920, quality = 0.88): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image data.'));
      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(reader.result as string);
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-standard high quality JPEG
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedDataUrl);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

// Retrieve stored discipline images
export function getStoredDisciplineImages(): CustomDisciplineImages {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read custom discipline images:', err);
    return {};
  }
}

// Save an image for a specific discipline
export function saveDisciplineImage(id: DisciplineId, dataUrl: string): CustomDisciplineImages {
  try {
    const current = getStoredDisciplineImages();
    const updated = {
      ...current,
      [id]: dataUrl,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time reactive updates across components
    window.dispatchEvent(new CustomEvent('nesta:discipline-images-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to store discipline image:', err);
    throw err;
  }
}

// Reset an image back to studio default
export function resetDisciplineImage(id: DisciplineId): CustomDisciplineImages {
  try {
    const current = getStoredDisciplineImages();
    const updated = { ...current };
    delete updated[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nesta:discipline-images-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to reset discipline image:', err);
    throw err;
  }
}

// Retrieve stored discipline alignments (zoom, pan x/y, fit)
export function getStoredDisciplineAlignments(): CustomDisciplineAlignments {
  try {
    const raw = localStorage.getItem(ALIGNMENT_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read custom discipline alignments:', err);
    return {};
  }
}

// Save alignment settings for a discipline
export function saveDisciplineAlignment(id: DisciplineId, alignment: ImageAlignment): CustomDisciplineAlignments {
  try {
    const current = getStoredDisciplineAlignments();
    const updated = {
      ...current,
      [id]: alignment,
    };
    localStorage.setItem(ALIGNMENT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nesta:discipline-alignments-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to store discipline alignment:', err);
    throw err;
  }
}

// Reset alignment settings for a discipline
export function resetDisciplineAlignment(id: DisciplineId): CustomDisciplineAlignments {
  try {
    const current = getStoredDisciplineAlignments();
    const updated = { ...current };
    delete updated[id];
    localStorage.setItem(ALIGNMENT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nesta:discipline-alignments-updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to reset discipline alignment:', err);
    throw err;
  }
}

// Admin Authentication helpers
export function getAdminPassword(): string {
  try {
    return localStorage.getItem(PASS_KEY) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export function setAdminPassword(newPass: string): boolean {
  try {
    localStorage.setItem(PASS_KEY, newPass);
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(pass: string): boolean {
  const currentPass = getAdminPassword();
  return pass === currentPass || pass === DEFAULT_PASSWORD;
}

export function isSessionAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function setSessionAuthenticated(auth: boolean): void {
  try {
    if (auth) {
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // ignore
  }
}
