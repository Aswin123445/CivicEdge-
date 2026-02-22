from decimal import Decimal
from rest_framework import serializers
from apps.user.models.user import Zone

class IssueLocationSerializer(serializers.Serializer):
    latitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    longitude = serializers.DecimalField(max_digits=9, decimal_places=6)
    accuracy_radius = serializers.IntegerField(
        required=False,
        min_value=0,
        help_text="Accuracy radius in meters"
    )

    zone_id = serializers.PrimaryKeyRelatedField(
        queryset=Zone.objects.all(),
        source="zone",
        write_only=True
    )
    landmark = serializers.CharField(required=False, allow_blank=True)
    

    def validate_latitude(self, value: Decimal):
        if not (Decimal("-90") <= value <= Decimal("90")):
            raise serializers.ValidationError(
                "Latitude must be between -90 and 90."
            )
        return value
    
    def validate_longitude(self, value: Decimal):
        if not (Decimal("-180") <= value <= Decimal("180")):
            raise serializers.ValidationError(
                "Longitude must be between -180 and 180."
            )
        return value
    def validate(self, attrs):
        lat = attrs["latitude"]
        lng = attrs["longitude"]

        if not (-90 <= lat <= 90):
            raise serializers.ValidationError("Invalid latitude.")

        if not (-180 <= lng <= 180):
            raise serializers.ValidationError("Invalid longitude.")

        return attrs
