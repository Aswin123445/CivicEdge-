# config/settings/__init__.py
import os

ENV = os.getenv("ENV", "development")

if ENV == "production":
    from .production import *
elif ENV == "development":
    from .development import * 
else :
    raise RuntimeError(f"Unknown environment: {ENV}")
