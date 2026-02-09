import re
from django.forms import ValidationError

def indian_phone_validator(value):
    """
    Validates that the phone number is a valid Indian 10-digit number
    starting with digits 6, 7, 8, or 9.
    """
    if not re.match(r'^[6789]\d{9}$', value):
        raise ValidationError("Phone number must be a valid Indian 10-digit number starting with 6, 7, 8, or 9.")
    return 