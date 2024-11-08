'use client';

import React from 'react';
import { HospitalChart } from '@/components/charts/hospital-chart';
import { Hospital } from '@/types/hospital';

const initialHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hospital A',
    days: 5.2,
    percentile: 50,
    color: 'hsl(210, 100%, 50%)'
  },
  {
    id: '2',
    name: 'Hospital B',
    days: 6.1,
    percentile: 77,
    color: 'hsl(210, 85%, 60%)'
  },
  {
    id: '3',
    name: 'Hospital C',
    days: 4.5,
    percentile: 28,
    color: 'hsl(210, 70%, 70%)'
  }
];

export default function LengthOfStayPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">
          Length of Stay
        </h1>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Data includes full-year 2022 CMS inpatient data</li>
          <li>Filtered on admissions with diabetes ICD-codes</li>
          <li>Calculation: Average days of admission with a diabetes diagnosis</li>
        </ul>
      </div>
      <div className="rounded-lg bg-white shadow">
        <HospitalChart initialHospitals={initialHospitals} type="los" />
      </div>
    </div>
  );
}