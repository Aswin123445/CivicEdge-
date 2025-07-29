from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.services.user.forgot_password import initiate_password_reset, reset_user_password
from apps.user.serializers.user.forgot_password import ForgotPasswordSerializer, ResetPasswordSerializer

class ForgotPasswordView(APIView):
    def post(self, request):
        try:
            serializer = ForgotPasswordSerializer(data=request.data)
            if serializer.is_valid():
                initiate_password_reset(serializer.validated_data.get('email',''))
                return Response({"message": "Password reset link sent"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class ResetPasswordView(APIView):
    def post(self, request,uidb64,token):
        serializer = ResetPasswordSerializer(
            data = request.data,
            context = {
            'uidb64': uidb64,
            'token': token,            }
        )
        if serializer.is_valid():
            reset_user_password(serializer.validated_data)
            return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
