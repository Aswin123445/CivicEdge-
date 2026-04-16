from rest_framework.permissions import BasePermission
from shared.enums.user_role import UserRole
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == UserRole.ADMIN
        )
class IsSolver(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == UserRole.SOLVER
        )

class IsCitizen(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == UserRole.CITIZEN
        )
        
class IsAdminOrSolver(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in [UserRole.ADMIN, UserRole.SOLVER]
        )
class IsAdminOrCitizen(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in [UserRole.ADMIN, UserRole.CITIZEN]
        )
