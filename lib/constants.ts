// Length of Stay (LOS) Percentile Mapping
export const LOS_PERCENTILE_MAPPING = [
  { days: 3.2, percentile: 5 },
  { days: 4.4, percentile: 25 },
  { days: 5.2, percentile: 50 },
  { days: 6.0, percentile: 75 },
  { days: 7.7, percentile: 95 },
];

// Prevalence Percentile Mapping
export const PREVALENCE_PERCENTILE_MAPPING = [
  { prevalence: 25.1, percentile: 5 },
  { prevalence: 31.9, percentile: 25 },
  { prevalence: 35.6, percentile: 50 },
  { prevalence: 39.1, percentile: 75 },
  { prevalence: 45.8, percentile: 95 },
];

// Readmission Percentile Mapping
export const READMISSION_PERCENTILE_MAPPING = [
  { readmissionRate: 17, percentile: 5 },
  { readmissionRate: 22, percentile: 25 },
  { readmissionRate: 25, percentile: 50 },
  { readmissionRate: 29, percentile: 75 },
  { readmissionRate: 36, percentile: 95 },
];