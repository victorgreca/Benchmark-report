'use client';

import React from 'react';

interface ChartSpectrumProps {
  type: 'los' | 'prevalence' | 'readmission';
}

export function ChartSpectrum({ type }: ChartSpectrumProps) {
  const getLabels = () => {
    switch (type) {
      case 'los':
        return {
          values: ['3.2', '4.4', '5.2', '6.0', '7.7'],
          unit: ''
        };
      case 'prevalence':
        return {
          values: ['25.1', '31.9', '35.6', '39.1', '45.8'],
          unit: '%'
        };
      case 'readmission':
        return {
          values: ['17', '22', '25', '29', '36'],
          unit: '%'
        };
    }
  };

  const { values, unit } = getLabels();
  const percentiles = ['5th', '25th', '50th', '75th', '95th'];

  return (
    <>
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400" />
        <div className="absolute inset-0 flex justify-between items-stretch text-[10px] sm:text-xs font-semibold">
          {values.map((value, index) => (
            <div key={value} className={`flex flex-col justify-between ${
              index === 0 ? 'p-1' :
              index === values.length - 1 ? 'items-end p-1' :
              'items-center p-1'
            }`}>
              <span className="text-[#1C345B] opacity-60 whitespace-nowrap">{value}{unit}</span>
              <span className="text-[#1C345B] opacity-60">{percentiles[index]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-8 left-0 w-full flex justify-between text-xs sm:text-sm text-gray-600">
        <span className="font-bold whitespace-nowrap">
          2022 {type === 'los' ? 'Length of Stay' :
                type === 'prevalence' ? 'Diabetes Prevalence' :
                'Diabetes Readmission'}
        </span>
      </div>

      <div className="absolute -bottom-[38px] left-0 w-full flex justify-between text-xs sm:text-sm text-gray-600">
        <span className="font-bold">National Percentile</span>
      </div>
    </>
  );
}