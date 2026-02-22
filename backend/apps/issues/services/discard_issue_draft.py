from django.db import transaction
from rest_framework.exceptions import ValidationError


@transaction.atomic
def discard_issue_draft(*, issue):
    """
    Permanently deletes a draft issue and all dependent data.
    """

    if not issue.is_draft:
        raise ValidationError("Only draft issues can be discarded.")

    issue.delete()
