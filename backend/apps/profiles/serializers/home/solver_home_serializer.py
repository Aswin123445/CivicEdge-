from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers

class SolverProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    zone = serializers.CharField(allow_null=True)
    interests = serializers.ListField(child=serializers.CharField(), allow_null=True)
    skills = serializers.ListField(child=serializers.CharField(), allow_null=True)
    availability = serializers.BooleanField()

class SolverHomeSerializer(HomeBaseSerializer):
    profile = SolverProfileSummarySerializer()
    # dashboard = SolverDashboardSerializer()