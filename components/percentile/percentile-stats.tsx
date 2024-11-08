'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StatValue } from "./stat-value";
import { getColorClass } from "@/lib/utils/percentile";

interface PercentileStatsProps {
  type: 'prevalence' | 'los' | 'readmission';
  percentile: number;
  setPercentile: (value: number) => void;
  rate: number;
  setRate: (value: number) => void;
  rateLabel: string;
  cmsAverage: string;
  cmsStdDev: string;
  showPercentage?: boolean;
}

export function PercentileStats({
  type,
  percentile,
  setPercentile,
  rate,
  setRate,
  rateLabel,
  cmsAverage,
  cmsStdDev,
  showPercentage = true,
}: PercentileStatsProps) {
  return (
    <>
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
    </>
  );
}