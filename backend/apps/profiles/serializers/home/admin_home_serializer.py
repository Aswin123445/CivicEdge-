from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers


class AdminProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    
    
class AdminHomeSerializer(HomeBaseSerializer):
    profile = AdminProfileSummarySerializer()
    # dashboard = AdminDashboardSerializer()


