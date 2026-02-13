from shared.enums.user_role import UserRole

class CitizenHomeBuilder:

    @staticmethod
    def build(user):
        return {
            "role": UserRole.CITIZEN,
            "profile": {
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
                "zone": user.profile.zone.name if user.profile.zone else None,
                "interests": user.profile.interests if user.profile.interests else [],
                # "completion": ProfileService.completion(user),
            },
            # "dashboard": {
            #     "complaints": ComplaintSelector.stats(user),
            #     "recent_complaints": ComplaintSelector.recent(user),
            # },
            # "meta": {
            #     "unread_notifications": NotificationSelector.unread_count(user)
            # }
        }
