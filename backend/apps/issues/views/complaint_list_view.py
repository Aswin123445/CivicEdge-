from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen

from apps.issues.serializers.complaint_list_serializer import ComplaintListSerializer
from apps.issues.selectors.complaint_selectors import get_citizen_complaints_queryset
class ComplaintListView(ListAPIView):
    """
    Citizen-facing complaint list page.
    Thin view: delegates all logic to selector + serializer.
    """
    serializer_class = ComplaintListSerializer
    permission_classes = [IsCitizen]

    search_fields = [
        "reference_id",
        "title",
        "location__zone__name",
        "category__name",
    ]

    filterset_fields = [
        "status",
    ]
    ordering = ["-created_at"]

    def get_queryset(self):
        return get_citizen_complaints_queryset(
            user=self.request.user
        )