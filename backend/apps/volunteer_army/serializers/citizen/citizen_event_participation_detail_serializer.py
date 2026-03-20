from rest_framework import serializers

from apps.volunteer_army.models.event_participation import EventParticipation


class CitizenEventParticipationDetailSerializer(serializers.ModelSerializer):
    event_id = serializers.UUIDField(source="event.id", read_only=True)
    event_reference_id = serializers.CharField(source="event.reference_id", read_only=True)
    event_title = serializers.CharField(source="event.title", read_only=True)
    event_description = serializers.CharField(source="event.description", read_only=True)
    event_start_time = serializers.DateTimeField(source="event.start_time", read_only=True)
    event_end_time = serializers.DateTimeField(source="event.end_time", read_only=True)
    event_runtime_status = serializers.SerializerMethodField()

    group_id = serializers.UUIDField(source="event.group.id", read_only=True)
    group_name = serializers.CharField(source="event.group.name", read_only=True)

    membership_id = serializers.UUIDField(source="membership.id", read_only=True)
    membership_reference_id = serializers.CharField(source="membership.reference_id", read_only=True)

    verified_by_id = serializers.UUIDField(source="verified_by.id", read_only=True, allow_null=True)

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
            "created_at",
            "updated_at",
            "event_id",
            "event_reference_id",
            "event_title",
            "event_description",
            "event_start_time",
            "event_end_time",
            "event_runtime_status",
            "group_id",
            "group_name",
            "membership_id",
            "membership_reference_id",
        ]

    def get_event_runtime_status(self, obj):
        return obj.event.get_runtime_status()