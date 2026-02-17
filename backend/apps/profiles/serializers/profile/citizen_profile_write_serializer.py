from rest_framework import serializers
from apps.user.models.user import Profile
from apps.user.utils.validator.indian_phone_validator import indian_phone_validator
from apps.profiles.utils.validators import interest_validator
from apps.user.utils.validator.name_validator import name_validator
from apps.user.models.user import Zone

class CitizenProfileWriteSerializer(serializers.ModelSerializer):
    zone_id = serializers.PrimaryKeyRelatedField(
        queryset=Zone.objects.all(),
        source="zone",
        write_only=True
    )
    class Meta:
        model = Profile
        fields = [
            "phone",
            "zone_id", 
            "name",
            "interests",
            "bio"
        ]
    def validate_phone(self, value):
        indian_phone_validator(value)
        return value
    def validate_interests(self,value):
        interest_validator(value) 
        return value 
    def validate_name(self,value):
        cleaned_name = name_validator(value)
        return cleaned_name