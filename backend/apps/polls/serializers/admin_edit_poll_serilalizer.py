from rest_framework import serializers


class AdminEditPollSerializer(serializers.Serializer):
    question = serializers.CharField(required=False, max_length=500)
    context = serializers.CharField(required=False)
    did_you_know = serializers.CharField(required=False, allow_blank=True)

    def validate(self, attrs):
        if not attrs:
            raise serializers.ValidationError("At least one field required.")
        return attrs
