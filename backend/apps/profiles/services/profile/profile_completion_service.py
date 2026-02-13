class ProfileCompletionService:

    REQUIRED_FIELDS = {
        "citizen": ["name", "phone", "zone","avatar_url", "interests"],
        "solver": ["name", "phone", "avatar_url","skills"]
    }

    @staticmethod
    def calculate(profile, role):
        required = ProfileCompletionService.REQUIRED_FIELDS[role]
        missing = []

        for field in required:
            if not getattr(profile, field, None):
                missing.append(field)

        total = len(required)
        completed = total - len(missing)

        percentage = int((completed / total) * 100)

        return {
            "completion_percentage": percentage,
            "is_complete": percentage == 100,
            "missing_fields": missing
        }
