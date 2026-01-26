# users/admin/serializers/citizen_serializer.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
class AdminSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='profile.name', read_only=True)
    phone = serializers.CharField(source='profile.phone', read_only=True)
    zone = serializers.CharField(source='profile.zone.name', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 
                  'name', 'is_active', 
                  'created_at', 'role', 
                  'phone', 'zone', 'is_active', 
            ]
