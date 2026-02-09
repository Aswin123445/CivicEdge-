# apps/user/apps.py
from django.apps import AppConfig

class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.user'
    label = 'user'

    def ready(self):
        # Import signals to register signal handlers
        import apps.user.signals # noqa: F401

