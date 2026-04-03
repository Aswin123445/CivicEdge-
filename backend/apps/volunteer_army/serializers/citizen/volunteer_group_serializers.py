from rest_framework import serializers
from apps.volunteer_army.models.volunteer_group import VolunteerGroup
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


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
    membership_status = serializers.SerializerMethodField()
    membership_id = serializers.SerializerMethodField()
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
            "membership_status",
            "membership_id",     
        ]
    def get_membership_status(self, obj):
        user = self.context["request"].user

        membership = VolunteerMembership.objects.filter(
            user=user,
            group=obj
        ).first()

        if not membership:
            return "NONE"

        return membership.status 
    def get_membership_id(self, obj):
        user = self.context["request"].user

        membership = VolunteerMembership.objects.filter(
            user=user,
            group=obj
        ).first()

        return membership.id if membership else None