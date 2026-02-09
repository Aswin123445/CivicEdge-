from apps.user.utils.jwt.jwt import get_tokens_for_user


def solver_login_service(validated_data):
    user = validated_data["user"]

    if user.role != "solver":
        raise ValueError("User is not authorized as solver.")

    tokens = get_tokens_for_user(user)

    return {
        "access": tokens["access"],
        "refresh": tokens["refresh"],
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
        },
    }