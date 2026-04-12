from rest_framework import serializers


class CreateForumCommentSerializer(serializers.Serializer):
    content = serializers.CharField()
    parent_id = serializers.UUIDField(required=False)

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Comment cannot be empty")
        return value