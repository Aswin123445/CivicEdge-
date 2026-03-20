from rest_framework import serializers

from apps.volunteer_army.models.volunteer_group import VolunteerGroup


class AdminVolunteerGroupDetailSerializer(serializers.ModelSerializer):
    created_by_id = serializers.UUIDField(source="created_by.id", read_only=True)

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
            "status",
            "is_active",
            "created_by_id",
            "created_at",
            "updated_at",
        ]