from django.urls import path, include

urlpatterns = [
    path('admin/', include('apps.user.routes.admin.admin_routes')),
    path('common/',include('apps.user.routes.common.common_routes')),
    path('solver/',include('apps.user.routes.solver.solver_routes')),
    path('', include('apps.user.routes.user.user_routes')),
] 