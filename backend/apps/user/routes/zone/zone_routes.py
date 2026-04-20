from django.urls import path

from apps.user.views.admin.zone_management.list_zone_api import ZoneCreateAPIView, ZoneListAPIView, ZoneToggleAPIView

urlpatterns = [
    path("list/", ZoneListAPIView.as_view(), name="zone-list"),
    path("create/", ZoneCreateAPIView.as_view(), name="zone-create"),
    path("<uuid:id>/toggle/", ZoneToggleAPIView.as_view(), name="zone-toggle"),
]