'use client';

import React from 'react';
import Image from 'next/image';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function AppHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/glytec_logo-1ij7f1RaF0caOxImK5SJh8z9sa7vK3.svg"
          alt="Glytec Logo"
          width={155}
          height={48}
          priority
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Information about the application">
                <InfoIcon className="h-6 w-6 text-[#1C345B]" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>This application allows you to view and update percentile analysis data for diabetes prevalence, length of stay, and readmission rates. You can modify the data and export the results as an image.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}