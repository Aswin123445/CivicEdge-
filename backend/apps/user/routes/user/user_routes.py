from django.urls import path
from apps.user.views.user_view import  SignInView, VerifyEmailView 
from apps.user.views.user.register_view import CitizenRegisterView
from apps.user.views.user.logout_view import LogoutView
from apps.user.views.user.oauth2 import google_login,google_callback
from apps.user.views.user.reset_password import ForgotPasswordView, ResetPasswordView 

urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('auth/google/', google_login, name='google_login'),
    path('auth/google/callback/', google_callback, name='google_callback'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='signin'),
    path("reset-password/<uidb64>/<token>/", ResetPasswordView.as_view(), name="reset-password")
]