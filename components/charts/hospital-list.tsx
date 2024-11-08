'use client';

import { Hospital } from '@/types/hospital';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, GripVertical } from 'lucide-react';

interface HospitalListProps {
  hospitals: Hospital[];
  valueKey: string;
  minValue: number;
  maxValue: number;
  draggedItem: Hospital | null;
  dragOverItem: Hospital | null;
  onDragStart: (e: React.DragEvent, hospital: Hospital) => void;
  onDragOver: (e: React.DragEvent, hospital: Hospital) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, hospital: Hospital) => void;
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Hospital, value: string | number) => void;
  onRemove: (id: string) => void;
}

export function HospitalList({
  hospitals,
  valueKey,
  minValue,
  maxValue,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onAdd,
  onUpdate,
  onRemove,
}: HospitalListProps) {
  return (
    <>
      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            draggable
            onDragStart={(e) => onDragStart(e, hospital)}
            onDragOver={(e) => onDragOver(e, hospital)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, hospital)}
            className={`flex items-center space-x-4 p-4 border rounded-md transition-all duration-200 ${
              draggedItem?.id === hospital.id 
                ? 'opacity-50 scale-105 shadow-lg' 
                : dragOverItem?.id === hospital.id
                ? 'border-blue-500 bg-blue-50'
                : ''
            }`}
          >
            <div className="cursor-move p-2 hover:bg-gray-200 rounded">
              <GripVertical className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center col-span-1 sm:col-span-2 md:col-span-1">
                <div
                  className="w-6 h-6 rounded-full mr-2"
                  style={{ backgroundColor: hospital.color }}
                  aria-label={`Color for ${hospital.name}`}
                />
                <span className="text-sm font-medium" style={{ color: hospital.color }}>
                  {hospital.name}
                </span>
              </div>
              <div>
                <Label htmlFor={`name-${hospital.id}`} className="sr-only">
                  Hospital Name
                </Label>
                <Input
                  id={`name-${hospital.id}`}
                  value={hospital.name}
                  onChange={(e) => onUpdate(hospital.id, 'name', e.target.value)}
                  placeholder="Hospital Name"
                />
              </div>
              <div>
                <Label htmlFor={`${valueKey}-${hospital.id}`} className="sr-only">
                  Value
                </Label>
                <Input
                  id={`${valueKey}-${hospital.id}`}
                  type="number"
                  value={hospital[valueKey]}
                  onChange={(e) => onUpdate(hospital.id, valueKey, parseFloat(e.target.value))}
                  step="0.1"
                  min={minValue}
                  max={maxValue}
                  placeholder="Value"
                />
              </div>
              <div>
                <Label htmlFor={`percentile-${hospital.id}`} className="sr-only">
                  Percentile
                </Label>
                <Input
                  id={`percentile-${hospital.id}`}
                  type="number"
                  value={Math.round(hospital.percentile)}
                  onChange={(e) => onUpdate(hospital.id, 'percentile', parseInt(e.target.value, 10))}
                  min="5"
                  max="95"
                  placeholder="Percentile"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(hospital.id)}
              aria-label={`Remove ${hospital.name}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={onAdd} className="w-full mt-4 bg-[#00ABEC] hover:bg-[#00ABEC]/90 text-white">
        <Plus className="mr-2 h-4 w-4" /> Add Hospital
      </Button>
    </>
  );
}