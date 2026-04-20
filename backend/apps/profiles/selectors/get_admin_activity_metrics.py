from django.contrib.auth import get_user_model

from apps.issue_execution.models.solver_task import SolverTask
from apps.polls.models.polls import Poll
from apps.volunteer_army.models.volunteer_event import VolunteerEvent
from apps.volunteer_army.models.volunteer_group import VolunteerGroup

User = get_user_model()

def get_admin_activity_metrics(admin_user):
    return {

        "tasks_approved": SolverTask.objects.filter(
            status="COMPLETED",
            assigned_by=admin_user  
        ).count(),

        "events_created": VolunteerEvent.objects.filter(
            created_by=admin_user
        ).count(),

        "groups_created": VolunteerGroup.objects.filter(
            created_by=admin_user
        ).count(),

        "polls_created": Poll.objects.filter(
            created_by=admin_user
        ).count(),
    }