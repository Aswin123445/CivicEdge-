from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus
from shared.enums.user_role import UserRole

class SolverHomeBuilder:

    @staticmethod
    def build(user):
        return {
            "role": UserRole.SOLVER,
            "profile": {
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
                "zone": user.profile.zone.name if user.profile.zone else None,
                "skills": user.profile.skills if user.profile.skills else [],
                "availability": user.profile.is_available,
                "email": user.email,
                "bio": user.profile.bio,
                "task_completed": user.assigned_solver_tasks.filter(status = SolverTaskStatus.COMPLETED).count(),
                "task_completion_percent": user.assigned_solver_tasks.filter(status = SolverTaskStatus.COMPLETED).count() * 100 / user.assigned_solver_tasks.count(),
                # "completion": ProfileService.completion(user),
            },
            # "dashboard": {
            #     "tasks": TaskSelector.stats(user),
            #     "recent_tasks": TaskSelector.recent(user),
            # },
            # "meta": {
            #     "unread_notifications": NotificationSelector.unread_count(user)
            # }
        }
