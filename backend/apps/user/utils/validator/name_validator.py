from rest_framework.exceptions import ValidationError
import re

def name_validator(name: str):
    """
    Validates a standard name:
    - Only alphabets and spaces allowed
    - Starts and ends with a letter
    - 2 to 50 characters long
    - No digits or special characters
    """
    if not isinstance(name, str):
        raise ValidationError("Name must be a string.")

    name = name.strip()

    if not (2 <= len(name) <= 50):
        raise ValidationError("Name must be between 2 and 50 characters.")

    if not re.match(r"^[A-Za-z][A-Za-z\s]*[A-Za-z]$", name):
        raise ValidationError("Name must contain only letters and spaces, and start and end with a letter.")

    if "  " in name:
        raise ValidationError("Name cannot have consecutive spaces.")
