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
from apps.issues.views.issue_home_summary_api_view import IssueHomeSummaryAPIView
from apps.issues.views.issue_category_list_api_view import IssueCategoryListAPIView
from apps.issues.views.issue_review_view import IssueReviewView
from apps.issues.views.issue_submit_view import IssueSubmitView
from apps.issues.views.complaint_list_view import ComplaintListView
from apps.issues.views.complaint_details_view import ComplaintDetailsView
from apps.issues.views.list_category_api import IssueCategoryCreateAPIView, IssueCategoryListAPIViewNew
from apps.issues.views.update_category_api import IssueCategoryUpdateAPIView
from apps.issues.views.category_toggle_view import IssueCategoryToggleAPIView
from apps.issues.views.list_prompt_api import BehavioralPromptCreateAPIView, BehavioralPromptListAPIView, BehavioralPromptToggleAPIView
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
    path("issues/summary", IssueHomeSummaryAPIView.as_view(), name="issue-home-summary"),
    path("issues/categories",IssueCategoryListAPIView.as_view(), name = "issue-categgory-list"),
    path("issues/<uuid:id>/review/",IssueReviewView.as_view(), name="issue-review"),
    path("issues/<uuid:id>/submit/",IssueSubmitView.as_view(), name="issue-submit"),
    path("issues/complaints/list/",ComplaintListView.as_view(), name="complaint-list"),
    path("issues/complaints/<uuid:id>/detail/",ComplaintDetailsView.as_view(), name="complaint-details"),
    path("issues/categories-admin/",IssueCategoryListAPIViewNew.as_view(), name = "issue-new-categgory-admin"),
    path("issues/categories-admin/create/",IssueCategoryCreateAPIView.as_view(), name = "issue-new-categgory-admin"),
    path("issues/categories-admin/<uuid:pk>/update/",IssueCategoryUpdateAPIView.as_view(), name = "issue-update-categgory-admin"),
    path("issues/categories-admin/<uuid:id>/toggle/",IssueCategoryToggleAPIView.as_view(), name = "issue-delete-categgory-toggle-admin"),
    path("prompts/", BehavioralPromptListAPIView.as_view(), name="prompt-list"),
    path("prompts/create/", BehavioralPromptCreateAPIView.as_view(), name="prompt-create"),
    path("prompts/<uuid:id>/toggle/", BehavioralPromptToggleAPIView.as_view(), name="prompt-toggle"),
]