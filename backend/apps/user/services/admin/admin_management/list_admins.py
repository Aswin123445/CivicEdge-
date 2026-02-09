from django.contrib.auth import get_user_model
def get_all_admins():
    User = get_user_model()
    return User.objects.filter(role="admin").select_related("profile").order_by("-created_at")