from rest_framework import serializers

class IssueBehaviorResponseItemSerializer(serializers.Serializer):
    prompt_id = serializers.UUIDField()
    response_value = serializers.CharField()
    optional_text = serializers.CharField(required=False, allow_blank=True)


class IssueBehaviorSubmitSerializer(serializers.Serializer):
    responses = IssueBehaviorResponseItemSerializer(many=True)

    def validate(self, attrs):
        if not attrs["responses"]:
            raise serializers.ValidationError("At least one response is required.")
        return attrs
