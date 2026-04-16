from rest_framework import serializers


class ForumReportListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    reference_id = serializers.CharField()
    target_type = serializers.CharField()
    target_id = serializers.UUIDField()
    reason = serializers.CharField()
    status = serializers.CharField()
    created_at = serializers.DateTimeField()

    reported_by = serializers.SerializerMethodField()
    

    def get_reported_by(self, obj):
        return {
            "id": obj.reported_by.id,
            "name": obj.reported_by.profile.name if obj.reported_by.profile.name else obj.reported_by.email.split("@")[0],
        }