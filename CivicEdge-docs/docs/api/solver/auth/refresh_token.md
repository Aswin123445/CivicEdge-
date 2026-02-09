# 🔄 Refresh Access Token

**Endpoint:** `POST /api/solver/auth/refresh`  
**Auth Required:** ❌ No (Refresh Token Required)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint allows a solver to **generate a new access token** using a valid refresh token.

Access tokens are short-lived for security reasons.  
When an access token expires, the frontend should use this endpoint to obtain a new one **without forcing the solver to log in again**.

---

## 🔐 Authentication

This endpoint does **not** require an access token.

Instead, a valid **refresh token** must be provided in the request body.

---

## 🧾 Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
