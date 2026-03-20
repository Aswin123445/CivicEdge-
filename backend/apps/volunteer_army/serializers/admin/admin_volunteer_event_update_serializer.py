from datetime import timedelta

from django.utils import timezone
from rest_framework import serializers

from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class AdminVolunteerEventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerEvent
        fields = [
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
        extra_kwargs = {
            "title": {"required": False},
            "description": {"required": False},
            "location_name": {"required": False},
            "location_address": {"required": False},
            "start_time": {"required": False},
            "end_time": {"required": False},
            "capacity": {"required": False},
            "sponsor_name": {"required": False},
            "sponsor_website": {"required": False},
            "sponsor_logo_url": {"required": False},
            "sponsor_message": {"required": False},
        }

    def validate(self, attrs):
        instance = self.instance

        start_time = attrs.get("start_time", instance.start_time)
        end_time = attrs.get("end_time", instance.end_time)
        capacity = attrs.get("capacity", instance.capacity)

        minimum_start = timezone.now() + timedelta(hours=24)

        if start_time < minimum_start:
            raise serializers.ValidationError(
                {"start_time": "Event must be scheduled at least 24 hours in advance."}
            )

        if start_time >= end_time:
            raise serializers.ValidationError(
                {"end_time": "end_time must be greater than start_time."}
            )

        if capacity is not None and capacity <= 0:
            raise serializers.ValidationError(
                {"capacity": "Capacity must be greater than zero."}
            )

        return attrs