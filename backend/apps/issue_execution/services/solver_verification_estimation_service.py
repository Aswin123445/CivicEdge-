from rest_framework.exceptions import ValidationError


def update_estimation_verification(*, draft, solver, data: dict):
    """
    Updates estimation & feasibility section for a verification draft attempt.
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
    draft.estimated_budget = data["estimated_budget"]
    draft.estimated_duration_days = data["estimated_duration_days"]
    draft.site_constraints = data.get("site_constraints", "")
    draft.execution_risks = data.get("execution_risks", "")

    # --- Domain validation ---
    draft.validate_estimation()

    # --- System-controlled completion ---
    draft.estimation_completed = True

    draft.save(
        update_fields=[
            "estimated_budget",
            "estimated_duration_days",
            "site_constraints",
            "execution_risks",
            "estimation_completed",
            "updated_at",
        ]
    )

    return draft