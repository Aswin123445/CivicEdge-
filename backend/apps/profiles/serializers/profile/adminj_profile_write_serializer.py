from rest_framework import serializers
from apps.user.models.user import Profile


class AdminProfileWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "name",
            "bio"
        ]
