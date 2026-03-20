from rest_framework import serializers
from apps.volunteer_army.models.volunteer_group import VolunteerGroup


class AdminVolunteerGroupListSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerGroup
        fields = [
            "id",
            "reference_id",
            "name",
            "membership_type",
            "risk_level",
            "status",
            "created_by",
            "created_at",
        ]