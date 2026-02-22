from rest_framework import serializers
from apps.issues.models.behavioral_prompt import BehavioralPrompt


class BehavioralPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = BehavioralPrompt
        fields = (
            "id",
            "reference_id",
            "question_text",
            "response_type",
            "options",
        )
