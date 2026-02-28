# apps/issues/serializers/issue_behavior_response_serializer.py

from rest_framework import serializers
from apps.issues.models.behavioral_prompt import IssueBehavioralResponse


class IssueBehaviorResponseSerializer(serializers.ModelSerializer):
    prompt_id = serializers.UUIDField(source="prompt.id", read_only=True)
    prompt_text = serializers.CharField(
        source="prompt.question_text",
        read_only=True
    )

    response_label = serializers.SerializerMethodField()

    class Meta:
        model = IssueBehavioralResponse
        fields = (
            "id",
            "prompt_id",
            "prompt_text",
            "response_value",
            "response_label",
            "optional_text",
            "created_at",
        )
        read_only_fields = fields

    def get_response_label(self, obj):
        """
        Convert stored response_value → human-readable label
        """
        options = obj.prompt.options or []

        for option in options:
            if option.get("key") == obj.response_value:
                return option.get("label")

        # fallback (YES/NO, TEXT, etc.)
        return obj.response_value