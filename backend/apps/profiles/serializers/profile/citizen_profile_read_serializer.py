from rest_framework import serializers
from apps.user.models.user import Profile


class CitizenProfileReadSerializer(serializers.ModelSerializer):
    # Nested / derived fields
    email = serializers.EmailField(source="user.email", read_only=True)
    zone = serializers.CharField(source="zone.name", read_only=True)

    # Computed field

    class Meta:
        model = Profile
        fields = [
            "name",
            "email",
            "phone",
            "zone",
            'interests',
            "avatar_url",
            "bio"
        ]
        read_only_fields = fields  # entire serializer is read-only