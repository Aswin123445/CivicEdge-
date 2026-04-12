from django.urls import path,include 

urlpatterns = [
    path('admin/', include('apps.forum.routes.admin')),
    path('citizen/', include('apps.forum.routes.citizen')),
]