from rest_framework import serializers


class CategoryListSerializer(serializers.Serializer):
    reference_id = serializers.CharField()
    id = serializers.UUIDField()
    name = serializers.CharField()
