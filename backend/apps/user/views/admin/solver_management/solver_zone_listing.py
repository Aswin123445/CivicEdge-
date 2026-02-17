# views/zone_views.py
from rest_framework.generics import ListAPIView
from apps.user.serializers.admin.solver_management.zone_serializer import ZoneSerializer
from apps.user.services.admin.solver_management.solver_zone_list import ZoneService
from rest_framework.permissions import IsAuthenticated

class ZoneListView(ListAPIView):
    serializer_class = ZoneSerializer
    pagination_class = None 
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ZoneService.get_all_zones()
