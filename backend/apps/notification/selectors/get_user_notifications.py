from apps.notification.models.notification import Notification

def get_user_notifications(user):
    return (
        Notification.objects
        .filter(user=user)
        .order_by("-created_at")
    )