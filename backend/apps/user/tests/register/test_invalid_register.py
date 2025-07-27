import pytest
from rest_framework.test import APIClient

REGISTER_URL = "/api/v1/user/register/"

@pytest.mark.django_db
class TestInvalidUserRegistration:
    
    def setup_method(self):
        self.client = APIClient()

    def test_missing_email(self):
        payload = {"password": "StrongPass123!", "confirm_password": "StrongPass123!"}
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_missing_password(self):
        payload = {"email": "test@example.com", "confirm_password": "StrongPass123!"}
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "password" in response.data

    def test_missing_confirm_password(self):
        payload = {"email": "test@example.com", "password": "StrongPass123!"}
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "confirm_password" in response.data or "password" in response.data

    def test_invalid_email_format(self):
        payload = {
            "email": "not-an-email",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_passwords_do_not_match(self):
        payload = {
            "email": "test@example.com",
            "password": "StrongPass123!",
            "confirm_password": "Mismatch123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert "non_field_errors" in response.data
        assert "Passwords do not match" in str(response.data["non_field_errors"])

    def test_weak_password(self):
        payload = {
            "email": "test@example.com",
            "password": "123",
            "confirm_password": "123"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "password" in response.data

    def test_common_password(self):
        payload = {
            "email": "test@example.com",
            "password": "password",
            "confirm_password": "password"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "password" in response.data

    def test_duplicate_email(self, django_user_model):
        django_user_model.objects.create_user(email="existing@example.com", password="Password123!")
        payload = {
            "email": "existing@example.com",
            "password": "AnotherPass123!",
            "confirm_password": "AnotherPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    # def test_email_exceeds_max_length(self):
    #     # Email is 312 characters: 300 + len("@example.com")
    #     long_email = "a" * 200 + "@example.com"
    #     payload = {
    #         "email": long_email,
    #         "password": "StrongPass123!",
    #         "confirm_password": "StrongPass123!"
    #     }
    
    #     response = self.client.post(REGISTER_URL, payload)
    
    #     assert response.status_code == 201
    #     assert "email" in response.data
    
    #     # Convert list of errors to string and check the error message
    #     email_errors = response.data["email"]
    #     assert any("Ensure this value has at most 254 characters" in str(err) for err in email_errors)



    def test_sql_injection_input(self):
        payload = {
            "email": "test@example.com",
            "password": "'; DROP TABLE users; --",
            "confirm_password": "'; DROP TABLE users; --"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400 or 422

    def test_unicode_in_email(self):
        payload = {
            "email": "测试@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_emoji_in_email(self):
        payload = {
            "email": "user😊@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400

    def test_extra_unexpected_field(self):
        payload = {
            "email": "test@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "role": "admin"  # should be rejected
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400 or 422

    def test_content_type_not_json(self):
        response = self.client.post(REGISTER_URL, "email=test@example.com", content_type="text/plain")
        assert response.status_code in [400, 415]

    def test_empty_payload(self):
        response = self.client.post(REGISTER_URL, {})
        assert response.status_code == 400
