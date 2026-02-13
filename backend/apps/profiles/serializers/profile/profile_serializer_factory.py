from apps.profiles.serializers.profile.citizen_profile_read_serializer import CitizenProfileReadSerializer
from apps.profiles.serializers.profile.citizen_profile_write_serializer import CitizenProfileWriteSerializer
from apps.profiles.serializers.profile.solver_profile_read_serializer import SolverProfileReadSerializer
from apps.profiles.serializers.profile.solver_profile_write_serializer import SolverProfileWriteSerializer
from apps.profiles.serializers.profile.admin_profile_read_serializer import AdminProfileReadSerializer
from apps.profiles.serializers.profile.adminj_profile_write_serializer import AdminProfileWriteSerializer
from shared.enums.user_role import UserRole

class ProfileSerializerFactory:

    @staticmethod
    def get_serializer(user, action):
        role = user.role

        if role == UserRole.CITIZEN:
            return (
                CitizenProfileReadSerializer
                if action == "read"
                else CitizenProfileWriteSerializer
            )
        if role == UserRole.SOLVER:
            return (
                SolverProfileReadSerializer
                if action == "read"
                else SolverProfileWriteSerializer
            )
        if role == UserRole.ADMIN:
            return (
                AdminProfileReadSerializer
                if action == "read"
                else AdminProfileWriteSerializer
            )

        raise ValueError("Unsupported user role")
