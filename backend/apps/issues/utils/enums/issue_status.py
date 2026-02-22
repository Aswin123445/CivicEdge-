from django.db import models

class IssueStatus(models.TextChoices):
    OPEN = "OPEN", "Open"
    CANCELLED = "CANCELLED", "Cancelled"
    ACKNOWLEDGED = "ACKNOWLEDGED", "Acknowledged"
    REJECTED = "REJECTED", "Rejected"
    RESOLVED = "RESOLVED", "Resolved"
    CLOSED = "CLOSED", "Closed"
    REOPENED = "REOPENED", "Reopened"
