import React from "react";
import ReportDownloadButton from "../../ui/ReportDownloadButton";

const TaskReportHeader = ({ taskData }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">
            Submitted
          </span>
          <span className="text-slate-400 text-xs font-mono">
            #{taskData?.reference_id}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          {taskData?.issue_title}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <ReportDownloadButton
          taskData={taskData}
          verificationData={taskData?.verification}
        />
        <a
          href={taskData.navigation_url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition flex items-center gap-2 shadow-sm"
        >
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
          </svg>
          View Location
        </a>
      </div>
    </div>
  );
};

export default TaskReportHeader;
