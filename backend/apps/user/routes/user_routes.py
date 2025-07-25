from django.urls import path
from apps.user.views.user_view import CitizenRegisterView, VerifyEmailView # adjust based on your design

urlpatterns = [
    path("register/", CitizenRegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
]
