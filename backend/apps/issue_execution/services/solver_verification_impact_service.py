from rest_framework.exceptions import ValidationError


def update_impact_verification(*, draft, solver, data: dict):
    """
    Updates impact assessment section for a verification draft attempt.
    """

    # --- Duty check ---
    if not solver.is_active:
        raise ValidationError("Inactive solver cannot perform this action.")

    # --- Ownership check ---
    if draft.created_by != solver:
        raise ValidationError("You do not own this verification draft.")

    # --- Draft state check ---
    if draft.is_submitted:
        raise ValidationError("Submitted drafts cannot be modified.")

    # --- Persist data ---
    draft.public_impact_summary = data["public_impact_summary"]
    draft.estimated_people_affected = data.get("estimated_people_affected")
    draft.local_feedback_summary = data.get("local_feedback_summary", "")

    # --- Domain validation ---
    draft.validate_impact_assessment()

    # --- System-controlled completion ---
    draft.impact_assessment_completed = True

    draft.save(
        update_fields=[
            "public_impact_summary",
            "estimated_people_affected",
            "local_feedback_summary",
            "impact_assessment_completed",
            "updated_at",
        ]
    )

    return draft