import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.core.exceptions import ValidationError
from shared.validators.phone_validators import indian_phone_validator
from shared.enums.user_role import UserRole

class UserManager(BaseUserManager):
    """
    Custom user manager for handling user creation logic.
    """

    def create_user(self, email, password=None, role=UserRole.CITIZEN, **extra_fields):
        """
        Create and return a standard user with the given email and password.

        Args:
            email (str): User's email address.
            password (str): User's password.
            role (str): Role of the user (default: CITIZEN).
            **extra_fields: Additional fields for user creation.

        Returns:
            User: Created user instance.
        """
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser (admin) with staff and superuser privileges.

        Args:
            email (str): Superuser's email.
            password (str): Superuser's password.
            **extra_fields: Additional fields for superuser creation.

        Returns:
            User: Created superuser instance.
        """
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, role=UserRole.ADMIN, **extra_fields)



class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that supports email-based authentication and role handling.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True,max_length=256)
    password = models.CharField(max_length=128,blank=True)

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CITIZEN,
        help_text="User role: citizen, solver, or admin"
    )

    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False, help_text="Access to admin site")
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def save(self, *args, **kwargs):
        """
        Save the user after performing full validation.
        """
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        """
        Custom clean method to enforce business rules:
        - Admins and Solvers must be marked as staff.
        """
        if self.role == UserRole.ADMIN and not self.is_staff:
            raise ValidationError("Admins must be staff.")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"user {self.email} ({self.role})"

    @property
    def is_admin(self):
        """
        Check if the user has an admin role.
        """
        return self.role == UserRole.ADMIN

    @property
    def is_solver(self):
        """
        Check if the user has a solver role.
        """
        return self.role == UserRole.SOLVER

    @property
    def is_citizen(self):
        """
        Check if the user has a citizen role.
        """
        return self.role == UserRole.CITIZEN

class Zone(models.Model):  
    name = models.CharField(max_length=100)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

class Profile(models.Model):
    """
    Profile model linked to each user. Fields vary depending on user role:
    - Citizens have location, interests, and zone.
    - Solvers have skills.
    - Admins have zone responsibilities.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField("User", on_delete=models.CASCADE, related_name="profile")
    name = models.CharField(max_length=100)
    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True,
        validators=[indian_phone_validator],
        help_text="Valid 10-digit Indian mobile number"
    )
    avatar_url = models.URLField(null=True, blank=True, help_text="Profile picture URL")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Citizen fields
    location = models.CharField(max_length=200, null=True, blank=True)
    interests = models.JSONField(null=True, blank=True, help_text="List of user's interests")
    # zone = models.CharField(max_length=50, null=True, blank=True)

    # Solver fields
    skills = models.JSONField(null=True, blank=True, help_text="List of technical or civic skills")
    zone = models.ForeignKey(Zone, on_delete=models.PROTECT, null=True, blank=True)
    # Admin fields
    admin_zone_responsibility = models.CharField(max_length=100, null=True, blank=True, help_text="Zones managed by admin")

    def __str__(self):
        return f"{self.user.email} ({self.user.role})"