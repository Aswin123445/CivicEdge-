from rest_framework import serializers
from apps.issues.models import Issue


class ComplaintListSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    location = serializers.CharField(
        source="location.zone.name",
        read_only=True
    )
    public_message = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = [
            "id",
            "reference_id",
            "status",
            "category",
            "location",
            "public_message",
            "updated_at",
        ]

    def get_status(self, obj):
        return {
            "code": obj.status,
            "label": obj.get_status_display(),
        }

    def get_category(self, obj):
        return {
            "code": obj.category.name.upper(),
            "label": obj.category.name,
        }

    def get_public_message(self, obj):
        decision = (
            obj.administrative_decisions
            .filter(is_active=True)
            .first()
        )
        return getattr(decision, "public_message", "Your complaint has been received and is currently under review. We'll update you once the next steps are decided.")