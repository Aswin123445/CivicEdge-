from django.urls import path, include 

urlpatterns = [
    path('admin/', include('apps.volunteer_army.routes.admin')),
    path('citizen/', include('apps.volunteer_army.routes.citizen')),
]