from apps.user.serializers.solver.solver_login_serializer import SolverLoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from apps.user.services.solver.solver_login_services import solver_login_service
from rest_framework import status
from rest_framework.response import Response
class SolverLoginView(APIView): 
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = SolverLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            data = solver_login_service(serializer.validated_data)
            response =  Response(data, status=status.HTTP_200_OK)
            response.set_cookie(
                key='refresh_token',
                value=data['refresh'],
                httponly=True,
                secure=False,      # local HTTP
                samesite='Lax',    # same-origin via proxy
                max_age=60*60*24,
                path='/',
            )
            return response
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
