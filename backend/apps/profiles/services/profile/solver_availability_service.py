
class SolverAvailabilityService:

    @staticmethod
    def toggle(user):
        profile = user.profile
        profile.is_available = not profile.is_available
        profile.save(update_fields=["is_available"])

        return profile.is_available
