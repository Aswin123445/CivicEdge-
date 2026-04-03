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
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
CSRF_TRUSTED_ORIGINS = ["https://*.fly.dev"]

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://cvicedge.site")
