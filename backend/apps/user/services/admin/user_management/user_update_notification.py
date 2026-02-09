from apps.user.utils.celery_task.admin_update_user_solver import send_updatemessage_to_user_solver_admin_data_change
def notify_user_profile_updated(user):
    role = user.role 
    send_updatemessage_to_user_solver_admin_data_change.delay(
        to_email=user.email,
        role=role,
    )
