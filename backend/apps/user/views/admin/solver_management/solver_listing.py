# users/admin/views/citizen_list_view.py
from apps.user.services.admin.solver_management.solver_listing import get_all_solvers
from rest_framework.generics import ListAPIView
from apps.user.serializers.admin.solver_management.listing_serializer import AdminSolverSerializer

class AdminSolverListView(ListAPIView):
        queryset = get_all_solvers()
        serializer_class  = AdminSolverSerializer
        search_fields = ['email','profile__location','is_active']
        ordering_fields = ['created_at', 'profile__name','zone',]
        ordering = ['-created_at']
