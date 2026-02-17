from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers

class SolverProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    zone = serializers.CharField(allow_null=True)
    interests = serializers.ListField(child=serializers.CharField(), allow_null=True)
    skills = serializers.ListField(child=serializers.CharField(), allow_null=True)
    email = serializers.EmailField()
    availability = serializers.BooleanField()
    bio = serializers.CharField(allow_null=True)

class SolverHomeSerializer(HomeBaseSerializer):
    profile = SolverProfileSummarySerializer()
    # dashboard = SolverDashboardSerializer()