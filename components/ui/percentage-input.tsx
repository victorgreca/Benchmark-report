import { Input } from "@/components/ui/input";

interface PercentageInputProps {
  id: string;
  placeholder: string;
  className?: string;
  readOnly?: boolean;
}

export function PercentageInput({ 
  id, 
  placeholder, 
  className = "", 
  readOnly = false 
}: PercentageInputProps) {
  return (
    <div className="relative flex items-center">
      <Input
        id={id}
        type={readOnly ? "text" : "number"}
        placeholder={placeholder}
        className={`text-right pr-8 ${className} h-12`}
        readOnly={readOnly}
      />
      <span className="absolute right-3 text-gray-500">%</span>
    </div>
  );
}