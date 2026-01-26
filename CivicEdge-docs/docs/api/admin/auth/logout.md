# 🔓 Admin Logout

**Endpoint:** `POST /api/admin/auth/logout`  
**Auth Required:** ✅ Yes (Admin Bearer Token)  
**Content-Type:** `application/json`

---

## 📌 Description

This endpoint logs the administrator out of the CivicEdge platform by **invalidating the active refresh token**.

Once logged out:
- the current session is terminated
- refresh tokens can no longer be used
- access tokens become ineffective after expiration

This ensures secure session termination, particularly on shared or office systems.

---

## 🔐 Authentication

Include the admin access token in the request header:


---

## 🧾 Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
