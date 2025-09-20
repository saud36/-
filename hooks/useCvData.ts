import { useState, useEffect, useCallback } from 'react';
import { CVData } from '../types';

export const useCvData = (initialData: CVData) => {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const savedData = localStorage.getItem('cv-data');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error('Error parsing CV data from localStorage', error);
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