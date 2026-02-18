# config/settings/__init__.py
# ruff: noqa: F403,F401
import os

ENV = os.getenv("ENV", "development")

if ENV == "production":
    from .production import *
elif ENV == "development":
    from .development import * 
else :
    raise RuntimeError(f"Unknown environment: {ENV}")
