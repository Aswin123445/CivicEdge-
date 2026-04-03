from django.db.models import Count, Q
from django.utils import timezone
from django.contrib.auth import get_user_model

from apps.volunteer_army.models.volunteer_group import (
    VolunteerGroup,
    VolunteerGroupStatus,
)
from apps.volunteer_army.models.volunteer_membership import (
    MembershipStatus,
)
from apps.volunteer_army.models.event_participation import EventParticipation, ParticipationStatus
from apps.volunteer_army.models.volunteer_recognition import (
    RecognitionStatus,
)

User = get_user_model()


# --------------------------------------------------
# Quick Actions
# --------------------------------------------------

def get_citizen_quick_actions(*, user) -> dict:
    """
    Returns counts of the citizen's:
      - active memberships
      - event participations (all statuses)
      - issued recognitions
    All in a single aggregated query via the User object.
    """
    result = User.objects.filter(pk=user.pk).aggregate(
        memberships_count=Count(
            "volunteer_memberships",
            filter=Q(volunteer_memberships__status=MembershipStatus.ACTIVE),
            distinct=True,
        ),
        participations_count=Count(
            "volunteer_memberships__event_participations",
            distinct=True,
        ),
        recognitions_count=Count(
            "volunteer_recognitions",
            filter=Q(volunteer_recognitions__status=RecognitionStatus.GENERATED),
            distinct=True,
        ),
    )

    return {
        "memberships_count":    result["memberships_count"],
        "participations_count": result["participations_count"],
        "recognitions_count":   result["recognitions_count"],
    }


# --------------------------------------------------
# Featured Groups
# --------------------------------------------------

def get_featured_groups(*, limit: int = 3):
    """
    Top N active groups ordered by active member count descending.
    """
    return (
        VolunteerGroup.objects.filter(
            status=VolunteerGroupStatus.ACTIVE,
            is_active=True,
        )
        .annotate(
            member_count=Count(
                "memberships",
                filter=Q(memberships__status=MembershipStatus.ACTIVE),
            )
        )
        .order_by("-member_count")[:limit]
    )


# --------------------------------------------------
# Upcoming Events
# --------------------------------------------------

def get_upcoming_events(*, limit: int = 5):
    """
    Next N published events with start_time in the future.
    Ordered by nearest first.
    """
    now = timezone.now()

    data =  (
        EventParticipation.objects.filter(
            status=ParticipationStatus.REGISTERED,
            is_active=True,
            event__start_time__gt=now,
        )
        .select_related("event")
        .order_by("event__start_time")[:limit]
    )
    return data