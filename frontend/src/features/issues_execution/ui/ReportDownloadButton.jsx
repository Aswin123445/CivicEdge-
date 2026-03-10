import React, { useState } from 'react';

/**
 * COMPONENT: ReportDownloadButton
 * Purpose: Generates a PDF summary of the submitted verification report.
 * Props: 
 * - taskData: The full object from the Serializer.
 * - verificationData: The field data from your JSON.
 */

const ReportDownloadButton = ({ taskData, verificationData }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    
    // In a real implementation, you would:
    // 1. Use a library like @react-pdf/renderer or jsPDF
    // 2. Or call a backend endpoint that returns a PDF Buffer
    
    console.log("Generating PDF for:", taskData.reference_id);
    
    // Simulating generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    alert(`Verification_Report_${taskData.reference_id}.pdf has been generated.`);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition shadow-sm border
        ${isGenerating 
          ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' 
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95'
        }`}
    >
      {isGenerating ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Preparing PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download PDF Report
        </>
      )}
    </button>
  );
};

export default ReportDownloadButton;