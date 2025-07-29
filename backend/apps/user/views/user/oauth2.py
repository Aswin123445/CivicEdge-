from django.shortcuts import redirect
from django.contrib.auth import login
from django.http import JsonResponse
from django.contrib.auth.models import User
from apps.user.utils.oauth_registry.oauth_registry import oauth
from apps.user.services.user.google_register_signin import google_register_signin_service

def google_login(request):
    redirect_uri = request.build_absolute_uri('http://localhost:8000/api/v1/user/auth/google/callback/')
    print("Before redirect, session key =", request.session.session_key)
    return oauth.google.authorize_redirect(request, redirect_uri)

def google_callback(request):
    print("At callback, session key =", request.session.session_key)
    print("Request state =", request.GET.get("state"))
    print("Session state =", request.session.get("oauth_state"))
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
