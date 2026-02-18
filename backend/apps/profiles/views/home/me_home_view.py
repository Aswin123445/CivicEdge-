from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from apps.profiles.services.home.home_services import HomeService
from apps.profiles.serializers.home.factory import HomeSerializerFactory
class MeHomeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        raw_data = HomeService.build_home_data(request.user)
        serializer = HomeSerializerFactory.get(
            role=request.user.role,
            data=raw_data
        )
        return Response(serializer.data)
