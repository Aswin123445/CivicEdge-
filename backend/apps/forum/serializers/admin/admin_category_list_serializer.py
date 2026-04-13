from rest_framework import serializers


class AdminCategoryListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
    reference_id = serializers.CharField()
    is_active = serializers.BooleanField()
    created_at = serializers.DateTimeField()