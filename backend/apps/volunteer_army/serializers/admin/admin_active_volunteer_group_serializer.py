from rest_framework import serializers
from apps.volunteer_army.models.volunteer_group import VolunteerGroup


class AdminActiveVolunteerGroupSerializer(serializers.ModelSerializer):
    derived_name = serializers.SerializerMethodField()
    class Meta:
        model = VolunteerGroup
        fields = [
            "id",
            "reference_id",
            "name",
            "derived_name",
        ]
    def get_derived_name(self, obj):
        return f"{obj.name} -> {obj.membership_type} -> {obj.risk_level}"