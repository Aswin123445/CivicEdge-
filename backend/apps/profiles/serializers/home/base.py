from rest_framework import serializers

class HomeBaseSerializer(serializers.Serializer):
    role = serializers.CharField()
    profile = serializers.DictField()
    # dashboard = serializers.DictField()
    # meta = serializers.DictField()
