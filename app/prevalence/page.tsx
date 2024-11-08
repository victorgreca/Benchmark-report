'use client';

import React from 'react';
import { HospitalChart } from '@/components/charts/hospital-chart';
import { Hospital } from '@/types/hospital';

const initialHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hospital A',
    prevalence: 35.6,
    percentile: 50,
    color: 'hsl(210, 100%, 50%)'
  },
  {
    id: '2',
    name: 'Hospital B',
    prevalence: 39.5,
    percentile: 77,
    color: 'hsl(210, 85%, 60%)'
  },
  {
    id: '3',
    name: 'Hospital C',
    prevalence: 32.5,
    percentile: 28,
    color: 'hsl(210, 70%, 70%)'
  }
];

export default function PrevalencePage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">
          Diabetes Prevalence
        </h1>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Data includes full-year 2022 CMS inpatient data</li>
          <li>Filtered on admissions with diabetes ICD-codes</li>
          <li>Calculation: Total number of admissions with a diabetes diagnosis / Total number of admissions</li>
        </ul>
      </div>
      <div className="rounded-lg bg-white shadow">
        <HospitalChart initialHospitals={initialHospitals} type="prevalence" />
      </div>
    </div>
  );
}