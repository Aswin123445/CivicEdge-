from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issues.selectors.prompt_selector import get_behavioral_prompts
from apps.issues.serializers.prompt_serializer import BehavioralPromptCreateSerializer, BehavioralPromptListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView

from apps.issues.models.behavioral_prompt import BehavioralPrompt

class BehavioralPromptListAPIView(ListAPIView):
    serializer_class = BehavioralPromptListSerializer
    permission_classes = [IsAdmin]
    search_fields = ["question_text","response_type","options","category__name"]

    def get_queryset(self):
        is_active = self.request.query_params.get("is_active")
        category_id = self.request.query_params.get("category")

        if is_active is not None:
            is_active = is_active.lower() == "true"

        return get_behavioral_prompts(
            is_active=is_active,
            category_id=category_id,
        )
        



class BehavioralPromptCreateAPIView(CreateAPIView):
    serializer_class = BehavioralPromptCreateSerializer
    permission_classes = [IsAdmin]
    




class BehavioralPromptToggleAPIView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request, *args, **kwargs):
        prompt_id = kwargs.get("id")

        prompt = get_object_or_404(BehavioralPrompt, id=prompt_id)

        prompt.is_active = not prompt.is_active
        prompt.save(update_fields=["is_active"])

        return Response({
            "id": str(prompt.id),
            "is_active": prompt.is_active,
        })