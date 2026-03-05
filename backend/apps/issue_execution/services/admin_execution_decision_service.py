from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.solver_task import SolverTaskStatus
from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issues.services.timeline_service import add_issue_timeline_event


@transaction.atomic
def review_execution_completion(*, admin, proof, data):

    task = proof.solver_task
    issue = task.issue

    # -----------------------------
    # Preconditions
    # -----------------------------
    if task.status != SolverTaskStatus.COMPLETION_SUBMITTED:
        raise ValidationError(
            "Task is not awaiting completion review."
        )

    if not proof.is_active:
        raise ValidationError(
            "This execution proof is no longer active."
        )

    decision = data["decision"]

    # =============================
    # APPROVE FLOW
    # =============================
    if decision == "APPROVE":
        
        # 1️⃣ Transition SolverTask
        task._transition(
            to_status=SolverTaskStatus.COMPLETED,
        )

        # 2️⃣ Transition Issue
        issue._transition(
            to_status=IssueStatus.RESOLVED,
            by=admin,
        )
        add_issue_timeline_event(
            issue=issue,
            message="Issue as been successfully completed",
            created_by=admin,
        )
        proof.review_status = ExecutionProof.ReviewStatus.APPROVED 
        proof.reviewed_by = admin 
        proof.admin_message = data["reason"]
        proof.save(update_fields=["review_status", "reviewed_by", "admin_message"])

        return {
            "detail": "Execution approved. Issue resolved."
        }


    # =============================
    # REJECT FLOW
    # =============================
    if decision == "REJECT":

        # 1️⃣ Deactivate proof
        proof.is_active = False
        proof.admin_message = data["reason"] 
        proof.review_status = ExecutionProof.ReviewStatus.REJECTED 
        proof.reviewed_by = admin
        proof.save(update_fields=["is_active", "admin_message", "review_status", "reviewed_by"])

        # 2️⃣ Move task back to execution
        task._transition(
            to_status=SolverTaskStatus.IN_EXECUTION,
        )
        add_issue_timeline_event(
            issue=issue,
            message="Cross checking the issue",
            created_by=admin,
        )       

        # Issue remains IN_PROGRESS

        return {
            "detail": "Execution rejected. Task reopened."
        }