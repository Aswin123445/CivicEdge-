from rest_framework import serializers
from apps.user.models.user import User
from apps.user.utils.validator.name_validator import name_validator
from apps.user.utils.validator.indian_phone_validator import indian_phone_validator
from apps.user.services.admin.user_management.user_update_notification import notify_user_profile_updated

class CitizenUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source = 'profile.name', required=False,validators=[name_validator],allow_blank=True, allow_null=True)
    phone = serializers.CharField(source = "profile.phone", allow_blank=True, allow_null=True, required = False,validators=[indian_phone_validator])
    class Meta:
        model = User
        fields = ['email', 'is_active', 'name','phone']
        
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        for attr,value in validated_data.items():
            setattr(instance,attr,value)
        instance.save()
        profile = instance.profile 
        for attr,value in profile_data.items():
            setattr(profile,attr,value) 
        profile.save()
        notify_user_profile_updated(instance)
        return instance
