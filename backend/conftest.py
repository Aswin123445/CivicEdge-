import pytest
from django.contrib.auth import get_user_model
import pytest
from django.contrib.auth import get_user_model
from apps.user.models.user import Profile 
User = get_user_model()

@pytest.fixture
def user(db):
    return User.objects.create_user(
        email="user@example.com",
        password="StrongPass123!",
        role="citizen"
    )

@pytest.fixture
def solver_user(db):
    return User.objects.create_user(
        email="solver@example.com",
        password="StrongPass123!",
        role="solver"
    )

@pytest.fixture
def citizen_user(db):
    return User.objects.create_user(
        email="citizen@example.com",
        password="StrongPass123!",
        role="citizen"
    )
 # adjust import

User = get_user_model()

@pytest.fixture
def user(db):
    user = User.objects.create_user(
        email="user@example.com",
        password="StrongPass123!",
        role="citizen"
    )
    Profile.objects.create(user=user)
    return user

@pytest.fixture
def citizen_user(db):
    user = User.objects.create_user(
        email="citizen@example.com",
        password="StrongPass123!",
        role="citizen"
    )
    Profile.objects.create(user=user)
    return user

@pytest.fixture
def solver_user(db):
    user = User.objects.create_user(
        email="solver@example.com",
        password="StrongPass123!",
        role="solver"
    )
    Profile.objects.create(user=user, availability=False)
    return user
