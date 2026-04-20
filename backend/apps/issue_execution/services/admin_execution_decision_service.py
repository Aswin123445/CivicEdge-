from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.solver_task import SolverTaskStatus
from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issues.services.timeline_service import add_issue_timeline_event
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


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
        
        task._transition(
            to_status=SolverTaskStatus.COMPLETED,
        )

        issue._transition(
            to_status=IssueStatus.RESOLVED,
            by=admin,
        )
        add_issue_timeline_event(
            issue=issue,
            message="Issue as been successfully completed",
            created_by=admin,
        )
        NotificationDispatcher.dispatch(
            event=NotificationEvent.ISSUE_RESOLVED,
            payload={
                "issue": issue,
                "actor": admin
            }
        )
        NotificationDispatcher.dispatch(
            event=NotificationEvent.TASK_APPROVED_BY_ADMIN,
            payload={
                "task": task,
                "actor": admin
            }
        )
        proof.review_status = ExecutionProof.ReviewStatus.APPROVED 
        proof.reviewed_by = admin 
        proof.admin_message = data["reason"]
        proof.save(update_fields=["review_status", "reviewed_by", "admin_message"])
        create_activity(
            user=admin,
            entity=ActivityEntity.TASK,
            action=ActivityAction.COMPLETED,
            message=f"Task {task.reference_id} completed successfully",
        )
        return {
            "detail": "Execution approved. Issue resolved."
        }


    # =============================
    # REJECT FLOW
    # =============================
    if decision == "REJECT":

        proof.is_active = False
        proof.admin_message = data["reason"] 
        proof.review_status = ExecutionProof.ReviewStatus.REJECTED 
        proof.reviewed_by = admin
        proof.save(update_fields=["is_active", "admin_message", "review_status", "reviewed_by"])

        task._transition(
            to_status=SolverTaskStatus.IN_EXECUTION,
        )
        NotificationDispatcher.dispatch(
            event=NotificationEvent.TASK_REJECTED_BY_ADMIN,
            payload={
                "task": task,
                "actor": admin,
            }
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