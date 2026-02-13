from rest_framework import serializers
from apps.user.models.user import Profile


class SolverProfileReadSerializer(serializers.ModelSerializer):
    # user-related read-only fields
    email = serializers.EmailField(source="user.email", read_only=True)
    # FK display
    zone = serializers.CharField(source="zone.name", read_only=True)
    class Meta:
        model = Profile
        fields = [
            "name",
            "email",
            "phone",
            "zone",
            "avatar_url",
            "interests",
            "skills",
            "is_available",
        ]
        read_only_fields = fields
