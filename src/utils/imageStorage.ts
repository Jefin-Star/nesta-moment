import { DisciplineId } from '../types';

export interface ImageAlignment {
  zoom: number;
  x: number;
  y: number;
  fit: 'contain' | 'cover';
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
  fit: 'cover',
};

export interface CustomDisciplineImages {
  parkour?: string;
  calisthenics?: string;
  yoga?: string;
  'wing-chun'?: string;
}

// Clear all legacy storage keys to guarantee fresh studio asset rendering
export function clearImageStorageCache(): void {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // ignore
  }
}

// Stored discipline images (returns empty - images are locked)
export function getStoredDisciplineImages(): CustomDisciplineImages {
  clearImageStorageCache();
  return {};
}

// Save image (disabled/locked)
export function saveDisciplineImage(_id: DisciplineId, _dataUrl: string): CustomDisciplineImages {
  return {};
}

// Reset image
export function resetDisciplineImage(_id: DisciplineId): CustomDisciplineImages {
  return {};
}

// Stored discipline alignments
export function getStoredDisciplineAlignments(): CustomDisciplineAlignments {
  return {};
}

// Save alignment
export function saveDisciplineAlignment(_id: DisciplineId, _alignment: ImageAlignment): CustomDisciplineAlignments {
  return {};
}

// Reset alignment
export function resetDisciplineAlignment(_id: DisciplineId): CustomDisciplineAlignments {
  return {};
}
