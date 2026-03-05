from rest_framework import serializers


class AdminExecutionDecisionSerializer(serializers.Serializer):
    decision = serializers.ChoiceField(
        choices=["APPROVE", "REJECT"]
    )
    reason = serializers.CharField()
    public_message = serializers.CharField(required=False, allow_blank=True)