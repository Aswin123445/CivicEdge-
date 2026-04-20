from django.db.models import Count, Q

from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.models.issues import Issue
from apps.user.models.user import User
from apps.forum.models.forum_report import ForumReport
from apps.volunteer_army.models.volunteer_event import VolunteerEvent
from apps.profiles.selectors.last_7_issue_count import get_last_7_days_issues
from apps.profiles.selectors.users_joined_7_days import get_users_joined_last_7_days
from apps.profiles.selectors.last_7_days_posts import get_forum_posts_last_7_days
from apps.profiles.selectors.get_admin_activity_metrics import get_admin_activity_metrics
from shared.enums.user_role import UserRole


def get_dashboard_metrics(admin):
    return {
        "issues": Issue.objects.aggregate(
            total=Count("id"),
            open=Count("id", filter=Q(status="IN_REVIEW",is_draft=False,solver_tasks__isnull=True)),
            resolved=Count("id", filter=Q(status="RESOLVED")),
        ),

        "tasks": SolverTask.objects.aggregate(
            total=Count("id"),
            completed=Count("id", filter=Q(status="COMPLETED")),
        ),

        "solvers": {
            "total": User.objects.filter(role=UserRole.SOLVER).count(),
            "active": User.objects.filter(
                role=UserRole.SOLVER,
                profile__is_available=True
            ).count(),
        },

        "flags": {
            "total": ForumReport.objects.count(),
            "pending": ForumReport.objects.filter(status="PENDING").count(),
        },

        "events": {
            "total": VolunteerEvent.objects.count(),
            "active": VolunteerEvent.objects.filter(status="PUBLISHED").count(),
        },
        "issues_last_7_days": get_last_7_days_issues(),
        "users_joined_7_days": get_users_joined_last_7_days(),
        "posts_last_7_days": get_forum_posts_last_7_days(),
        "admin":get_admin_activity_metrics(admin)
    }