from rest_framework import serializers
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision


class AdminVerificationDecisionSerializer(serializers.Serializer):
    decision_type = serializers.ChoiceField(
        choices=IssueAdministrativeDecision.DecisionType.choices
    )
    reason = serializers.CharField()
    public_message = serializers.CharField()
    expected_review_date = serializers.DateField(required=False)
    contractor_id = serializers.UUIDField(required=False)