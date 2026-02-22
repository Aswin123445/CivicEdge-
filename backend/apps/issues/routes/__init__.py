from django.urls import path

from apps.issues.views.issue_create_view import IssueCreateView
from apps.issues.views.issue_draft_list_view import IssueDraftListView
from apps.issues.views.issue_draft_detail_view import IssueDraftDetailView
from apps.issues.views.issue_location_create_view import IssueLocationCreateView
from apps.issues.views.issue_evidence_create_view import IssueEvidenceCreateView
from apps.issues.views.behavioral_prompt_list_view import BehavioralPromptListView
from apps.issues.views.issue_behavior_submit_view import IssueBehaviorSubmitView
from apps.issues.views.issue_draft_delete_view import IssueDraftDeleteView
from apps.issues.views.issue_cancel_view import IssueCancelView

urlpatterns = [
    path("issues/", IssueCreateView.as_view(), name="issue-create"),
    path("issues/drafts/", IssueDraftListView.as_view(), name="issue-draft-list"),
    path("issues/<uuid:id>/draft/", IssueDraftDetailView.as_view(), name="issue-draft-detail"),
    path("issues/<uuid:id>/draft/delete/", IssueDraftDeleteView.as_view(), name="issue-draft-delete"),
    path("issues/<uuid:id>/location/", IssueLocationCreateView.as_view(), name="issue-location"),
    path("issues/<uuid:id>/evidence/",IssueEvidenceCreateView.as_view(), name="issue-evidence"),
    path("issues/<uuid:id>/behavioral-prompts/",BehavioralPromptListView.as_view(),name = "issue-behavioral-prompts"),
    path("issues/<uuid:id>/behavioral-response/",IssueBehaviorSubmitView.as_view(),name = "issue-behavioral-response"),
    path("issues/<uuid:id>/cancel/",IssueCancelView.as_view(),name = "issue-cancel"), 
]