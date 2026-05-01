from rest_framework import serializers
from apps.volunteer_army.models.volunteer_group import VolunteerGroup

class VolunteerGroupCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerGroup
        fields = [
            "name", 
            "description",
            "membership_type",
            "risk_level",
            "requirements",
        ]
        
    def validate(self, attrs):
        if attrs["membership_type"] == "APPROVAL_REQUIRED":
            if not attrs["requirements"]:
                raise serializers.ValidationError("Membership type is not open, please add requirements.")
        return attrs

    def validate_name(self, value):
        if VolunteerGroup.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError("Group with this name already exists.")
        return value


class VolunteerGroupUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = VolunteerGroup
        fields = [
            "name",
            "description",
            "risk_level",
            "requirements",
        ]
    def validate_requirements(self, value):
        if self.instance.membership_type == "APPROVAL_REQUIRED":
            if not value:
                raise serializers.ValidationError("Membership type is not open, please add requirements.")
        return value
    def validate_name(self, value):
        qs = VolunteerGroup.objects.filter(name=value)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError("Group name already exists.")

        return value