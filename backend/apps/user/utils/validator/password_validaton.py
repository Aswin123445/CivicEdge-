import re
from django.core.exceptions import ValidationError

def validate_strong_password(password: str) -> None:
    min_len = 8
    if len(password) < min_len:
        raise ValidationError(f"Password must be at least {min_len} characters long.")
    if not re.search(r"\d", password):
        raise ValidationError("Password must contain at least one digit.")
    if not re.search(r"[A-Z]", password):
        raise ValidationError("Password must contain at least one uppercase letter.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise ValidationError("Password must contain at least one special character.")
