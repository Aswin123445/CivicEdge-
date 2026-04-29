import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import RequireAuth from "./guards/RequireAuth";
import RequireNoAuth from "./guards/RequireNoAuth";
import RoleGuard from "./guards/RoleGuard";
/* ========== LAYOUTS ========== */
import AuthLayout from "../features/auth/layout/AuthLayout";
import MainLayout from "../features/core/layouts/MainLayout";
import AdminLayout from "../features/auth/layout/adminLayout";
import SolverLayout from "../features/core/layouts/SolverLayout";

const UserManagementLayout = lazy(
  () => import("../features/auth/layout/RoleManagementLayout"),
); // UserManagementLayout

/* ========== AUTH PAGES (GUEST) ========== */
import AuthLanding from "../features/auth/pages/user/AuthLanding";
import AuthLogin from "../features/auth/pages/user/AuthLogin";
import AuthRegister from "../features/auth/pages/user/AuthRegister";
import VerifyEmailInfo from "../features/auth/pages/user/VerifyEmailInfo";
import VerifyEmailResult from "../features/auth/pages/user/VerifyEmailResult";
import AuthForgotPassword from "../features/auth/pages/user/AuthForgotPassword";
import AuthResetPassword from "../features/auth/pages/user/AuthResetPassword";
import AuthResetPasswordInfo from "../features/auth/pages/user/AuthResetPasswordInfo";
import ResetPasswordConfirmation from "../features/auth/pages/user/AuthResetConfirmation";
import AuthAdminLogin from "../features/auth/pages/admin/AdminLogin";
import Login from "../features/auth/pages/solver/Login";
import SettingsPage from "../features/core/pages/citizen/SettingsPage";

/* ========== CORE PAGES ========== */
import CivicEdgeHome from "../features/core/pages/citizen/CitizenHome";

/* ========== ADMIN PAGES ========== */
const UserManagement = lazy(
  () => import("../features/auth/pages/admin/CitizenManagemnt"),
); // UserManagement
const SolverManagement = lazy(
  () => import("../features/auth/pages/admin/SolverManagement"),
); // SolverManagement
const AdminManagement = lazy(
  () => import("../features/auth/pages/admin/AdminManagement"),
); // AdminManagement

const PendingReviewPage = lazy(
  () => import("../features/issues_execution/pages/PendingReviewPage"),
);

const AdminSolverCompleteTask = lazy(
  () => import("../features/issues_execution/pages/AdminSolverCompleteTask"),
);

const IssueDetailPage = lazy(
  () => import("../features/issues_execution/pages/IssueDetailPage"),
);

const SolverAssignmentQueuePage = lazy(
  () => import("../features/issues_execution/pages/SolverAssignmentQueuePage"),
);

const AdminIssueAssignmentPage = lazy(
  () => import("../features/issues_execution/pages/AdminIssueAssignmentPage"),
);

const AdminPendingVerification = lazy(
  () => import("../features/issues_execution/pages/AdminPendingVerification"),
);

const AdminVerificationReportPage = lazy(
  () =>
    import("../features/issues_execution/pages/AdminVerificationReportPage"),
);
const AdminExecutionProofListPage = lazy(
  () =>
    import("../features/issues_execution/pages/AdminExecutionProofListPage"),
);

const AdminExecutionProofDetailPage = lazy(
  () =>
    import("../features/issues_execution/pages/AdminExecutionProofDetailPage"),
);

const AdminVolunteerGroupsPage = lazy(
  () =>
    import("../features/volunteer_army/pages/admin/AdminVolunteerGroupsPage"),
);

const AdminEventsListPage = lazy(
  () => import("../features/volunteer_army/pages/admin/AdminEventsListPage"),
);

const CreateEventPage = lazy(
  () => import("../features/volunteer_army/pages/admin/CreateEventPage"),
);
const AdminEventDetailPage = lazy(
  () => import("../features/volunteer_army/pages/admin/AdminEventDetailPage"),
);

const AdminUpdateEventPage = lazy(
  () => import("../features/volunteer_army/pages/admin/AdminUpdateEventPage"),
);

const EventParticipantsPage = lazy(
  () => import("../features/volunteer_army/pages/admin/EventParticipantsPage"),
);

const AdminPendingMemberships = lazy(
  () =>
    import("../features/volunteer_army/pages/admin/AdminPendingMemberships"),
);

const MembershipDetailsPage = lazy(
  () => import("../features/volunteer_army/pages/admin/MembershipDetailsPage"),
);

const EventAttendancePage = lazy(
  () => import("../features/volunteer_army/pages/admin/EventAttendancePage"),
);

const AdminPollManagementPage = lazy(
  () => import("../features/polls/pages/AdminPollManagementPage"),
);

const AdminCreatePollPage = lazy(
  () => import("../features/polls/pages/AdminCreatePollPage"),
);

const AdminPollDetailPage = lazy(
  () => import("../features/polls/pages/AdminPollDetailPage"),
);

const AdminDetailsOverview = lazy(
  () => import("../features/polls/pages/AdminDetailsOverview"),
);

const AdminAnalysisTabPage = lazy(
  () => import("../features/polls/pages/AdminAnalysisTabPage"),
);

const AdminReportsPage = lazy(
  () => import("../features/forum/pages/admin/AdminReportsPage"),
);

const AdminReportDetailPage = lazy(
  () => import("../features/forum/pages/admin/AdminReportDetailPage"),
);

const AdminPostsPage = lazy(
  () => import("../features/forum/pages/admin/AdminPostsPage"),
);

const AdminPostDetailPage = lazy(
  () => import("../features/forum/pages/admin/AdminPostDetailPage"),
);

const AdminCategoriesPage = lazy(
  () => import("../features/forum/pages/admin/AdminCategoriesPage"),
);

const AdminModerationLogsPage = lazy(
  () => import("../features/forum/pages/admin/AdminModerationLogsPage"),
);

const AdminActivityLogsPage = lazy(
  () => import("../features/monitoring/pages/AdminActivityLogsPage"),
);

const CategoryManagementPage = lazy(
  () => import("../features/resource/pages/CategoryManagementPage"),
);

const ZoneManagementPage = lazy(
  () => import("../features/resource/pages/ZoneManagementPage"),
);

const BehavioralPromptPage = lazy(
  () => import("../features/resource/pages/BehavioralPromptPage"),
)

const IssueAnalticsPage = lazy(
  () => import("../features/analytics/pages/issue_analytics/IssueAnalticsPage"),
);

const AnalyticsUserDashboardPage = lazy(
  () =>
    import("../features/analytics/pages/user/AnalyticsUserDashboardPage"),
)

const VolunteerAnalyticsPage = lazy(
  () =>
    import("../features/analytics/pages/volunteer/VolunteerAnalyticsPage"),
)

const PollAnalyticsDashboardPage = lazy(
  () =>
    import("../features/analytics/pages/poll/PollAnalyticsDashboardPage"),
)

const ForumAnalyticsDashboardPage = lazy(
  () =>
    import("../features/analytics/pages/forum/ForumAnalyticsDashboardPage"),
)

const AdminPostponedTaskList = lazy(
  () => import("../features/issues_execution/pages/AdminPostponedTaskList"),
)

const AdminPostponedReportDetailPage = lazy(
  () => import("../features/issues_execution/pages/AdminPostponedReportDetailPage"),
)

import Test from "../features/auth/pages/admin/Test";

import UserManagementSectionLoader from "../features/auth/components/skeltons/loaders_skelton/UserManagementSectionLoader";
import CitizenProfile from "../features/core/pages/citizen/CitizenProfile";
import SolverDashBoard from "../features/core/pages/solver/SolverDashBoard";
import SolverProfile from "../features/core/pages/solver/SolverProfile";
import AdminDashboardMain from "../features/core/pages/admin/AdminDashboardMain";
import AdminProfile from "../features/core/pages/admin/AdminProfile";
import AdminDashboardSkeleton from "../features/core/ui/skeltons/admin/AdminDashboardSkeleton";
import AdminFooterLayout from "../features/core/layouts/AdminFooterLayout";
import NotFound from "../pages/NotFound";
import IssueHome from "../features/issues/pages/IssueHome";
import DraftIssuesPage from "../features/issues/pages/DraftIssuesPage";
import DraftIssueDetails from "../features/issues/pages/DraftIssueDetails";
import IssueCreateStep1 from "../features/issues/pages/IssueCreateStep1";
import IssueCreateLocationStep from "../features/issues/pages/IssueCreateLocationStep";
import IssueCreateMediaStep from "../features/issues/pages/IssueCreateMediaStep";
import IssueCreateBehaviorStep from "../features/issues/pages/IssueCreateBehaviorStep";
import IssueReviewSubmitPage from "../features/issues/pages/IssueReviewSubmitPage";
import IssueSubmitSuccessPage from "../features/issues/pages/IssueSubmitSuccessPage";
import IssuesLayout from "../features/issues/layouts/IssuesLayout";
import ComplaintListPage from "../features/issues/pages/ComplaintListPage";
import ComplaintDetails from "../features/issues/pages/ComplaintDetails";
import ExecutionManagementLayout from "../features/issues_execution/layouts/ExecutionManagementLayout";
import SolverTaskListPage from "../features/issues_execution/pages/SolverTaskListPage";
import SolverTaskDetailPage from "../features/issues_execution/pages/SolverTaskDetailPage";
import VerificationEntryPage from "../features/issues_execution/pages/VerificationEntryPage";
import GroundVerificationPage from "../features/issues_execution/pages/GroundVerificationPage";
import ImpactAssessmentPage from "../features/issues_execution/pages/ImpactAssessmentPage";
import VerificationStepRouter from "../features/issues_execution/ui/VerificationStepRouter";
import SolverReportView from "../features/issues_execution/pages/SolverReportView";
import SolverExecutionWorkspace from "../features/issues_execution/pages/SolverExecutionWorkspace";
import AdminSolverTaskDetailPage from "../features/issues_execution/pages/AdminSolverTaskDetailPage";
import PendingReviewSkeleton from "../features/issues_execution/components/pending_review_page/PendingReviewSkeleton";
import IssueDetailSkeleton from "../features/issues_execution/components/issue_details_page/IssueDetailSkeleton";
import SolverAssignmentQueueSkeleton from "../features/issues_execution/components/solver_assignment_queue_page/SolverAssignmentQueueSkeleton";
import IssueAssignmentSkeleton from "../features/issues_execution/components/admin_issue_assignment_page/IssueAssignmentSkeleton";
import TableSkeleton from "../features/issues_execution/components/AdminExecutionProofLIstPage/TableSkeleton";
import AdminProofDetailsSkelton from "../features/issues_execution/components/admin_execution_proof_details_page/AdminProofDetailsSkelton";
import VolunteerHomePage from "../features/volunteer_army/pages/citizen/VolunteerHomePage";
import VolunteerGroupListPage from "../features/volunteer_army/pages/citizen/VolunteerGroupListPage";
import VolunteerGroupDetail from "../features/volunteer_army/pages/citizen/VolunteerGroupDetail";
import MembershipDetailPage from "../features/volunteer_army/pages/citizen/MembershipDetailPage";
import EventListPage from "../features/volunteer_army/pages/citizen/EventListPage";
import EventDetailPage from "../features/volunteer_army/pages/citizen/EventDetailPage";
import MyParticipationsPage from "../features/volunteer_army/pages/citizen/MyParticipationsPage";
import MyRecognitionsPage from "../features/volunteer_army/pages/citizen/MyRecognitionsPage";
import RecognitionDetailPage from "../features/volunteer_army/pages/citizen/RecognitionDetailPage";
import VolunteerManagementLayout from "../features/volunteer_army/layout/VolunteerManagementLayout";
import AdminVolunteerGroupsPageSkeleton from "../features/volunteer_army/components/admin_group_list_page/AdminVolunteerGroupsPageSkeleton";
import CreateEventSkeleton from "../features/volunteer_army/components/admin_event_create_page/CreateEventSkeleton ";
import EventDetailPageSkeleton from "../features/volunteer_army/components/admin_event_details_page/EventDetailPageSkeleton";
import MembershipRequestsSkeleton from "../features/volunteer_army/components/admin_pending_memberships/MembershipRequestsSkeleton";
import CertificateVerifyPage from "../features/volunteer_army/pages/citizen/CertificateVerifyPage";
import MyMembershipsPage from "../features/volunteer_army/pages/citizen/MyMembershipsPage";
import CitizenPollHomePage from "../features/polls/pages/CitizenPollHomePage";
import CitizenPollListPage from "../features/polls/pages/CitizenPollListPage";
import PollDetailPage from "../features/polls/pages/PollDetailPage";
import MyVotesPage from "../features/polls/pages/MyVotePage";
import PollManagementLayout from "../features/polls/layouts/PollManagementLayout";
import AdminPollDetailLayout from "../features/polls/layouts/AdminPollDetailLayout";
import AdminDetailsOverviewSkeleton from "../features/polls/components/adminn_detail_poll_page/AdminDetailsOverviewSkeleton";
import CitizenForumHomePage from "../features/forum/pages/citizen/CitizenForumHomePage";
import CreatePostPage from "../features/forum/pages/citizen/CreatePostPage";
import PostDetailPage from "../features/forum/pages/citizen/PostDetailPage";
import ForumLandingPage from "../features/forum/pages/citizen/ForumLandingPage";
import MyActivityPage from "../features/forum/pages/citizen/MyActivityPage";
import ForumManagementLayout from "../features/forum/layouts/ForumManagementLayout";
import ReportDetailSkeleton from "../features/forum/components/admin/admin_report_detail/ReportDetailSkeleton";
import PostDetailsSkeleton from "../features/forum/components/admin/admin_posts_details/PostDetailsSkeleton";
import MonitorLayout from "../features/monitoring/layouts/MonitorLayout";
import UserActivityPage from "../features/core/pages/citizen/UserActivityPage";
import ResourceLayout from "../features/resource/layouts/ResourceLayout";
import AnalyticsSkeleton from "../features/analytics/components/AnalyticsSkeleton";
import VolunteerAnalyticsSkeleton from "../features/analytics/components/volunteer/VolunteerAnalyticsSkeleton";
import { PollAnalyticsSkeleton } from "../features/analytics/components/polls/PollAnalyticsSkeleton";
import CivicEdgeLanding from "../features/core/pages/citizen/CivicEdgeLanding";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<CivicEdgeHome />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/know-more" element={<CivicEdgeLanding />} />
        <Route path="/complaints" element={<IssueHome />} />
        <Route path="/volunteer-army" element={<VolunteerHomePage />} />
        <Route path="/forum" element={<ForumLandingPage />} />
        <Route
          path="/volunteer-army/certificate/:id/verify"
          element={<CertificateVerifyPage />}
        />
        <Route path="/poll/home" element={<CitizenPollHomePage />} />
      </Route>
      {/* ================== GUEST ROUTES ================== */}
      <Route element={<RequireNoAuth />}>
        <Route element={<AuthLayout />}>
          <Route path="/landing" element={<AuthLanding />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />

          <Route path="/verify-email-info" element={<VerifyEmailInfo />} />
          <Route path="/verify-email" element={<VerifyEmailResult />} />

          <Route path="/forgot-password" element={<AuthForgotPassword />} />
          <Route path="/reset-password" element={<AuthResetPasswordInfo />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<AuthResetPassword />}
          />
          <Route
            path="/reset-confirmation"
            element={<ResetPasswordConfirmation />}
          />

          <Route path="/auth/admin/login" element={<AuthAdminLogin />} />
          <Route path="/auth/solver/login" element={<Login />} />
        </Route>
      </Route>

      {/* ================== AUTHENTICATED ROUTES ================== */}
      <Route element={<RequireAuth />}>
        {/* citizen authenticated area */}
        <Route element={<RoleGuard roles={["citizen"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<CitizenProfile />} />
            <Route path="/profile/my-activity" element={<UserActivityPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/drafts" element={<DraftIssuesPage />} />
            <Route path="/draft/:id" element={<DraftIssueDetails />} />
            <Route path="/issue/new" element={<IssueCreateStep1 />} />
            <Route
              path="/issue/:id/location"
              element={<IssueCreateLocationStep />}
            />
            <Route
              path="/issue/:id/evidence"
              element={<IssueCreateMediaStep />}
            />
            <Route
              path="/issue/:id/behavioral-prompts"
              element={<IssueCreateBehaviorStep />}
            />
            <Route
              path="/issue/:id/submit"
              element={<IssueReviewSubmitPage />}
            />
            <Route
              path="/successfull/:id"
              element={<IssueSubmitSuccessPage />}
            />
            <Route path="/complaints/list" element={<ComplaintListPage />} />
            <Route path="/complaints/:id" element={<ComplaintDetails />} />

            <Route
              path="/volunteer-army/groups"
              element={<VolunteerGroupListPage />}
            />
            <Route
              path="/volunteer-army/group/:id"
              element={<VolunteerGroupDetail />}
            />
            <Route
              path="/volunteer-army/membership/:id"
              element={<MembershipDetailPage />}
            />
            <Route
              path="/volunteer-army/:group_id/events"
              element={<EventListPage />}
            />
            <Route
              path="/volunteer-army/:group_id/events/:event_id"
              element={<EventDetailPage />}
            />
            <Route
              path="/volunteer-army/my-events"
              element={<MyParticipationsPage />}
            />
            <Route
              path="/volunteer-army/recognitions"
              element={<MyRecognitionsPage />}
            />
            <Route
              path="/volunteer-army/recognitions/:id"
              element={<RecognitionDetailPage />}
            />
            <Route
              path="/volunteer-army/my-memberships"
              element={<MyMembershipsPage />}
            />
            <Route path="/polls/list" element={<CitizenPollListPage />} />
            <Route path="/polls/list/:id" element={<PollDetailPage />} />
            <Route path="/polls/my-votes" element={<MyVotesPage />} />

            <Route path="/forum/home" element={<CitizenForumHomePage />} />
            <Route path="/forum/posts/create" element={<CreatePostPage />} />
            <Route path="/forum/posts/:id" element={<PostDetailPage />} />
            <Route path="/forum/my-activity" element={<MyActivityPage />} />
          </Route>
        </Route>
        <Route element={<RoleGuard roles={["solver"]} />}>
          <Route element={<SolverLayout />}>
            <Route
              path="/solver/:task_id/verification-reports"
              element={<SolverReportView />}
            />
            <Route path="/solver/dashboard" element={<SolverDashBoard />} />
            <Route path="/solver/profile" element={<SolverProfile />} />
            <Route path="/solver/my-activity" element={<UserActivityPage />} />

            <Route path="/solver/settings" element={<SettingsPage />} />
            <Route path="/solver/task/list" element={<SolverTaskListPage />} />
            <Route path="/solver/task/:id" element={<SolverTaskDetailPage />} />
            <Route
              path="/solver/task/verification-entry/:id/"
              element={<VerificationEntryPage />}
            />
            <Route
              path="/solver/tasks/:draft_id/verification/:step"
              element={<VerificationStepRouter />}
            />
            <Route
              path="/solver/tasks/:task_id/execution/"
              element={<SolverExecutionWorkspace />}
            />
          </Route>
        </Route>

        {/* ================== ADMIN ONLY ================== */}
        <Route element={<RoleGuard roles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route element={<AdminFooterLayout />}>
              {/* User Management Section */}
              <Route
                path="/dashboard/management"
                element={<UserManagementLayout />}
              >
                <Route
                  path="citizens"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <UserManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="solvers"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <SolverManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="admins"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <AdminManagement />
                    </Suspense>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <Suspense fallback={<UserManagementSectionLoader />}>
                      <AnalyticsUserDashboardPage />
                    </Suspense>
                  }
                />
              </Route>

              <Route
                path="/dashboard/execution"
                element={<ExecutionManagementLayout />}
              >
                <Route
                  path="in-review/issues"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <PendingReviewPage />
                    </Suspense>
                  }
                />
                <Route
                  path="tasks/list"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminSolverCompleteTask />
                    </Suspense>
                  }
                />
                <Route
                  path="in-review/issues/:id/details"
                  element={
                    <Suspense fallback={<IssueDetailSkeleton />}>
                      <IssueDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="solver-assignment"
                  element={
                    <Suspense fallback={<SolverAssignmentQueueSkeleton />}>
                      <SolverAssignmentQueuePage />
                    </Suspense>
                  }
                />
                <Route
                  path="solver-assignment/:id/decision"
                  element={
                    <Suspense fallback={<IssueAssignmentSkeleton />}>
                      <AdminIssueAssignmentPage />
                    </Suspense>
                  }
                />
                <Route
                  path="verification-reports"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminPendingVerification />
                    </Suspense>
                  }
                />
                <Route
                  path="postponed-verification-reports"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminPostponedTaskList />
                    </Suspense>
                  }
                />
                <Route
                  path="postponed-verification-reports/:id"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminPostponedReportDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="verification-report/:id"
                  element={
                    <Suspense fallback={<IssueDetailSkeleton />}>
                      <AdminVerificationReportPage />
                    </Suspense>
                  }
                />
                <Route
                  path="execution-proofs"
                  element={
                    <Suspense fallback={<TableSkeleton />}>
                      <AdminExecutionProofListPage />
                    </Suspense>
                  }
                />
                <Route
                  path="execution-proof/:id"
                  element={
                    <Suspense fallback={<AdminProofDetailsSkelton />}>
                      <AdminExecutionProofDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="solver-tasks/:id"
                  element={<AdminSolverTaskDetailPage />}
                />
                <Route
                  path="issue/analytics"
                  element={
                    <Suspense fallback={<AnalyticsSkeleton />}>
                      <IssueAnalticsPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="/dashboard/volunteer"
                element={<VolunteerManagementLayout />}
              >
                <Route
                  path="groups"
                  element={
                    <Suspense fallback={<AdminVolunteerGroupsPageSkeleton />}>
                      <AdminVolunteerGroupsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="events"
                  element={
                    <Suspense fallback={<AdminVolunteerGroupsPageSkeleton />}>
                      <AdminEventsListPage />
                    </Suspense>
                  }
                />
                <Route
                  path="events/create"
                  element={
                    <Suspense fallback={<CreateEventSkeleton />}>
                      <CreateEventPage />
                    </Suspense>
                  }
                />
                <Route
                  path="events/:id"
                  element={
                    <Suspense fallback={<EventDetailPageSkeleton />}>
                      <AdminEventDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="events/:id/update"
                  element={
                    <Suspense fallback={<CreateEventSkeleton />}>
                      <AdminUpdateEventPage />
                    </Suspense>
                  }
                />
                <Route
                  path="events/:id/participants"
                  element={
                    <Suspense fallback={<EventDetailPageSkeleton />}>
                      <EventParticipantsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/volunteer/memberships"
                  element={
                    <Suspense fallback={<MembershipRequestsSkeleton />}>
                      <AdminPendingMemberships />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/volunteer/memberships/:id"
                  element={
                    <Suspense fallback={<MembershipRequestsSkeleton />}>
                      <MembershipDetailsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/volunteer/attendance"
                  element={
                    <Suspense fallback={<AdminVolunteerGroupsPageSkeleton />}>
                      <EventAttendancePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/volunteer/analytics"
                  element={
                    <Suspense fallback={<VolunteerAnalyticsSkeleton />}>
                      <VolunteerAnalyticsPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/dashboard" element={<ForumManagementLayout />}>
                <Route
                  path="/dashboard/forum/reports"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminReportsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/reports/:id"
                  element={
                    <Suspense fallback={<ReportDetailSkeleton />}>
                      <AdminReportDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/posts"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminPostsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/posts/:id"
                  element={
                    <Suspense fallback={<PostDetailsSkeleton />}>
                      <AdminPostDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/category"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminCategoriesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/moderation"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminModerationLogsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/forum/analytics"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <ForumAnalyticsDashboardPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/dashboard" element={<MonitorLayout />}>
                <Route
                  path="/dashboard/monitoring/activity-log"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <AdminActivityLogsPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/dashboard" element={<ResourceLayout />}>
                <Route
                  path="/dashboard/resource/category"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <CategoryManagementPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/resource/zones"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <ZoneManagementPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/resource/behavioral"
                  element={
                    <Suspense fallback={<PendingReviewSkeleton />}>
                      <BehavioralPromptPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="/dashboard" element={<PollManagementLayout />}>
                <Route
                  path="/dashboard/polls"
                  element={
                    <Suspense fallback={<AdminVolunteerGroupsPageSkeleton />}>
                      <AdminPollManagementPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/polls/create"
                  element={
                    <Suspense fallback={<AdminDashboardSkeleton />}>
                      <AdminCreatePollPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/polls/:id"
                  element={
                    <Suspense fallback={<AdminDashboardSkeleton />}>
                      <AdminPollDetailPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/polls/analytics"
                  element={
                    <Suspense fallback={<PollAnalyticsSkeleton />}>
                      <PollAnalyticsDashboardPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/dashboard/polls/:id"
                  element={<AdminPollDetailLayout />}
                >
                  <Route index element={<Navigate to="overview" replace />} />

                  <Route
                    path="overview"
                    element={
                      <Suspense fallback={<AdminDetailsOverviewSkeleton />}>
                        <AdminDetailsOverview />
                      </Suspense>
                    }
                  />
                  <Route
                    path="analysis"
                    element={
                      <Suspense fallback={<AdminDetailsOverviewSkeleton />}>
                        <AdminAnalysisTabPage />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>
              <Route
                path="/dashboard/home"
                element={
                  <Suspense fallback={<AdminDashboardSkeleton />}>
                    <AdminDashboardMain />
                  </Suspense>
                }
              />

              <Route path="/dashboard/profile" element={<AdminProfile />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />

              <Route path="/dashboard/test" element={<Test />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* ================== SYSTEM ================== */}
      <Route path="/not-found" element={<NotFound />} />
      {/* ================== FALLBACK ================== */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}
