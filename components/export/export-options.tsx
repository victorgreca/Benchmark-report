'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface ExportOptionsProps {
  exportFormat: string;
  setExportFormat: (format: string) => void;
  exportQuality: number;
  setExportQuality: (quality: number) => void;
  fileName: string;
  setFileName: (name: string) => void;
  handleExport: () => void;
  isGeneratingImage: boolean;
}

export function ExportOptions({
  exportFormat,
  setExportFormat,
  exportQuality,
  setExportQuality,
  fileName,
  setFileName,
  handleExport,
  isGeneratingImage
}: ExportOptionsProps) {
  return (
    <div className="mt-12 p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-6">Export Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <Label htmlFor="export-format" className="text-lg">Format</Label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger id="export-format" className="h-12">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="export-quality" className="text-lg">Quality</Label>
          <Input
            id="export-quality"
            type="number"
            min="0.1"
            max="1"
            step="0.1"
            value={exportQuality}
            onChange={(e) => setExportQuality(parseFloat(e.target.value))}
            className="w-full h-12"
          />
        </div>
        <div>
          <Label htmlFor="file-name" className="text-lg">File Name</Label>
          <Input
            id="file-name"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full h-12"
          />
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleExport}
            disabled={isGeneratingImage}
            className="w-full h-12 bg-[#00ABEC] hover:bg-[#00ABEC]/90 text-white text-lg"
          >
            {isGeneratingImage ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Exporting...
              </>
            ) : (
              'Export'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}