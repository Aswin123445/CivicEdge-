from rest_framework import serializers


class CategoryListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
