from django.urls import path
from apps.user.views.common.fetch_role_view import MeView
urlpatterns = [
    path('me/', MeView.as_view() , name = 'user_role'), 
]