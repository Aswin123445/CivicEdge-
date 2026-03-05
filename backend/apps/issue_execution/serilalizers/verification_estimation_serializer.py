from rest_framework import serializers


class VerificationEstimationUpdateSerializer(serializers.Serializer):
    estimated_budget = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
    )
    estimated_duration_days = serializers.IntegerField(min_value=1)
    site_constraints = serializers.CharField(required=False, allow_blank=True)
    execution_risks = serializers.CharField(required=False , allow_blank=True)