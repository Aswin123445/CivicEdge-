from rest_framework import serializers

from apps.volunteer_army.models.event_participation import EventParticipation


class CitizenParticipationAttendanceDetailSerializer(serializers.ModelSerializer):
    event_id = serializers.UUIDField(source="event.id", read_only=True)
    event_reference_id = serializers.CharField(source="event.reference_id", read_only=True)
    event_title = serializers.CharField(source="event.title", read_only=True)
    event_runtime_status = serializers.SerializerMethodField()

    class Meta:
        model = EventParticipation
        fields = [
            "id",
            "reference_id",
            "status",
            "attendance_evidence_url",
            "attendance_submitted_at",
            "verified_at",
            "verification_note",
            "event_id",
            "event_reference_id",
            "event_title",
            "event_runtime_status",
        ]

    def get_event_runtime_status(self, obj):
        return obj.event.get_runtime_status()