from rest_framework import serializers
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class VolunteerMembershipListSerializer(serializers.ModelSerializer):

    group_name = serializers.CharField(source="group.name", read_only=True)
    group_id = serializers.UUIDField(source="group.id", read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "group_id",
            "group_name",
            "status",
            "created_at",
        ]