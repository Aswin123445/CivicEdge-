from django.shortcuts import redirect
from django.contrib.auth import login
from django.http import JsonResponse
from django.contrib.auth.models import User
import requests
from apps.user.utils.oauth_registry.oauth_registry import oauth
from apps.user.services.user.google_register_signin import google_register_signin_service
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


@permission_classes([AllowAny])
def google_login_backend(request):
    redirect_uri = request.build_absolute_uri('http://localhost:8000/api/v1/user/auth/google/callback/')
    return oauth.google.authorize_redirect(request, redirect_uri)

@permission_classes([AllowAny])
def google_callback_backend(request):
    token = oauth.google.authorize_access_token(request)
    user,access,refresh = google_register_signin_service(token)
    return JsonResponse({
        'message': 'Login successful',
        'access': access,
        'refresh': refresh,
        'user': {
            'email': user.email,
            'name': user.profile.name,
            'avatar': user.profile.avatar_url,
        }
    })


#had suggestion to make a reverse  instead of hardcoding it


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  # 👈 disables session/JWT auth for this view

    def post(self, request):

        data = request.data.get("data")
        if not data:
            return Response({"error": "Missing access token"}, status=status.HTTP_400_BAD_REQUEST)

        resp = requests.get(
            "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
            headers={"Authorization": f"Bearer {data}"}
        )

        if resp.status_code != 200:
            print('invalid google token')
            return Response({"error": "Invalid Google token"}, status=status.HTTP_400_BAD_REQUEST)

        user_info = resp.json()
        print(user_info)
        user, access, refresh = google_register_signin_service(user_info)

        response = Response({
            "message": "Login successful",
            "access": access,
            "refresh": refresh,
            "user": {
                "email": user.email,
                "name": user.profile.name,
                "avatar": user.profile.avatar_url,
            }
        }, status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            secure=False,      # local HTTP
            samesite='Lax',    # same-origin via proxy
            max_age=3*60,
            path='/',
        )
        return response

