from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.volunteer_army.serializers.admin.volunteer_group_serializers import VolunteerGroupCreateSerializer
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.services.admin.create_volunteer_group import create_volunteer_group
class AdminVolunteerGroupCreateView(CreateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = VolunteerGroupCreateSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group = create_volunteer_group(
            data=serializer.validated_data,
            created_by=request.user,
        )

        return Response(
            VolunteerGroupCreateSerializer(group).data,
            status=status.HTTP_201_CREATED,
        )
        

