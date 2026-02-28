from rest_framework.exceptions import PermissionDenied  
from apps.issues.models.issues import Issue
def get_issue_review_data(*, issue, user):
    if issue.reporter != user:
        raise PermissionDenied("Not allowed")
    
    issue = (
        Issue.objects
        .select_related("category")
        .prefetch_related(
            "evidences",
            "behavioral_responses",
        )
        .get(id=issue.id))

    return {
        "issue": issue,
        "location": issue.location,
        "evidences": issue.evidences.all(),
        "behavioral_responses": issue.behavioral_responses.all(),
        "category": issue.category
    }