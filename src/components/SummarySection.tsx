import React from 'react';

interface SummaryProps { summaryText: string; }

const SummarySection: React.FC<SummaryProps> = ({ summaryText }) => (
  <section id="summary-section-content" className="mt-12 bg-white shadow-xl rounded-xl p-6 md:p-8">
    <h2 className="text-3xl font-semibold text-slate-700 mb-6">Summary</h2>
    <p className="text-slate-600 leading-relaxed text-base">{summaryText}</p>
  </section>
);

export default SummarySection;
