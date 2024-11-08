'use client';

import { X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewModalProps {
  previewUrl: string;
  isFullScreen: boolean;
  setIsFullScreen: (value: boolean) => void;
  handleDownload: () => void;
}

export function PreviewModal({
  previewUrl,
  isFullScreen,
  setIsFullScreen,
  handleDownload
}: PreviewModalProps) {
  return (
    <div className="mt-12 p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-6">Preview</h2>
      <div className="bg-white p-4 rounded-lg mb-6 relative aspect-[16/9] overflow-hidden">
        <img
          src={previewUrl}
          alt="Export preview"
          className="w-full h-full object-contain"
        />
        <button
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200"
        >
          <Maximize2 size={18} />
          <span>View Full Screen</span>
        </button>
      </div>
      <Button
        onClick={handleDownload}
        className="w-full h-12 bg-[#00ABEC] hover:bg-[#00ABEC]/90 text-white text-lg"
      >
        Download
      </Button>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] aspect-[16/9]">
            <img
              src={previewUrl}
              alt="Full screen preview"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
              aria-label="Close full screen preview"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}