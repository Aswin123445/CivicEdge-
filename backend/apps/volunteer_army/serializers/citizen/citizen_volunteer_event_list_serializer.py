from rest_framework import serializers
from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class CitizenVolunteerEventListSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source="group.name", read_only=True)
    runtime_status = serializers.SerializerMethodField()
    filled_count = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerEvent
        fields = [
            "id",
            "reference_id",
            "title",
            "group_name",
            "start_time",
            "end_time",
            "location_name",
            "capacity",
            "filled_count",
            "runtime_status",
        ]

    def get_runtime_status(self, obj):
        return obj.get_runtime_status()

    def get_filled_count(self, obj):
        status = self.get_runtime_status(obj)
        if status == "COMPLETED" :
            return obj.participations.filter(status="VERIFIED").count()
        return obj.participations.filter(status="REGISTERED").count()
    
        