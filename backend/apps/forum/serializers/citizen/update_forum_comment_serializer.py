from rest_framework import serializers


class UpdateForumCommentSerializer(serializers.Serializer):
    content = serializers.CharField()

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Comment cannot be empty")
        return value