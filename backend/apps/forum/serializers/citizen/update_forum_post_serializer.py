from rest_framework import serializers

class UpdateForumPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=False)
    content = serializers.CharField(required=False)

    def validate(self, attrs):
        if not attrs:
            raise serializers.ValidationError("At least one field must be provided")
        return attrs