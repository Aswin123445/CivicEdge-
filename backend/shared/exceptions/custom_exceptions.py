class InvalidTokenError(Exception):
    """Raised when a JWT is invalid or malformed."""
    pass

class TokenExpiredError(Exception):
    """Raised when a JWT is expired."""
    pass

class NotVerifiedError(Exception):
    """Raised when user has not verified email."""
    pass

class UserAlreadyExistsError(Exception):
    """Raised when trying to create a user that already exists."""
    pass
class UserNotFoundError(Exception):
    """Raised when a user is not found in the database."""
    pass

class PasswordMismatchError(Exception):
    """Raised when password and conform password missmatch"""
