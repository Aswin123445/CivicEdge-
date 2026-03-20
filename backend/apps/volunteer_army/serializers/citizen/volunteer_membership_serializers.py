from rest_framework import serializers
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class VolunteerMembershipSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "group",
            "status",
            "created_at",
        ]