# utils/jwt.py

import jwt
from datetime import datetime, timedelta ,timezone 
from django.conf import settings
from shared.exceptions.custom_exceptions import InvalidTokenError, TokenExpiredError

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15

def create_access_token(data: dict, expires_at: int = None):
    to_encode = data.copy()

    expire_delta = timedelta(minutes=expires_at) if expires_at else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(timezone.utc) + expire_delta

    to_encode.update({
        "exp": int(expire.timestamp()),
        "iat": int(datetime.now(timezone.utc).timestamp()),
        "sub": str(data.get("user_id") or data.get("email") or "unknown")
    })

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise TokenExpiredError("The verification link has expired. Plaease request a new verification email.")
    except jwt.InvalidTokenError:
        raise InvalidTokenError("Invalid or malformed token.")
