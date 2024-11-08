'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatValue } from "./stat-value";
import { getColorClass, getPlaceholder } from "@/lib/utils/percentile";

interface PercentileSectionProps {
  title: string;
  setTitle: (title: string) => void;
  type: 'prevalence' | 'los' | 'readmission';
  percentile: number;
  setPercentile: (value: number) => void;
  rate: number;
  setRate: (value: number) => void;
  cmsAverage: string;
  cmsStdDev: string;
  rateLabel: string;
  showPercentage?: boolean;
}

export function PercentileSection({
  title,
  setTitle,
  type,
  percentile,
  setPercentile,
  rate,
  setRate,
  cmsAverage,
  cmsStdDev,
  rateLabel,
  showPercentage = true,
}: PercentileSectionProps) {
  return (
    <div className="space-y-6">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-semibold text-[#1e3a8a] border-none p-0"
      />
      <div className="space-y-4 bg-[#f8fafc] p-6 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor={`${type}-percentile`} className="text-lg font-medium">2022 Percentile</Label>
            <Input
              id={`${type}-percentile`}
              value={`${percentile}%`}
              onChange={(e) => setPercentile(Number(e.target.value.replace('%', '')))}
              className={`w-24 text-right text-lg ${getColorClass(percentile)}`}
            />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor={`${type}-rate`} className="text-lg font-medium">{rateLabel}</Label>
            <Input
              id={`${type}-rate`}
              value={showPercentage ? `${rate}%` : rate}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setRate(Number(value));
              }}
              className={`w-24 text-right text-lg ${getColorClass(percentile)}`}
            />
          </div>
        </div>
      </div>
      <div className="space-y-4 bg-[#f8fafc] p-6 rounded-lg">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">CMS Average</span>
            <StatValue value={cmsAverage} unit={showPercentage ? "%" : ""} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">CMS Standard Deviation</span>
            <StatValue value={cmsStdDev} unit={showPercentage ? "%" : ""} />
          </div>
        </div>
      </div>
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
            <div className={`w-[120px] h-[40px] flex items-center justify-center rounded-md ${getColorClass(p)}`}>
              <span className="text-[#1e293b] text-lg font-medium">
                {getPlaceholder(p, type)}{showPercentage ? "%" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}