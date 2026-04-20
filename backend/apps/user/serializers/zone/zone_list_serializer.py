from rest_framework import serializers
from apps.user.models.user import Zone


class ZoneListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = [
            "id",
            "name",
            "is_active",
        ]
class ZoneCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = [
            "name",
        ]