from apps.user.models import Profile
class ProfileSelector:
    @staticmethod
    def get_for_user(user):
        return (
            Profile.objects
            .select_related("zone", "user")
            .get(user=user)
        )
