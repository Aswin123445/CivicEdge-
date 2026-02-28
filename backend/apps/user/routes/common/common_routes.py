from django.urls import path
from apps.user.views.common.fetch_role_view import MeView
from apps.user.views.common.logout_view import LogoutView
from apps.user.views.common.change_password_view import ChangePasswordView

urlpatterns = [
    path('me/', MeView.as_view() , name = 'user_role'), 
    path('logout/', LogoutView.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

]