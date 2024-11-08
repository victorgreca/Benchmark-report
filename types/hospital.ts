export interface Hospital {
  id: string;
  name: string;
  days?: number;
  prevalence?: number;
  readmissionRate?: number;
  percentile: number;
  color: string;
}

export type ChartType = 'los' | 'prevalence' | 'readmission';

export interface HospitalChartProps {
  initialHospitals: Hospital[];
  type: ChartType;
}