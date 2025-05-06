import React from 'react';

interface WeeklyDetailCardProps { weekData: WeeklyBreakdown; }

const WeeklyDetailCard: React.FC<WeeklyDetailCardProps> = ({ weekData }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    <h3 className="text-2xl font-semibold text-blue-700 mb-5 border-b border-blue-100 pb-3">Week of {weekData.weekOf}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-600">
      <p><strong className="text-slate-700">Total Applicants:</strong> {weekData.totalApplicants}</p><p><strong className="text-slate-700">Recruiting Calls:</strong> {weekData.recruitingCalls}</p><p><strong className="text-slate-700">Phone Interviews:</strong> {weekData.phoneInterviews}</p><p><strong className="text-slate-700">Text Sent:</strong> {weekData.textSent}</p><p><strong className="text-slate-700">Emails to Applicant:</strong> {weekData.emailsToApplicant}</p><p><strong className="text-slate-700">Interviews Scheduled:</strong> {weekData.interviewsScheduled}</p><p><strong className="text-slate-700">Interviews Completed:</strong> {weekData.interviewsCompleted}</p>
      {typeof weekData.newHiresOrientationScheduled === 'number' && (<p><strong className="text-slate-700">New Hires/Orientation Scheduled:</strong> {weekData.newHiresOrientationScheduled}</p>)}
      {typeof weekData.newHiresOrientationCompleted === 'number' && (<p><strong className="text-slate-700">New Hires/Orientation Completed:</strong> {weekData.newHiresOrientationCompleted}</p>)}
    </div>
    {weekData.interviewees && weekData.interviewees.length > 0 && (<div className="mt-5 pt-4 border-t border-slate-100"><strong className="text-slate-700 block mb-1">Involved in Interviews:</strong><ul className="list-disc list-inside pl-2 space-y-1 text-xs text-slate-500">{weekData.interviewees.map(name => <li key={name}>{name}</li>)}</ul></div>)}
    {weekData.newHiresNames && weekData.newHiresNames.length > 0 && (<div className="mt-4 pt-3 border-t border-slate-100"><strong className="text-slate-700 block mb-1">New Hires/Orientation:</strong><ul className="list-disc list-inside pl-2 space-y-1 text-xs text-slate-500">{weekData.newHiresNames.map(name => <li key={name}>{name}</li>)}</ul></div>)}
    {weekData.notes && <p className="mt-4 pt-3 border-t border-slate-100 text-xs italic text-slate-500">Notes: {weekData.notes}</p>}
  </div>
);

export default WeeklyDetailCard;
