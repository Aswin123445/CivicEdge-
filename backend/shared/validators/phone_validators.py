from django.core.validators import RegexValidator
# shared/validators/phone_validators.py

from django.core.validators import RegexValidator

indian_phone_validator = RegexValidator(
    regex=r'^[6-9]\d{9}$',
    message='Enter a valid 10-digit Indian phone number starting with 6-9.'
)
