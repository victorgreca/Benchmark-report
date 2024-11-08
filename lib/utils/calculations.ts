import { 
  LOS_PERCENTILE_MAPPING, 
  PREVALENCE_PERCENTILE_MAPPING, 
  READMISSION_PERCENTILE_MAPPING 
} from '@/lib/constants';

export function calculatePercentile(
  value: number, 
  metricType: 'los' | 'prevalence' | 'readmission'
): number {
  const mapping = metricType === 'los' ? LOS_PERCENTILE_MAPPING :
                 metricType === 'prevalence' ? PREVALENCE_PERCENTILE_MAPPING :
                 READMISSION_PERCENTILE_MAPPING;

  if (value <= mapping[0].days || value <= mapping[0].prevalence || value <= mapping[0].readmissionRate) {
    return mapping[0].percentile;
  }
  
  if (value >= mapping[mapping.length - 1].days || 
      value >= mapping[mapping.length - 1].prevalence || 
      value >= mapping[mapping.length - 1].readmissionRate) {
    return mapping[mapping.length - 1].percentile;
  }

  for (let i = 1; i < mapping.length; i++) {
    const prevMapping = mapping[i - 1];
    const nextMapping = mapping[i];
    const prevValue = prevMapping.days || prevMapping.prevalence || prevMapping.readmissionRate;
    const nextValue = nextMapping.days || nextMapping.prevalence || nextMapping.readmissionRate;
    
    if (value <= nextValue) {
      const ratio = (value - prevValue) / (nextValue - prevValue);
      return prevMapping.percentile + ratio * (nextMapping.percentile - prevMapping.percentile);
    }
  }

  return mapping[mapping.length - 1].percentile;
}

export function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return `${num}st`;
  if (j === 2 && k !== 12) return `${num}nd`;
  if (j === 3 && k !== 13) return `${num}rd`;
  return `${num}th`;
}

export function getRandomBlueShade(): string {
  const hue = 210;
  const saturation = 70 + Math.random() * 30;
  const lightness = 40 + Math.random() * 20;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}