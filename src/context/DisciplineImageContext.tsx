import React, { createContext, useContext, useState, useEffect } from 'react';
import { DisciplineId } from '../types';
import {
  CustomDisciplineImages,
  CustomDisciplineAlignments,
  ImageAlignment,
  DEFAULT_ALIGNMENT,
  getStoredDisciplineImages,
  saveDisciplineImage,
  resetDisciplineImage,
  getStoredDisciplineAlignments,
  saveDisciplineAlignment,
  resetDisciplineAlignment,
} from '../utils/imageStorage';

interface DisciplineImageContextType {
  customImages: CustomDisciplineImages;
  alignments: CustomDisciplineAlignments;
  getImageForDiscipline: (id: DisciplineId, defaultUrl: string) => string;
  hasCustomImage: (id: DisciplineId) => boolean;
  updateImage: (id: DisciplineId, dataUrl: string) => void;
  resetImage: (id: DisciplineId) => void;
  getAlignmentForDiscipline: (id: DisciplineId) => ImageAlignment;
  updateAlignment: (id: DisciplineId, alignment: ImageAlignment) => void;
  resetAlignment: (id: DisciplineId) => void;
}

const DisciplineImageContext = createContext<DisciplineImageContextType | undefined>(undefined);

export const DisciplineImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<CustomDisciplineImages>(() => getStoredDisciplineImages());
  const [alignments, setAlignments] = useState<CustomDisciplineAlignments>(() => getStoredDisciplineAlignments());

  useEffect(() => {
    const handleImagesUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CustomDisciplineImages>;
      if (customEvent.detail) {
        setCustomImages(customEvent.detail);
      } else {
        setCustomImages(getStoredDisciplineImages());
      }
    };

    const handleAlignmentsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CustomDisciplineAlignments>;
      if (customEvent.detail) {
        setAlignments(customEvent.detail);
      } else {
        setAlignments(getStoredDisciplineAlignments());
      }
    };

    window.addEventListener('nesta:discipline-images-updated', handleImagesUpdate);
    window.addEventListener('nesta:discipline-alignments-updated', handleAlignmentsUpdate);

    return () => {
      window.removeEventListener('nesta:discipline-images-updated', handleImagesUpdate);
      window.removeEventListener('nesta:discipline-alignments-updated', handleAlignmentsUpdate);
    };
  }, []);

  const getImageForDiscipline = (id: DisciplineId, defaultUrl: string): string => {
    return customImages[id] || defaultUrl;
  };

  const hasCustomImage = (id: DisciplineId): boolean => {
    return Boolean(customImages[id]);
  };

  const updateImage = (id: DisciplineId, dataUrl: string) => {
    const updated = saveDisciplineImage(id, dataUrl);
    setCustomImages(updated);
  };

  const resetImage = (id: DisciplineId) => {
    const updated = resetDisciplineImage(id);
    setCustomImages(updated);
    resetDisciplineAlignment(id);
  };

  const getAlignmentForDiscipline = (id: DisciplineId): ImageAlignment => {
    return alignments[id] || DEFAULT_ALIGNMENT;
  };

  const updateAlignment = (id: DisciplineId, alignment: ImageAlignment) => {
    const updated = saveDisciplineAlignment(id, alignment);
    setAlignments(updated);
  };

  const resetAlignment = (id: DisciplineId) => {
    const updated = resetDisciplineAlignment(id);
    setAlignments(updated);
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
