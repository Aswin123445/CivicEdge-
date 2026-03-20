from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_top_volunteers import list_top_volunteers




class AdminTopVolunteersView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, *args, **kwargs):
        limit = request.query_params.get("limit", 10)

        try:
            limit = int(limit)
        except (TypeError, ValueError):
            limit = 10

        if limit <= 0:
            limit = 10

        top_volunteers = list_top_volunteers(limit=limit)

        results = []
        for item in top_volunteers:

            results.append(
                {
                    "user_id": item["user"],
                    "email": item["user__email"],
                    "total_service_hours": item["total_service_hours"],
                    "total_service_logs": item["total_service_logs"],
                }
            )

        return Response(results, status=status.HTTP_200_OK)