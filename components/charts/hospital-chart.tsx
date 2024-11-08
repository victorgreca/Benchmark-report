'use client';

import React, { useRef } from 'react';
import { Hospital, HospitalChartProps } from '@/types/hospital';
import { useHospitalData } from '@/hooks/use-hospital-data';
import { ChartSpectrum } from './chart-spectrum';
import { ChartNodes } from './chart-nodes';
import { HospitalControls } from './hospital-controls';

export function HospitalChart({ initialHospitals, type }: HospitalChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const {
    hospitals,
    draggedItem,
    dragOverItem,
    setDraggedItem,
    setDragOverItem,
    addHospital,
    updateHospital,
    removeHospital,
  } = useHospitalData(initialHospitals, type);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="w-full flex justify-center mb-8">
        <div className="w-full max-w-[1200px] h-[600px] relative overflow-visible">
          <div ref={chartRef} className="absolute inset-0 flex flex-col justify-center">
            <div className="relative h-32 mb-12 mt-[220px]">
              <ChartSpectrum type={type} />
              <ChartNodes
                hospitals={hospitals}
                type={type}
                draggedItem={draggedItem}
                dragOverItem={dragOverItem}
                setDraggedItem={setDraggedItem}
                setDragOverItem={setDragOverItem}
              />
            </div>
          </div>
        </div>
      </div>
      
      <HospitalControls
        hospitals={hospitals}
        type={type}
        draggedItem={draggedItem}
        dragOverItem={dragOverItem}
        onDragStart={setDraggedItem}
        onDragOver={setDragOverItem}
        onAdd={addHospital}
        onUpdate={updateHospital}
        onRemove={removeHospital}
      />
    </div>
  );
}