export function calculatePercentile(value: number, type: 'los' | 'prevalence' | 'readmission'): number {
  const mappings = {
    los: [
      { value: 3.2, percentile: 5 },
      { value: 4.4, percentile: 25 },
      { value: 5.2, percentile: 50 },
      { value: 6.0, percentile: 75 },
      { value: 7.7, percentile: 95 }
    ],
    prevalence: [
      { value: 25.1, percentile: 5 },
      { value: 31.9, percentile: 25 },
      { value: 35.6, percentile: 50 },
      { value: 39.1, percentile: 75 },
      { value: 45.8, percentile: 95 }
    ],
    readmission: [
      { value: 17, percentile: 5 },
      { value: 22, percentile: 25 },
      { value: 25, percentile: 50 },
      { value: 29, percentile: 75 },
      { value: 36, percentile: 95 }
    ]
  };

  const mapping = mappings[type];

  if (value <= mapping[0].value) return mapping[0].percentile;
  if (value >= mapping[mapping.length - 1].value) return mapping[mapping.length - 1].percentile;

  for (let i = 1; i < mapping.length; i++) {
    if (value <= mapping[i].value) {
      const prevMapping = mapping[i - 1];
      const nextMapping = mapping[i];
      const ratio = (value - prevMapping.value) / (nextMapping.value - prevMapping.value);
      return prevMapping.percentile + ratio * (nextMapping.percentile - prevMapping.percentile);
    }
  }

  return mapping[mapping.length - 1].percentile;
}