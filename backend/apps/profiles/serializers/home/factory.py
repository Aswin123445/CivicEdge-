from apps.profiles.serializers.home.admin_home_serializer import AdminHomeSerializer
from apps.profiles.serializers.home.citizen_home_serializer import CitizenHomeSerializer
from apps.profiles.serializers.home.solver_home_serializer import SolverHomeSerializer
from shared.enums.user_role import UserRole

class HomeSerializerFactory:

    @staticmethod
    def get(role, data):
        if role == UserRole.CITIZEN:
            return CitizenHomeSerializer(data)
        if role == UserRole.SOLVER:
            return SolverHomeSerializer(data)
        if role == UserRole.ADMIN:
            return AdminHomeSerializer(data)
