from django.shortcuts import get_object_or_404
from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft

def get_field_verification_draft(solver_draft_id):
    return get_object_or_404(FieldVerificationDraft, id=solver_draft_id, is_active=True)