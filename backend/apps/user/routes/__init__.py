from django.urls import path, include

urlpatterns = [
    path('admin/', include('apps.user.routes.admin.admin_routes')),
    path('', include('apps.user.routes.user.user_routes')),
] 