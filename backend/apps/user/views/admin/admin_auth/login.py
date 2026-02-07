from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.services.admin.auth.login_service import admin_login_service
from apps.user.serializers.admin.auth.login_serializer import AdminLoginSerializer
from rest_framework.permissions import AllowAny

class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            data = admin_login_service(serializer.validated_data)
            response =  Response(data, status=status.HTTP_200_OK)
            response.set_cookie(
                key='refresh_token',
                value=data['refresh'],
                httponly=True,
                secure=False,      # local HTTP
                samesite='Lax',    # same-origin via proxy
                max_age=10*60*3,
                path='/',
            )
            return response
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
