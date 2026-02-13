# backend/config/settings/base.py
from datetime import timedelta
import os
from pathlib import Path
from dotenv import load_dotenv
import sys
import cloudinary
from shared.utils.redis_startup import redis_available


BASE_DIR = Path(__file__).resolve().parent.parent.parent
PROJECT_ROOT = BASE_DIR.parent
load_dotenv(PROJECT_ROOT / ".env")

SECRET_KEY = os.environ.get("SECRET_KEY", "unsafe-default-key")
DEBUG = os.environ.get("DEBUG", "False") == "True"

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'rest_framework_simplejwt.token_blacklist',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    #project apps
    'apps.user',
    'apps.profiles',
    # Third-party apps   
    'corsheaders',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 6,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}


SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_SAMESITE = 'Lax'  # This is enough for redirect-based login flows
SESSION_COOKIE_SECURE = False    # Only True if you're using HTTPS (you’re likely not on local)
CSRF_COOKIE_SECURE = False

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),  # short-lived access
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),     # longer-lived refresh

    "ROTATE_REFRESH_TOKENS": True,  # if True, generates new refresh on use
    "BLACKLIST_AFTER_ROTATION": True,  # blacklists old token on rotation

    "UPDATE_LAST_LOGIN": True,  # set to True if you want to update last_login on token issue

    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,  # default is your Django SECRET_KEY

    "AUTH_HEADER_TYPES": ("Bearer",),  # default authorization header type

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",  # used to uniquely identify a token (needed for blacklisting)

    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",  # used when user is lazy-loaded
}

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],  # You can leave this empty or use your templates folder
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = 'config.wsgi.application'



LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "user.User"
AUTHENTICATION_BACKENDS = [
    "apps.user.utils.auth_backend.EmailAuthBackend",
]

FRONTEND_URL = "http://localhost:5173"
BACKEND_URL = "http://localhost:8000"
CORS_ALLOW_CREDENTIALS = True

#email settings 
EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", "backend")
EMAIL_HOST = os.environ.get("EMAIL_HOST", "hoster")
EMAIL_PORT = os.environ.get("EMAIL_PORT", 587)
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", True)
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "email")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "password")
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", "from email")

# backend/core/settings/base.py 
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

if redis_available(REDIS_HOST, REDIS_PORT):
    CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
    CELERY_RESULT_BACKEND = f"redis://{REDIS_HOST}:{REDIS_PORT}/1"
else:
    CELERY_TASK_ALWAYS_EAGER = True
    CELERY_TASK_EAGER_PROPAGATES = True  
# CELERY_BROKER_URL = 'redis://redis:6379/0'
# CELERY_RESULT_BACKEND = 'redis://redis:6379/1'
CELERY_TASK_ALWAYS_EAGER = True #for local envirnmen
CELERY_TASK_EAGER_PROPAGATES = True #for  local envirment

CELERY_ACCEPT_CONTENT = ['json']  
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'  # or your timezone

#google oauth
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
DATA_UPLOAD_MAX_MEMORY_SIZE = 20 * 1024 * 1024

#cloudinary
cloudinary.config(secure = not DEBUG)



#jwt setup
# USER_ID_FIELD = 'id'
# CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,

    "formatters": {
        "simple": {
            "format": "[{levelname}] {message}",
            "style": "{",
        },
    },

    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "stream": sys.stdout,
            "formatter": "simple",
        },
    },

    "root": {
        "handlers": ["console"],
        "level": "WARNING",  # Only show warnings, errors, critical
    },

    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "WARNING",  # Suppress debug/info logs
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",  # Only show request errors
            "propagate": False,
        },
        "django.server": {
            "handlers": ["console"],
            "level": "INFO",  # Show server start, etc.
            "propagate": False,
        },
    },
}

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
]
