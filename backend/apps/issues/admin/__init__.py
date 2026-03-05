from apps.issues.models.issues import Issue
from apps.issues.models.behavioral_prompt import BehavioralPrompt, IssueBehavioralResponse
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.models.issue_category import IssueCategory
from apps.issues.models.issue_location import IssueLocation
from apps.issues.models.issue_evidence import IssueEvidence
from apps.issues.models.issue_log import IssueLog,IssueStats
from apps.issues.models.issue_status_history import IssueStatusHistory 
from apps.issues.models.issue_timeline_event import IssueTimelineEvent

from django.contrib import admin

admin.site.register(Issue)
admin.site.register(BehavioralPrompt)
admin.site.register(IssueAdministrativeDecision)
admin.site.register(IssueCategory)
admin.site.register(IssueEvidence)
admin.site.register(IssueLog)
admin.site.register(IssueStatusHistory)
admin.site.register(IssueStats)
admin.site.register(IssueLocation)
admin.site.register(IssueBehavioralResponse)
admin.site.register(IssueTimelineEvent)