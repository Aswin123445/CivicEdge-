from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


class RefreshView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        print(request )
        print(request.COOKIES)
        refresh_token = request.COOKIES.get("refresh_token")
        print(refresh_token)
        if not refresh_token:
            return Response({"detail": "No refresh token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            refresh = RefreshToken(refresh_token)
            access = str(refresh.access_token)
            return Response({"access": access}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"detail": "Invalid or expired refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
