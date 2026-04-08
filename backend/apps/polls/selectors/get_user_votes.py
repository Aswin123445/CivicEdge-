from apps.polls.models import PollVote


def get_user_votes(*, user):
    return (
        PollVote.objects
        .filter(user=user)
        .select_related("poll", "option")
    )