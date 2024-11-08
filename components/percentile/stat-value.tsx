'use client';

interface StatValueProps {
  value: string;
  unit?: string;
  className?: string;
  colored?: boolean;
}

export function StatValue({ 
  value, 
  unit = "", 
  className = "", 
  colored = false 
}: StatValueProps) {
  return (
    <div className={`text-lg ${colored ? 'w-[120px] flex items-center justify-center' : 'text-right'} ${className}`}>
      {value}{unit && ` ${unit}`}
    </div>
  );
}