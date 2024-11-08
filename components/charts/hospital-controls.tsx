'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, GripVertical } from 'lucide-react';
import { Hospital } from '@/types/hospital';

interface HospitalControlsProps {
  hospitals: Hospital[];
  onAdd: () => void;
  onUpdate: (id: string, field: keyof Hospital, value: string | number) => void;
  onRemove: (id: string) => void;
  type: 'los' | 'prevalence' | 'readmission';
}

export function HospitalControls({ 
  hospitals, 
  onAdd, 
  onUpdate, 
  onRemove,
  type 
}: HospitalControlsProps) {
  const getValueLabel = () => {
    switch (type) {
      case 'los':
        return { label: 'Length of Stay (Days)', min: 3.2, max: 7.7 };
      case 'prevalence':
        return { label: 'Prevalence Rate (%)', min: 25.1, max: 45.8 };
      case 'readmission':
        return { label: 'Readmission Rate (%)', min: 17, max: 36 };
    }
  };

  const { label, min, max } = getValueLabel();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Hospital Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="group relative flex flex-col gap-4 rounded-lg border p-4 hover:border-primary/50"
            >
              {/* Hospital Header */}
              <div className="flex items-center gap-4">
                <div className="cursor-move p-2 hover:bg-secondary rounded">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: hospital.color }}
                  aria-label={`Color for ${hospital.name}`}
                />
                <span className="font-medium" style={{ color: hospital.color }}>
                  {hospital.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(hospital.id)}
                  className="ml-auto h-8 w-8"
                  aria-label={`Remove ${hospital.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Hospital Fields */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`name-${hospital.id}`}>Hospital Name</Label>
                  <Input
                    id={`name-${hospital.id}`}
                    value={hospital.name}
                    onChange={(e) => onUpdate(hospital.id, 'name', e.target.value)}
                    placeholder="Enter hospital name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`value-${hospital.id}`}>{label}</Label>
                  <Input
                    id={`value-${hospital.id}`}
                    type="number"
                    value={type === 'los' ? hospital.days :
                           type === 'prevalence' ? hospital.prevalence :
                           hospital.readmissionRate}
                    onChange={(e) => onUpdate(hospital.id, 
                      type === 'los' ? 'days' :
                      type === 'prevalence' ? 'prevalence' :
                      'readmissionRate', 
                      parseFloat(e.target.value)
                    )}
                    step="0.1"
                    min={min}
                    max={max}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`percentile-${hospital.id}`}>Percentile</Label>
                  <Input
                    id={`percentile-${hospital.id}`}
                    type="number"
                    value={Math.round(hospital.percentile)}
                    onChange={(e) => onUpdate(hospital.id, 'percentile', parseInt(e.target.value, 10))}
                    min="5"
                    max="95"
                    placeholder="Enter percentile"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button 
            onClick={onAdd} 
            className="w-full bg-[#00ABEC] hover:bg-[#00ABEC]/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Hospital
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}