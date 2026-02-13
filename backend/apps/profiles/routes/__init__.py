from django.urls import path,include
urlpatterns = [
    path('',include('apps.profiles.routes.profile_routes')),
]