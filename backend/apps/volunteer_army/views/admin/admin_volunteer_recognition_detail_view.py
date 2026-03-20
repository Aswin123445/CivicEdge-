from rest_framework.generics import RetrieveAPIView

from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_volunteer_recognition import get_admin_volunteer_recognition
from apps.volunteer_army.serializers.admin.admin_volunteer_recognition_detail_serializer import AdminVolunteerRecognitionDetailSerializer




class AdminVolunteerRecognitionDetailView(RetrieveAPIView):
    serializer_class = AdminVolunteerRecognitionDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "recognition_id"

    def get_object(self):
        return get_admin_volunteer_recognition(
            recognition_id=self.kwargs["recognition_id"],
        )