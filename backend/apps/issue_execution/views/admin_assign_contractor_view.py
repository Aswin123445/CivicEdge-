from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.serilalizers.admin_assign_contractor_serializer import AdminAssignContractorSerializer
from apps.issue_execution.services.admin_assign_contractor_service import assign_contractor_to_task
from django.shortcuts import get_object_or_404

class AdminAssignContractorView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, task_id):
        serializer = AdminAssignContractorSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        task = get_object_or_404(
            SolverTask,
            id=task_id,
            is_active=True,
        )

        assign_contractor_to_task(
            admin=request.user,
            task=task,
            contractor_id=serializer.validated_data["contractor_id"],
        )

        return Response(
            {"detail": "Contractor assigned successfully."},
            status=status.HTTP_200_OK,
        )