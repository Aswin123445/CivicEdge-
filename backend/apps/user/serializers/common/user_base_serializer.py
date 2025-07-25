# common/user_base_serializer.py
from rest_framework import serializers
from apps.user.models.user import User

class BaseUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(help_text="User's email address")

    class Meta:
        model = User
        fields = ['id', 'email']
        extra_kwargs = {
            'id': {'read_only': True},
        }
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value
