'use client';

import { Hospital } from '@/types/hospital';

interface HospitalNodeProps {
  hospital: Hospital;
  position: {
    left: string;
    top: string;
    zIndex: number;
  };
  getOrdinalSuffix: (num: number) => string;
}

export function HospitalNode({ hospital, position, getOrdinalSuffix }: HospitalNodeProps) {
  const value = hospital.days ? 
    `${hospital.days.toFixed(1)} days` : 
    hospital.prevalence ? 
      `${hospital.prevalence.toFixed(1)}%` : 
      `${hospital.readmissionRate?.toFixed(1)}%`;

  return (
    <div
      className="absolute flex flex-col items-center transition-all duration-300 ease-in-out"
      style={{ 
        left: position.left,
        top: position.top,
        zIndex: position.zIndex,
        transform: 'translate(-50%, 0)'
      }}
    >
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-2 text-sm min-w-[150px]">
        <div className="font-bold" style={{ color: hospital.color }}>
          {hospital.name}
        </div>
        <div className="text-gray-600">
          {value} ({getOrdinalSuffix(Math.round(hospital.percentile))} Percentile)
        </div>
      </div>
    </div>
  );
}