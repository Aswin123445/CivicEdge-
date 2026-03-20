from rest_framework import serializers


class AdminVolunteerServiceLogCreateSerializer(serializers.Serializer):
    service_hours = serializers.DecimalField(max_digits=5, decimal_places=2)
    description = serializers.CharField(required=False, allow_blank=True)

    def validate_service_hours(self, value):
        if value <= 0:
            raise serializers.ValidationError("Service hours must be greater than zero.")
        return value