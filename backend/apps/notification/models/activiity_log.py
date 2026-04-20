from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()
class ActivityEntity(models.TextChoices):
    ISSUE = "ISSUE", "Issue"
    TASK = "TASK", "Task"
    POLL = "POLL", "Poll"
    FORUM = "FORUM", "Forum"
    GROUP = "GROUP", "Group"
    EVENT = "EVENT", "Event"
    USER = "USER", "User"
    
class ActivityAction(models.TextChoices):
    CREATED = "CREATED", "Created"
    UPDATED = "UPDATED", "Updated"

    JOINED = "JOINED", "Joined"

    VOTED = "VOTED", "Voted"
    COMMENTED = "COMMENTED", "Commented"
    LIKED = "LIKED", "Liked"

    ASSIGNED = "ASSIGNED", "Assigned"
    COMPLETED = "COMPLETED", "Completed"

    CLOSED = "CLOSED", "Closed"
    MODERATED = "MODERATED", "Moderated"
class ActivityFeed(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    entity = models.CharField(max_length=20, choices=ActivityEntity.choices)
    action = models.CharField(max_length=20, choices=ActivityAction.choices)


    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)