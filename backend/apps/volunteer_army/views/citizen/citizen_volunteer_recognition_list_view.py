from rest_framework.generics import ListAPIView

from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.list_user_volunteer_recognitions import list_user_volunteer_recognitions
from apps.volunteer_army.serializers.citizen.citizen_volunteer_recognition_list_serializer import CitizenVolunteerRecognitionListSerializer


class CitizenVolunteerRecognitionListView(ListAPIView):
    serializer_class = CitizenVolunteerRecognitionListSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):
        return list_user_volunteer_recognitions(user=self.request.user)