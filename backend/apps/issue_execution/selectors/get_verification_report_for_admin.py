

from django.shortcuts import get_object_or_404

from apps.issue_execution.models.field_verification_report import FieldVerificationReport


def get_verification_report_for_admin(*, report_id):
    return get_object_or_404(
        FieldVerificationReport.objects
        .select_related(
            "solver_task",
            "solver_task__issue",
            "submitted_by",
        )
        .prefetch_related("media"),
        id=report_id,
        is_active=True,
    )