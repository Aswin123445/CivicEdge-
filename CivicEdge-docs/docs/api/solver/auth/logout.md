# 🔓 Solver Logout

**Endpoint:** `POST /api/solver/auth/logout`  
**Auth Required:** ✅ Yes (Solver Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint logs the solver out of the CivicEdge platform by **invalidating the active refresh token**.

Once logged out:
- the current session is terminated
- refresh tokens can no longer be used
- access tokens become ineffective after expiration

This ensures secure session termination, especially on shared or field devices.

---

## 🔐 Authentication

Include the solver access token in the request header:


---

## 🧾 Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
