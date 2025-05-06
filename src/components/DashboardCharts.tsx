import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line
} from 'recharts';

interface DashboardChartsProps {
  metrics: KeyMetricsOverviewData;
  dates: string[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ metrics, dates }) => {
  const shortDates = dates.map(date => date.substring(0, date.lastIndexOf('/'))); 
  const applicantData = metrics.totalApplicants.map((value, index) => ({ name: shortDates[index], Applicants: Number(value) || 0, }));
  const interviewData = metrics.interviewsScheduled.map((value, index) => ({ name: shortDates[index], Scheduled: Number(value) || 0, Completed: Number(metrics.interviewsCompleted[index]) || 0, }));
  const hiringData = metrics.newHiresOrientationScheduled.map((value, index) => ({ name: shortDates[index], Scheduled: Number(value) || 0, Completed: Number(metrics.newHiresOrientationCompleted[index]) || 0, }));
  const commonTooltipStyle = { backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #cbd5e1', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', };
  const commonTextStyle = { fill: '#475569' }; 

  return (
    <section id="dashboard-charts-section" className="mt-12 mb-12">
      <h2 className="text-3xl font-semibold text-slate-700 mb-8">Visualizations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">         
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Total Applicants per Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={applicantData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /> 
              <XAxis dataKey="name" tick={commonTextStyle} />
              <YAxis tick={commonTextStyle} />
              <Tooltip contentStyle={commonTooltipStyle} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} /> 
              <Legend wrapperStyle={commonTextStyle} />
              <Bar dataKey="Applicants" fill="#3b82f6" barSize={30} /> 
              <Line type="monotone" dataKey="Applicants" stroke="#1e40af" strokeWidth={2} dot={{ r: 4, fill: '#1e40af' }} activeDot={{ r: 6 }} /> 
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Interview Funnel per Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interviewData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={commonTextStyle} />
              <YAxis tick={commonTextStyle} />
              <Tooltip contentStyle={commonTooltipStyle} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
              <Legend wrapperStyle={commonTextStyle} />
              <Bar dataKey="Scheduled" fill="#60a5fa" barSize={25} /> 
              <Bar dataKey="Completed" fill="#2563eb" barSize={25} /> 
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">New Hire Orientation Funnel per Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hiringData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={commonTextStyle} />
              <YAxis tick={commonTextStyle} />
              <Tooltip contentStyle={commonTooltipStyle} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}/>
              <Legend wrapperStyle={commonTextStyle} />
              <Bar dataKey="Scheduled" fill="#818cf8" barSize={25} /> 
              <Bar dataKey="Completed" fill="#4f46e5" barSize={25} /> 
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;
