from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.user.permissions.user_permissions import IsSolver
from apps.profiles.serializers.profile.solver.solver_availability_serializer import SolverAvailabilitySerializer
from apps.profiles.services.profile.solver_availability_service import SolverAvailabilityService

class ToggleAvailabilityView(APIView):
    permission_classes = [IsAuthenticated,IsSolver]

    def post(self, request):
        is_available = SolverAvailabilityService.toggle(request.user)
        serializer = SolverAvailabilitySerializer({
            "availability": is_available,
            "status": "working" if is_available else "not_working"
        })

        return Response(serializer.data)
