from rest_framework.exceptions import ValidationError


def update_ground_verification(*, draft, solver, data: dict):
    """
    Updates ground verification section for a draft attempt.
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
    draft.is_issue_present = data["is_issue_present"]
    draft.severity_level = data["severity_level"]
    draft.affected_area_description = data["affected_area_description"]

    # --- Domain validation ---
    draft.validate_ground_verification()

    # --- Mark section complete (SYSTEM action) ---
    draft.ground_verification_completed = True

    draft.save(
        update_fields=[
            "is_issue_present",
            "severity_level",
            "affected_area_description",
            "ground_verification_completed",
            "updated_at",
        ]
    )

    return draft