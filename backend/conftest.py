import pytest
from django.contrib.auth import get_user_model

@pytest.fixture
def user(db):
    User = get_user_model()

    return User.objects.create_user(
        email="user@example.com",
        password="StrongPass123!",
        role="citizen"
    )

@pytest.fixture
def solver_user(db):
    User = get_user_model()

    return User.objects.create_user(
        email="solver@example.com",
        password="StrongPass123!",
        role="solver"
    )

@pytest.fixture
def citizen_user(db):
    User = get_user_model()

    return User.objects.create_user(
        email="citizen@example.com",
        password="StrongPass123!",
        role="citizen"
    )
 # adjust import


