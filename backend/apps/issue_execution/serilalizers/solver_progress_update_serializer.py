from rest_framework import serializers
from apps.issue_execution.models.task_progress_update import TaskProgressUpdate


class SolverProgressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskProgressUpdate
        fields = [
            "id",
            "reference_id",
            "progress_summary",
            "progress_percentage",
            "blockers",
            "next_steps",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "reference_id",
            "created_at",
        ]