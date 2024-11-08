import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function InterpretingTheDataPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#1e3a8a]">Data Interpretation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Interpreting Metrics</h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-medium text-[#1e3a8a] mb-2">Prevalence:</h3>
                <p className="text-gray-700">
                  High prevalence rates in the 75th percentile or above suggest a significant patient burden for diabetes, as a significant portion of admitted patients are dealing with diabetes-related issues. This often implies a need for targeted interventions to manage the condition.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-[#1e3a8a] mb-2">Length of Stay:</h3>
                <p className="text-gray-700">
                  A high LOS percentile suggests potential inefficiencies, severity of complications, or need for improved management strategies.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-medium text-[#1e3a8a] mb-2">Readmission Rate:</h3>
                <p className="text-gray-700">
                  High readmission rates in upper percentiles indicate frequent returns to the hospital, often due to insufficient initial treatment or discharge planning. High rates signal the need for better follow-up care and targeted discharge interventions.
                </p>
              </li>
            </ul>
          </section>

          <Separator className="my-4" />

          <section>
            <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">Actionable Insights</h2>
            <p className="text-gray-700 mb-4">
              Use percentile-based insights to guide actionable steps, such as improving glycemic management for high prevalence, reducing LOS through specialized care protocols, or addressing discharge planning for high readmissions.
            </p>
            <p className="text-gray-700">
              Anticipate that by addressing high-percentile metrics, a facility may achieve reduced costs, improved patient outcomes, and greater operational efficiency.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}