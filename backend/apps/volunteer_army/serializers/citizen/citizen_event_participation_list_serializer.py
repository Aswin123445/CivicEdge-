from rest_framework import serializers

from apps.volunteer_army.models.event_participation import EventParticipation


class CitizenEventParticipationListSerializer(serializers.ModelSerializer):
    event_id = serializers.UUIDField(source="event.id", read_only=True)
    event_reference_id = serializers.CharField(source="event.reference_id", read_only=True)
    event_title = serializers.CharField(source="event.title", read_only=True)
    event_runtime_status = serializers.SerializerMethodField()

    group_id = serializers.UUIDField(source="event.group.id", read_only=True)
    group_name = serializers.CharField(source="event.group.name", read_only=True)

    class Meta:
        model = EventParticipation
        fields = [
            "id",
            "reference_id",
            "status",
            "registered_at",
            "attendance_evidence_url",
            "attendance_submitted_at",
            "verified_at",
            "verification_note",
            "event_id",
            "event_reference_id",
            "event_title",
            "event_runtime_status",
            "group_id",
            "group_name",
        ]

    def get_event_runtime_status(self, obj):
        return obj.event.get_runtime_status()