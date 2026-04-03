from django.contrib.auth import get_user_model

from apps.volunteer_army.selectors.citizen.quick_action_selector import get_citizen_quick_actions, get_featured_groups, get_upcoming_events



User = get_user_model()


def get_citizen_home_page(*, user) -> dict:
    """
    Assembles all data needed for the citizen home page
    in a single service call.

    Returns:
        quick_actions   — citizen's personal counts
        featured_groups — top 3 active groups by member count
        upcoming_events — next 5 published upcoming events
    """
    return {
        "quick_actions":   get_citizen_quick_actions(user=user),
        "featured_groups": get_featured_groups(limit=3),
        "upcoming_events": get_upcoming_events(limit=5),
    }