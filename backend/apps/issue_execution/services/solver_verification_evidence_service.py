from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issue_execution.models.verification_evidence import VerificationEvidence
from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft


@transaction.atomic
def add_verification_evidence_bulk(
    *,
    draft: FieldVerificationDraft,
    solver,
    evidences: list[dict],
):
    """
    Bulk attach Cloudinary-backed evidence to a verification draft.

    NOTE:
    bulk_create is intentionally NOT used because reference_id
    is generated in model.save().
    """

    # -----------------------------
    # Guard checks
    # -----------------------------
    if not solver.is_active:
        raise ValidationError("Inactive solver cannot upload evidence.")

    if draft.created_by != solver:
        raise ValidationError("You do not own this verification draft.")

    if draft.is_submitted:
        raise ValidationError("Cannot upload evidence after submission.")

    if not evidences:
        raise ValidationError("At least one evidence item is required.")

    # -----------------------------
    # Create evidence one-by-one
    # -----------------------------
    for item in evidences:
        VerificationEvidence.objects.create(
            verification_draft=draft,
            uploaded_by=solver,
            public_id=item["public_id"],
            secure_url=item["secure_url"],
            resource_type=item.get("resource_type", "image"),
            format=item.get("format", ""),
            width=item.get("width"),
            height=item.get("height"),
            bytes=item.get("bytes"),
        )

    # -----------------------------
    # One-way completion flag
    # -----------------------------
    if not draft.evidence_completed:
        draft.evidence_completed = True
        draft.save(update_fields=["evidence_completed", "updated_at"])