from rest_framework import serializers

from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition


class AdminVolunteerRecognitionListSerializer(serializers.ModelSerializer):
    participation_id = serializers.UUIDField(source="participation.id", read_only=True)
    participation_reference_id = serializers.CharField(
        source="participation.reference_id",
        read_only=True,
    )
    participation_status = serializers.CharField(
        source="participation.status",
        read_only=True,
    )

    event_id = serializers.UUIDField(source="participation.event.id", read_only=True)
    event_reference_id = serializers.CharField(
        source="participation.event.reference_id",
        read_only=True,
    )
    event_title = serializers.CharField(
        source="participation.event.title",
        read_only=True,
    )

    group_id = serializers.UUIDField(source="participation.event.group.id", read_only=True)
    group_name = serializers.CharField(
        source="participation.event.group.name",
        read_only=True,
    )

    user_id = serializers.UUIDField(source="participation.membership.user.id", read_only=True)
    user_email = serializers.EmailField(
        source="participation.membership.user.email",
        read_only=True,
    )

    issued_by_id = serializers.UUIDField(source="issued_by.id", read_only=True)

    class Meta:
        model = VolunteerRecognition
        fields = [
            "id",
            "reference_id",
            "title",
            "message",
            "certificate_url",
            "issued_at",
            "participation_id",
            "participation_reference_id",
            "participation_status",
            "event_id",
            "event_reference_id",
            "event_title",
            "group_id",
            "group_name",
            "user_id",
            "user_email",
            "issued_by_id",
            "created_at",
            "updated_at",
        ]