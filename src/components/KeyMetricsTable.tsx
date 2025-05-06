import React from 'react';

interface KeyMetricsTableProps {
  data: KeyMetricsOverviewData;
  dates: string[];
}

const KeyMetricsTable: React.FC<KeyMetricsTableProps> = ({ data, dates }) => {
  const metricsOrder: (keyof KeyMetricsOverviewData['aprilTotals'])[] = ['totalApplicants', 'recruitingCalls', 'phoneInterviews', 'textSent', 'emailsToApplicant', 'interviewsScheduled', 'interviewsCompleted', 'newHiresOrientationScheduled', 'newHiresOrientationCompleted'];
  const metricLabels: Record<keyof KeyMetricsOverviewData['aprilTotals'], string> = { totalApplicants: "Total Applicants", recruitingCalls: "Recruiting Calls", phoneInterviews: "Phone Interviews", textSent: "Text Sent", emailsToApplicant: "Emails to Applicant", interviewsScheduled: "Interviews Scheduled", interviewsCompleted: "Interviews Completed", newHiresOrientationScheduled: "New Hires/Orientation Scheduled", newHiresOrientationCompleted: "New Hires/Orientation Completed" };
  
  return (
    <section className="mb-12 bg-white shadow-xl rounded-xl p-6 md:p-8">
      <h2 className="text-3xl font-semibold text-slate-700 mb-8">Key Metrics Overview</h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full ">
          <thead className="bg-slate-100">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Metric</th>
              {dates.map(date => (
                <th key={date} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">{date}</th>
              ))}
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">April Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {metricsOrder.map((metricKey) => (
              <tr key={metricKey} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-800 sm:pl-6">{metricLabels[metricKey]}</td>
                {(data[metricKey as keyof Omit<KeyMetricsOverviewData, 'lostCaregivers' | 'aprilTotals'>] as (number | string)[]).map((value, index) => (
                  <td key={`${metricKey}-${index}`} className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">{value}</td>
                ))}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-center font-semibold text-blue-600">{data.aprilTotals[metricKey]}</td>
              </tr>
            ))}
            <tr className="hover:bg-slate-50 transition-colors duration-150">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-800 sm:pl-6">Lost Caregivers (Office to Complete)</td>
              <td colSpan={dates.length} className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center"></td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 text-center">{data.lostCaregivers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default KeyMetricsTable;
