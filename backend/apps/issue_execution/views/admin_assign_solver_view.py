from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model

from apps.issues.models.issues import Issue
from apps.issue_execution.serilalizers.admin_assign_solver_serializer import AdminAssignSolverSerializer
from apps.issue_execution.services.assign_solver_to_issue import assign_solver_to_issue
from apps.user.permissions.user_permissions import IsAdmin

User = get_user_model()


class AdminAssignSolverView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, issue_id):
        serializer = AdminAssignSolverSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        issue = get_object_or_404(Issue, id=issue_id)
        
        solver = get_object_or_404(
            User,
            id=serializer.validated_data["solver_id"]
        )

        task = assign_solver_to_issue(
            issue=issue,
            solver=solver,
            assigned_by=request.user,
            remarks=serializer.validated_data.get("remarks"),
        )

        return Response(
            {
                "task_id": task.id,
                "task_reference": task.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )