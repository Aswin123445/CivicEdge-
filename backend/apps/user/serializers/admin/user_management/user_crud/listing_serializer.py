# users/admin/serializers/citizen_serializer.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
class AdminCitizenSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='profile.full_name', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', 'is_active', 'created_at']
