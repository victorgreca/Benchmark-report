'use client';

import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import FontFaceObserver from 'fontfaceobserver';

export function useExport(activeTab: string) {
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('jpeg');
  const [exportQuality, setExportQuality] = useState(0.9);
  const [fileName, setFileName] = useState('percentile-analysis');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    const font = new FontFaceObserver('Inter');
    font.load().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const handleExport = async () => {
    if (!fontsLoaded) {
      alert('Fonts are still loading. Please try again in a moment.');
      return;
    }

    let targetElement = null;

    if (activeTab === 'percentile-analysis') {
      targetElement = document.getElementById('benchmark-data');
    } else if (activeTab === 'los-chart') {
      targetElement = document.getElementById('chart');
    } else if (activeTab === 'prevalence-chart') {
      targetElement = document.getElementById('prevalence-chart');
    } else if (activeTab === 'readmission-chart') {
      targetElement = document.getElementById('readmission-chart');
    }

    if (!targetElement) return;

    setIsGeneratingImage(true);
    targetElement.classList.add('fixed-for-export');

    try {
      const canvas = await html2canvas(targetElement, {
        scale: 3,
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: 1920,
        onclone: (document) => {
          const element = document.querySelector('.some-class');
          if (element) {
            element.style.marginTop = '5px';
          }
        },
      });

      const mimeType = `image/${exportFormat}`;
      const imageData = canvas.toDataURL(mimeType, exportQuality);
      if (!imageData.startsWith(`data:${mimeType}`)) {
        throw new Error(`Failed to generate ${exportFormat.toUpperCase()} image`);
      }

      setPreviewUrl(imageData);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsGeneratingImage(false);
      targetElement.classList.remove('fixed-for-export');
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `${fileName}.${exportFormat === 'png' ? 'png' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    exporting,
    exportFormat,
    setExportFormat,
    exportQuality,
    setExportQuality,
    fileName,
    setFileName,
    previewUrl,
    isFullScreen,
    setIsFullScreen,
    isGeneratingImage,
    handleExport,
    handleDownload,
  };
}