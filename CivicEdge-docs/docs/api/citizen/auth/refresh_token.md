# 🔄 Refresh Access Token

**Endpoint:** `POST /api/auth/refresh`  
**Auth Required:** ❌ No (uses refresh token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint is used to **generate a new access token** when the current access token has expired.

Access tokens are short-lived for security reasons.  
The refresh token allows the citizen to maintain a session without logging in again.

---

## 🔐 Authentication

This endpoint does not require an access token.

Instead, it requires a valid **refresh token**.

---

## 📥 Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refresh_token` | string | ✅ | Valid refresh token issued during login |

---

## ✅ Example Request

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.refresh.token"
}

