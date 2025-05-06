import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts'; // Import Recharts components
import ReportHeader from './components/ReportHeader';
import KeyMetricsTable from './components/KeyMetricsTable';
import WeeklyDetailCard from './components/WeeklyDetailCard';
import SummarySection from './components/SummarySection';
import DashboardCharts from './components/DashboardCharts';

// TypeScript type augmentation for jsPDF to recognize the .autoTable() method.
// This is needed when jspdf-autotable is imported for its side-effects.
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// --- TypeScript Interfaces (remain unchanged) ---
interface WeeklyMetric {
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

interface KeyMetricsOverviewData {
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

interface WeeklyBreakdown {
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

interface ReportData {
  reportTitle: string;
  period: string;
  source: string;
  keyMetricsOverview: KeyMetricsOverviewData;
  weeklyBreakdowns: WeeklyBreakdown[];
  summary: string;
}

// --- Data (remains unchanged) ---
const april2025ReportData: ReportData = {
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

// Main App Component (Dashboard)
const App: React.FC = () => {
  const { reportTitle, period, source, keyMetricsOverview, weeklyBreakdowns, summary } = april2025ReportData;
  const weeklyDates = ["4/7/2025", "4/14/2025", "4/21/2025", "4/28/2025"];

  const handleExportPDF = async () => {
    console.log("Starting PDF export process...");
    try {
      // Dynamically import libraries
      const { default: jsPDF } = await import('jspdf');
      console.log("jsPDF loaded successfully.");
      // Ensure jspdf-autotable has run and modified the jsPDF prototype
      await import('jspdf-autotable'); 
      console.log("jspdf-autotable loaded (for side-effects).");
      const { default: html2canvas } = await import('html2canvas');
      console.log("html2canvas loaded successfully.");

      // Check if libraries are loaded
      if (!jsPDF || !html2canvas) {
        console.error("Critical PDF libraries (jsPDF or html2canvas) failed to load.");
        alert("Error: PDF generation libraries did not load correctly. Please check console and ensure packages are installed.");
        return;
      }
      
      const pdf = new jsPDF('p', 'pt', 'a4'); 
      // @ts-ignore - This check is to ensure autoTable was added to the prototype by the side-effect import
      if (!pdf.autoTable) {
          console.error("jsPDF.autoTable is not a function. jspdf-autotable might not have loaded correctly or patched jsPDF prototype.");
          alert("Error: PDF table generation feature (autoTable) is not available. Please check console.");
          return;
      }
      console.log("jsPDF instance created and autoTable is available.");

      const pageHeight = pdf.internal.pageSize.getHeight(); 
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 30; 
      let yPos = margin; 

      const addElementToPdf = async (elementId: string, sectionTitle?: string, isChartSection: boolean = false) => {
        console.log(`Attempting to add element: ${elementId} (Title: ${sectionTitle || 'N/A'})`);
        const element = document.getElementById(elementId); 
        if (!element) { 
          console.error(`Element with ID '${elementId}' not found for PDF export.`);
          return; // Skip this element if not found
        }

        if (sectionTitle) {
            if (yPos + 40 > pageHeight - margin) { // Check space for title + some content
                pdf.addPage(); 
                yPos = margin;
                console.log(`Added new page for section title: ${sectionTitle}`);
            }
            pdf.setFontSize(isChartSection ? 16 : 14); 
            pdf.setTextColor(40); 
            pdf.text(sectionTitle, margin, yPos);
            yPos += isChartSection ? 30 : 25; // Space after title
        }
        
        console.log(`Capturing ${elementId} with html2canvas...`);
        // Options for html2canvas
        const canvasOptions = { 
            scale: 1.5, // Adjust scale for quality vs performance. Higher is better quality but slower.
            useCORS: true, 
            backgroundColor: '#ffffff', // Ensure elements with transparent backgrounds are captured on white
            logging: true, // Enable html2canvas logging for more details in console
            windowHeight: element.scrollHeight, // Try to capture full height of element
            windowWidth: element.scrollWidth,   // Try to capture full width of element
            removeContainer: true, // Recommended by html2canvas for multiple captures
            ...(isChartSection && { allowTaint: true, foreignObjectRendering: false }) // foreignObjectRendering can be problematic with some SVGs
        };
        const canvas = await html2canvas(element, canvasOptions); 
        console.log(`${elementId} captured by html2canvas.`);
        const imgData = canvas.toDataURL('image/png'); // PNG is generally better for sharp text/lines than JPEG for this
        
        const imgProps = pdf.getImageProperties(imgData); 
        const pdfImgWidth = pageWidth - 2 * margin; 
        let pdfImgHeight = (imgProps.height * pdfImgWidth) / imgProps.width; // Maintain aspect ratio

        // Check if image fits on current page, if not, add new page
        if (yPos + pdfImgHeight > pageHeight - margin) { 
            pdf.addPage(); 
            yPos = margin; 
            console.log(`Added new page for image: ${elementId}`);
            // Re-add section title if it was on a new page due to content break
            if (sectionTitle) {
                pdf.setFontSize(isChartSection ? 16 : 14);
                pdf.setTextColor(40);
                pdf.text(sectionTitle, margin, yPos);
                yPos += isChartSection ? 30 : 25;
            }
        }
        
        // If image is still too tall for a full page (e.g. very long chart section)
        if (pdfImgHeight > pageHeight - yPos - margin) { 
            pdfImgHeight = pageHeight - yPos - margin; // Cap height to fit remaining page space
            console.warn(`Image for ${elementId} was too tall and was capped to fit the page.`);
        }

        pdf.addImage(imgData, 'PNG', margin, yPos, pdfImgWidth, pdfImgHeight); 
        yPos += pdfImgHeight + 20; // Space after element
        console.log(`${elementId} added to PDF. Current yPos: ${yPos}`);
      };

      // --- PDF Generation Sequence ---
      console.log("Starting PDF content generation...");

      // 1. Report Header
      await addElementToPdf('report-header-section');

      // 2. Key Metrics Overview Table
      console.log("Processing Key Metrics Table...");
      if (yPos + 60 > pageHeight - margin) { pdf.addPage(); yPos = margin; console.log("New page for Key Metrics Table title.");} 
      pdf.setFontSize(14); pdf.setTextColor(40); pdf.text("Key Metrics Overview", margin, yPos); yPos += 20;
      const metricsTableElement = document.getElementById('key-metrics-table-container')?.querySelector('table');
      if (metricsTableElement) {
        console.log("Key Metrics Table HTML element found. Generating autoTable...");
        // @ts-ignore autoTable is added dynamically
        pdf.autoTable({ 
            html: metricsTableElement, startY: yPos, theme: 'grid',
            styles: { fontSize: 7, cellPadding: 2, halign: 'center', valign: 'middle' }, 
            headStyles: { fillColor: [230, 230, 240], textColor: 50, fontStyle: 'bold', halign: 'center' }, 
            columnStyles: { 0: { halign: 'left', cellWidth: 100 } }, 
            margin: { left: margin, right: margin },
            didDrawPage: (data: any) => { yPos = data.cursor?.y ?? yPos; console.log(`Page drawn by autoTable. New yPos: ${yPos}`);} 
        });
         // yPos is updated by didDrawPage, ensure space after table
      } else { console.error("Key Metrics Table element NOT found for PDF export."); }
      yPos += 20; // Add space after the table regardless of whether it was drawn

      // 3. Dashboard Charts Section
      console.log("Processing Dashboard Charts Section...");
      await addElementToPdf('dashboard-charts-section', "Visualizations", true); 
      
      // 4. Weekly Breakdown Cards
      console.log("Processing Weekly Breakdown Cards...");
      if (yPos + 40 > pageHeight - margin) { pdf.addPage(); yPos = margin; console.log("New page for Weekly Breakdown title.");}
      pdf.setFontSize(14); pdf.setTextColor(40); pdf.text("Weekly Breakdown", margin, yPos); yPos += 25;
      
      const weeklyCardsContainer = document.getElementById('weekly-breakdown-cards-container');
      if (weeklyCardsContainer) {
          console.log("Weekly cards container found.");
          const weeklyCardElements = weeklyCardsContainer.querySelectorAll('.weekly-detail-card-pdf');
          console.log(`Found ${weeklyCardElements.length} weekly cards.`);
          for (let i = 0; i < weeklyCardElements.length; i++) {
              const cardElement = weeklyCardElements[i] as HTMLElement;
              const tempId = `temp-card-${i}`; // Create a unique temporary ID
              cardElement.id = tempId; 
              console.log(`Processing card ${i + 1} with temp ID: ${tempId}`);
              await addElementToPdf(tempId); // Capture individual card (no title needed here as it's part of the card)
              cardElement.removeAttribute('id'); // Clean up temp ID

              // Check for page break before the next card, but not after the last one
              if (i < weeklyCardElements.length - 1 && yPos + 50 > pageHeight - margin ) { 
                  pdf.addPage();
                  yPos = margin;
                  console.log(`New page for next weekly card. Adding continuation title.`);
                  pdf.setFontSize(14); pdf.setTextColor(40); pdf.text("Weekly Breakdown (Continued)", margin, yPos); yPos += 25;
              }
          }
      } else { console.error("Weekly breakdown cards container NOT found."); }

      // 5. Summary Section
      console.log("Processing Summary Section...");
      await addElementToPdf('summary-section-content', "Summary");
      
      console.log("Saving PDF...");
      pdf.save('Recruitment_Performance_Report_Full.pdf');
      console.log("PDF export process completed.");
    } catch (error) {
        console.error("Unhandled error during PDF export process:", error);
        alert(`Failed to export PDF due to an unexpected error: ${error instanceof Error ? error.message : String(error)}. Please check the console for more details. Libraries might be missing or there could be an issue with content rendering.`);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-10">
        <div id="report-header-section"> <ReportHeader title={reportTitle} period={period} source={source} /> </div>
        
        {/* Re-added Export button */}
        <div className="my-8 text-right"> 
          <button 
            onClick={handleExportPDF} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition-all duration-200 ease-in-out transform hover:scale-105"
          > 
            Export Full Report to PDF 
          </button> 
        </div>

        <div id="key-metrics-table-container"> <KeyMetricsTable data={keyMetricsOverview} dates={weeklyDates} /> </div>
        
        {/* The DashboardCharts component itself renders the section with id="dashboard-charts-section" */}
        <DashboardCharts metrics={keyMetricsOverview} dates={weeklyDates} />

        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-slate-700 mb-8">Weekly Breakdown</h2>
          {/* This container ID is used to find individual cards for PDF export */}
          <div id="weekly-breakdown-cards-container" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Each child div that represents a card needs the class 'weekly-detail-card-pdf' */}
            {weeklyBreakdowns.map((weekData: WeeklyBreakdown) => (
              <div key={weekData.weekOf} className="weekly-detail-card-pdf"> 
                 <WeeklyDetailCard weekData={weekData} /> 
              </div>
            ))}
          </div>
        </section>
        <SummarySection summaryText={summary} />
        <footer className="text-center mt-16 pt-8 border-t border-slate-200 text-sm text-slate-500"> Recruitment Dashboard &copy; {new Date().getFullYear()} </footer>
      </div>
    </div>
  );
};

export default App;

/*
Tailwind CSS Configuration (tailwind.config.js):
module.exports = {
  content: [ "./src/**\/*.{js,jsx,ts,tsx}", ],
  theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'], }, }, },
  plugins: [],
}

DEPENDENCY INSTRUCTION:
For PDF Export and Charts to work, you MUST install these libraries in your project's terminal:

If you use npm:
npm install jspdf jspdf-autotable html2canvas recharts

If you use Yarn:
yarn add jspdf jspdf-autotable html2canvas recharts

After running the installation command, RESTART your development server.
*/

