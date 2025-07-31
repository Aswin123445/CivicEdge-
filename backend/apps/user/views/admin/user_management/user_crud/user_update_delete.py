from django.forms import ValidationError
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import get_user_model
from apps.user.serializers.admin.user_management.user_crud.user_update_delete_serializer import CitizenUpdateSerializer
from shared.enums.user_role import UserRole

User = get_user_model()
class AdminCitizenDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(role=UserRole.CITIZEN)
    serializer_class = CitizenUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
    
    def perform_destroy(self, instance):
        if self.request.user == instance:
            raise ValidationError("You cannot delete yourself.")
        instance.is_active = False
        instance.save()
