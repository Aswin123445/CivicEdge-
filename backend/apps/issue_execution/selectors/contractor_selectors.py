from apps.issue_execution.models.contractor import Contractor


def get_active_contractors():
    """
    Returns all active contractors.

    Used by API layer.
    """
    return (
        Contractor.objects
        .filter(is_active=True)
        .order_by("name")
    )