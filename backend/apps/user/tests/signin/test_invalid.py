import pytest

SIGNINURL = "/api/v1/user/signin/"

@pytest.mark.django_db
class TestInvalidLogin:
    
    def test_missing_email(self, client):
        payload = {"password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_missing_password(self, client):
        payload = {"email": "aswinsandeep4@gmail.com"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400
        assert "password" in response.data

    def test_empty_email_and_password(self, client):
        payload = {"email": "", "password": ""}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_invalid_email_format(self, client):
        payload = {"email": "aswinsandeep4", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_unregistered_email(self, client):
        payload = {"email": "unknown@example.com", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code in [400, 401]

    def test_wrong_password(self, client, django_user_model):
        django_user_model.objects.create_user(email="aswinsandeep4@gmail.com", password="aswin131@3B")
        payload = {"email": "aswinsandeep4@gmail.com", "password": "WrongPass123!"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_email_with_spaces(self, client, django_user_model):
        django_user_model.objects.create_user(email="aswinsandeep4@gmail.com", password="aswin131@3B")
        payload = {"email": "  aswinsandeep4@gmail.com  ", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code in [200,403]

    def test_short_password(self, client):
        payload = {"email": "aswinsandeep4@gmail.com", "password": "123"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code in [400, 401]

    def test_emoji_in_email(self, client):
        payload = {"email": "aswin😊@gmail.com", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_emoji_in_password(self, client):
        payload = {"email": "aswinsandeep4@gmail.com", "password": "💣🔥💀"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_sql_injection_in_email(self, client):
        payload = {"email": "' OR '1'='1@gmail.com", "password": "any"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_sql_injection_in_password(self, client):
        payload = {"email": "aswinsandeep4@gmail.com", "password": "' OR '1'='1"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400

    def test_inactive_user_login(self, client, django_user_model):
        user = django_user_model.objects.create_user(email="inactive@example.com", password="valid123")
        user.is_active = False
        user.save()
        payload = {"email": "inactive@example.com", "password": "valid123"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 403

    def test_unverified_user_login(self, client, django_user_model):
        django_user_model.objects.create_user(email="notverified@example.com", password="aswin131@3B", is_verified=False)
        payload = {"email": "notverified@example.com", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 403

    def test_email_exceeds_max_length(self, client):
        long_email = "a" * 300 + "@gmail.com"
        payload = {"email": long_email, "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400
        assert "email" in response.data

    def test_unexpected_field(self, client):
        payload = {
            "email": "aswinsandeep4@gmail.com",
            "password": "aswin131@3B",
            "extra": "value"
        }
        response = client.post(SIGNINURL, payload)
        assert response.status_code in [400, 200]  # depends on your serializer strictness

    def test_case_sensitive_email(self, client, django_user_model):
        django_user_model.objects.create_user(email="aswinsandeep4@gmail.com", password="aswin131@3B")
        payload = {"email": "ASWINSANDEEP4@GMAIL.COM", "password": "aswin131@3B"}
        response = client.post(SIGNINURL, payload)
        assert response.status_code in [200, 400]

    def test_xss_injection_email(self, client):
        payload = {
            "email": "<script>alert(1)</script>@gmail.com",
            "password": "testpass"
        }
        response = client.post(SIGNINURL, payload)
        assert response.status_code == 400
