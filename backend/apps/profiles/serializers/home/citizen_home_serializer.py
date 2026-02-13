from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers

class CitizenProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    zone = serializers.CharField(allow_null=True)
    interests = serializers.ListField(child=serializers.CharField(), allow_null=True)

class CitizenHomeSerializer(HomeBaseSerializer):
    profile = CitizenProfileSummarySerializer()
    # dashboard = CitizenDashboardSerializer()