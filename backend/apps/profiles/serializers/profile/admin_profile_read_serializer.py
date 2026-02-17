from rest_framework import serializers
from apps.user.models.user import Profile


class AdminProfileReadSerializer(serializers.ModelSerializer):
    # user-related fields
    email = serializers.EmailField(source="user.email", read_only=True)
    role = serializers.CharField(source="user.role", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "name",
            "email",
            "role",
            "phone",
            "avatar_url",
            # admin/system level fields (if exist)
            "created_at",
            "updated_at",
            "bio",
        ]
        read_only_fields = fields
