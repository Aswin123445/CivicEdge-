from apps.forum.models import ModerationLog

def get_moderation_logs(*, target_type=None, action=None, moderator_id=None):
    qs = ModerationLog.objects.select_related("moderator")

    if target_type:
        qs = qs.filter(target_type=target_type)

    if action:
        qs = qs.filter(action=action)

    if moderator_id:
        qs = qs.filter(moderator_id=moderator_id)

    return qs.order_by("-created_at")