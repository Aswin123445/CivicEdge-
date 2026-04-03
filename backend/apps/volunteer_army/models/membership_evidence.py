import uuid
from django.db import models

from shared.utils.generate_reference_id import generate_reference_id


class MembershipEvidence(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False,
    )

    membership = models.ForeignKey(
        "VolunteerMembership",
        on_delete=models.CASCADE,
        related_name="evidences",
    )

    file_url = models.URLField()

    description = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Evidence for {self.membership_id}"
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=MembershipEvidence,
                field_name="reference_id",
                prefix="VME",
                padding=10,
            )
        super().save(*args, **kwargs)