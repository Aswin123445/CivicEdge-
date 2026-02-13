from django.test import TestCase

# Create your tests here.
import pytest
from rest_framework.test import APIClient
from django.urls import reverse
@pytest.mark.django_db
def test_me_home_requires_authentication():
    client = APIClient()
    url = reverse("me-home")

    response = client.get(url)

    assert response.status_code == 401
@pytest.mark.django_db
def test_me_home_returns_basic_details_for_user(user):
    client = APIClient()
    client.force_authenticate(user=user)

    url = reverse("me-home")
    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.data, dict)

EXPECTED_KEYS = {
    "name",
    "role",
    "zone",
    "summary",
}
@pytest.mark.django_db
def test_me_home_response_schema(user):
    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get(reverse("me-home"))

    assert set(response.data.keys()) == EXPECTED_KEYS
@pytest.mark.django_db
def test_me_home_does_not_expose_sensitive_fields(user):
    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get(reverse("me-home"))

    forbidden_fields = {
        "password",
        "is_staff",
        "is_superuser",
        "last_login",
        "email",
        "phone",
    }

    for field in forbidden_fields:
        assert field not in response.data
@pytest.mark.django_db
def test_me_home_for_solver_user(solver_user):
    client = APIClient()
    client.force_authenticate(user=solver_user)

    response = client.get(reverse("me-home"))

    assert response.status_code == 200
    assert response.data["role"] == "solver"
@pytest.mark.django_db
def test_me_home_for_citizen_user(citizen_user):
    client = APIClient()
    client.force_authenticate(user=citizen_user)

    response = client.get(reverse("me-home"))

    assert response.status_code == 200
    assert response.data["role"] == "citizen"
@pytest.mark.django_db
def test_me_home_with_incomplete_profile(user):
    user.profile.zone = None
    user.profile.save()

    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get(reverse("me-home"))

    assert response.status_code == 200
