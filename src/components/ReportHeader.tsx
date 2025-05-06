import React from 'react';

interface ReportHeaderProps {
  title: string;
  period: string;
  source: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title, period, source }) => (
  <header className="mb-10 pb-6">
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">{title}</h1>
    <div className="flex space-x-4 text-sm text-slate-500">
      <p><strong>Period:</strong> {period}</p>
      <p><strong>Source:</strong> {source}</p>
    </div>
  </header>
);

export default ReportHeader;
