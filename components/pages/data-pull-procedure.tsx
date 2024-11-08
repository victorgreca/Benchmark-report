import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function DataPullProcedurePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#1e3a8a]">Data Context</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-2">CMS Data Analysis: Diabetes</h2>
            <p className="text-gray-700">
              <strong>Objective:</strong> Evaluate diabetes prevalence, length of stay (LOS), and 30-day readmission rates in Medicare data (2021-2022).
            </p>
          </section>

          <Separator className="my-4" />

          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-2">Data Processing</h2>
            <h3 className="text-xl font-medium text-[#1e3a8a] mb-2">Chunked Processing:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>ICD-10 Filtering:</strong> Focused on codes E10, E11, E13 for diabetes cases.</li>
              <li><strong>Date Conversion:</strong> Standardized admission/discharge dates for calculations.</li>
            </ul>
          </section>

          <Separator className="my-4" />

          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-2">Diabetes Metrics</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Prevalence:</strong> Unique patient counts per hospital.</li>
              <li><strong>LOS:</strong> Calculated average stay duration for diabetes cases.</li>
              <li><strong>Readmission Rate:</strong> Flagged readmissions within 30 days of discharge.</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}