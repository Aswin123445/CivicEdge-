# config/settings/production.py
# ruff: noqa: F403,F401
from .base import *
import dj_database_url
import os 

DEBUG = False

ALLOWED_HOSTS = [
    "*",
]

DATABASES = {
    "default": dj_database_url.parse(
        os.getenv("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=False,
    )
}
CELERY_TASK_ALWAYS_EAGER = False

REDIS_HOST = "redis"
REDIS_PORT = "6379"

CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
CELERY_RESULT_BACKEND = f"redis://{REDIS_HOST}:{REDIS_PORT}/1"

CELERY_TIMEZONE = "Asia/Kolkata"
CELERY_BEAT_SCHEDULE = {
    "send-event-reminders-every-10-minutes": {
        "task": "apps.volunteer_army.utils.celery_task.send_upcoming_event_notifications",
        "schedule": 600.0,
    },
}

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = ["https://civicedge.site"]

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://civicedge.site")
