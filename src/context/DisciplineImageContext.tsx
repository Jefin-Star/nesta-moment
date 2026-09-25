import React, { createContext, useContext, useState, useEffect } from 'react';
import { DisciplineId } from '../types';
import {
  CustomDisciplineImages,
  CustomDisciplineAlignments,
  ImageAlignment,
  DEFAULT_ALIGNMENT,
} from '../utils/imageStorage';

const DISCIPLINE_DEFAULT_IMAGES: Record<DisciplineId, string> = {
  parkour: 'https://static.actu.fr/uploads/2018/08/AdobeStock_160391988.jpeg',
  calisthenics: 'https://cdn.betterme.world/articles/wp-content/uploads/2026/04/military-calisthenics-workout-for-men.jpg',
  yoga: 'https://media.istockphoto.com/id/1281947349/photo/yoga-men-workout-in-studio-in-front-of-a-window.jpg?s=170667a&w=0&k=20&c=fyZD1lyR9eTgGANjB0TcUKt2Xj7M-6eQmhzCTVBnvPY=',
  'wing-chun': 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/2023/05/donnie-yen-in-ip-man-4.jpg?&fit=crop&w=1200&h=675',
};

interface DisciplineImageContextType {
  customImages: CustomDisciplineImages;
  alignments: CustomDisciplineAlignments;
  getImageForDiscipline: (id: DisciplineId, defaultUrl?: string) => string;
  hasCustomImage: (id: DisciplineId) => boolean;
  updateImage: (id: DisciplineId, dataUrl: string) => void;
  resetImage: (id: DisciplineId) => void;
  getAlignmentForDiscipline: (id: DisciplineId) => ImageAlignment;
  updateAlignment: (id: DisciplineId, alignment: ImageAlignment) => void;
  resetAlignment: (id: DisciplineId) => void;
}

const DisciplineImageContext = createContext<DisciplineImageContextType | undefined>(undefined);

export const DisciplineImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<CustomDisciplineImages>({});
  const [alignments, setAlignments] = useState<CustomDisciplineAlignments>({});

  useEffect(() => {
    // Purge legacy storage cache
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
  }, []);

  // Return the official requested image for each discipline
  const getImageForDiscipline = (id: DisciplineId, defaultUrl?: string): string => {
    if (customImages[id]) return customImages[id]!;
    if (defaultUrl) return defaultUrl;
    return DISCIPLINE_DEFAULT_IMAGES[id] || '/340d29bb-86d1-4808-b30f-7921d91256db.jpg';
  };

  const hasCustomImage = (id: DisciplineId): boolean => {
    return Boolean(customImages[id]);
  };

  const updateImage = (id: DisciplineId, dataUrl: string) => {
    setCustomImages((prev) => ({ ...prev, [id]: dataUrl }));
  };

  const resetImage = (id: DisciplineId) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const getAlignmentForDiscipline = (id: DisciplineId): ImageAlignment => {
    return alignments[id] || DEFAULT_ALIGNMENT;
  };

  const updateAlignment = (id: DisciplineId, alignment: ImageAlignment) => {
    setAlignments((prev) => ({ ...prev, [id]: alignment }));
  };

  const resetAlignment = (id: DisciplineId) => {
    setAlignments((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <DisciplineImageContext.Provider
      value={{
        customImages,
        alignments,
        getImageForDiscipline,
        hasCustomImage,
        updateImage,
        resetImage,
        getAlignmentForDiscipline,
        updateAlignment,
        resetAlignment,
      }}
    >
      {children}
    </DisciplineImageContext.Provider>
  );
};

export const useDisciplineImages = () => {
  const context = useContext(DisciplineImageContext);
  if (!context) {
    throw new Error('useDisciplineImages must be used within a DisciplineImageProvider');
  }
  return context;
};
