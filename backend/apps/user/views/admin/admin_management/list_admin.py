from rest_framework.generics import ListAPIView
from apps.user.serializers.admin.admin_management.list_serializer import AdminSerializer as AdminListSerializer
from apps.user.services.admin.admin_management.list_admins import get_all_admins
class AdminListView(ListAPIView):
    """
    API view to list all admin users.
    """

    queryset = get_all_admins()
    serializer_class = AdminListSerializer
    search_fields = ['email', 'profile__name']
    ordering_fields = ['created_at', 'profile__name']
    ordering = ['-created_at']