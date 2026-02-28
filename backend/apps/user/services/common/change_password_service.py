# apps/accounts/services/change_password_service.py

def change_user_password(*, user, new_password):
    """
    Change user password safely.
    Keeps current session/token valid.
    """
    user.set_password(new_password)
    user.save(update_fields=["password"])