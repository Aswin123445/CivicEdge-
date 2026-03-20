from rest_framework import serializers

from apps.volunteer_army.models.event_participation import EventParticipation


class AdminPendingAttendanceListSerializer(serializers.ModelSerializer):
    event_id = serializers.UUIDField(source="event.id", read_only=True)
    event_reference_id = serializers.CharField(source="event.reference_id", read_only=True)
    event_title = serializers.CharField(source="event.title", read_only=True)
    event_runtime_status = serializers.SerializerMethodField()

    group_id = serializers.UUIDField(source="event.group.id", read_only=True)
    group_name = serializers.CharField(source="event.group.name", read_only=True)

    membership_id = serializers.UUIDField(source="membership.id", read_only=True)
    membership_reference_id = serializers.CharField(source="membership.reference_id", read_only=True)

    user_id = serializers.UUIDField(source="membership.user.id", read_only=True)
    user_email = serializers.EmailField(source="membership.user.email", read_only=True)
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = EventParticipation
        fields = [
            "id",
            "reference_id",
            "status",
            "attendance_evidence_url",
            "attendance_submitted_at",
            "event_id",
            "event_reference_id",
            "event_title",
            "event_runtime_status",
            "group_id",
            "group_name",
            "membership_id",
            "membership_reference_id",
            "user_id",
            "user_email",
            "user_name",
        ]

    def get_event_runtime_status(self, obj):
        return obj.event.get_runtime_status()

    def get_user_name(self, obj):
        user = obj.membership.user
        full_name = getattr(user, "full_name", None)
        if full_name:
            return full_name
        return f"{getattr(user, 'first_name', '')} {getattr(user, 'last_name', '')}".strip()