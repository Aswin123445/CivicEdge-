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
