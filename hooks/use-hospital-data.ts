import { useState, useCallback } from 'react';
import { Hospital, ChartType } from '@/types/hospital';

const PERCENTILE_MAPPINGS = {
  los: [
    { days: 3.2, percentile: 5 },
    { days: 4.4, percentile: 25 },
    { days: 5.2, percentile: 50 },
    { days: 6.0, percentile: 75 },
    { days: 7.7, percentile: 95 },
  ],
  prevalence: [
    { prevalence: 25.1, percentile: 5 },
    { prevalence: 31.9, percentile: 25 },
    { prevalence: 35.6, percentile: 50 },
    { prevalence: 39.1, percentile: 75 },
    { prevalence: 45.8, percentile: 95 },
  ],
  readmission: [
    { readmissionRate: 17, percentile: 5 },
    { readmissionRate: 22, percentile: 25 },
    { readmissionRate: 25, percentile: 50 },
    { readmissionRate: 29, percentile: 75 },
    { readmissionRate: 36, percentile: 95 },
  ],
};

export function useHospitalData(initialHospitals: Hospital[], type: ChartType) {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [draggedItem, setDraggedItem] = useState<Hospital | null>(null);
  const [dragOverItem, setDragOverItem] = useState<Hospital | null>(null);

  const calculatePercentile = useCallback((value: number, type: ChartType): number => {
    const mapping = PERCENTILE_MAPPINGS[type];
    const key = type === 'los' ? 'days' : type === 'prevalence' ? 'prevalence' : 'readmissionRate';

    if (value <= mapping[0][key]) return mapping[0].percentile;
    if (value >= mapping[mapping.length - 1][key]) return mapping[mapping.length - 1].percentile;

    for (let i = 1; i < mapping.length; i++) {
      const prevMapping = mapping[i - 1];
      const nextMapping = mapping[i];
      
      if (value <= nextMapping[key]) {
        const ratio = (value - prevMapping[key]) / (nextMapping[key] - prevMapping[key]);
        return prevMapping.percentile + ratio * (nextMapping.percentile - prevMapping.percentile);
      }
    }

    return mapping[mapping.length - 1].percentile;
  }, []);

  const getRandomBlueShade = useCallback(() => {
    const hue = 210;
    const saturation = 70 + Math.random() * 30;
    const lightness = 40 + Math.random() * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }, []);

  const addHospital = useCallback(() => {
    const defaultValues = {
      los: { days: 5.2 },
      prevalence: { prevalence: 35.6 },
      readmission: { readmissionRate: 25 },
    };

    const newHospital: Hospital = {
      id: Date.now().toString(),
      name: `Hospital ${hospitals.length + 1}`,
      ...defaultValues[type],
      percentile: 50,
      color: getRandomBlueShade(),
    };
    setHospitals([...hospitals, newHospital]);
  }, [hospitals, type, getRandomBlueShade]);

  const updateHospital = useCallback((id: string, field: keyof Hospital, value: string | number) => {
    setHospitals(prevHospitals => 
      prevHospitals.map(hospital => {
        if (hospital.id === id) {
          const updatedHospital = { ...hospital, [field]: value };
          
          if (field === 'days' || field === 'prevalence' || field === 'readmissionRate') {
            updatedHospital.percentile = calculatePercentile(Number(value), type);
          } else if (field === 'percentile') {
            const mapping = PERCENTILE_MAPPINGS[type];
            const key = type === 'los' ? 'days' : type === 'prevalence' ? 'prevalence' : 'readmissionRate';
            const mappingIndex = mapping.findIndex(m => m.percentile >= Number(value));
            
            if (mappingIndex > 0) {
              const prevMapping = mapping[mappingIndex - 1];
              const nextMapping = mapping[mappingIndex];
              const ratio = (Number(value) - prevMapping.percentile) / (nextMapping.percentile - prevMapping.percentile);
              updatedHospital[key] = prevMapping[key] + ratio * (nextMapping[key] - prevMapping[key]);
            } else {
              updatedHospital[key] = mapping[0][key];
            }
          }
          return updatedHospital;
        }
        return hospital;
      })
    );
  }, [type, calculatePercentile]);

  const removeHospital = useCallback((id: string) => {
    setHospitals(prevHospitals => prevHospitals.filter(hospital => hospital.id !== id));
  }, []);

  const sortedHospitals = [...hospitals].sort((a, b) => 
    a.percentile - b.percentile || a.name.localeCompare(b.name)
  );

  return {
    hospitals: sortedHospitals,
    draggedItem,
    dragOverItem,
    setDraggedItem,
    setDragOverItem,
    addHospital,
    updateHospital,
    removeHospital,
  };
}