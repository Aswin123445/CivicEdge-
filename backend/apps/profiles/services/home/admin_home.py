from shared.enums.user_role import UserRole

class AdminHomeBuilder:

    @staticmethod
    def build(user):
        return {
            "role": UserRole.ADMIN,
            "profile": {
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
                "bio": user.profile.bio if user.profile.bio else None, 
                "email": user.email 
            },
            # "dashboard": {
            #     "system": AdminStatsSelector.system(),
            #     "today": AdminStatsSelector.today(),
            # },
            # "meta": {
            #     "unread_notifications": NotificationSelector.unread_count(user)
            # }
        }
