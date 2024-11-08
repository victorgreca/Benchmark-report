'use client';

import { StatValue } from "./stat-value";
import { getColorClass, getPlaceholder } from "@/lib/utils/percentile";

interface PercentileTableProps {
  type: 'prevalence' | 'los' | 'readmission';
  showPercentage?: boolean;
}

export function PercentileTable({ type, showPercentage = true }: PercentileTableProps) {
  return (
    <div className="space-y-4 bg-[#f8fafc] p-6 rounded-lg">
      <h3 className="font-semibold text-xl mb-4">Percentiles</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#1e293b] text-lg font-medium">Percentile</span>
        <span className="text-[#1e293b] text-lg font-medium">
          {type === 'los' ? 'Length of Stay' : 
           type === 'prevalence' ? 'Prevalence Rates' : 
           'Readmission Rates'}
        </span>
      </div>
      {[5, 10, 25, 50, 75, 90, 95].map((p) => (
        <div key={p} className="flex justify-between items-center">
          <span className="text-[#1e293b] text-lg">{p}%</span>
          <StatValue 
            value={getPlaceholder(p, type)}
            unit={showPercentage ? "%" : ""}
            colored
            className={`${getColorClass(p)} py-2 rounded-md text-[#1e293b] font-medium flex items-center justify-center h-[40px]`}
          />
        </div>
      ))}
    </div>
  );
}