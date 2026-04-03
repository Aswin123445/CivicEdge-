from rest_framework import serializers
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class VolunteerMembershipDetailSerializer(serializers.ModelSerializer):

    group_name = serializers.CharField(source="group.name", read_only=True)
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_description = serializers.CharField(source="group.description", read_only=True)
    membership_type = serializers.CharField(source="group.membership_type", read_only=True)
    group_members = serializers.SerializerMethodField()
    requirements = serializers.CharField(source="group.requirements", read_only=True)
    risk_level = serializers.CharField(source="group.risk_level", read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "reference_id",
            "group_name",
            "group_description",
            "membership_type",
            "status",
            "created_at",
            "updated_at",
            "group_members",
            "requirements",
            "risk_level",
            "group_id",
            "rejection_reason",
        ]

    def get_group_members(self, obj):
        return obj.group.memberships.filter(status="ACTIVE").count()