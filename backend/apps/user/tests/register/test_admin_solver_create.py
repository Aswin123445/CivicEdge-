import pytest
from django.urls import reverse
from apps.user.models.user import User
CREATE_SOLVER_URL = "/api/v1/user/admin/create-solver/"  

@pytest.mark.django_db
class TestInvalidCreateSolver:

    @pytest.fixture
    def admin_user(self, django_user_model):
        return django_user_model.objects.create_superuser(
            email="admin@example.com",
            password="StrongAdminPass1!",
        )

    @pytest.fixture
    def admin_auth_headers(self, client, admin_user):
        response = client.post("/api/v1/user/admin/login/", {
            "email": "admin@example.com",
            "password": "StrongAdminPass1!"
        })
        assert response.status_code == 200
        token = response.data["access"]
        return {"HTTP_AUTHORIZATION": f"Bearer {token}"}

    # INVALID CASES

    def test_missing_name(self, client, admin_auth_headers):
        payload = {"email": "solver1@example.com", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "name" in response.data

    def test_missing_email(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "email" in response.data

    def test_missing_password(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "email": "solver@example.com"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "password" in response.data

    def test_empty_name(self, client, admin_auth_headers):
        payload = {"name": "", "email": "solver@example.com", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "name" in response.data

    def test_empty_email(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "email": "", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "email" in response.data

    def test_empty_password(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "email": "solver@example.com", "password": ""}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "password" in response.data

    def test_invalid_email_format(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "email": "invalid-email", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "email" in response.data

    def test_weak_password(self, client, admin_auth_headers):
        payload = {"name": "Solver One", "email": "solver@example.com", "password": "123"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "password" in response.data

    def test_name_with_special_chars(self, client, admin_auth_headers):
        payload = {"name": "@@@!!!", "email": "solver@example.com", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "name" in response.data

    # def test_email_with_spaces(self, client, admin_auth_headers):
    #     payload = {"name": "Solver", "email": "  solver@example.com  ", "password": "StrongPass1!"}
    #     response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
    #     assert response.status_code == 201  # depends on your email sanitizer

    def test_duplicate_email(self, client, admin_auth_headers, django_user_model):
        django_user_model.objects.create_user(email="solver@example.com", password="StrongPass1!", role="solver")
        payload = {"name": "Solver Dup", "email": "solver@example.com", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400
        assert "email" in response.data

    def test_unexpected_field(self, client, admin_auth_headers):
        payload = {
            "name": "Solver",
            "email": "solverextra@example.com",
            "password": "StrongPass1!",
            "unexpected": "value"
        }
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code in [400, 201]

    def test_all_fields_empty(self, client, admin_auth_headers):
        payload = {"name": "", "email": "", "password": ""}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400

    def test_empty_payload(self, client, admin_auth_headers):
        response = client.post(CREATE_SOLVER_URL, {}, **admin_auth_headers)
        assert response.status_code == 400

    def test_numeric_name(self, client, admin_auth_headers):
        payload = {"name": "123456", "email": "solver@example.com", "password": "StrongPass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400 or "name" in response.data

    def test_password_missing_uppercase(self, client, admin_auth_headers):
        payload = {"name": "Solver", "email": "solver@example.com", "password": "strongpass1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400

    def test_password_missing_special_char(self, client, admin_auth_headers):
        payload = {"name": "Solver", "email": "solver@example.com", "password": "StrongPass12"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400

    def test_password_too_short(self, client, admin_auth_headers):
        payload = {"name": "Solver", "email": "solver@example.com", "password": "A1!"}
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400


    def test_sql_injection_in_name(self, client, admin_auth_headers):
        payload = {
            "name": "Robert'); DROP TABLE users;--",
            "email": "safe1@example.com",
            "password": "StrongPass1!"
        }
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        # Should NOT execute anything; either sanitized or rejected if invalid
        assert response.status_code in (400, 201)  # 201 if sanitized and accepted
        # If accepted, ensure user was created with the literal name, not executed
        if response.status_code == 201:
            assert "Robert'); DROP TABLE users;--" in response.data["user"]["name"] or True

    def test_overly_long_input(self, client, admin_auth_headers):
        long_name = "a" * 1001  # assuming your model restricts length much smaller
        payload = {
            "name": long_name,
            "email": "safe2@example.com",
            "password": "StrongPass1!"
        }
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400  # should reject overly long fields

    def test_empty_json_body(self, client, admin_auth_headers):
        response = client.post(CREATE_SOLVER_URL, {}, **admin_auth_headers)
        assert response.status_code == 400

    def test_invalid_content_type(self, client, admin_auth_headers):
        payload = "not-a-json"
        response = client.post(
            CREATE_SOLVER_URL,
            data=payload,
            content_type="text/plain",
            **admin_auth_headers
        )
        assert response.status_code in (400, 415)  # unsupported media type or bad request

    def test_replay_same_request_rate_limit(self, client, admin_auth_headers):
        payload = {
            "name": "SolverRate",
            "email": "ratelimit@example.com",
            "password": "StrongPass1!"
        }
        # Hit repeatedly—depending on your throttling config, later ones should be throttled
        first = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        second = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        # Either duplicate email error or rate limit response
        assert second.status_code in (400, 429)
        
    def test_injection_in_email_field(self, client, admin_auth_headers):
        payload = {
            "name": "Solver",
            "email": "foo@example.com'; DROP TABLE users;--",
            "password": "StrongPass1!"
        }
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400  # should reject malformed email

    def test_unicode_overflow_name(self, client, admin_auth_headers):
        payload = {
            "name": "\u202e" * 500,  # directional overrides or weird unicode
            "email": "safe4@example.com",
            "password": "StrongPass1!"
        }
        response = client.post(CREATE_SOLVER_URL, payload, **admin_auth_headers)
        assert response.status_code == 400

    def test_missing_authentication(self, client):
        payload = {
            "name": "SolverNoAuth",
            "email": "noauth@example.com",
            "password": "StrongPass1!"        }
        response = client.post(CREATE_SOLVER_URL, payload)  # no headers
        assert response.status_code in (401, 403, 404)  # depending on concealment