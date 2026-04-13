from rest_framework import serializers

from apps.forum.models.forum_post import ForumPost
from apps.forum.models.forum_comment import ForumComment


class ForumReportDetailSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    reason = serializers.CharField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

    reported_by = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()

    def get_reported_by(self, obj):
        return {
            "id": obj.reported_by.id,
            "name": obj.reported_by.profile.name if obj.reported_by.profile.name else obj.reported_by.email.split("@")[0],
        }

    def get_target(self, obj):
        if obj.target_type == "post":
            post = ForumPost.objects.filter(id=obj.target_id).first()

            if not post:
                return None

            return {
                "type": "post",
                "id": post.id,
                "title": post.title,
                "content": post.content,
            }

        if obj.target_type == "comment":
            comment = ForumComment.objects.filter(id=obj.target_id).first()

            if not comment:
                return None

            return {
                "type": "comment",
                "id": comment.id,
                "content": comment.content,
                "post_id": comment.post_id,
            }

        return None