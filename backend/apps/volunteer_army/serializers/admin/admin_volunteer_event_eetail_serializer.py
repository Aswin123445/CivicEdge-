from rest_framework import serializers

from apps.volunteer_army.models.volunteer_event import VolunteerEvent
from django.db.models import Q

class AdminVolunteerEventDetailSerializer(serializers.ModelSerializer):
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    group_status = serializers.CharField(source="group.status", read_only=True)

    created_by_id = serializers.EmailField(source="created_by.email", read_only=True)
    runtime_status = serializers.SerializerMethodField()
    participants_count = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerEvent
        fields = [
            "id",
            "reference_id",
            "group_id",
            "group_name",
            "group_status",
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
            "created_by_id",
            "created_at",
            "updated_at",
            "participants_count",
        ]

    def get_runtime_status(self, obj):
        return obj.get_runtime_status()

    def get_participants_count(self, obj):
        if self.get_runtime_status(obj) == "COMPLETED" :
            return obj.participations.filter(status="VERIFIED").count()
        if self.get_runtime_status(obj) == "UPCOMING" :
            return obj.participations.filter(status="REGISTERED").count()
        if self.get_runtime_status(obj) == "LIVE" :
            return obj.participations.filter(Q(status="REGISTERED") | Q(status="VERIFIED")).count()
        if self.get_runtime_status(obj) == "CANCELLED" :
            return obj.participations.exclude(status="LEFT").count()
        return 0