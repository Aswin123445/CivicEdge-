from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from apps.user.permissions.user_permissions import IsAdmin
from apps.user.selectors.zone_selector import get_zones
from apps.user.serializers.zone.zone_list_serializer import ZoneCreateSerializer, ZoneListSerializer
from rest_framework.views import APIView, Response

from apps.user.models.user import Zone

class ZoneListAPIView(ListAPIView):
    serializer_class = ZoneListSerializer
    permission_classes = [IsAdmin]
    search_fields = ["name", "is_active"]

    def get_queryset(self):
        is_active = self.request.query_params.get("is_active")

        if is_active is not None:
            is_active = is_active.lower() == "true"

        return get_zones(is_active=is_active)
    




class ZoneCreateAPIView(CreateAPIView):
    serializer_class = ZoneCreateSerializer
    permission_classes = [IsAdmin]
    
    
class ZoneToggleAPIView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request, *args, **kwargs):
        zone_id = kwargs.get("id")

        zone = get_object_or_404(Zone, id=zone_id)

        zone.is_active = not zone.is_active
        zone.save(update_fields=["is_active"])

        return Response({
            "id": str(zone.id),
            "is_active": zone.is_active,
        })