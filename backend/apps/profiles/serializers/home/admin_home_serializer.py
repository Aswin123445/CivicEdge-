from apps.profiles.serializers.home.base import HomeBaseSerializer
from rest_framework import serializers


class AdminProfileSummarySerializer(serializers.Serializer):
    name = serializers.CharField()
    avatar = serializers.URLField(allow_null=True)
    bio = serializers.CharField(allow_null=True)
    email = serializers.EmailField()
    
    
class AdminHomeSerializer(HomeBaseSerializer):
    profile = AdminProfileSummarySerializer()
    # dashboard = AdminDashboardSerializer()


