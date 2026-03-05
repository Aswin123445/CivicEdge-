from rest_framework import serializers


class AdminAssignContractorSerializer(serializers.Serializer):
    contractor_id = serializers.UUIDField()