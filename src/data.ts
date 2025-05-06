import { ReportData } from './interfaces';

export const april2025ReportData: ReportData = {
  reportTitle: "April 2025 Recruitment Performance Report",
  period: "April 1, 2025 - April 30, 2025",
  source: "Solvo Recruiting Tab",
  keyMetricsOverview: {
    totalApplicants: [52, 91, 69, 62],
    recruitingCalls: [40, 49, 48, 43],
    phoneInterviews: [20, 20, 22, 18],
    textSent: [38, 71, 73, 48],
    emailsToApplicant: [50, 62, 54, 59],
    interviewsScheduled: [3, 6, 2, 6],
    interviewsCompleted: [2, 4, 2, 5],
    newHiresOrientationScheduled: [0, 1, 5, 0],
    newHiresOrientationCompleted: [0, 1, 5, 0],
    lostCaregivers: "Pending",
    aprilTotals: {
      totalApplicants: 274,
      recruitingCalls: 180,
      phoneInterviews: 80,
      textSent: 230,
      emailsToApplicant: 225,
      interviewsScheduled: 17,
      interviewsCompleted: 13,
      newHiresOrientationScheduled: 6,
      newHiresOrientationCompleted: 6,
    },
  },
  weeklyBreakdowns: [
    { weekOf: "4/7/2025", totalApplicants: 52, recruitingCalls: 40, phoneInterviews: 20, textSent: 38, emailsToApplicant: 50, interviewsScheduled: 3, interviewsCompleted: 2, interviewees: ["Sherroine Lewis", "Stacy Park", "Quetcy Lozada"], },
    { weekOf: "4/14/2025", totalApplicants: 91, recruitingCalls: 49, phoneInterviews: 20, textSent: 71, emailsToApplicant: 62, interviewsScheduled: 6, interviewsCompleted: 4, newHiresOrientationScheduled: 1, newHiresOrientationCompleted: 1, interviewees: ["Gwendolym Taylor", "Tanya Sabari", "Mariana Torres", "Jesus Lozada", "Nuyshawne Wheeler", "Shakirah Villafane"], newHiresNames: ["Debbian Plummer"], },
    { weekOf: "4/21/2025", totalApplicants: 69, recruitingCalls: 48, phoneInterviews: 22, textSent: 73, emailsToApplicant: 54, interviewsScheduled: 2, interviewsCompleted: 2, newHiresOrientationScheduled: 5, newHiresOrientationCompleted: 5, interviewees: ["Darian Moore-Morgan", "Kassidy McLeod"], newHiresNames: ["Lauren Martin", "Stacy Park", "Nuyshawne Wheeler", "Shakirah Villafane", "Darian Moore-Morgan"], },
    { weekOf: "4/28/2025", totalApplicants: 62, recruitingCalls: 43, phoneInterviews: 18, textSent: 48, emailsToApplicant: 59, interviewsScheduled: 6, interviewsCompleted: 5, interviewees: ["Syaire Frazier", "Benither Mukonka", "Fallon Heard", "Tamia Sanon", "Carmen Perez", "Alexcia Edmonds"], },
  ],
  summary: "April 2025 showed a robust level of recruitment activity. The week of 4/14/2025 had the highest number of total applicants. The week of 4/21/2025 was particularly successful for new hire orientations. The Lost Caregivers metric is pending office completion.",
};
