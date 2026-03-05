from rest_framework import serializers
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision


class AdminIssueDecisionCreateSerializer(serializers.Serializer):
    decision_type = serializers.ChoiceField(
        choices=IssueAdministrativeDecision.DecisionType.choices
    )
    reason = serializers.CharField()
    public_message = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=255,
    )
    expected_review_date = serializers.DateField(
        required=False,
        allow_null=True,
    )