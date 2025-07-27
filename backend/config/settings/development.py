# backend/core/settings/development.py
from .base import * # noqa: F403
import os
DEBUG = True
ALLOWED_HOSTS = ["*"]

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME", "default"),
        "USER": os.environ.get("DB_USER", "default"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "default"),
        "HOST": os.environ.get("DB_HOST", "localhost"),
        "PORT": os.environ.get("DB_PORT", "5432"),
    }
}

