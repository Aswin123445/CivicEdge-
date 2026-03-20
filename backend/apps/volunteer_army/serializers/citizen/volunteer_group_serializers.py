from rest_framework import serializers
from apps.volunteer_army.models.volunteer_group import VolunteerGroup


class VolunteerGroupListSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerGroup
        fields = [
            "id",
            "reference_id",
            "name",
            "description",
            "membership_type",
            "risk_level",
            "requirements",
        ]
        


class VolunteerGroupDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerGroup
        fields = [
            "id",
            "reference_id",
            "name",
            "description",
            "membership_type",
            "risk_level",
            "requirements",
            "created_at",
        ]