from django.forms import ValidationError
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from apps.user.serializers.admin.solver_management.solver_update_delete_serializer import (
    SolverUpdateSerializer,
)
from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus
from shared.enums.user_role import UserRole
User = get_user_model()


class AdminSolverDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(role=UserRole.SOLVER)
    serializer_class = SolverUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "id"

    def perform_destroy(self, instance):
        if self.request.user == instance:
            raise ValidationError("You cannot delete yourself.")
        tasks = self.request.user.assigned_solver_tasks.all()
        for task in tasks:
            print(task)
            if task.status not in {
                SolverTaskStatus.TERMINATED,
                SolverTaskStatus.COMPLETED,
                SolverTaskStatus.COMPLETION_SUBMITTED,
            }:
                raise ValidationError(
                    "You cannot delete a solver who currently has assigned tasks. please contact solver to complete them."
                )
        instance.is_active = False
        instance.save()
