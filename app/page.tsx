'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AppHeader } from '@/components/layout/app-header';
import PercentileAnalysisPage from './percentile-analysis/page';
import LengthOfStayPage from './length-of-stay/page';
import PrevalencePage from './prevalence/page';
import ReadmissionPage from './readmission/page';
import { DataPullProcedurePage } from '@/components/pages/data-pull-procedure';
import { InterpretingTheDataPage } from '@/components/pages/interpreting-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('data-context');

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />
      <div className="container mx-auto px-2 sm:px-4 py-4">
        <Tabs defaultValue="data-context" onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto pb-2 mb-4">
            <TabsList className="w-full inline-flex flex-nowrap min-w-max sm:justify-center">
              <TabsTrigger 
                value="data-context" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Data Pull Procedure
              </TabsTrigger>
              <TabsTrigger 
                value="data-interpretation" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Interpreting the Data
              </TabsTrigger>
              <TabsTrigger 
                value="percentile-analysis" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Percentile Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="los-chart" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Length of Stay Chart
              </TabsTrigger>
              <TabsTrigger 
                value="prevalence-chart" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Prevalence Chart
              </TabsTrigger>
              <TabsTrigger 
                value="readmission-chart" 
                className="whitespace-nowrap px-3 sm:px-4"
              >
                Readmission Chart
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full overflow-x-hidden">
            <TabsContent value="data-context" className="mt-0">
              <DataPullProcedurePage />
            </TabsContent>
            
            <TabsContent value="data-interpretation" className="mt-0">
              <InterpretingTheDataPage />
            </TabsContent>
            
            <TabsContent value="percentile-analysis" className="mt-0">
              <PercentileAnalysisPage />
            </TabsContent>
            
            <TabsContent value="los-chart" className="mt-0">
              <LengthOfStayPage />
            </TabsContent>

            <TabsContent value="prevalence-chart" className="mt-0">
              <PrevalencePage />
            </TabsContent>

            <TabsContent value="readmission-chart" className="mt-0">
              <ReadmissionPage />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}