from rest_framework.generics import ListAPIView

from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.volunteer_recognition_selectors import list_admin_volunteer_recognitions
from apps.volunteer_army.serializers.admin.admin_volunteer_recognition_ist_serializer import AdminVolunteerRecognitionListSerializer


class AdminVolunteerRecognitionListView(ListAPIView):
    serializer_class = AdminVolunteerRecognitionListSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return list_admin_volunteer_recognitions()