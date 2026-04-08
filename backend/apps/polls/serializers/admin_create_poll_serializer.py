from rest_framework import serializers
from django.utils.timezone import now


class PollOptionInputSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=255)


class AdminCreatePollSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=500)
    context = serializers.CharField()
    did_you_know = serializers.CharField(required=False, allow_blank=True)
    image_url = serializers.URLField(required=False, allow_blank=True)
    expires_at = serializers.DateTimeField()

    options = PollOptionInputSerializer(many=True)

    def validate_expires_at(self, value):
        if value <= now():
            raise serializers.ValidationError("Expiry must be in the future")
        return value

    def validate_options(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("At least 2 options required")

        texts = [opt["text"].lower() for opt in value]
        if len(texts) != len(set(texts)):
            raise serializers.ValidationError("Duplicate options not allowed")

        return value