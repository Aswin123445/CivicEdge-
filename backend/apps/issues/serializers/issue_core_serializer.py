from rest_framework import serializers

class IssueCoreSerializer(serializers.Serializer):
    id = serializers.CharField()
    reference_id = serializers.CharField()

    category = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField()

    def get_category(self, obj):
        return {
            "code": obj.category.name.upper(),
            "label": obj.category.name,
        }

    def get_status(self, obj):
        return {
            "code": obj.status,
            "label": obj.get_status_display(),
        }