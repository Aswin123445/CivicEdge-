from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition


class CitizenSeeCertificateView(APIView):
    authentication_classes = []  
    permission_classes = []      

    def get(self, request, id):
        try:
            recognition = (
                VolunteerRecognition.objects
                .select_related(
                    "participation__event",
                    "participation__membership__user"
                )
                .get(id=id)
            )

            # Optional: block non-generated certificates
            if recognition.status != "GENERATED":
                return Response({
                    "valid": False,
                    "message": "Certificate not yet available"
                }, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "valid": True,
                "reference_id": recognition.reference_id,
                "participant_name": recognition.participation.membership.user.email,  
                "event_title": recognition.participation.event.title,
                "issued_date": recognition.updated_at.strftime("%d %B %Y"),
                "status": recognition.status,
                "certificate_url": recognition.certificate_url,
            })

        except VolunteerRecognition.DoesNotExist:
            return Response({
                "valid": False,
                "message": "Certificate not found or invalid"
            }, status=status.HTTP_404_NOT_FOUND)