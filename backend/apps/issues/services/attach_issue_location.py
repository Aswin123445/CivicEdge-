from django.db import transaction
from apps.issues.models.issue_location import IssueLocation
from rest_framework.exceptions import PermissionDenied
from apps.issues.models.issues import Issue

@transaction.atomic
def attach_issue_location(*, issue, data):
    """
    Creates or updates the IssueLocation for a draft issue.
    Advances draft_step to EVIDENCE.
    """
    if issue.draft_step != Issue.DraftStep.BASIC:
        raise PermissionDenied("Not allowed to perform this action.")
    IssueLocation.objects.update_or_create(
        issue=issue,
        defaults={
            "latitude": data["latitude"],
            "longitude": data["longitude"],
            "accuracy_radius": data.get("accuracy_radius",None),
            "zone": data["zone"],
            "landmark_description": data.get("landmark", ""),
        },
    )   

    # Advance draft step
    issue.draft_step = issue.DraftStep.LOCATION
    issue.save(update_fields=["draft_step"])
