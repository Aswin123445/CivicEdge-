from rest_framework.exceptions import ValidationError


from apps.forum.models.forum_report import  ReportStatus
from apps.forum.models.moderation_log import ModerationLog
from apps.forum.selectors.admin.get_report_with_target_selector import get_report_with_target


def admin_take_report_action(*, moderator, report_id, data):
    action = data["action"]
    reason = data.get("reason", "")

    report, target = get_report_with_target(report_id=report_id)

    if not report:
        raise ValidationError("Report not found")

    if report.status != ReportStatus.PENDING:
        raise ValidationError("Report already processed")

    #  REJECT (no content change)
    if action == "reject":
        report.status = ReportStatus.REJECTED
        report.save(update_fields=["status"])

        ModerationLog.objects.create(
            moderator=moderator,
            target_type=report.target_type,
            target_id=report.target_id,
            action="reject",
            reason=reason,
            metadata={"report_id": str(report.id)},
        )

        return report

    #  For other actions, target must exist
    if not target:
        raise ValidationError("Target content not found")

    old_status = getattr(target, "status", None)

    #  Apply action
    if action == "hide":
        target.change_status("hidden")

    elif action == "remove":
        target.change_status("removed")

    elif action == "restore":
        target.change_status("active")

    else:
        raise ValidationError("Invalid action")

    #  Update report
    report.status = ReportStatus.RESOLVED
    report.save(update_fields=["status"])

    #  Log action
    ModerationLog.objects.create(
        moderator=moderator,
        target_type=report.target_type,
        target_id=report.target_id,
        action=action,
        reason=reason,
        metadata={
            "report_id": str(report.id),
            "previous_status": old_status,
            "new_status": getattr(target, "status", None),
        },
    )

    return report