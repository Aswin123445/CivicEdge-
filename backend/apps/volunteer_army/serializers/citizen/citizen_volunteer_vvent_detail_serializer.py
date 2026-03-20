from rest_framework import serializers

from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class CitizenVolunteerEventDetailSerializer(serializers.ModelSerializer):
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    runtime_status = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerEvent
        fields = [
            "id",
            "reference_id",
            "group_id",
            "group_name",
            "title",
            "description",
            "location_name",
            "location_address",
            "start_time",
            "end_time",
            "capacity",
            "status",
            "runtime_status",
            "sponsor_name",
            "sponsor_website",
            "sponsor_logo_url",
            "sponsor_message",
            "created_at",
            "updated_at",
        ]

    def get_runtime_status(self, obj):
        return obj.get_runtime_status()