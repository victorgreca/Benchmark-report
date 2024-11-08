'use client';

import React from 'react';
import { HospitalChart } from '@/components/charts/hospital-chart';
import { Hospital } from '@/types/hospital';

const initialHospitals: Hospital[] = [
  {
    id: '1',
    name: 'Hospital A',
    readmissionRate: 25,
    percentile: 50,
    color: 'hsl(210, 100%, 50%)'
  },
  {
    id: '2',
    name: 'Hospital B',
    readmissionRate: 28,
    percentile: 70,
    color: 'hsl(210, 85%, 60%)'
  },
  {
    id: '3',
    name: 'Hospital C',
    readmissionRate: 21,
    percentile: 20,
    color: 'hsl(210, 70%, 70%)'
  }
];

export default function ReadmissionPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#1e3a8a]">
          Readmission Rates
        </h1>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Data includes full-year 2022 CMS inpatient data</li>
          <li>Filtered on admissions with diabetes ICD-codes</li>
          <li>Condition: Re-admitted to a hospital 30 days prior to an admission with a diabetes diagnosis</li>
        </ul>
      </div>
      <div className="rounded-lg bg-white shadow">
        <HospitalChart initialHospitals={initialHospitals} type="readmission" />
      </div>
    </div>
  );
}