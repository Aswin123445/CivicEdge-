from shared.enums.user_role import UserRole

class AdminHomeBuilder:

    @staticmethod
    def build(user):
        return {
            "role": UserRole.ADMIN,
            "profile": {
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
            },
            # "dashboard": {
            #     "system": AdminStatsSelector.system(),
            #     "today": AdminStatsSelector.today(),
            # },
            # "meta": {
            #     "unread_notifications": NotificationSelector.unread_count(user)
            # }
        }
