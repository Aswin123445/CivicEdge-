from rest_framework import serializers

class SolverAvailabilitySerializer(serializers.Serializer):
    is_available = serializers.BooleanField(read_only=True)
    status = serializers.CharField(read_only=True)
