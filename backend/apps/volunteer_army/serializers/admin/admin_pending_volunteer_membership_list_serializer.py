from rest_framework import serializers

from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class AdminPendingVolunteerMembershipListSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source="user.id", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    membership_type = serializers.CharField(source="group.membership_type", read_only=True)
    evidence_count = serializers.IntegerField(source="evidences.count", read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "reference_id",
            "user_id",
            "group_id",
            "group_name",
            "membership_type",
            "status",
            "evidence_count",
            "created_at",
            "user_email"
        ]