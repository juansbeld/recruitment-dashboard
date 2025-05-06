export interface WeeklyMetric {
  date: string;
  totalApplicants: number | string;
  recruitingCalls: number | string;
  phoneInterviews: number | string;
  textSent: number | string;
  emailsToApplicant: number | string;
  interviewsScheduled: number | string;
  interviewsCompleted: number | string;
  newHiresOrientationScheduled?: number | string;
  newHiresOrientationCompleted?: number | string;
}

export interface KeyMetricsOverviewData {
  totalApplicants: (number | string)[];
  recruitingCalls: (number | string)[];
  phoneInterviews: (number | string)[];
  textSent: (number | string)[];
  emailsToApplicant: (number | string)[];
  interviewsScheduled: (number | string)[];
  interviewsCompleted: (number | string)[];
  newHiresOrientationScheduled: (number | string)[];
  newHiresOrientationCompleted: (number | string)[];
  lostCaregivers: string;
  aprilTotals: {
    totalApplicants: number | string;
    recruitingCalls: number | string;
    phoneInterviews: number | string;
    textSent: number | string;
    emailsToApplicant: number | string;
    interviewsScheduled: number | string;
    interviewsCompleted: number | string;
    newHiresOrientationScheduled: number | string;
    newHiresOrientationCompleted: number | string;
  };
}

export interface WeeklyBreakdown {
  weekOf: string;
  totalApplicants: number;
  recruitingCalls: number;
  phoneInterviews: number;
  textSent: number;
  emailsToApplicant: number;
  interviewsScheduled: number;
  interviewsCompleted: number;
  interviewees?: string[];
  newHiresOrientationScheduled?: number;
  newHiresOrientationCompleted?: number;
  newHiresNames?: string[];
  notes?: string;
}

export interface ReportData {
  reportTitle: string;
  period: string;
  source: string;
  keyMetricsOverview: KeyMetricsOverviewData;
  weeklyBreakdowns: WeeklyBreakdown[];
  summary: string;
}
