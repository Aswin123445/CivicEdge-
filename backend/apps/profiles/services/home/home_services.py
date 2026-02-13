from shared.enums.user_role import UserRole
from apps.profiles.services.home.admin_home import AdminHomeBuilder
from apps.profiles.services.home.citizen_home import CitizenHomeBuilder
from apps.profiles.services.home.solver_home import SolverHomeBuilder
class HomeService:

    @staticmethod
    def build_home_data(user):
        if user.role == UserRole.CITIZEN:
            return CitizenHomeBuilder.build(user)

        if user.role == UserRole.SOLVER:
            return SolverHomeBuilder.build(user)

        if user.role == UserRole.ADMIN:
            return AdminHomeBuilder.build(user)  