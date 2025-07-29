from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from apps.user.services.user.logout import logout_user_by_refresh_token

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            logout_user_by_refresh_token(request.data.get("refresh"))
            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
