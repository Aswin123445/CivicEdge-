from django.forms import ValidationError
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from apps.user.serializers.admin.solver_management.solver_update_delete_serializer import SolverUpdateSerializer
from shared.enums.user_role import UserRole

User = get_user_model()
class AdminSolverDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(role=UserRole.SOLVER)
    serializer_class = SolverUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
    
    def perform_destroy(self, instance):
        if self.request.user == instance:
            raise ValidationError("You cannot delete yourself.")
        instance.is_active = False
        instance.save()
