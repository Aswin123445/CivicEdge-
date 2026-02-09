from django.db import models

class UserRole(models.TextChoices):
    CITIZEN = "citizen", "Citizen"
    SOLVER = "solver", "Solver"
    ADMIN = "admin", "Admin"
