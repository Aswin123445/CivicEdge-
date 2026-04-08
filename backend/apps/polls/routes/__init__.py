from django.urls import path, include 

urlpatterns = [
    path('admin/', include('apps.polls.routes.admin')),
    path('citizen/', include('apps.polls.routes.citizen')),
]