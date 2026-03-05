from rest_framework import serializers


class ExecutionEvidenceInputSerializer(serializers.Serializer):
    public_id = serializers.CharField()
    secure_url = serializers.URLField()
    resource_type = serializers.ChoiceField(choices=["image", "video"])
    format = serializers.CharField(required=False, allow_blank=True)
    width = serializers.IntegerField(required=False)
    height = serializers.IntegerField(required=False)
    bytes = serializers.IntegerField(required=False)


class SolverSubmitCompletionSerializer(serializers.Serializer):
    completion_summary = serializers.CharField()
    deviations_from_plan = serializers.CharField(required=False, allow_blank=True)
    remaining_issues = serializers.CharField(required=False, allow_blank=True)
    evidences = ExecutionEvidenceInputSerializer(many=True)

    def validate_evidences(self, value):
        if not value:
            raise serializers.ValidationError(
                "At least one completion evidence is required."
            )
        return value