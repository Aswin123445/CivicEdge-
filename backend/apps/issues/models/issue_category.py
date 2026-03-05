import uuid
from django.db import models, IntegrityError
from rest_framework.exceptions import ValidationError
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower
from shared.utils.generate_reference_id import generate_reference_id


class IssueCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False
    )

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    display_order = models.PositiveIntegerField(default=0)
    icon = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]
        constraints = [
            UniqueConstraint(
                Lower("name"),
                name="unique_issue_category_name_lower"
            )
        ]

    def clean(self):
        """
        Case-insensitive uniqueness validation
        """
        if (
            IssueCategory.objects
            .filter(name__iexact=self.name)
            .exclude(pk=self.pk)
            .exists()
        ):
            raise ValidationError({
                "name": "Issue category with this name already exists."
            })

    def save(self, *args, **kwargs):
        # normalize name
        self.name = self.name.strip()

        # generate reference id once
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=IssueCategory,
                field_name="reference_id",
                prefix="CAT",
                padding=10,
            )

        # run model validation
        self.full_clean()

        try:
            super().save(*args, **kwargs)
        except IntegrityError:
            # final safety net (race condition protection)
            raise ValidationError({
                "name": "Issue category with this name already exists."
            })

    def __str__(self):
        return self.name
