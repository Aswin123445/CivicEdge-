from apps.volunteer_army.models.volunteer_membership import VolunteerMembership
from rest_framework import serializers


class MyVolunteerGroupListSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source="group.name", read_only=True) 
    description = serializers.CharField(source="group.description", read_only=True) 
    membership_type = serializers.CharField(source="group.membership_type", read_only=True) 
    risk_level = serializers.CharField(source="group.risk_level", read_only=True) 
    requirements = serializers.CharField(source="group.requirements", read_only=True)
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "group_id",
            "reference_id",
            "group_name",
            "description",
            "membership_type",
            "risk_level",
            "requirements",
            "user_email",
        ]
        
