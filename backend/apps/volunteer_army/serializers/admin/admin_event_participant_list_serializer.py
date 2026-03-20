from rest_framework import serializers

from apps.volunteer_army.models.event_participation import EventParticipation


class AdminEventParticipantListSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source="membership.user.id", read_only=True)
    email = serializers.CharField(source="membership.user.email", read_only=True)

    membership_id = serializers.UUIDField(source="membership.id", read_only=True)
    membership_reference_id = serializers.CharField(source="membership.reference_id", read_only=True)

    verified_by_id = serializers.UUIDField(source="verified_by.id", read_only=True, allow_null=True)
    event_runtime_status = serializers.SerializerMethodField()

    class Meta:
        model = EventParticipation
        fields = [
            "id",
            "reference_id",
            "status",
            "registered_at",
            "attendance_evidence_url",
            "attendance_submitted_at",
            "verified_by_id",
            "verified_at",
            "verification_note",
            "membership_id",
            "membership_reference_id",
            "user_id",
            "email",
            "event_runtime_status",
        ]

    def get_event_runtime_status(self, obj):
        return obj.event.get_runtime_status()