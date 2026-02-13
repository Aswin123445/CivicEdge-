from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.profiles.services.profile.profile_completion_service import ProfileCompletionService
class ProfileCompletionView(APIView):
    def get(self, request):
        profile = request.user.profile
        data = ProfileCompletionService.calculate(
            profile,
            request.user.role
        )
        return Response(data,status=status.HTTP_200_OK)
