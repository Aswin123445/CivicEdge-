import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
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
        
    def setup_method(self):
        self.client = APIClient()

    # 1. SQL Injection Variants
    @pytest.mark.parametrize("sql_payload", [
        "' OR '1'='1",
        "'; EXEC xp_cmdshell('dir'); --",
        "admin' --",
        "' UNION SELECT NULL--",
    ])
    def test_sql_injection_in_email(self, sql_payload):
        payload = {
            "email": f"{sql_payload}@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400

    # 2. XSS / Script Injection
    def test_xss_in_name_field(self):
        payload = {
            "email": "xss@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "name": "<script>alert('x')</script>"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (400, 422)

    # 3. Malformed Content-Type Header
    def test_malformed_content_type_header(self):
        response = self.client.post(
            REGISTER_URL,
            '{"email":"a@b.com"}',
            content_type='application/json\r\nAnother: bad'
        )
        assert response.status_code in (400, 415)

    # 4. Invalid JSON / Type Confusion
    def test_invalid_json(self):
        response = self.client.post(
            REGISTER_URL,
            '{"email": "test@example.com", "password": "pass",}',  # trailing comma
            content_type='application/json'
        )
        assert response.status_code == 400

    # 5. Mass Assignment Attempt
    def test_mass_assignment_attempt_role_override_registration(self):
        payload = {
            "email": "attacker@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!",
            "is_staff": True,
            "role": "admin"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (400, 201)
        if response.status_code == 201:
            user_data = response.data.get("user", {})
            assert not user_data.get("is_staff", False)
            assert user_data.get("role") != "admin"

    # 6. Email Enumeration Similarity in Error
    def test_email_enumeration_similarity_in_error(self):
        User = get_user_model()
        User.objects.create_user(email="existing@example.com", password="StrongPass123!")
        valid_payload = {
            "email": "existing@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        invalid_payload = {
            "email": "nonexistentuser@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        r1 = self.client.post(REGISTER_URL, valid_payload)
        r2 = self.client.post(REGISTER_URL, invalid_payload)
        assert r1.status_code == r2.status_code

    # 7. Rate / Flooding Simulation
    def test_registration_rate_limiting(self):
        payload = {
            "email": "ratelimit@example.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        for _ in range(10):
            self.client.post(REGISTER_URL, payload)
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (429, 400)

    # 8. Common Passwords Blocked
    @pytest.mark.parametrize("common_pass", ["123456", "password", "qwerty", "letmein"])
    def test_common_passwords_blocked(self, common_pass):
        payload = {
            "email": f"user{common_pass}@example.com",
            "password": common_pass,
            "confirm_password": common_pass
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400
        assert "password" in response.data

    # 9. Breached Password (if policy exists)
    def test_breached_password_rejected(self):
        payload = {
            "email": "breach@example.com",
            "password": "P@ssw0rd123",
            "confirm_password": "P@ssw0rd123"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (400, 422)

    # 10. Unicode / Homoglyph Abuse
    def test_unicode_homoglyph_email_variants(self):
        email1 = "user@example.com"
        email2 = "user@exаmple.com"  # cyrillic 'а'
        payload1 = {"email": email1, "password": "StrongPass123!", "confirm_password": "StrongPass123!"}
        payload2 = {"email": email2, "password": "StrongPass123!", "confirm_password": "StrongPass123!"}
        r1 = self.client.post(REGISTER_URL, payload1)
        r2 = self.client.post(REGISTER_URL, payload2)
        assert r1.status_code in (201, 400)
        assert r2.status_code in (201, 400)

    # 11. Oversized Payload / DoS
    def test_oversized_payload(self):
        long_email = "a" * 5000 + "@example.com"
        payload = {
            "email": long_email,
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (400, 413)

    # 12. Disposable Email (if policy)
    def test_disposable_email_rejected(self):
        payload = {
            "email": "tempmail@1secmail.com",
            "password": "StrongPass123!",
            "confirm_password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code in (400, 422)

    # 13. Missing Confirm Password (client-side tampering)
    def test_skip_confirm_password_in_client_side(self):
        payload = {
            "email": "tamper@example.com",
            "password": "StrongPass123!"
        }
        response = self.client.post(REGISTER_URL, payload)
        assert response.status_code == 400