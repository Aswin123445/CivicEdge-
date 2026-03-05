from rest_framework import serializers


class VerificationImpactUpdateSerializer(serializers.Serializer):
    public_impact_summary = serializers.CharField(required = True)
    estimated_people_affected = serializers.IntegerField(min_value=0, required=True)
    local_feedback_summary = serializers.CharField(required=True)