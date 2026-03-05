from apps.issues.selectors.complaint_details_selectors import (
    get_issue_by_id,
    get_latest_admin_decision,
)

from apps.issues.serializers.issue_core_serializer import IssueCoreSerializer
from apps.issues.serializers.administrative_decision_serializer import AdministrativeDecisionSerializer
from apps.issues.permissions.issue_edit import build_issue_permissions
from apps.issues.utils.timeline import build_issue_timeline
from rest_framework.exceptions import PermissionDenied

from apps.issues.serializers.issue_timeline_event_read_serializer import IssueTimelineEventReadSerializer
from apps.issues.serializers.submission_evidence_seralizer import ExecutionEvidenceReadSerializer
from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issues.models.issues import Issue
from apps.issue_execution.models.execution_evidence import ExecutionEvidence

def get_issue_detail(issue_id, user):
    issue = get_issue_by_id(issue_id)
    decision = get_latest_admin_decision(issue)
    if issue.reporter != user :
        raise PermissionDenied("Not allowed")
    timesline = issue.timeline_events.all().order_by("created_at")
    evidences = (
        ExecutionEvidence.objects
        .select_related(
            "execution_proof",
            "execution_proof__solver_task",
            "execution_proof__solver_task__issue",
        )
        .filter(
            execution_proof__solver_task__issue=issue,
            is_active=True,
            execution_proof__is_active=True,
        )
    )

    data =  {
        "issue": IssueCoreSerializer(issue).data,

        "permissions": build_issue_permissions(issue, decision, user),

        "administrative_decision": (
            AdministrativeDecisionSerializer(decision).data
            if decision else None
        ),

        "submission": {
            "description": issue.description,
            "location": issue.location.landmark_description if issue.location.landmark_description else issue.location.zone.name,
            "submitted_at": issue.created_at,
        },

        "citizen_media": [
            {
                "id": media.id,
                "type": media.evidence_type,
                "url": media.cloudinary_url,
            }
            for media in issue.evidences.all()
        ],

        "timeline": IssueTimelineEventReadSerializer(timesline, many=True).data,

        "resolution": {
            "note": None, #issue.resolution_note if issue.reolution_note else None,
            "resolved_at": None,#issue.resolved_at if issue.resolved_at else None,
            "after_media": ExecutionEvidenceReadSerializer(evidences, many=True).data,
        },
    }
    return data
    