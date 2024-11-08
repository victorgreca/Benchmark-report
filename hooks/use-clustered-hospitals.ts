'use client';

import { useMemo } from 'react';
import { Hospital } from '@/types/hospital';

export function useClusteredHospitals(hospitals: Hospital[]) {
  const sortedHospitals = useMemo(() => 
    [...hospitals].sort((a, b) => a.percentile - b.percentile || a.name.localeCompare(b.name)),
    [hospitals]
  );

  const clusters = useMemo(() => {
    const result: Hospital[][] = [];
    let currentCluster: Hospital[] = [];
    
    for (const hospital of sortedHospitals) {
      if (currentCluster.length === 0) {
        currentCluster.push(hospital);
      } else if (Math.abs(currentCluster[0].percentile - hospital.percentile) <= 16) {
        currentCluster.push(hospital);
      } else {
        result.push([...currentCluster]);
        currentCluster = [hospital];
      }
    }
    
    if (currentCluster.length > 0) {
      result.push(currentCluster);
    }
    
    return result;
  }, [sortedHospitals]);

  const calculatePosition = (percentile: number, index: number, total: number) => {
    const verticalSpacing = 80;
    const baseTop = -120;
    const offset = index * verticalSpacing;
    
    return {
      left: `${percentile}%`,
      top: `${baseTop - offset}px`,
      zIndex: total - index
    };
  };

  return {
    clusters,
    calculatePosition,
  };
}