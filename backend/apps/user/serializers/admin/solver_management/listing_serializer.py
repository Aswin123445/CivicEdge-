# users/admin/serializers/citizen_serializer.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class AdminSolverSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="profile.name", read_only=True)
    phone = serializers.CharField(source="profile.phone", read_only=True)
    zone = serializers.CharField(source="profile.zone.name", read_only=True)
    profile = serializers.URLField(source="profile.avatar_url", read_only=True)
    task_count = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "is_active",
            "created_at",
            "role",
            "phone",
            "zone",
            "is_active",
            "profile",
            "reference_id",
            "task_count",
            "is_available",
        ]

    def get_task_count(self, obj):
        return obj.assigned_solver_tasks.exclude(status__in=['COMPLETED','TERMINATED']).count()

    def get_is_available(self, obj):
        return obj.profile.is_available
