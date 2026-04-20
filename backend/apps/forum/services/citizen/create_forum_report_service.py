from rest_framework.exceptions import ValidationError

from apps.forum.selectors.citizen.get_existing_report_selector import get_existing_report
from apps.forum.selectors.citizen.get_report_target_selector import get_report_target
from apps.forum.models.forum_report import ForumReport, ReportStatus
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def create_forum_report(*, user, data):
     
    target_type = data["target_type"]
    target_id = data["target_id"]
    reason = data["reason"]

    target = get_report_target(
        target_type=target_type,
        target_id=target_id,
    )

    if not target:
        raise ValidationError("Invalid target")

    #  Prevent self-report (optional but recommended)
    if hasattr(target, "user") and target.user_id == user.id:
        raise ValidationError("You cannot report your own content")

    #  Prevent duplicate reports
    existing = get_existing_report(
        user=user,
        target_type=target_type,
        target_id=target_id,
    )

    if existing:
        raise ValidationError("You have already reported this content")

    report = ForumReport.objects.create(
        reported_by=user,
        target_type=target_type,
        target_id=target_id,
        reason=reason,
        status=ReportStatus.PENDING,
    )
    create_activity(
        user=user,
        entity=ActivityEntity.FORUM,
        action=ActivityAction.MODERATED,
        message=f"Reported the {target_type} with reason: {reason}",
    )

    return report