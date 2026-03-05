from rest_framework import serializers


class VerificationGroundUpdateSerializer(serializers.Serializer):
    is_issue_present = serializers.BooleanField()
    severity_level = serializers.ChoiceField(
        choices=[
            ("LOW", "Low"),
            ("MEDIUM", "Medium"),
            ("HIGH", "High"),
            ("CRITICAL", "Critical"),
        ]
    )
    affected_area_description = serializers.CharField()