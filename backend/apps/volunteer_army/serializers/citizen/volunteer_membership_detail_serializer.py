from rest_framework import serializers
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class VolunteerMembershipDetailSerializer(serializers.ModelSerializer):

    group_name = serializers.CharField(source="group.name", read_only=True)
    group_description = serializers.CharField(source="group.description", read_only=True)
    membership_type = serializers.CharField(source="group.membership_type", read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "group_name",
            "group_description",
            "membership_type",
            "status",
            "created_at",
        ]