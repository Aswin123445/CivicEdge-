from django.urls import path
from apps.user.views.admin.admin_auth.login import AdminLoginView
from apps.user.views.admin.user_management.user_crud.user_listing import AdminCitizenListView
from apps.user.views.admin.user_management.user_crud.user_update_delete import AdminCitizenDetailView
from apps.user.views.admin.solver_management.solver_creation import AdminCreateSolverView

urlpatterns = [
    path("login/", AdminLoginView.as_view(), name="admin-login"),
    path("citizens/", AdminCitizenListView.as_view(), name="admin-citizen-list"),
    path('citizens/<str:id>/', AdminCitizenDetailView.as_view(), name='admin-update-delete-citizen'),
    path('create-solver/', AdminCreateSolverView.as_view(), name='admin-create-solver'),#test file created
]