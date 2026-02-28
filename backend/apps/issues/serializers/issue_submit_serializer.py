# apps/issues/serializers/issue_submit_serializer.py
from rest_framework import serializers


class IssueSubmitSerializer(serializers.Serializer):
    confirm = serializers.BooleanField(default=True)

    def validate_confirm(self, value):
        if value is not True:
            raise serializers.ValidationError("Submission must be confirmed.")
        return value