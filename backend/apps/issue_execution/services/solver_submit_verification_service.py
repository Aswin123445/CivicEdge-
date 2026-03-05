from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft
from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from apps.issue_execution.models.verification_evidence import VerificationEvidence
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.services.timeline_service import add_issue_timeline_event


@transaction.atomic
def submit_field_verification(*, solver, task: SolverTask):
    """
    Finalize solver field verification:
    - validate draft completeness
    - create FieldVerificationReport
    - promote evidence
    - freeze draft
    """

    # -----------------------------
    # Ownership & state checks
    # -----------------------------
    if not solver.is_active:
        raise ValidationError("Inactive solver cannot submit verification.")

    if task.solver != solver:
        raise ValidationError("You are not assigned to this task.")

    # -----------------------------
    # Fetch active draft
    # -----------------------------
    try:
        draft = FieldVerificationDraft.objects.get(
            solver_task=task,
            is_submitted=False,
            is_active=True,
        )
    except FieldVerificationDraft.DoesNotExist:
        raise ValidationError("No active verification draft found.")

    # -----------------------------
    # Completion gate
    # -----------------------------
    if not draft.is_ready_for_submission():
        raise ValidationError(
            "Verification draft is incomplete. Complete all sections before submission."
        )

    # -----------------------------
    # Create immutable report
    # -----------------------------
    report = FieldVerificationReport.objects.create(
        solver_task=task,
        submitted_by=solver,

        # --- Ground ---
        is_issue_present=draft.is_issue_present,
        severity_level=draft.severity_level,
        affected_area_description=draft.affected_area_description,

        # --- Impact ---
        public_impact_summary=draft.public_impact_summary,
        estimated_people_affected=draft.estimated_people_affected,
        local_feedback_summary=draft.local_feedback_summary,

        # --- Estimation ---
        estimated_budget=draft.estimated_budget,
        estimated_duration_days=draft.estimated_duration_days,

        # --- Constraints & risks ---
        site_constraints=draft.site_constraints,
        execution_risks=draft.execution_risks,
    )

    # -----------------------------
    # Promote evidence (draft → report)
    # -----------------------------
    VerificationEvidence.objects.filter(
        verification_draft=draft
    ).update(
        verification_draft=None,
        verification_report=report,
    )
    add_issue_timeline_event(
        issue=task.issue,
        message="Verification report submitted.",
        created_by=solver,
    )

    # -----------------------------
    # Freeze draft
    # -----------------------------
    draft.is_submitted = True
    draft.save(update_fields=["is_submitted", "updated_at"])

    # -----------------------------
    # Update solver task state
    # -----------------------------
    task.submit_verification(by=solver)

    return report