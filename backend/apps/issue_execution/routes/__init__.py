from django.urls import path

from apps.issue_execution.views.admin_issue_review_views import AdminInitialIssueReviewListView
from apps.issue_execution.views.admin_issue_detail_view import AdminIssueDetailView
from apps.issue_execution.views.admin_issue_decision_view import AdminIssueDecisionView
from apps.issue_execution.views.admin_issue_assignment_list_view import AdminIssueSolverAssignmentListView
from apps.issue_execution.views.admin_assign_solver_view import AdminAssignSolverView
from apps.issue_execution.views.solver_task_list_view import SolverTaskListView
from apps.issue_execution.views.solver_task_detail_view import SolverTaskDetailView
from apps.issue_execution.views.solver_verification_draft_view import SolverVerificationDraftView
from apps.issue_execution.views.verification_ground_update_view import SolverVerificationGroundUpdateView
from apps.issue_execution.views.verification_impact_update_view import SolverVerificationImpactUpdateView
from apps.issue_execution.views.verification_estimation_update_view import SolverVerificationEstimationUpdateView
from apps.issue_execution.views.verification_evidence_bulk_create_view import SolverVerificationEvidenceBulkCreateView
from apps.issue_execution.views.submit_verification_view import SolverSubmitVerificationView
from apps.issue_execution.views.admin_verification_report_list_view import AdminVerificationReportListView
from apps.issue_execution.views.admin_verification_report_detail_view import AdminVerificationReportDetailView
from apps.issue_execution.views.admin_verification_decision_view import AdminVerificationDecisionView
from apps.issue_execution.views.admin_assign_contractor_view import AdminAssignContractorView
from apps.issue_execution.views.admin_solver_task_list_view import AdminSolverTaskListView
from apps.issue_execution.views.solver_start_execution_view import SolverStartExecutionView
from apps.issue_execution.views.solver_progress_update_view import SolverProgressUpdateView
from apps.issue_execution.views.solver_progress_update_list_view import SolverProgressUpdateListView
from apps.issue_execution.views.solver_submit_completion_view import SolverSubmitCompletionView
from apps.issue_execution.views.admin_execution_decision_view import AdminExecutionDecisionView
from apps.issue_execution.views.admin_execution_proof_detail_view import AdminExecutionProofDetailView
from apps.issue_execution.views.admin_pending_execution_proof_list_view import AdminPendingExecutionProofListView
from apps.issue_execution.views.solver_execution_proof_list_view import SolverExecutionProofListView
from apps.issue_execution.views.solver_execution_proof_detail_view import SolverExecutionProofDetailView
from apps.issue_execution.views.solver_draft_detail_view import SolverVerificationReportDetailAPIView
 

urlpatterns = [
    path("admin/in-review/issues/", AdminInitialIssueReviewListView.as_view(), name="admin-initial-issue-review-list"),
    path("admin/in-review/<uuid:id>/issue/", AdminIssueDetailView.as_view(), name="admin-initial-issue-review-details"),
    path("admin/in-review/<uuid:id>/decision/", AdminIssueDecisionView.as_view(), name="admin-issue-decision"),
    path("admin/in-review/issues/solver-assignment/", AdminIssueSolverAssignmentListView.as_view(), name="admin-issue-solver-assignment-list"),
    path("admin/in-review/issues/<uuid:issue_id>/assign-solver/", AdminAssignSolverView.as_view(), name="admin-assign-solver"),
    path("solver/task-list/", SolverTaskListView.as_view(), name="solver-task-list"),
    path("solver/task/<uuid:id>/", SolverTaskDetailView.as_view(), name="solver-task-detail"),
    path("solver/task/<uuid:id>/verification-draft/", SolverVerificationDraftView.as_view(), name="solver-verification-draft"),
    path("solver/verification-draft/<uuid:id>/ground/", SolverVerificationGroundUpdateView.as_view(), name="solver-verification-ground-update"), 
    path("solver/verification-draft/<uuid:id>/impact/",SolverVerificationImpactUpdateView.as_view(), name="solver-verification-impact-update"), 
    path("solver/verification-draft/<uuid:draft_id>/estimation/",SolverVerificationEstimationUpdateView.as_view(), name="solver-verification-estimation-update"), 
    path("solver/verification-draft/<uuid:draft_id>/evidence/",SolverVerificationEvidenceBulkCreateView.as_view(), name="solver-verification-evidence-bulk-create"),
    path("solver/draft/<uuid:draft_id>/get-draft/", SolverVerificationReportDetailAPIView.as_view(), name="solver-submit-completion"),
    path("solver/tasks/<uuid:task_id>/submit-verification/", SolverSubmitVerificationView.as_view(), name="solver-submit-verification"),  
    path("admin/verification-reports/", AdminVerificationReportListView.as_view(), name="admin-verification-report-list"),
    path("admin/verification-reports/<uuid:report_id>/", AdminVerificationReportDetailView.as_view(), name="admin-verification-report-detail"),
    path("admin/verification-reports/<uuid:report_id>/decision/", AdminVerificationDecisionView.as_view(), name="admin-verification-report-decision"),
    path("admin/solver-tasks/<uuid:task_id>/assign-contractor/", AdminAssignContractorView.as_view(), name="admin-assign-contractor"),  
    path("admin/solver-tasks/",AdminSolverTaskListView.as_view(), name="admin-solver-task-list"),
    path("solver/tasks/<uuid:task_id>/start-execution/",SolverStartExecutionView.as_view(), name="solver-start-execution"),
    path("solver/tasks/<uuid:task_id>/progress-updates/",SolverProgressUpdateView.as_view(), name="solver-progress-update"),
    path("solver/tasks/<uuid:task_id>/progress-updates-list/",SolverProgressUpdateListView.as_view(), name="solver-progress-update-list"),
    path("solver/tasks/<uuid:task_id>/submit-completion/",SolverSubmitCompletionView.as_view(), name="solver-submit-completion"),   
    path("admin/execution-proofs/<uuid:proof_id>/decision/",AdminExecutionDecisionView.as_view(), name="admin-proof-decision"),
    path("admin/execution-proofs/",AdminPendingExecutionProofListView.as_view(), name="admin-pending-proof-list"),
    path("admin/execution-proof/<uuid:proof_id>/",AdminExecutionProofDetailView.as_view(), name="admin-proof-detail"),
    path("solver/execution-proofs/",SolverExecutionProofListView.as_view(), name="solver-proof-list"),
    path("solver/execution-proof/<str:id>/",SolverExecutionProofDetailView.as_view(), name="solver-proof-detail"),
]   