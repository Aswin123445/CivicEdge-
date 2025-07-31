# users/admin/views/citizen_list_view.py
from apps.user.services.admin.user_management.user_listing import get_all_citizens
from apps.user.serializers.admin.user_management.user_crud.listing_serializer import AdminCitizenSerializer
from rest_framework.generics import ListAPIView
class AdminCitizenListView(ListAPIView):
        queryset = get_all_citizens()
        serializer_class  = AdminCitizenSerializer
        search_fields = ['email','profile__location','is_active']
        ordering_fields = ['created_at', 'profile__name','zone',]
        ordering = ['-created_at']
