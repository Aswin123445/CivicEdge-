from django.db import transaction
from apps.issues.models.issue_evidence import IssueEvidence
from apps.issues.models.issue_log import IssueLog


@transaction.atomic
def add_issue_evidence(*, issue, user, data):
    """
    Attach an evidence to a draft issue.
    """

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

    # Log evidence addition
    IssueLog.objects.create(
        issue=issue,
        event_type=IssueLog.EventType.EVIDENCE_ADDED,
        actor=user,
        metadata={
            "evidence_id": str(evidence.id),
            "evidence_type": evidence.evidence_type,
            "file_format": evidence.file_format,
        },
    )

    # Advance / confirm draft step
    if issue.draft_step != issue.DraftStep.EVIDENCE:
        issue.draft_step = issue.DraftStep.EVIDENCE
        issue.save(update_fields=["draft_step"])

    return evidence