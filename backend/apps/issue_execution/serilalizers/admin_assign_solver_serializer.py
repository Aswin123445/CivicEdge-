from rest_framework import serializers


class AdminAssignSolverSerializer(serializers.Serializer):
    solver_id = serializers.UUIDField()
    remarks = serializers.CharField(required=False, allow_blank=True)