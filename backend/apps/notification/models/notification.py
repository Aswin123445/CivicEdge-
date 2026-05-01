# apps/notifications/models.py

import uuid
from django.db import models
from django.utils import timezone
from apps.user.models.user import User
class Notification(models.Model):
    class TargetType(models.TextChoices):
        ISSUE = "ISSUE", "Issue"
        TASK = "TASK", "Task"
        REPORT = "REPORT", "Report"
        FORUM = "FORUM", "Forum"
        PAYMENT = "PAYMENT", "Payment"
        VOLUNTEER = "VOLUNTEER", "Volunteer"
    class Type(models.TextChoices):
        ISSUE_REPORTED = "ISSUE_REPORTED"
        TASK_ASSIGNED_TO_SOLVER = "TASK_ASSIGNED_TO_SOLVER"
        REPORT_SUBMITTED_TO_ADMIN = "REPORT_SUBMITTED_TO_ADMIN"
        TASK_COMPLETED_BY_SOLVER = "TASK_COMPLETED_BY_SOLVER"
        ISSUE_RESOLVED = "ISSUE_RESOLVED"
        ISSUE_REJECTED = "ISSUE_REJECTED"
        TASK_APPROVED_BY_ADMIN = "TASK_APPROVED_BY_ADMIN"
        TASK_REJECTED_BY_ADMIN = "TASK_REJECTED_BY_ADMIN"
        APPROVE_REPORT = "APPROVE_REPORT"

        VOLUNTEER_JOIN_APPROVED = "VOLUNTEER_JOIN_APPROVED"
        VOLUNTEER_EVENT_REMINDER = "VOLUNTEER_EVENT_REMINDER"
        VOLUNTEER_JOIN_REJECTED = "VOLUNTEER_JOIN_REJECTED"
        VOLUNTEER_CERTIFICATE = "VOLUNTEER_CERTIFICATE", "Volunteer Certificate"    
        VOLUNTEER_ATTENDANCE_REJECT = "VOLUNTEER_ATTENDANCE_REJECT", "Volunteer Attendance Reject"
        NEW_EVENT_NOTIFY = "NEW_EVENT_NOTIFY", "new event notify"

        FORUM_REPLY_RECEIVED = "FORUM_REPLY_RECEIVED"
        FORUM_POST_CREATED = "FORUM_POST_CREATED"
        FORUM_REPORT_USER = "FORUM_REPORT_USER"
        FORUM_REACTED = "FORUM_REACTED"

        PAYMENT_SUCCESS = "PAYMENT_SUCCESS"
        PAYMENT_FAILED = "PAYMENT_FAILED"

        ADMIN_ANNOUNCEMENT = "ADMIN_ANNOUNCEMENT"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications"
    )

    actor = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="triggered_notifications"
    )

    type = models.CharField(max_length=50, choices=Type.choices)
    target_type = models.CharField(max_length=40, choices=TargetType.choices)
    target_id = models.UUIDField()
    redirect_url = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255)
    message = models.TextField()

    metadata = models.JSONField(default=dict, blank=True)

    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "is_read"]),
            models.Index(fields=["user", "created_at"]),
        ]
    def mark_as_read(self):
        if not self.is_read:
            self.is_read = True
            self.read_at = timezone.now()
            self.save(update_fields=["is_read", "read_at"])

    def __str__(self):
        return f"{self.type} → {self.user_id} ->{self.id}"
