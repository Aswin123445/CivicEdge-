from rest_framework import serializers
from apps.issues.models.issue_timeline_event import IssueTimelineEvent


class IssueTimelineEventReadSerializer(serializers.ModelSerializer):

    issue_reference = serializers.CharField(source="issue.reference_id", read_only=True)
    description = serializers.CharField(source="message", read_only=True)

    class Meta:
        model = IssueTimelineEvent
        fields = [
            "reference_id",
            "issue_reference",
            "description",
            "created_at",
        ]
        read_only_fields = fields