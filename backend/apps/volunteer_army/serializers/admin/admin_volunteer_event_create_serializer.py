from rest_framework import serializers
from datetime import timedelta
from django.utils import timezone

from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class AdminVolunteerEventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerEvent
        fields = [
            "group",
            "title",
            "description",
            "location_name",
            "location_address",
            "start_time",
            "end_time",
            "capacity",
            "sponsor_name",
            "sponsor_website",
            "sponsor_logo_url",
            "sponsor_message",
        ]

    def validate(self, attrs):
        start_time = attrs.get("start_time")
        end_time = attrs.get("end_time")
        capacity = attrs.get("capacity")

        now = timezone.now()
        minimum_start = now + timedelta(hours=24)

        if start_time and start_time < minimum_start:
            raise serializers.ValidationError(
                {"start_time": "Event must be scheduled at least 24 hours in advance."}
            )

        if start_time and end_time and start_time >= end_time:
            raise serializers.ValidationError(
                {"end_time": "end_time must be greater than start_time."}
            )

        if capacity is not None and capacity <= 0:
            raise serializers.ValidationError(
                {"capacity": "Capacity must be greater than zero."}
            )

        return attrs