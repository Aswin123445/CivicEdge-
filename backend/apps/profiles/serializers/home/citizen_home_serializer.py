from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers

class CitizenProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    zone = serializers.CharField(allow_null=True)
    interests = serializers.ListField(child=serializers.CharField(), allow_null=True)
    email = serializers.EmailField()
    bio = serializers.CharField(allow_null=True)

class CitizenDashboardSerializer(serializers.Serializer):
    total_complaints = serializers.IntegerField()
    total_volunteer_hours = serializers.IntegerField()
    performance_percentail = serializers.IntegerField()

class CitizenHomeSerializer(HomeBaseSerializer):
    profile = CitizenProfileSummarySerializer()
    dashboard = CitizenDashboardSerializer()