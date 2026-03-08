# users/admin/services/citizen_service.py
from django.contrib.auth import get_user_model


def get_all_solvers():
    User = get_user_model()
    return (
        User.objects.prefetch_related("assigned_solver_tasks")
        .filter(role="solver")
        .select_related("profile")
        .order_by("-created_at")
    )
