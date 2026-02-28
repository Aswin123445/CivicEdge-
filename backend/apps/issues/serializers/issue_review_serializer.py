from apps.issues.serializers.issue_summary_serializer import IssueSummarySerializer
from rest_framework import serializers
from apps.issues.serializers.issue_location_read_serializer import IssueLocationReadSerializer
from apps.issues.serializers.issue_evidence_serializer import IssueEvidenceSerializer
from apps.issues.serializers.issue_behavior_response_serializer import IssueBehaviorResponseSerializer
class IssueReviewSerializer(serializers.Serializer):
    issue = IssueSummarySerializer()
    location = IssueLocationReadSerializer()
    evidences = IssueEvidenceSerializer(many=True)
    behavioral_responses = IssueBehaviorResponseSerializer(many=True)