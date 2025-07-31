# users/admin/services/citizen_service.py
from django.contrib.auth import get_user_model
def get_all_citizens():
    User = get_user_model()
    return User.objects.filter(role="citizen").select_related("profile").order_by("-created_at")