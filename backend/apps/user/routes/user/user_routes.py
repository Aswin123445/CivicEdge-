from django.urls import path
from apps.user.views.user_view import CitizenRegisterView, SignInView, VerifyEmailView # adjust based on your design

urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('signin/', SignInView.as_view(), name='signin'),
]