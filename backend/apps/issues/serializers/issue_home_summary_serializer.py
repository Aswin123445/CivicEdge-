from rest_framework import serializers

class IssueHomeSummarySerializer(serializers.Serializer):
    draft_issues = serializers.IntegerField()
    submitted_issues = serializers.IntegerField()
    awaiting_review = serializers.IntegerField()