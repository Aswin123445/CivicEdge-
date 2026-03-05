from rest_framework import serializers
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision


class AdministrativeDecisionSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source="decision_type", read_only=True)
    label = serializers.CharField(source="get_decision_type_display", read_only=True)

    class Meta:
        model = IssueAdministrativeDecision
        fields = [
            "reference_id",
            "type",
            "label",
            "reason",
            "public_message",
            "created_at",
            "decided_by",
        ]
        read_only_fields = fields

