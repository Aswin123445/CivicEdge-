from apps.profiles.services.home.citizen_performance_percentail import citizen_performance_percentail
from shared.enums.user_role import UserRole
from django.db import models
class CitizenHomeBuilder:

    @staticmethod
    def build(user):
        volunteer_log = user.volunteer_service_logs.all()
        total_hours = volunteer_log.aggregate(hours =models.Sum("service_hours")) 
        return {
            "role": UserRole.CITIZEN,
            "profile": {
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
                "zone": user.profile.zone.name if user.profile.zone else None,
                "interests": user.profile.interests if user.profile.interests else [],
                "email": user.email,
                "bio": user.profile.bio,
                # "completion": ProfileService.completion(user),
            },
            "dashboard": {
                "total_complaints": user.reported_issues.count(), 
                "total_volunteer_hours": total_hours["hours"],
                "performance_percentail":citizen_performance_percentail(user)
            },
            # "meta": {
            #     "unread_notifications": NotificationSelector.unread_count(user)
            # }
        }
