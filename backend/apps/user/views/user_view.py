from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from apps.user.serializers.user.user_read_serilazer import UserReadSerializer
from apps.user.serializers.user.user_create import UserCreateSerializer
from apps.user.services.common.verify_email_from_token import verify_user_email_from_token
from apps.user.serializers.user.signin_serializer import SignInSerializer
from shared.exceptions.custom_exceptions import InvalidTokenError, TokenExpiredError, UserAlreadyExistsError

import logging 

logger = logging.getLogger(__name__)


class VerifyEmailView(APIView):
    def get(self, request):
        token = request.query_params.get('token', '').strip()
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = verify_user_email_from_token(token)
        except (InvalidTokenError, TokenExpiredError, UserAlreadyExistsError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Unexpected error in email verification")
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "message": "Email verified successfully",
            "user": UserReadSerializer(user).data
        }, status=status.HTTP_200_OK)
        

class SignInView(GenericAPIView):
    serializer_class = SignInSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        token_data = serializer.save()
        return Response(token_data, status=status.HTTP_200_OK) 