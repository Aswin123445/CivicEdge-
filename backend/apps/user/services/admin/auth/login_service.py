from apps.user.utils.jwt.jwt import get_tokens_for_user


def admin_login_service(validated_data):
    user = validated_data["user"]

    if user.role != "admin":
        raise ValueError("User is not authorized as admin.")

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
