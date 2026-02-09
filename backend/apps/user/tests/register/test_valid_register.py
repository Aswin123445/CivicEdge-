import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_valid_user_registration():
    client = APIClient()
    payload = {
        "email": "testuser@example.com",
        "password": "StrongPass123!",
        "confirm_password": "StrongPass123!",
    }
    response = client.post("/api/v1/user/register/", payload)
    assert response.status_code == 201
    assert "Please verify your email" in response.data["message"]
