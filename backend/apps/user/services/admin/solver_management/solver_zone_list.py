# services/zone_service.py
from apps.user.models import Zone
class ZoneService:

    @staticmethod
    def get_all_zones():
        return Zone.objects.filter(is_active=True).order_by("name")
