from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.selectors.admin_solver_task_selectors import get_solver_tasks_by_status
from apps.issue_execution.serilalizers.admin_solver_task_list_serializer import AdminSolverTaskListSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.utils.timezone import now

from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus


class AdminSolverTaskListView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminSolverTaskListSerializer
    search_fields = [
        "reference_id",
        "issue__title",
        "solver__email",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "created_at",
    ]

    def get_queryset(self):
        status_param = self.request.query_params.get("status")

        if status_param and status_param not in SolverTaskStatus.values:
            raise ValidationError("Invalid status filter.")

        return get_solver_tasks_by_status(status=status_param if status_param else None)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        today = now().date()
        today_count =  queryset.filter(created_at__date=today).count()
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['today_count'] = today_count
            return response
            

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)