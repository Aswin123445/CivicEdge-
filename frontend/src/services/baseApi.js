import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth({
    baseUrl: "/api/v1",
  }),

  tagTypes: [
    "Summary",
    "Category",
    "IssueStep1",
    "Drafts",
    "Question",
    "Review",
    "Complaints",
    "Detail",
    "PendingIssues",
    "PendingIssueDetails",
    "PendingIssueDecision",
    "IssuesToSolvers",
    "Home",
    "Avatar",
    "Citizens",
    "Solvers",
    "Admins",
    "Zones",
    "SolverTasks",
    "SolverTaskDetail",
    "DraftProgress",
    "SolverDraftDetail",
    "PendingVerification",
    "PendingVerificationDetail",
    "Contractors",
    "SolverTaskProgressUpdates",
    "AdminFinalReport",
    "AdminFinalReportDetail",
    "AdminTask",
    "SolverDashboard"
  ],

  endpoints: () => ({}),
});
