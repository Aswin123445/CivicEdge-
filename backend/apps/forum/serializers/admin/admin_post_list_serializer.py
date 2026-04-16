from rest_framework import serializers


class AdminPostListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    reference_id = serializers.CharField()
    title = serializers.CharField()
    content = serializers.CharField()
    status = serializers.CharField()
    is_highlighted = serializers.BooleanField()
    created_at = serializers.DateTimeField()

    user = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "name": obj.user.profile.name if obj.user.profile.name else obj.user.email.split("@")[0],
        }

    def get_category(self, obj):
        return {
            "id": obj.category.id,
            "name": obj.category.name,
        }