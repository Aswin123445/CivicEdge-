from rest_framework import serializers


class ForumPostDetailSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    title = serializers.CharField()
    content = serializers.CharField()
    created_at = serializers.DateTimeField()

    category = serializers.SerializerMethodField()
    media = serializers.SerializerMethodField()

    comments_count = serializers.IntegerField()
    reaction_summary = serializers.DictField()
    user_reaction = serializers.CharField(allow_null=True)
    user = serializers.SerializerMethodField()
    is_highlighted = serializers.BooleanField()
    status = serializers.CharField()

    def get_category(self, obj):
        return {
            "id": obj['category'].id,
            "name": obj['category'].name,
        }

    def get_media(self, obj):
        return [
            {
                "url": media.url,
                "public_id": media.public_id,
            }
            for media in obj['media'].all()
        ]
    
    def get_user(self, obj):
        return {
            "id": obj['user'].id,
            "email": obj['user'].email,
            "name": obj['user'].profile.name if obj['user'].profile.name else obj['user'].email.split("@")[0],
            "profile": obj['user'].profile.avatar_url
        }