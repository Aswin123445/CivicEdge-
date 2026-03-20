from rest_framework import serializers

from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class CitizenVolunteerEventListSerializer(serializers.ModelSerializer):
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    runtime_status = serializers.SerializerMethodField()
    filled_count = serializers.SerializerMethodField()

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
            "runtime_status",
            "sponsor_name",
            "sponsor_website",
            "sponsor_logo_url",
            "sponsor_message",
            "filled_count",
            "created_at",
            "updated_at",
        ]

    def get_runtime_status(self, obj):
        return obj.get_runtime_status()

    def get_filled_count(self, obj):
        return obj.participations.filter(status = "REGISTERED").count()