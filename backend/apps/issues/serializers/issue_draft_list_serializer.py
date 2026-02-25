from rest_framework import serializers
from apps.issues.models.issues import Issue


class IssueDraftListSerializer(serializers.ModelSerializer):
    next_step = serializers.SerializerMethodField()
    completion_percentage = serializers.SerializerMethodField()
    category = serializers.ReadOnlyField(source="category.name")
    icon = serializers.ReadOnlyField(source="category.icon")
    current_step = serializers.CharField(source="draft_step", read_only=True)

    class Meta:
        model = Issue
        fields = (
            "id",
            "title",
            "current_step",
            "next_step",
            "updated_at",
            "completion_percentage",
            "reference_id",
            "category",
            "icon",
            "description",
        )
        read_only_fields = (
            "id",
            "updated_at",
            "completion_percentage",
            "reference_id",
            "category",
            "icon",
            "description",
            "next_step",
        )

    # 🔁 Single source of workflow truth
    DRAFT_STEP_FLOW = {
        "BASIC": "LOCATION",
        "LOCATION": "EVIDENCE",
        "EVIDENCE": "BEHAVIOR",
        "BEHAVIOR": "REVIEW",
        "REVIEW": None,  # final step
    }

    def get_next_step(self, obj):
        """
        Returns the next required step based on current draft_step.
        """
        return self.DRAFT_STEP_FLOW.get(obj.draft_step)

    def get_completion_percentage(self, obj):
        DRAFT_STEPS_PROGRESS = {
            "BASIC": 20,
            "LOCATION": 40,
            "EVIDENCE": 60,
            "BEHAVIOR": 80,
            "REVIEW": 100,
        }

        return DRAFT_STEPS_PROGRESS.get(obj.draft_step, 0)