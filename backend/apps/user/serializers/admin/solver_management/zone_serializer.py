# serializers/zone_serializer.py
from rest_framework import serializers
from apps.user.models.user import Zone
class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = ["id", "name"]
