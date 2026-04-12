from apps.forum.models.forum_report import ForumReport

def get_existing_report(*, user, target_type, target_id):
    return (
        ForumReport.objects
        .filter(
            reported_by=user,
            target_type=target_type,
            target_id=target_id,
        )
        .first()
    )