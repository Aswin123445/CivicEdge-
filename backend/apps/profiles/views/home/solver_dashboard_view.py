from rest_framework.views import APIView
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsSolver
from apps.profiles.selectors.solver_dashboard_selector import get_solver_dashboard_data
from apps.profiles.serializers.home.SolverDashboardTaskSerializer import SolverDashboardSerializer

class SolverDashboardView(APIView):

    permission_classes = [IsSolver]

    def get(self, request):

        data = get_solver_dashboard_data(request.user)

        serializer = SolverDashboardSerializer(data)

        return Response(serializer.data)