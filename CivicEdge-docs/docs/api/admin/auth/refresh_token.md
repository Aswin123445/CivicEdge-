# 🔄 Refresh Access Token

**Endpoint:** `POST /api/admin/auth/refresh`  
**Auth Required:** ❌ No (Refresh Token Required)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows an administrator to **generate a new access token** using a valid refresh token.

Access tokens are short-lived for security reasons.  
When an access token expires, this endpoint enables admins to continue their session without logging in again.

---

## 🔐 Authentication

This endpoint does **not** require an access token.

A valid **refresh token** must be provided in the request body.

---

## 🧾 Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
