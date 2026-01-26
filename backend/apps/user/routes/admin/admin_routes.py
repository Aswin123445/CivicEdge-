from django.urls import path
from apps.user.views.admin.admin_auth.login import AdminLoginView
from apps.user.views.admin.user_management.user_crud.user_listing import AdminCitizenListView
from apps.user.views.admin.user_management.user_crud.user_update_delete import AdminCitizenDetailView
from apps.user.views.admin.solver_management.solver_creation import AdminCreateSolverView
from apps.user.views.admin.solver_management.solver_listing import AdminSolverListView
from apps.user.views.admin.solver_management.solver_update_delete import AdminSolverDetailView
from apps.user.views.admin.admin_management.list_admin import AdminListView

urlpatterns = [
    path("login/", AdminLoginView.as_view(), name="admin-login"),
    path("citizens/", AdminCitizenListView.as_view(), name="admin-citizen-list"),
    path("admins/", AdminListView.as_view(), name="admin-admin-list"),
    path('citizens/<str:id>/', AdminCitizenDetailView.as_view(), name='admin-update-delete-citizen'),
    path('create-solver/', AdminCreateSolverView.as_view(), name='admin-create-solver'),#test file created
    path('solvers/', AdminSolverListView.as_view(), name='admin-solver-list'),#test file created
    path('solvers/<str:id>/', AdminSolverDetailView.as_view(), name='admin-update-delete-solver'),#test file created
] 