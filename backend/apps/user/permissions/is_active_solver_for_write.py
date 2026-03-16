from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsActiveSolverForWrite(BasePermission):
    message = "Not allowed to perform action when not working"

    def has_permission(self, request, view):
        user = request.user
        if user.is_superuser:
            return True

        # Allow read-only access always
        if request.method in SAFE_METHODS:
            return True

        # For write actions, solver must be active
        return bool(
            user.is_authenticated
            and getattr(user, "role", "solver")
            and user.profile.is_available
        )