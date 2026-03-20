from rest_framework.generics import RetrieveAPIView

from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_volunteer_recognition import get_user_volunteer_recognition
from apps.volunteer_army.serializers.citizen.citizen_volunteer_recognition_detail_serializer import CitizenVolunteerRecognitionDetailSerializer




class CitizenVolunteerRecognitionDetailView(RetrieveAPIView):
    serializer_class = CitizenVolunteerRecognitionDetailSerializer
    permission_classes = [IsCitizen]
    lookup_url_kwarg = "recognition_id"

    def get_object(self):
        return get_user_volunteer_recognition(
            recognition_id=self.kwargs["recognition_id"],
            user=self.request.user,
        )