
import { useState, useEffect, useCallback } from 'react';
import { CVData } from '../types';
import { initialCVData } from '../constants';

export const useCvData = (initialData: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const savedData = localStorage.getItem('cv-data');
      const data = savedData ? JSON.parse(savedData) : initialData;
      
      // Ensure all top-level keys from initialData are present.
      // And for nested objects, ensure their keys are present too.
      // This provides safe backwards compatibility with old data structures.
      const sanitizedData: CVData = {
          ...initialData,
          ...data,
          personal: { ...initialData.personal, ...(data.personal || {}) },
          sectionTitles: { ...initialData.sectionTitles, ...(data.sectionTitles || {}) },
          sectionVisibility: { ...initialData.sectionVisibility, ...(data.sectionVisibility || {}) },
          sectionOrder: data.sectionOrder && Array.isArray(data.sectionOrder) ? data.sectionOrder : initialData.sectionOrder,
      };
      return sanitizedData;

    } catch (error) {
      console.error('Error initializing CV data', error);
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem('cv-data', JSON.stringify(cvData));
  }, [cvData]);

  const updateCvData = useCallback(<K extends keyof CVData, V extends CVData[K]>(section: K, value: V) => {
    setCvData(prev => ({
      ...prev,
      [section]: value
    }));
  }, []);

  return { cvData, setCvData, updateCvData };
};
