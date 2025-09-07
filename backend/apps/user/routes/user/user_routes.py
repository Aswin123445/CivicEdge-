from django.urls import path
from apps.user.views.user_view import  SignInView, VerifyEmailView 
from apps.user.views.user.register_view import CitizenRegisterView
from apps.user.views.user.logout_view import LogoutView
from apps.user.views.user.oauth2 import GoogleLoginView, google_login_backend,google_callback_backend
from apps.user.views.user.reset_password import ForgotPasswordView, ResetPasswordView
from apps.user.views.common.refresh_view import RefreshView 

urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('refresh/', RefreshView.as_view(), name='refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth/google/', google_login_backend, name='google_login_backend'),
    path('auth/google/callback/', google_callback_backend, name='google_callback'),
    path('auth/google/login/', GoogleLoginView.as_view(), name='google_login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='signin'),
    path("reset-password/<uidb64>/<token>/", ResetPasswordView.as_view(), name="reset-password")
]