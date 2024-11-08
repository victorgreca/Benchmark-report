'use client';

import React from 'react';
import { Hospital } from '@/types/hospital';
import { getOrdinalSuffix } from '@/lib/utils/calculations';

interface ChartNodesProps {
  hospitals: Hospital[];
  type: 'los' | 'prevalence' | 'readmission';
}

export function ChartNodes({ hospitals, type }: ChartNodesProps) {
  const sortedHospitals = [...hospitals].sort((a, b) => 
    a.percentile - b.percentile || a.name.localeCompare(b.name)
  );

  const clusters = React.useMemo(() => {
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

  const getValue = (hospital: Hospital) => {
    if (type === 'los') return `${hospital.days?.toFixed(1)} days`;
    if (type === 'prevalence') return `${hospital.prevalence?.toFixed(1)}%`;
    return `${hospital.readmissionRate?.toFixed(1)}%`;
  };

  return (
    <>
      {clusters.map((cluster, clusterIndex) => (
        <React.Fragment key={`cluster-${clusterIndex}`}>
          {cluster.map((hospital, index) => {
            const position = calculatePosition(hospital.percentile, index, cluster.length);
            return (
              <div
                key={hospital.id}
                className="absolute flex flex-col items-center transition-all duration-300 ease-in-out"
                style={{
                  left: position.left,
                  top: position.top,
                  zIndex: position.zIndex,
                  transform: 'translate(-50%, 0)'
                }}
              >
                {/* Connection Line */}
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-[1px] bg-transparent">
                  <div
                    className="absolute top-[28px] left-0 w-[1px]"
                    style={{
                      height: `${120 + index * 80}px`,
                      backgroundColor: hospital.color,
                      opacity: 0.75
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: hospital.color,
                      transform: 'translate(-50%, 50%)'
                    }}
                  />
                </div>

                {/* Hospital Node */}
                <div className="bg-white border border-gray-300 rounded-lg shadow-md p-2 text-sm min-w-[150px]">
                  <div className="font-bold" style={{ color: hospital.color }}>
                    {hospital.name}
                  </div>
                  <div className="text-gray-600">
                    {getValue(hospital)} ({getOrdinalSuffix(Math.round(hospital.percentile))} Percentile)
                  </div>
                </div>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
}