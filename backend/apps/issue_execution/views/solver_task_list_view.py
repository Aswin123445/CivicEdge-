from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import  IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.selectors.solver_task_selectors import get_solver_tasks
from apps.issue_execution.serilalizers.solver_task_list_serializer import SolverTaskListSerializer
from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus
 # assuming you have this


class SolverTaskListView(ListAPIView):
    permission_classes = [IsSolver, IsActiveSolverForWrite]
    serializer_class = SolverTaskListSerializer

    def get_queryset(self):
        return get_solver_tasks(solver=self.request.user)
    
    search_fields = [
        "reference_id",
        "issue__title",
    ]
    filterset_fields = [
        "status",
    ]
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        new_assignments_count = queryset.filter(status = SolverTaskStatus.ASSIGNED, is_active=True).count()
        in_progress_count = queryset.filter(status = SolverTaskStatus.IN_EXECUTION, is_active=True).count() 
        pending_verification_count = queryset.filter(status = SolverTaskStatus.VERIFICATION_SUBMITTED, is_active=True).count()
        pending_submission_count = queryset.filter(status = SolverTaskStatus.COMPLETION_SUBMITTED, is_active=True).count()
        completed_count = queryset.filter(status = SolverTaskStatus.COMPLETED, is_active=True).count()
        
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['new_assignments_count'] = new_assignments_count
            response.data['in_progress_count'] = in_progress_count
            response.data['pending_verification_count'] = pending_verification_count    
            response.data['pending_submission_count'] = pending_submission_count
            response.data['completed_count'] = completed_count
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)