interface GradientSpectrumProps {
  labels: {
    value: string;
    percentile: string;
  }[];
}

export function GradientSpectrum({ labels }: GradientSpectrumProps) {
  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400" />
      <div className="absolute inset-0 flex justify-between items-stretch text-xs font-semibold">
        {labels.map((label, index) => (
          <div 
            key={index} 
            className={`flex flex-col justify-between ${
              index === 0 ? 'p-1' : 
              index === labels.length - 1 ? 'items-end p-1' : 
              'items-center p-1'
            }`}
          >
            <span className="text-[#1C345B] opacity-60">{label.value}</span>
            <span className="text-[#1C345B] opacity-60">{label.percentile}</span>
          </div>
        ))}
      </div>
    </div>
  );
}