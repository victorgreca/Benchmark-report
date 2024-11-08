'use client';

import { useState } from 'react';
import { PercentileHeader } from '@/components/percentile/percentile-header';
import { PercentileSection } from '@/components/percentile/percentile-section';

export default function PercentileAnalysisPage() {
  const [mainTitle, setMainTitle] = useState('Percentile Analysis');
  const [prevalenceTitle, setPrevalenceTitle] = useState('Diabetes Prevalence');
  const [losTitle, setLosTitle] = useState('Diabetes Length of Stay');
  const [readmissionTitle, setReadmissionTitle] = useState('Diabetes Readmission Rates');
  
  const [prevalencePercentile, setPrevalencePercentile] = useState(81);
  const [prevalenceRate, setPrevalenceRate] = useState(41);
  const [losPercentile, setLosPercentile] = useState(92);
  const [lengthOfStay, setLengthOfStay] = useState(7.2);
  const [readmissionPercentile, setReadmissionPercentile] = useState(88);
  const [readmissionRate, setReadmissionRate] = useState(32);

  return (
    <>
      <PercentileHeader mainTitle={mainTitle} setMainTitle={setMainTitle} />
      <div id="benchmark-data" className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <PercentileSection
            title={prevalenceTitle}
            setTitle={setPrevalenceTitle}
            type="prevalence"
            percentile={prevalencePercentile}
            setPercentile={setPrevalencePercentile}
            rate={prevalenceRate}
            setRate={setPrevalenceRate}
            cmsAverage="35.6"
            cmsStdDev="6.7"
            rateLabel="2022 Prevalence Rate"
          />
          <PercentileSection
            title={losTitle}
            setTitle={setLosTitle}
            type="los"
            percentile={losPercentile}
            setPercentile={setLosPercentile}
            rate={lengthOfStay}
            setRate={setLengthOfStay}
            cmsAverage="5.2"
            cmsStdDev="1.7"
            rateLabel="2022 Length of Stay"
            showPercentage={false}
          />
          <PercentileSection
            title={readmissionTitle}
            setTitle={setReadmissionTitle}
            type="readmission"
            percentile={readmissionPercentile}
            setPercentile={setReadmissionPercentile}
            rate={readmissionRate}
            setRate={setReadmissionRate}
            cmsAverage="25"
            cmsStdDev="0.1"
            rateLabel="2022 Readmission Rate"
          />
        </div>
      </div>
    </>
  );
}