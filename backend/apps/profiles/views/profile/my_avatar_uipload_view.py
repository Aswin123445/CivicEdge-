from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from apps.profiles.serializers.profile.avatar_upload_serializer import AvatarUploadSerializer
from apps.profiles.services.profile.avatar_service import AvatarService
from rest_framework import status



class MyAvatarUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        serializer = AvatarUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        avatar_url = AvatarService.upload_avatar(
            serializer.validated_data["avatar"].file,
            request.user
        )
        return Response({"avatar_url": avatar_url}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        removed = AvatarService.remove_avatar(request.user)
    
        if not removed:
            return Response(
                {"detail": "No avatar to delete."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        return Response(status=status.HTTP_204_NO_CONTENT)
    
