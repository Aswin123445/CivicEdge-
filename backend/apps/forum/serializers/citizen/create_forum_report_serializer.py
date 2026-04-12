from rest_framework import serializers

from apps.forum.models.forum_report import ReportTargetType

class CreateForumReportSerializer(serializers.Serializer):
    target_type = serializers.ChoiceField(choices=ReportTargetType.choices)
    target_id = serializers.UUIDField()
    reason = serializers.CharField()

    def validate_reason(self, value):
        if not value.strip():
            raise serializers.ValidationError("Reason cannot be empty")
        return value