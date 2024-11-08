'use client';

import { Input } from "@/components/ui/input";

interface PercentileHeaderProps {
  mainTitle: string;
  setMainTitle: (title: string) => void;
}

export function PercentileHeader({ mainTitle, setMainTitle }: PercentileHeaderProps) {
  return (
    <>
      <Input
        value={mainTitle}
        onChange={(e) => setMainTitle(e.target.value)}
        className="text-4xl font-bold text-[#1e3a8a] mb-4 mt-10 border-none p-0"
      />
      <ul className="list-disc list-inside text-gray-600 mb-8 text-lg space-y-2">
        <li>The percentiles derive from 2022 CMS inpatient data</li>
        <li>Data includes full-year 2022 CMS inpatient data</li>
        <li>Filtered on admissions with diabetes ICD-codes</li>
      </ul>
    </>
  );
}