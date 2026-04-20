
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.utils.handlers.issue_and_execution.handle_issue_reported import handle_issue_reported
from apps.notification.utils.handlers.issue_and_execution.handle_task_assigned import handle_task_assigned
from apps.notification.utils.handlers.issue_and_execution.handle_report_submitted_to_admin import handle_report_submitted_to_admin
from apps.notification.utils.handlers.issue_and_execution.handle_task_completed_by_solver import handle_task_completed_by_solver
from apps.notification.utils.handlers.issue_and_execution.handle_issue_resolved import handle_issue_resolved
from apps.notification.utils.handlers.issue_and_execution.handle_task_approved_by_admin import handle_task_approved_by_admin
from apps.notification.utils.handlers.issue_and_execution.handle_task_rejected_by_admin import handle_task_rejected_by_admin
from apps.notification.utils.handlers.volunteer.handle_volunteer_join_approved import handle_volunteer_join_approved
from apps.notification.utils.handlers.volunteer.handle_volunteer_join_rejected import handle_volunteer_join_rejected
from apps.notification.utils.handlers.volunteer.handle_volunteer_certificate_generated import handle_volunteer_certificate_generated
from apps.notification.utils.handlers.forum.handle_forum_report import handle_forum_report
from apps.notification.utils.handlers.forum.handle_forum_comment import handle_forum_comment
from apps.notification.utils.handlers.forum.handle_forum_reaction import handle_forum_reaction

EVENT_HANDLERS = {
    NotificationEvent.ISSUE_REPORTED: handle_issue_reported,
    NotificationEvent.TASK_ASSIGNED_TO_SOLVER: handle_task_assigned,
    NotificationEvent.REPORT_SUBMITTED_TO_ADMIN: handle_report_submitted_to_admin,
    NotificationEvent.TASK_COMPLETED_BY_SOLVER: handle_task_completed_by_solver,
    NotificationEvent.ISSUE_RESOLVED: handle_issue_resolved,
    NotificationEvent.TASK_APPROVED_BY_ADMIN: handle_task_approved_by_admin,
    NotificationEvent.TASK_REJECTED_BY_ADMIN: handle_task_rejected_by_admin,
    NotificationEvent.VOLUNTEER_JOIN_APPROVED: handle_volunteer_join_approved,
    NotificationEvent.VOLUNTEER_JOIN_REJECTED: handle_volunteer_join_rejected,
    NotificationEvent.VOLUNTEER_CERTIFICATE:  handle_volunteer_certificate_generated,
    NotificationEvent.FORUM_REPORT_USER : handle_forum_report,
    NotificationEvent.FORUM_REPLY_RECEIVED: handle_forum_comment,
    NotificationEvent.FORUM_POST_REACTED: handle_forum_reaction
    
}