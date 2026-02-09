# 🔑 Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`  
**Auth Required:** ❌ No  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a citizen to **request a password reset** if they have forgotten their account password.

When a valid email is provided:
- A password reset link or token is sent to the registered email
- The token can be used to securely reset the password
- No sensitive information is exposed in the response

---

## 🔐 Authentication

No authentication is required for this endpoint.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | ✅ | Registered email address |

---

## ✅ Example Request

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "citizen@example.com"
}
