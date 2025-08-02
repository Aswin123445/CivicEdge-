from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAdminUser
from apps.user.serializers.admin.solver_management.solver_creation import AdminCreateSolverSerializer

class AdminCreateSolverView(CreateAPIView):
    serializer_class = AdminCreateSolverSerializer
    permission_classes = [IsAdminUser]
