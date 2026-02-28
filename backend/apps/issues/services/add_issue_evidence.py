from django.db import transaction
from apps.issues.models.issue_evidence import IssueEvidence
from apps.issues.models.issue_log import IssueLog
from apps.issues.models.issues import Issue
from rest_framework.exceptions import PermissionDenied


@transaction.atomic
def add_issue_evidences(*, issue, user, evidences):
    """
    Attach multiple evidences to a draft issue.
    `evidences` is a list of validated dicts.
    """

    if issue.draft_step != Issue.DraftStep.LOCATION:
        raise PermissionDenied("Not allowed to perform this action.")

    created_evidences = []

    for data in evidences:
        evidence = IssueEvidence.objects.create(
            issue=issue,
            uploaded_by=user,
            cloudinary_public_id=data["cloudinary_public_id"],
            cloudinary_url=data["cloudinary_url"],
            evidence_type=data["evidence_type"],
            file_format=data["file_format"],
            file_size=data["file_size"],
            width=data.get("width"),
            height=data.get("height"),
        )

        created_evidences.append(evidence)

    # Log ONCE (not per evidence — important)
    IssueLog.objects.create(
        issue=issue,
        event_type=IssueLog.EventType.EVIDENCE_ADDED,
        actor=user,
        metadata={
            "count": len(created_evidences),
            "evidence_ids": [str(e.id) for e in created_evidences],
        },
    )

    # Advance draft step ONCE
    if issue.draft_step != Issue.DraftStep.EVIDENCE:
        issue.draft_step = Issue.DraftStep.EVIDENCE
        issue.save(update_fields=["draft_step"])

    return created_evidences